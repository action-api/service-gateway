import test from 'node:test';
import assert from 'node:assert/strict';
import {InputError, RouteError} from '../../errors.js';
import utils from './utils/index.js';
import {router} from './index.js';

let mockAction;

test.beforeEach(() => {
	mockAction = async () => ({testAction: payload => payload.value * 2});
	test.mock.method(utils, 'dynamicImport', async modulePath => mockAction(modulePath));
});

test.afterEach(() => {
	test.mock.restoreAll();
});

test('router は actionsPath が無効な場合に InputError を送出する', async () => {
	await assert.rejects(
		async () =>
			router({
				actionsPath: '',
				action: 'testAction',
				payload: {},
			}),
		error => {
			assert.ok(error instanceof InputError);
			assert.strictEqual(error.message, 'actionsPath must be a non-empty string');
			return true;
		},
	);
});

test('router は actionsPath が文字列以外の場合に InputError を送出する', async () => {
	await assert.rejects(
		async () =>
			router({
				actionsPath: 123,
				action: 'testAction',
				payload: {},
			}),
		error => {
			assert.ok(error instanceof InputError);
			assert.strictEqual(error.message, 'actionsPath must be a non-empty string');
			return true;
		},
	);
});

test('router は actionEntryFileName が無効な場合に InputError を送出する', async () => {
	await assert.rejects(
		async () =>
			router({
				actionsPath: './unused-in-test',
				actionEntryFileName: ' ',
				action: 'testAction',
				payload: {},
			}),
		error => {
			assert.ok(error instanceof InputError);
			assert.strictEqual(error.message, 'actionEntryFileName must be a non-empty string');
			return true;
		},
	);
});

test('router は action が無効な場合に InputError を送出する', async () => {
	await assert.rejects(
		async () =>
			router({
				actionsPath: './unused-in-test',
				action: '',
				payload: {},
			}),
		error => {
			assert.ok(error instanceof InputError);
			assert.strictEqual(error.message, 'action must be a non-empty string');
			return true;
		},
	);
});

test('router はアクションを実行して結果を返す', async () => {
	const result = await router({
		actionsPath: './unused-in-test',
		action: 'testAction',
		payload: {value: 5},
	});

	assert.strictEqual(result, 10);
});

test('router はアクションが見つからない場合に RouteError を送出する', async () => {
	mockAction = async () => {
		const error = new Error('module not found');
		error.code = 'ERR_MODULE_NOT_FOUND';
		throw error;
	};

	try {
		await router({
			actionsPath: './unused-in-test',
			action: 'nonExistentAction',
			payload: {},
		});
		assert.fail('想定していた RouteError が送出されませんでした');
	} catch (error) {
		assert.ok(error instanceof RouteError);
		assert.strictEqual(error.message, 'Action "nonExistentAction" Not Found');
	}
});

test('router はアクションが関数でない場合に RouteError を送出する', async () => {
	mockAction = async () => ({invalidAction: 'not-a-function'});

	try {
		await router({
			actionsPath: './unused-in-test',
			action: 'invalidAction',
			payload: {},
		});
		assert.fail('想定していた RouteError が送出されませんでした');
	} catch (error) {
		assert.ok(error instanceof RouteError);
		assert.strictEqual(error.message, 'Action "invalidAction" Not Found');
	}
});
