import axios from 'axios'
import type { AxiosRequestConfig, AxiosPromise, Method } from 'axios'
import globalAxios, { AxiosInstance } from 'axios'
import { Configuration } from '/@/api-services'
import { BaseAPI, BASE_PATH } from '/@/api-services/base'
import { ElLoading, LoadingOptions, ElNotification } from 'element-plus'
import { useConfig } from '/@/stores/config'
import { isAdminApp } from '/@/utils/common'
import router from '/@/router/index'
// import { refreshToken } from '/@/api/common'
// import { useUserInfo } from '/@/stores/userInfo'
// import { useAdminInfo } from '/@/stores/adminInfo'

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

// 清除 token
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

/*
 * 创建Axios
 * 默认开启`reductDataFormat(简洁响应)`,返回类型为`ApiPromise`
 * 关闭`reductDataFormat`,返回类型则为`AxiosPromise`
 */
function createAxios(axiosConfig: AxiosRequestConfig, options: Options = {}, loading: LoadingOptions = {}): ApiPromise | AxiosPromise {
    // todo:
    const config = useConfig()
    // const adminInfo = useAdminInfo()
    // const userInfo = useUserInfo()

    const Axios = axios.create({
        baseURL: getUrl(),
        timeout: 1000 * 10,
        headers: {
            'think-lang': config.lang.defaultLang,
            server: true,
        },
        responseType: 'json',
    })

    options = Object.assign(
        {
            CancelDuplicateRequest: true, // 是否开启取消重复请求, 默认为 true
            loading: false, // 是否开启loading层效果, 默认为false
            reductDataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
            showErrorMessage: true, // 是否开启接口错误信息展示,默认为true
            showCodeMessage: true, // 是否开启code不为1时的信息提示, 默认为true
            showSuccessMessage: false, // 是否开启code为1时的信息提示, 默认为false
            anotherToken: '', // 当前请求使用另外的用户token
        },
        options
    )

    // 请求拦截
    // Axios.interceptors.request.use(
    //     (config) => {
    //         removePending(config)
    //         options.CancelDuplicateRequest && addPending(config)
    //         // 创建loading实例
    //         if (options.loading) {
    //             loadingInstance.count++
    //             if (loadingInstance.count === 1) {
    //                 loadingInstance.target = ElLoading.service(loading)
    //             }
    //         }

    //         // 自动携带token
    //         if (config.headers) {
    //             const token = adminInfo.getToken()
    //             if (token) (config.headers as anyObj).batoken = token
    //             const userToken = options.anotherToken || userInfo.getToken()
    //             if (userToken) (config.headers as anyObj)['ba-user-token'] = userToken
    //         }

    //         return config
    //     },
    //     (error) => {
    //         return Promise.reject(error)
    //     }
    // )

    // 响应拦截
    // Axios.interceptors.response.use(
    //     (response) => {
    //         removePending(response.config)
    //         options.loading && closeLoading(options) // 关闭loading

    //         if (response.config.responseType == 'json') {
    //             if (response.data && response.data.code !== 1) {
    //                 if (response.data.code == 409) {
    //                     if (!window.tokenRefreshing) {
    //                         window.tokenRefreshing = true
    //                         return refreshToken()
    //                             .then((res) => {
    //                                 if (res.data.type == 'admin-refresh') {
    //                                     adminInfo.setToken(res.data.token, 'token')
    //                                     response.headers.batoken = `${res.data.token}`
    //                                     window.requests.forEach((cb) => cb(res.data.token, 'admin-refresh'))
    //                                 } else if (res.data.type == 'user-refresh') {
    //                                     userInfo.setToken(res.data.token, 'token')
    //                                     response.headers['ba-user-token'] = `${res.data.token}`
    //                                     window.requests.forEach((cb) => cb(res.data.token, 'user-refresh'))
    //                                 }
    //                                 window.requests = []
    //                                 return Axios(response.config)
    //                             })
    //                             .catch((err) => {
    //                                 if (isAdminApp()) {
    //                                     adminInfo.removeToken()
    //                                     if (router.currentRoute.value.name != 'adminLogin') {
    //                                         router.push({ name: 'adminLogin' })
    //                                         return Promise.reject(err)
    //                                     } else {
    //                                         response.headers.batoken = ''
    //                                         window.requests.forEach((cb) => cb('', 'admin-refresh'))
    //                                         window.requests = []
    //                                         return Axios(response.config)
    //                                     }
    //                                 } else {
    //                                     userInfo.removeToken()
    //                                     if (router.currentRoute.value.name != 'userLogin') {
    //                                         router.push({ name: 'userLogin' })
    //                                         return Promise.reject(err)
    //                                     } else {
    //                                         response.headers['ba-user-token'] = ''
    //                                         window.requests.forEach((cb) => cb('', 'user-refresh'))
    //                                         window.requests = []
    //                                         return Axios(response.config)
    //                                     }
    //                                 }
    //                             })
    //                             .finally(() => {
    //                                 window.tokenRefreshing = false
    //                             })
    //                     } else {
    //                         return new Promise((resolve) => {
    //                             // 用函数形式将 resolve 存入，等待刷新后再执行
    //                             window.requests.push((token: string, type: string) => {
    //                                 if (type == 'admin-refresh') {
    //                                     response.headers.batoken = `${token}`
    //                                 } else {
    //                                     response.headers['ba-user-token'] = `${token}`
    //                                 }
    //                                 resolve(Axios(response.config))
    //                             })
    //                         })
    //                     }
    //                 }
    //                 if (options.showCodeMessage) {
    //                     ElNotification({
    //                         type: 'error',
    //                         message: response.data.msg,
    //                     })
    //                 }
    //                 // 自动跳转到路由name或path，仅限server端返回302的情况
    //                 if (response.data.code == 302) {
    //                     if (isAdminApp()) {
    //                         adminInfo.removeToken()
    //                     } else {
    //                         userInfo.removeToken()
    //                     }
    //                     if (response.data.data.routeName) {
    //                         router.push({ name: response.data.data.routeName })
    //                     } else if (response.data.data.routePath) {
    //                         router.push({ path: response.data.data.routePath })
    //                     }
    //                 }
    //                 // code不等于1, 页面then内的具体逻辑就不执行了
    //                 return Promise.reject(response.data)
    //             } else if (options.showSuccessMessage && response.data && response.data.code == 1) {
    //                 ElNotification({
    //                     message: response.data.msg ? response.data.msg : i18n.global.t('axios.Operation successful'),
    //                     type: 'success',
    //                 })
    //             }
    //         }

    //         return options.reductDataFormat ? response.data : response
    //     },
    //     (error) => {
    //         error.config && removePending(error.config)
    //         options.loading && closeLoading(options) // 关闭loading
    //         options.showErrorMessage && httpErrorStatusHandle(error) // 处理错误状态码
    //         return Promise.reject(error) // 错误继续返回给到具体页面
    //     }
    // )

    return options.reductDataFormat ? (Axios(axiosConfig) as ApiPromise) : (Axios(axiosConfig) as AxiosPromise)
}

export default createAxios

/**
 * axios 默认实例
 */
export const axiosInstance: AxiosInstance = globalAxios

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
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error: any) {
    // 处理被取消的请求
    if (axios.isCancel(error)) return console.error('因为请求重复被自动取消：' + error.message)
    let message = ''
    if (error && error.response) {
        switch (error.response.status) {
            case 302:
                message = '接口重定向了！'
                break
            case 400:
                message = '参数不正确！'
                break
            case 401:
                message = '您没有权限操作！'
                break
            case 403:
                message = '您没有权限操作！'
                break
            case 404:
                message = '请求地址出错:' + error.response.config.url
                break
            case 408:
                message = '请求超时！'
                break
            case 409:
                message = '系统已存在相同数据！'
                break
            case 500:
                message = '服务器内部错误！'
                break
            case 501:
                message = '服务未实现！'
                break
            case 502:
                message = '网关错误！'
                break
            case 503:
                message = '服务不可用！'
                break
            case 504:
                message = '服务暂时无法访问，请稍后再试！'
                break
            case 505:
                message = 'HTTP版本不受支持！'
                break
            default:
                message = '异常问题，请联系网站管理员！'
                break
        }
    }
    if (error.message.includes('timeout')) message = '网络请求超时！'
    if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'

    ElNotification({
        type: 'error',
        message,
    })
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
        new axios.CancelToken((cancel) => {
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
