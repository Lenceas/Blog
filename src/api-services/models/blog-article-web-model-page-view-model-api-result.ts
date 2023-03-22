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
import { BlogArticleWebModelPageViewModel } from './blog-article-web-model-page-view-model';
/**
 * Api通用返回信息类
 * @export
 * @interface BlogArticleWebModelPageViewModelApiResult
 */
export interface BlogArticleWebModelPageViewModelApiResult {
    /**
     * 状态码
     * @type {number}
     * @memberof BlogArticleWebModelPageViewModelApiResult
     */
    status?: number;
    /**
     * 是否成功
     * @type {boolean}
     * @memberof BlogArticleWebModelPageViewModelApiResult
     */
    success?: boolean;
    /**
     * 返回信息
     * @type {string}
     * @memberof BlogArticleWebModelPageViewModelApiResult
     */
    msg?: string | null;
    /**
     * 
     * @type {BlogArticleWebModelPageViewModel}
     * @memberof BlogArticleWebModelPageViewModelApiResult
     */
    data?: BlogArticleWebModelPageViewModel;
}