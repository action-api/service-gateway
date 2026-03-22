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
export function router<T>({ actionsPath, actionEntryFileName, action, payload }: {
    actionsPath: string;
    actionEntryFileName?: string;
    action: string;
    payload?: any;
}): Promise<T>;
//# sourceMappingURL=index.d.ts.map