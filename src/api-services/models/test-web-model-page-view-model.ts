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
 * 
 * @export
 * @interface TestWebModelPageViewModel
 */
export interface TestWebModelPageViewModel {
    /**
     * 
     * @type {Array<TestWebModel>}
     * @memberof TestWebModelPageViewModel
     */
    viewModelList?: Array<TestWebModel> | null;
    /**
     * 
     * @type {number}
     * @memberof TestWebModelPageViewModel
     */
    pageIndex?: number;
    /**
     * 
     * @type {number}
     * @memberof TestWebModelPageViewModel
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof TestWebModelPageViewModel
     */
    totalRecords?: number;
    /**
     * 
     * @type {number}
     * @memberof TestWebModelPageViewModel
     */
    totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof TestWebModelPageViewModel
     */
    hasPreviousPage?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof TestWebModelPageViewModel
     */
    hasNextPage?: boolean;
}
