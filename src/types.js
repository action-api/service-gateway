/* eslint-disable unicorn/no-empty-file */

/**
 * @template T
 * @typedef {Object} ServiceGatewayResponse
 * @property {number} statusCode
 * @property {T} [data]
 * @property {SerializedError} [error]
 */

/**
 * クライアント側にErrorオブジェクトをシリアライズして送信するための型
 * @typedef {Object} SerializedError
 * @property {string} name
 * @property {number} statusCode
 * @property {string} message
 * @property {string} stack
 */
