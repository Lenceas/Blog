/* tslint:disable */
/* eslint-disable */
/**
 * Lenceas.Core.Api 接口文档——.NET 7.0.4
 * Lenceas.Core.Api HTTP API v1
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/**
 * 
 * @export
 * @interface ApiResult
 */
export interface ApiResult {
    /**
     * 状态码
     * @type {number}
     * @memberof ApiResult
     */
    status?: number;
    /**
     * 是否成功
     * @type {boolean}
     * @memberof ApiResult
     */
    success?: boolean;
    /**
     * 返回信息
     * @type {string}
     * @memberof ApiResult
     */
    msg?: string | null;
    /**
     * 响应数据
     * @type {string}
     * @memberof ApiResult
     */
    data?: string | null;
}