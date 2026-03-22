/**
 * テスト時にモックしやすい動的 import 関数
 * @param {string} modulePath - import 対象モジュールのパス
 * @returns {Promise<any>} import されたモジュール
 */
export async function dynamicImport(modulePath) {
	return import(modulePath);
}
