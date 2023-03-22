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
 * 用户 EditWebModel
 * @export
 * @interface UserEditWebModel
 */
export interface UserEditWebModel {
    /**
     * 主键
     * @type {number}
     * @memberof UserEditWebModel
     */
    id?: number;
    /**
     * 更新时间
     * @type {Date}
     * @memberof UserEditWebModel
     */
    mDate?: Date;
    /**
     * 排序
     * @type {number}
     * @memberof UserEditWebModel
     */
    sort?: number;
    /**
     * 备注
     * @type {string}
     * @memberof UserEditWebModel
     */
    remark?: string | null;
    /**
     * 账号
     * @type {string}
     * @memberof UserEditWebModel
     */
    userName?: string | null;
    /**
     * 密码
     * @type {string}
     * @memberof UserEditWebModel
     */
    password?: string | null;
    /**
     * 邮箱
     * @type {string}
     * @memberof UserEditWebModel
     */
    email?: string | null;
}
