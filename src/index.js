import path from 'node:path';
import {router} from './utils/router/index.js';

class ServiceGateway {
	/**
	 * actions ディレクトリのパス(default: './actions')
	 * - process.cwd() からの相対パスで解決されます。
	 * @type {string}
	 */
	actionsPath = './actions';
	/**
	 * Action の entry ファイル名(default: 'index.js')
	 * @type {string}
	 */
	actionEntryFileName = 'index.js';

	/**
	 * ServiceGateway の設定
	 * - actionsPath は process.cwd() からの相対パスで解決されます。
	 * @param {Object} config
	 * @param {string} [config.actionsPath] - Action ディレクトリのパス(default: './actions')
	 * @param {string} [config.actionEntryFileName] - Action の entry ファイル名（default: 'index.js'）
	 * @returns {void}
	 */
	configure({actionsPath, actionEntryFileName}) {
		if (actionsPath) {
			this.actionsPath = actionsPath;
		}

		if (actionEntryFileName) {
			this.actionEntryFileName = actionEntryFileName;
		}
	}

	/**
	 * @template T
	 * @param {Object} input
	 * @param {string} input.action - 実行する Action 名
	 * @param {Object} input.payload - Action に渡す入力データ
	 * @returns {Promise<import('./types.js').ServiceGatewayResponse<T>>}
	 */
	async run({action, payload}) {
		const {actionsPath, actionEntryFileName} = this;
		const response = {
			statusCode: 200,
			data: undefined,
			error: undefined,
		};

		try {
			const data = await router({
				actionsPath: path.resolve(actionsPath),
				actionEntryFileName,
				action,
				payload,
			});
			response.data = data;
		} catch (error) {
			const {name, statusCode, message, stack} = error;
			response.statusCode = statusCode || 500;
			response.error = {
				name,
				statusCode,
				message,
				stack,
			};
		}

		return response;
	}
}

/**
 * ServiceGateway のインスタンス
 * - デフォルトの actionsPath は './actions' で、実行ディレクトリからの相対パスで解決されます。
 * - デフォルトの actionEntryFileName は 'index.js' です。
 * @type {ServiceGateway}
 * @example
 * ```javascript
 * import {serviceGateway} from '@action-api/service-gateway';
 *
 * // 必要に応じて設定を上書き
 * serviceGateway.actionsPath = './actions';
 * serviceGateway.actionEntryFileName = 'index.js';
 *
 * export async function handler(event) {
 * 	const response = await serviceGateway.run({
 * 		action: event.action,
 * 		payload: event.payload,
 * 	});
 *
 * 	console.info({
 * 		statusCode: response.statusCode,
 * 		action: event.action,
 * 	});
 *
 * 	return response;
 * }
 */
export const serviceGateway = new ServiceGateway();
export * from './types.js';
