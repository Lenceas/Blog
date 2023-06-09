/* tslint:disable */
/* eslint-disable */
/**
 * Larxyoung.Blog API V1
 * Larxyoung.Blog 接口文档
 *
 * OpenAPI spec version: 1.0.0
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
 * @interface RESTfulResultTestWebModel
 */
export interface RESTfulResultTestWebModel {
    /**
     * 
     * @type {number}
     * @memberof RESTfulResultTestWebModel
     */
    statusCode?: number | null;
    /**
     * 
     * @type {TestWebModel}
     * @memberof RESTfulResultTestWebModel
     */
    data?: TestWebModel;
    /**
     * 
     * @type {boolean}
     * @memberof RESTfulResultTestWebModel
     */
    succeeded?: boolean;
    /**
     * 
     * @type {any}
     * @memberof RESTfulResultTestWebModel
     */
    errors?: any | null;
    /**
     * 
     * @type {any}
     * @memberof RESTfulResultTestWebModel
     */
    extras?: any | null;
    /**
     * 
     * @type {number}
     * @memberof RESTfulResultTestWebModel
     */
    timestamp?: number;
}
