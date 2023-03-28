import type { RuleType } from 'async-validator'
import { FormItemRule } from 'element-plus'

/**
 * 手机号码验证
 */
export function validatorMobile(rule: any, mobile: string | number, callback: Function) {
    // 允许空值，若需必填请添加多验证规则
    if (!mobile) {
        return callback()
    }
    if (!/^(1[3-9])\d{9}$/.test(mobile.toString())) {
        return callback(new Error('请输入正确的手机号'))
    }
    return callback()
}

/**
 * 账户名验证
 */
export function validatorAccount(rule: any, val: string, callback: Function) {
    if (!val) {
        return callback()
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(val)) {
        return callback(new Error('要求5到15位，字母开头且只含字母、数字、下划线'))
    }
    return callback()
}

/**
 * 密码验证
 */
export function regularPassword(val: string) {
    return /^(?!.*[&<>"'\n\r]).{5,32}$/.test(val)
}
export function validatorPassword(rule: any, val: string, callback: Function) {
    if (!val) {
        return callback()
    }
    if (!regularPassword(val)) {
        return callback(new Error('密码要求5到32位，不能包含 & < > " \''))
    }
    return callback()
}

/**
 * 验证码验证
 */
export function regularCaptcha(val: string) {
    return /^[a-zA-Z0-9]{4}$/.test(val)
}
export function validatorCaptcha(rule: any, val: string, callback: Function) {
    if (!val) {
        return callback()
    }
    if (!regularCaptcha(val)) {
        return callback(new Error('请输入正确的4位验证码'))
    }
    return callback()
}

/**
 * 变量名验证
 */
export function regularVarName(val: string) {
    return /^([^\x00-\xff]|[a-zA-Z_$])([^\x00-\xff]|[a-zA-Z0-9_$])*$/.test(val)
}
export function validatorVarName(rule: any, val: string, callback: Function) {
    if (!val) {
        return callback()
    }
    if (!regularVarName(val)) {
        return callback(new Error('请输入正确的名称'))
    }
    return callback()
}

export function validatorEditorRequired(rule: any, val: string, callback: Function) {
    if (!val || val == '<p><br></p>') {
        return callback(new Error('内容不能为空'))
    }
    return callback()
}

export const validatorType = {
    required: '必填',
    mobile: '手机号',
    account: '账号',
    password: '密码',
    captcha: '验证码',
    varName: '变量名',
    url: 'URL',
    email: '邮箱',
    date: '日期',
    number: '数字',
    integer: '整数',
    float: '浮点数',
}

export interface buildValidatorParams {
    // 规则名:required=必填,mobile=手机号,account=账号,password=密码,captcha=验证码,varName=变量名,editorRequired=富文本必填,number、integer、float、date、url、email
    name:
        | 'required'
        | 'mobile'
        | 'account'
        | 'password'
        | 'captcha'
        | 'varName'
        | 'editorRequired'
        | 'number'
        | 'integer'
        | 'float'
        | 'date'
        | 'url'
        | 'email'
    // 自定义验证错误消息
    message?: string
    // 验证项的标题，这些验证方式不支持:mobile、account、password、captcha、varName、editorRequired
    title?: string
    // 验证触发方式
    trigger?: 'change' | 'blur'
}

/**
 * 构建表单验证规则
 * @param {buildValidatorParams} paramsObj 参数对象
 */
export function buildValidatorData({ name, message, title, trigger = 'blur' }: buildValidatorParams): FormItemRule {
    // 必填
    if (name == 'required') {
        return {
            required: true,
            message: message ? message : '请输入' + title,
            trigger: trigger,
        }
    }

    // 常见类型
    const validatorType = ['number', 'integer', 'float', 'date', 'url', 'email']
    if (validatorType.includes(name)) {
        return {
            type: name as RuleType,
            message: message ? message : '请输入正确的' + title,
            trigger: trigger,
        }
    }

    // 自定义验证方法
    const validatorCustomFun: anyObj = {
        mobile: validatorMobile,
        account: validatorAccount,
        password: validatorPassword,
        captcha: validatorCaptcha,
        varName: validatorVarName,
        editorRequired: validatorEditorRequired,
    }
    if (validatorCustomFun[name]) {
        return {
            required: name == 'editorRequired' ? true : false,
            validator: validatorCustomFun[name],
            trigger: trigger,
            message: message,
        }
    }
    return {}
}
