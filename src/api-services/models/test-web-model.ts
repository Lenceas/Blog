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
/**
 * 测试WebModel
 * @export
 * @interface TestWebModel
 */
export interface TestWebModel {
    /**
     * 主键
     * @type {number}
     * @memberof TestWebModel
     */
    id?: number;
    /**
     * 备注
     * @type {string}
     * @memberof TestWebModel
     */
    remark?: string | null;
    /**
     * 修改时间
     * @type {Date}
     * @memberof TestWebModel
     */
    mTime?: Date;
    /**
     * 修改人ID
     * @type {number}
     * @memberof TestWebModel
     */
    mid?: number | null;
    /**
     * 创建时间
     * @type {Date}
     * @memberof TestWebModel
     */
    cTime?: Date;
    /**
     * 创建人ID
     * @type {number}
     * @memberof TestWebModel
     */
    cid?: number | null;
}
