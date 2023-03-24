import { RouteRecordRaw } from 'vue-router'

const pageTitle = (name: string): string => {
    return `${name} - 卢杰晟个人博客`
}

/*
 * 静态路由
 */
const staticRoutes: Array<RouteRecordRaw> = [
    {
        // 首页
        path: '/',
        name: '/',
        component: () => import('/@/views/frontend/index.vue'),
        meta: {
            title: pageTitle('首页'),
        },
    },
    {
        // 管理员登录页
        path: '/admin/login',
        name: 'adminLogin',
        component: () => import('/@/views/backend/login.vue'),
        meta: {
            title: pageTitle('登录'),
        },
    },
    {
        path: '/:path(.*)*',
        redirect: '/404',
    },
    {
        // 404
        path: '/404',
        name: 'notFound',
        component: () => import('/@/views/common/error/404.vue'),
        meta: {
            title: pageTitle('页面找不到了'),
        },
    },
    {
        // 后台找不到页面了-可能是路由未加载上
        path: '/admin:path(.*)*',
        redirect: (to) => {
            return {
                name: 'adminMainLoading',
                params: {
                    to: JSON.stringify({
                        path: to.path,
                        query: to.query,
                    }),
                },
            }
        },
    },
    {
        // 无权限访问
        path: '/401',
        name: 'noPower',
        component: () => import('/@/views/common/error/404.vue'),
        meta: {
            title: pageTitle('无访问权限'),
        },
    },
]

/*
 * 后台基础静态路由
 */
const adminBaseRoute: RouteRecordRaw = {
    path: '/admin',
    name: 'admin',
    component: () => import('/@/layouts/backend/index.vue'),
    redirect: '/admin/loading',
    meta: {
        title: pageTitle('后台'),
    },
    children: [
        {
            path: 'loading/:to?',
            name: 'adminMainLoading',
            component: () => import('/@/layouts/common/components/loading.vue'),
            meta: {
                title: pageTitle('Loading'),
            },
        },
    ],
}

staticRoutes.push(adminBaseRoute)

export { staticRoutes, adminBaseRoute }
