// import axios from 'axios'
import type { AxiosRequestConfig, AxiosPromise, Method } from 'axios'
import globalAxios, { AxiosInstance } from 'axios'
import { Configuration } from '/@/api-services'
import { BaseAPI, BASE_PATH } from '/@/api-services/base'
import { ElLoading, LoadingOptions, ElNotification } from 'element-plus'
import { useConfig } from '/@/stores/config'
import { isAdminApp } from '/@/utils/common'
import router from '/@/router/index'
// import { refreshToken } from '/@/api/common'
import { useAdminInfo } from '/@/stores/adminInfo'
import { Console } from 'console'
import { fa } from 'element-plus/es/locale'
import jwt_decode from 'jwt-decode'

/*
 * 根据运行环境获取基础请求URL
 */
export const getUrl = (): string => {
    const value: string = import.meta.env.VITE_AXIOS_BASE_URL as string
    return value == 'getCurrentDomain' ? window.location.protocol + '//' + window.location.host : value
}

/*
 * 根据运行环境获取基础请求URL的端口
 */
export const getUrlPort = (): string => {
    const url = getUrl()
    return new URL(url).port
}

/**
 * 接口服务器配置
 */
export const serveConfig = new Configuration({
    basePath: getUrl(),
})

// token 键定义
export const accessTokenKey = 'access-token'
export const refreshAccessTokenKey = `x-${accessTokenKey}`

/*
 * 清除 token
 */
export const clearAccessTokens = () => {
    window.localStorage.removeItem(accessTokenKey)
    window.localStorage.removeItem(refreshAccessTokenKey)

    // 这里可以添加清除更多 Key =========================================
}

window.requests = []
window.tokenRefreshing = false
const pendingMap = new Map()
const loadingInstance: LoadingInstance = {
    target: null,
    count: 0,
}

/**
 * axios 默认实例
 */
export const axiosInstance: AxiosInstance = globalAxios

/**
 * 检查并存储授权信息
 * @param res 响应对象
 */
export function checkAndStoreAuthentication(res: any): void {
    // 读取响应报文头 token 信息
    const accessToken = res.headers[accessTokenKey]
    const refreshAccessToken = res.headers[refreshAccessTokenKey]
    // 判断是否是无效 token
    if (accessToken === 'invalid_token') {
        clearAccessTokens()
    }
    // 判断是否存在刷新 token，如果存在则存储在本地
    else if (refreshAccessToken && accessToken && accessToken !== 'invalid_token') {
        window.localStorage.setItem(accessTokenKey, accessToken)
        window.localStorage.setItem(refreshAccessTokenKey, refreshAccessToken)
    }
}

/**
 * 包装 Promise 并返回 [Error, any]
 * @param promise Promise 方法
 * @param errorExt 自定义错误信息（拓展）
 * @returns [Error, any]
 */
export function feature<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            if (errorExt) {
                const parsedError = Object.assign({}, err, errorExt)
                return [parsedError, undefined]
            }

            return [err, undefined]
        })
}

/**
 * 获取/创建服务 API 实例
 * @param apiType BaseAPI 派生类型
 * @param configuration 服务器配置对象
 * @param basePath 服务器地址
 * @param axiosObject axios 实例
 * @returns 服务API 实例
 */
export function getAPI<T extends BaseAPI>(
    apiType: new (configuration?: Configuration, basePath?: string, axiosInstance?: AxiosInstance) => T,
    configuration: Configuration = serveConfig,
    basePath: string = BASE_PATH,
    axiosObject: AxiosInstance = axiosInstance
) {
    return new apiType(configuration, basePath, axiosObject)
}

/**
 * 关闭Loading层实例
 */
function closeLoading(options: Options) {
    if (options.loading && loadingInstance.count > 0) loadingInstance.count--
    if (loadingInstance.count === 0) {
        loadingInstance.target.close()
        loadingInstance.target = null
    }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 */
function addPending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config)
    config.cancelToken =
        config.cancelToken ||
        new globalAxios.CancelToken((cancel) => {
            if (!pendingMap.has(pendingKey)) {
                pendingMap.set(pendingKey, cancel)
            }
        })
}

/**
 * 删除重复的请求
 */
function removePending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config)
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey)
        cancelToken(pendingKey)
        pendingMap.delete(pendingKey)
    }
}

/**
 * 生成每个请求的唯一key
 */
function getPendingKey(config: AxiosRequestConfig) {
    let { data } = config
    const { url, method, params, headers } = config
    if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
    return [
        url,
        method,
        headers && (headers as anyObj).batoken ? (headers as anyObj).batoken : '',
        headers && (headers as anyObj)['ba-user-token'] ? (headers as anyObj)['ba-user-token'] : '',
        JSON.stringify(params),
        JSON.stringify(data),
    ].join('&')
}

/**
 * 根据请求方法组装请求数据/参数
 */
export function requestPayload(method: Method, data: anyObj) {
    if (method == 'GET') {
        return {
            params: data,
        }
    } else if (method == 'POST') {
        return {
            data: data,
        }
    }
}

/**
 * 将 JWT 时间戳转换成 Date
 * @description 主要针对 `exp`，`iat`，`nbf`
 * @param timestamp 时间戳
 * @returns Date 对象
 */
export function getJWTDate(timestamp: number): Date {
    return new Date(timestamp * 1000)
}

interface LoadingInstance {
    target: any
    count: number
}

interface Options {
    // 是否开启取消重复请求, 默认为 true
    CancelDuplicateRequest?: boolean
    // 是否开启loading层效果, 默认为false
    loading?: boolean
    // 是否开启简洁的数据结构响应, 默认为true
    reductDataFormat?: boolean
    // 是否开启接口错误信息展示,默认为true
    showErrorMessage?: boolean
    // 是否开启code不为0时的信息提示, 默认为true
    showCodeMessage?: boolean
    // 是否开启code为0时的信息提示, 默认为false
    showSuccessMessage?: boolean
    // 当前请求使用另外的用户token
    anotherToken?: string
}

/**
 * 解密 JWT token 的信息
 * @param token jwt token 字符串
 * @returns <any>object
 */
export function decryptJWT(token: string): any {
    return jwt_decode(token)
}

const options: Options = {
    CancelDuplicateRequest: true, // 是否开启取消重复请求, 默认为 true
    loading: false, // 是否开启loading层效果, 默认为false
    reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
    showErrorMessage: true, // 是否开启接口错误信息展示,默认为true
    showCodeMessage: true, // 是否开启请求失败时的信息提示, 默认为true
    showSuccessMessage: false, // 是否开启请求成功时的信息提示, 默认为false
    anotherToken: '', // 当前请求使用另外的用户token
}

// axios 请求拦截
axiosInstance.interceptors.request.use(
    (conf) => {
        removePending(conf)
        options.CancelDuplicateRequest && addPending(conf)

        // 自动携带token
        if (conf.headers) {
            const token = useAdminInfo().getToken()
            // console.log('token:' + token)
            if (token) (conf.headers as anyObj).batoken = token
        }

        return conf
    },
    (error) => {
        return Promise.reject(error)
    }
)

// axios 响应拦截
axiosInstance.interceptors.response.use(
    (response) => {
        removePending(response.config)
        options.loading && closeLoading(options) // 关闭loading
        if (response.data && !response.data.succeeded) {
            if (response.data.statuscode == 409) {
                if (!window.tokenRefreshing) {
                    window.tokenRefreshing = true
                    // todo:调用刷新token接口
                    window.tokenRefreshing = false
                } else {
                    window.requests.push((token: string, type: string) => {
                        if (type == 'admin-refresh') {
                            response.headers.batoken = `${token}`
                        }
                    })
                }
            }
            if (options.showCodeMessage) {
                ElNotification.error(response.data.errors)
            }
            // 自动跳转到路由name或path，仅限server端返回302的情况
            if (response.data.statuscode == 302) {
                // if (isAdminApp()) {
                //     useAdminInfo().removeToken()
                // }
                // if (response.data.data.routeName) {
                //     router.push({ name: response.data.data.routeName })
                // } else if (response.data.data.routePath) {
                //     router.push({ path: response.data.data.routePath })
                // }
            }
        }

        return options.reductDataFormat ? response.data : response
    },
    (error) => {
        error.config && removePending(error.config)
        options.loading && closeLoading(options) // 关闭loading
        options.showErrorMessage && httpErrorStatusHandle(error) // 处理错误状态码
        return Promise.reject(error) // 错误继续返回给到具体页面
    }
)

/**
 * 处理异常
 * @param {*} error
 */
export function httpErrorStatusHandle(error: any) {
    // 处理被取消的请求
    if (globalAxios.isCancel(error)) return console.error('因为请求重复被自动取消：' + error.message)
    let message = ''
    if (error.message.includes('timeout')) message = '网络请求超时！'
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
    ElNotification.error(message)
}
