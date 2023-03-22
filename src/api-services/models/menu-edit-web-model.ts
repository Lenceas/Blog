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
 * 菜单 EditWebModel
 * @export
 * @interface MenuEditWebModel
 */
export interface MenuEditWebModel {
    /**
     * 主键
     * @type {number}
     * @memberof MenuEditWebModel
     */
    id?: number;
    /**
     * 更新时间
     * @type {Date}
     * @memberof MenuEditWebModel
     */
    mDate?: Date;
    /**
     * 排序
     * @type {number}
     * @memberof MenuEditWebModel
     */
    sort?: number;
    /**
     * 备注
     * @type {string}
     * @memberof MenuEditWebModel
     */
    remark?: string | null;
    /**
     * 父菜单ID
     * @type {number}
     * @memberof MenuEditWebModel
     */
    menuPID?: number;
    /**
     * 菜单名称
     * @type {string}
     * @memberof MenuEditWebModel
     */
    menuName?: string | null;
    /**
     * 菜单路由
     * @type {string}
     * @memberof MenuEditWebModel
     */
    menuUrl?: string | null;
    /**
     * 菜单Icon
     * @type {string}
     * @memberof MenuEditWebModel
     */
    menuIcon?: string | null;
}
