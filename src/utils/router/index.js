import path from 'node:path';
import kebabCase from 'lodash.kebabcase';
import camelCase from 'lodash.camelcase';
import {InputError, RouteError} from '../../errors.js';
import utils from './utils/index.js';

function validateNonEmptyString(key, value) {
	if (typeof value !== 'string' || value.trim() === '') {
		throw new InputError(`${key} must be a non-empty string`);
	}
}

/**
 * @template T
 * @param {Object} input
 * @param {string} input.actionsPath - Action ディレクトリのパス
 * @param {string} [input.actionEntryFileName] - Action の entry ファイル名（デフォルト: 'index.js'）
 * @param {string} input.action - 実行する Action 名
 * @param {Object} [input.payload] - Action に渡す input
 * @returns {Promise<T>}
 * @throws {InputError | RouteError | Error}
 */
export async function router({actionsPath, actionEntryFileName = 'index.js', action, payload}) {
	validateNonEmptyString('actionsPath', actionsPath);
	validateNonEmptyString('actionEntryFileName', actionEntryFileName);
	validateNonEmptyString('action', action);

	actionsPath = path.resolve(actionsPath);

	const actionKebab = kebabCase(action);
	const actionCamel = camelCase(action);
	const actionPath = path.join(actionsPath, actionKebab, actionEntryFileName);

	const module = await (async () => {
		try {
			return await utils.dynamicImport(actionPath);
		} catch (error) {
			if (error.code === 'ERR_MODULE_NOT_FOUND') {
				throw new RouteError(`Action "${action}" Not Found`);
			}

			throw error;
		}
	})();

	const _action = module[actionCamel];
	if (typeof _action !== 'function') {
		throw new RouteError(`Action "${action}" Not Found`);
	}

	return _action(payload);
}
