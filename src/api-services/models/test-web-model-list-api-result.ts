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
import { TestWebModel } from './test-web-model';
/**
 * Api通用返回信息类
 * @export
 * @interface TestWebModelListApiResult
 */
export interface TestWebModelListApiResult {
    /**
     * 状态码
     * @type {number}
     * @memberof TestWebModelListApiResult
     */
    status?: number;
    /**
     * 是否成功
     * @type {boolean}
     * @memberof TestWebModelListApiResult
     */
    success?: boolean;
    /**
     * 返回信息
     * @type {string}
     * @memberof TestWebModelListApiResult
     */
    msg?: string | null;
    /**
     * 响应数据
     * @type {Array<TestWebModel>}
     * @memberof TestWebModelListApiResult
     */
    data?: Array<TestWebModel> | null;
}
