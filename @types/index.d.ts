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
export const serviceGateway: ServiceGateway;
export * from "./types.js";
declare class ServiceGateway {
    /**
     * actions ディレクトリのパス(default: './actions')
     * - process.cwd() からの相対パスで解決されます。
     * @type {string}
     */
    actionsPath: string;
    /**
     * Action の entry ファイル名(default: 'index.js')
     * @type {string}
     */
    actionEntryFileName: string;
    /**
     * ServiceGateway の設定
     * - actionsPath は process.cwd() からの相対パスで解決されます。
     * @param {Object} config
     * @param {string} [config.actionsPath] - Action ディレクトリのパス(default: './actions')
     * @param {string} [config.actionEntryFileName] - Action の entry ファイル名（default: 'index.js'）
     * @returns {void}
     */
    configure({ actionsPath, actionEntryFileName }: {
        actionsPath?: string;
        actionEntryFileName?: string;
    }): void;
    /**
     * @template T
     * @param {Object} input
     * @param {string} input.action - 実行する Action 名
     * @param {Object} input.payload - Action に渡す入力データ
     * @returns {Promise<import('./types.js').ServiceGatewayResponse<T>>}
     */
    run<T>({ action, payload }: {
        action: string;
        payload: any;
    }): Promise<import("./types.js").ServiceGatewayResponse<T>>;
}
//# sourceMappingURL=index.d.ts.map