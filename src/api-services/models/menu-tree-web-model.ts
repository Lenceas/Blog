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
import { MenuTreeWebModel } from './menu-tree-web-model';
/**
 * 菜单结构树 WebModel
 * @export
 * @interface MenuTreeWebModel
 */
export interface MenuTreeWebModel {
    /**
     * 主键
     * @type {number}
     * @memberof MenuTreeWebModel
     */
    id?: number;
    /**
     * 创建时间
     * @type {Date}
     * @memberof MenuTreeWebModel
     */
    cDate?: Date;
    /**
     * 更新时间
     * @type {Date}
     * @memberof MenuTreeWebModel
     */
    mDate?: Date;
    /**
     * 排序
     * @type {number}
     * @memberof MenuTreeWebModel
     */
    sort?: number;
    /**
     * 备注
     * @type {string}
     * @memberof MenuTreeWebModel
     */
    remark?: string | null;
    /**
     * 父菜单ID
     * @type {number}
     * @memberof MenuTreeWebModel
     */
    menuPID?: number;
    /**
     * 菜单名称
     * @type {string}
     * @memberof MenuTreeWebModel
     */
    menuName?: string | null;
    /**
     * 菜单路由
     * @type {string}
     * @memberof MenuTreeWebModel
     */
    menuUrl?: string | null;
    /**
     * 菜单Icon
     * @type {string}
     * @memberof MenuTreeWebModel
     */
    menuIcon?: string | null;
    /**
     * 子菜单
     * @type {Array<MenuTreeWebModel>}
     * @memberof MenuTreeWebModel
     */
    subMenuList?: Array<MenuTreeWebModel> | null;
}
