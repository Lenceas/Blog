import { nextTick } from 'vue'
import type { App } from 'vue'
import * as elIcons from '@element-plus/icons-vue'
import router from '/@/router/index'
import Icon from '/@/components/icon/index.vue'
import { useNavTabs } from '/@/stores/navTabs'
import { ElForm } from 'element-plus'
import { useSiteConfig } from '../stores/siteConfig'
import { useTitle } from '@vueuse/core'
import { getUrl } from './axios'
import createAxios from '/@/utils/axios'

export function registerIcons(app: App) {
    /*
     * 全局注册 Icon
     * 使用方式: <Icon name="name" size="size" color="color" />
     * 详见<待完善>
     */
    app.component('Icon', Icon)

    /*
     * 全局注册element Plus的icon
     */
    const icons = elIcons as any
    for (const i in icons) {
        app.component(`el-icon-${icons[i].name}`, icons[i])
    }
}

/**
 * 加载网络css文件
 * @param url css资源url
 */
export function loadCss(url: string): void {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.getElementsByTagName('head')[0].appendChild(link)
}

/**
 * 加载网络js文件
 * @param url js资源url
 */
export function loadJs(url: string): void {
    const link = document.createElement('script')
    link.src = url
    document.body.appendChild(link)
}

/**
 * 根据路由 meta.title 设置浏览器标题
 */
export function setTitleFromRoute() {
    if (typeof router.currentRoute.value.meta.title != 'string') {
        return
    }
    nextTick(() => {
        let webTitle = ''
        if ((router.currentRoute.value.meta.title as string).indexOf('pagesTitle.') === -1) {
            webTitle = router.currentRoute.value.meta.title as string
        } else {
            webTitle = router.currentRoute.value.meta.title as string
        }
        const title = useTitle()
        const siteConfig = useSiteConfig()
        title.value = `${webTitle}${siteConfig.siteName ? ' - ' + siteConfig.siteName : ''}`
    })
}

/**
 * 设置浏览器标题-只能在路由加载完成后调用
 * @param webTitle 新的标题
 */
export function setTitle(webTitle: string) {
    const title = useTitle()
    const siteConfig = useSiteConfig()
    title.value = `${webTitle}${siteConfig.siteName ? ' - ' + siteConfig.siteName : ''}`
}

/**
 * 是否是外部链接
 * @param path
 */
export function isExternal(path: string): boolean {
    return /^(https?|ftp|mailto|tel):/.test(path)
}

/**
 * 防抖
 * @param fn 执行函数
 * @param ms 间隔毫秒数
 */
export const debounce = (fn: Function, ms: number) => {
    return (...args: any[]) => {
        if (window.lazy) {
            clearTimeout(window.lazy)
        }
        window.lazy = setTimeout(() => {
            fn(...args)
        }, ms)
    }
}

/**
 * 根据pk字段的值从数组中获取key
 * @param arr
 * @param pk
 * @param value
 */
export const getArrayKey = (arr: any, pk: string, value: string): any => {
    for (const key in arr) {
        if (arr[key][pk] == value) {
            return key
        }
    }
    return false
}

/**
 * 表单重置
 * @param formEl
 */
export const onResetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
    if (!formEl) return
    formEl.resetFields && formEl.resetFields()
}

/**
 * 将数据构建为ElTree的data {label:'', children: []}
 * @param data
 */
export const buildJsonToElTreeData = (data: any): ElTreeData[] => {
    if (typeof data == 'object') {
        const childrens = []
        for (const key in data) {
            childrens.push({
                label: key + ': ' + data[key],
                children: buildJsonToElTreeData(data[key]),
            })
        }
        return childrens
    } else {
        return []
    }
}

/**
 * 是否在后台应用内
 * @param path 不传递则通过当前路由 path 检查
 */
export const isAdminApp = (path = '') => {
    if (path) {
        return /^\/admin/.test(path)
    }
    if (/^\/admin/.test(router.currentRoute.value.fullPath) || window.location.hash.indexOf('#/admin') === 0) {
        return true
    }
    return false
}

/**
 * 是否为手机设备
 */
export const isMobile = () => {
    return !!navigator.userAgent.match(
        /android|webos|ip(hone|ad|od)|opera (mini|mobi|tablet)|iemobile|windows.+(phone|touch)|mobile|fennec|kindle (Fire)|Silk|maemo|blackberry|playbook|bb10\; (touch|kbd)|Symbian(OS)|Ubuntu Touch/i
    )
}

/**
 * 从一个文件路径中获取文件名
 * @param path 文件路径
 */
export const getFileNameFromPath = (path: string) => {
    const paths = path.split('/')
    return paths[paths.length - 1]
}

/**
 * 页面按钮鉴权
 * @param name
 */
export const auth = (name: string) => {
    const navTabs = useNavTabs()
    if (navTabs.state.authNode.has(router.currentRoute.value.path)) {
        if (navTabs.state.authNode.get(router.currentRoute.value.path)!.some((v: string) => v == router.currentRoute.value.path + '/' + name)) {
            return true
        }
    }
    return false
}

/**
 * 获取资源完整地址
 * @param relativeUrl 资源相对地址
 * @param domain 指定域名
 */
export const fullUrl = (relativeUrl: string, domain = '') => {
    const siteConfig = useSiteConfig()
    if (!domain) {
        domain = siteConfig.cdnUrl ? siteConfig.cdnUrl : getUrl()
    }
    if (!relativeUrl) return domain

    const regUrl = new RegExp(/^http(s)?:\/\//)
    const regexImg = new RegExp(/^((?:[a-z]+:)?\/\/|data:image\/)(.*)/i)
    if (!domain || regUrl.test(relativeUrl) || regexImg.test(relativeUrl)) {
        return relativeUrl
    }
    return domain + relativeUrl
}

/**
 * 文件类型效验，主要用于云存储
 * 服务端并不能单纯此函数来限制文件上传
 * @param {string} fileName 文件名
 * @param {string} fileType 文件mimetype，不一定存在
 */
export const checkFileMimetype = (fileName: string, fileType: string) => {
    if (!fileName) return false
    const siteConfig = useSiteConfig()
    const mimetype = siteConfig.upload.mimetype.toLowerCase().split(',')

    const fileSuffix = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
    if (siteConfig.upload.mimetype === '*' || mimetype.includes(fileSuffix) || mimetype.includes('.' + fileSuffix)) {
        return true
    }
    if (fileType) {
        const fileTypeTemp = fileType.toLowerCase().split('/')
        if (mimetype.includes(fileTypeTemp[0] + '/*') || mimetype.includes(fileType)) {
            return true
        }
    }
    return false
}

/**
 * 获取一组资源的完整地址
 * @param relativeUrls 资源相对地址
 * @param domain 指定域名
 */
export const arrayFullUrl = (relativeUrls: string | string[], domain = '') => {
    if (typeof relativeUrls === 'string') {
        relativeUrls = relativeUrls == '' ? [] : relativeUrls.split(',')
    }
    for (const key in relativeUrls) {
        relativeUrls[key] = fullUrl(relativeUrls[key], domain)
    }
    return relativeUrls
}

/**
 * 根据当前时间生成问候语
 */
export const getGreet = () => {
    const now = new Date()
    const hour = now.getHours()
    let greet = ''
    if (hour < 5) {
        greet = '夜深了，注意身体哦！'
    } else if (hour < 9) {
        greet = '早上好！'
    } else if (hour < 12) {
        greet = '上午好！'
    } else if (hour < 14) {
        greet = '中午好！'
    } else if (hour < 18) {
        greet = '下午好！'
    } else if (hour < 24) {
        greet = '晚上好！'
    } else {
        greet = '您好！'
    }
    greet = greet + '欢迎回来！'
    return greet
}

/**
 * 生成一个控制器的：增、删、改、查、排序的操作url
 */
export class baTableApi {
    private controllerUrl
    public actionUrl

    constructor(controllerUrl: string) {
        this.controllerUrl = controllerUrl
        this.actionUrl = new Map([
            ['index', controllerUrl + 'index'],
            ['add', controllerUrl + 'add'],
            ['edit', controllerUrl + 'edit'],
            ['del', controllerUrl + 'del'],
            ['sortable', controllerUrl + 'sortable'],
        ])
    }

    index(filter: anyObj = {}): ApiPromise<TableDefaultData> {
        return createAxios({
            url: this.actionUrl.get('index'),
            method: 'get',
            params: filter,
        }) as ApiPromise
    }

    edit(params: anyObj) {
        return createAxios({
            url: this.actionUrl.get('edit'),
            method: 'get',
            params: params,
        })
    }

    del(ids: string[]) {
        return createAxios(
            {
                url: this.actionUrl.get('del'),
                method: 'DELETE',
                params: {
                    ids: ids,
                },
            },
            {
                showSuccessMessage: true,
            }
        )
    }

    postData(action: string, data: anyObj) {
        if (!this.actionUrl.has(action)) {
            throw new Error('action does not exist')
        }
        return createAxios(
            {
                url: this.actionUrl.get(action),
                method: 'post',
                data: data,
            },
            {
                showSuccessMessage: true,
            }
        )
    }

    sortableApi(id: number, targetId: number) {
        return createAxios({
            url: this.actionUrl.get('sortable'),
            method: 'post',
            data: {
                id: id,
                targetId: targetId,
            },
        })
    }
}
