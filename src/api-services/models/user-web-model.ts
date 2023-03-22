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
 * 用户 WebModel
 * @export
 * @interface UserWebModel
 */
export interface UserWebModel {
    /**
     * 主键
     * @type {number}
     * @memberof UserWebModel
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof UserWebModel
     */
    cDate?: Date;
    /**
     * 更新时间
     * @type {Date}
     * @memberof UserWebModel
     */
    mDate?: Date;
    /**
     * 排序
     * @type {number}
     * @memberof UserWebModel
     */
    sort?: number;
    /**
     * 备注
     * @type {string}
     * @memberof UserWebModel
     */
    remark?: string | null;
    /**
     * 账号
     * @type {string}
     * @memberof UserWebModel
     */
    userName?: string | null;
    /**
     * 邮箱
     * @type {string}
     * @memberof UserWebModel
     */
    email?: string | null;
}