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
import { MenuWebModel } from './menu-web-model';
/**
 * 
 * @export
 * @interface MenuWebModelPageViewModel
 */
export interface MenuWebModelPageViewModel {
    /**
     * 
     * @type {Array<MenuWebModel>}
     * @memberof MenuWebModelPageViewModel
     */
    viewModelList?: Array<MenuWebModel> | null;
    /**
     * 
     * @type {number}
     * @memberof MenuWebModelPageViewModel
     */
    pageIndex?: number;
    /**
     * 
     * @type {number}
     * @memberof MenuWebModelPageViewModel
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof MenuWebModelPageViewModel
     */
    totalRecords?: number;
    /**
     * 
     * @type {number}
     * @memberof MenuWebModelPageViewModel
     */
    totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof MenuWebModelPageViewModel
     */
    hasPreviousPage?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MenuWebModelPageViewModel
     */
    hasNextPage?: boolean;
}
