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
 * 博客文章 WebModel
 * @export
 * @interface BlogArticleWebModel
 */
export interface BlogArticleWebModel {
    /**
     * 主键
     * @type {number}
     * @memberof BlogArticleWebModel
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof BlogArticleWebModel
     */
    cDate?: Date;
    /**
     * 更新时间
     * @type {Date}
     * @memberof BlogArticleWebModel
     */
    mDate?: Date;
    /**
     * 排序
     * @type {number}
     * @memberof BlogArticleWebModel
     */
    sort?: number;
    /**
     * 备注
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    remark?: string | null;
    /**
     * 标题
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    title?: string | null;
    /**
     * 副标题
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    subTitle?: string | null;
    /**
     * 简介
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    intro?: string | null;
    /**
     * 缩略图
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    thumbnail?: string | null;
    /**
     * 内容
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    content?: string | null;
    /**
     * 类别
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    category?: string | null;
    /**
     * 作者
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    author?: string | null;
    /**
     * 标签集合
     * @type {string}
     * @memberof BlogArticleWebModel
     */
    tags?: string | null;
    /**
     * 访问量
     * @type {number}
     * @memberof BlogArticleWebModel
     */
    views?: number;
    /**
     * 评论数
     * @type {number}
     * @memberof BlogArticleWebModel
     */
    commentNum?: number;
    /**
     * 是否推荐
     * @type {boolean}
     * @memberof BlogArticleWebModel
     */
    isHot?: boolean;
    /**
     * 是否首页
     * @type {boolean}
     * @memberof BlogArticleWebModel
     */
    isHome?: boolean;
}