import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { UserConfig, ConfigEnv, ProxyOptions } from 'vite'
import { loadEnv } from '/@/utils/vite'
import { svgBuilder } from '/@/components/icon/svg/index'

const pathResolve = (dir: string): any => {
    return resolve(__dirname, '.', dir)
}

// https://vitejs.cn/config/
const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
    const { VITE_PORT, VITE_OPEN, VITE_BASE_PATH, VITE_OUT_DIR, VITE_PROXY_URL } = loadEnv(mode)

    const alias: Record<string, string> = {
        '/@': pathResolve('./src/'),
        assets: pathResolve('./src/assets'),
    }

    let proxy: Record<string, string | ProxyOptions> = {}
    if (VITE_PROXY_URL) {
        proxy = {
            '/': {
                target: VITE_PROXY_URL,
                changeOrigin: true,
            },
        }
    }

    return {
        plugins: [vue(), svgBuilder('./src/assets/icons/')],
        root: process.cwd(),
        resolve: { alias },
        base: VITE_BASE_PATH,
        server: {
            host: '0.0.0.0',
            port: VITE_PORT,
            open: VITE_OPEN,
            proxy: proxy,
        },
        build: {
            cssCodeSplit: false,
            sourcemap: false,
            outDir: VITE_OUT_DIR,
            emptyOutDir: true,
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    manualChunks: {
                        // 分包配置，配置完成自动按需加载
                        vue: ['vue', 'vue-router', 'pinia', 'vue-i18n', 'element-plus'],
                        echarts: ['echarts'],
                    },
                },
            },
        },
        css: {
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove()
                                }
                            },
                        },
                    },
                ],
            },
        },
    }
}

export default viteConfig

// export default defineConfig({
//   // 共享选项 —— start

//   // 项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
//   // 类型： string
//   // 默认： process.cwd()
//   root: process.cwd(),

//   // 开发或生产环境服务的公共基础路径。合法的值包括以下几种：
//   // 绝对 URL 路径名，例如 /foo/
//   // 完整的 URL，例如 https://foo.com/
//   // 空字符串或 ./（用于嵌入形式的开发）
//   // 类型： string
//   // 默认： /
//   base: '/',

//   // 在配置中指明将会把 serve 和 build 时的模式 都 覆盖掉。也可以通过命令行 --mode 选项来重写。
//   // 类型： string
//   // 默认： 'development' 用于开发，'production' 用于构建
//   // mode: 'development',

//   // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
//   // 类型： Record<string, any>
//   // define: {},

//   // 需要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化（flatten）。查看 插件 API 获取 Vite 插件的更多细节。
//   // 类型： (Plugin | Plugin[] | Promise<Plugin | Plugin[]>)[]
//   plugins: [vue()],

//   // 作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录，并且始终按原样提供或复制而无需进行转换。
//   // 该值可以是文件系统的绝对路径，也可以是相对于项目根目录的相对路径。将 publicDir 设定为 false 可以关闭此项功能。
//   // 类型： string | false
//   // 默认： "public"
//   publicDir: 'public',

//   // 存储缓存文件的目录。此目录下会存储预打包的依赖项或 vite 生成的某些缓存文件，使用缓存可以提高性能。
//   // 如需重新生成缓存文件，你可以使用 --force 命令行选项或手动删除目录。此选项的值可以是文件的绝对路径，也可以是以项目根目录为基准的相对路径。
//   // 当没有检测到 package.json 时，则默认为 .vite。
//   // 类型： string
//   // 默认： "node_modules/.vite"
//   cacheDir: 'node_modules/.vite',

//   resolve: {
//     // 将会被传递到 @rollup/plugin-alias 作为 entries 的选项。也可以是一个对象，或一个 { find, replacement, customResolver } 的数组。
//     // 当使用文件系统路径的别名时，请始终使用绝对路径。相对路径的别名值会原封不动地被使用，因此无法被正常解析。
//     // 类型：Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>
//     // alias: {},

//     // 如果你在你的应用程序中有相同依赖的副本（比如 monorepos），请使用此选项强制 Vite 始终将列出的依赖项解析为同一副本（从项目根目录）。
//     // 类型： string[]
//     // dedupe: [],

//     // 解决程序包中 情景导出 时的其他允许条件。
//     // 类型： string[]
//     // conditions: [],

//     // package.json 中，在解析包的入口点时尝试的字段列表。
//     // 注意：这比从 exports 字段解析的情景导出优先级低：如果一个入口点从 exports 成功解析，resolve.mainFields 将被忽略。
//     // 类型： string[]
//     // 默认： ['module', 'jsnext:main', 'jsnext']
//     mainFields: ['module', 'jsnext:main', 'jsnext'],

//     // 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
//     // 类型： string[]
//     // 默认： ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
//     extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],

//     // 启用此选项会使 Vite 通过原始文件路径（即不跟随符号链接的路径）而不是真正的文件路径（即跟随符号链接后的路径）确定文件身份。
//     // 类型： boolean
//     // 默认： false
//     preserveSymlinks: false,
//   },

//   css: {
//     // 配置 CSS modules 的行为。
//     // 类型： false | CSSModulesOptions
//     // modules: false,

//     // 内联的 PostCSS 配置（格式同 postcss.config.js），或者一个（默认基于项目根目录的）自定义的 PostCSS 配置路径。
//     // 对内联的 POSTCSS 配置，它期望接收与 postcss.config.js 一致的格式。但对于 plugins 属性有些特别，只接收使用 数组格式。
//     // 搜索是使用 postcss-load-config 完成的，只有被支持的文件名才会被加载。注意：如果提供了该内联配置，Vite 将不会搜索其他 PostCSS 配置源。
//     // 类型： string | (postcss.ProcessOptions & { plugins?: postcss.AcceptedPlugin[] })
//     // postcss: {},

//     // 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键
//     // 类型： Record<string, object>
//     // preprocessorOptions: {},

//     // 在开发过程中是否启用 sourcemap。
//     // 实验性
//     // 类型： boolean
//     // 默认： false
//     devSourcemap: false,
//   },

//   json: {
//     // 是否支持从 .json 文件中进行按名导入。
//     // 类型： boolean
//     // 默认： true
//     namedExports: true,

//     // 若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...")，这样会比转译成对象字面量性能更好，尤其是当 JSON 文件较大的时候。
//     // 开启此项，则会禁用按名导入。
//     // 类型： boolean
//     // 默认： false
//     stringify: false,
//   },

//   // ESBuildOptions 继承自 esbuild 转换选项。默认情况下，esbuild 会被应用在 ts、jsx、tsx 文件。
//   // 你可以通过 esbuild.include 和 esbuild.exclude 对要处理的文件类型进行配置，这两个配置的值可以是一个正则表达式、一个 picomatch 模式，或是一个值为这两种类型的数组。
//   // 设置为 false 来禁用 esbuild 转换。
//   // 类型： ESBuildOptions | false
//   // esbuild: false,

//   // 指定额外的 picomatch 模式 作为静态资源处理
//   // 当从 HTML 引用它们或直接通过 fetch 或 XHR 请求它们时，它们将被插件转换管道排除在外。
//   // 从 JavaScript 导入它们将返回解析后的 URL 字符串（如果你设置了 enforce: 'pre' 插件来处理不同的资产类型，这可能会被覆盖）。
//   // 类型： string | RegExp | (string | RegExp)[]
//   // assetsInclude: [],

//   // 调整控制台输出的级别，默认为 'info'。
//   // 类型： 'info' | 'warn' | 'error' | 'silent'
//   logLevel: 'info',

//   // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下可以通过 --clearScreen false 设置。
//   // 类型： boolean
//   // 默认： true
//   clearScreen: true,

//   // 用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
//   // 类型： string
//   // 默认： root
//   envDir: 'root',

//   // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
//   // 类型： string | string[]
//   // 默认： VITE_
//   // 安全注意事项：envPrefix 不应被设置为空字符串 ''，这将暴露你所有的环境变量，导致敏感信息的意外泄漏。 检测到配置为 '' 时 Vite 将会抛出错误.
//   envPrefix: 'VITE_',

//   // 无论你的应用是一个单页应用（SPA）还是一个 多页应用（MPA），亦或是一个定制化应用（SSR 和自定义 HTML 处理的框架）：
//   // 'spa'：包含 HTML 中间件以及使用 SPA 回退。在预览中将 sirv 配置为 single: true
//   // 'mpa'：包含 HTML 中间件
//   // 'custom'：不包含 HTML 中间件
//   // 类型： 'spa' | 'mpa' | 'custom'
//   // 默认： 'spa'
//   appType: 'spa',

//   // 共享选项 —— end

//   // 服务器选项
//   server: {
//     // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
//     // 类型： string | boolean
//     // 默认： 'localhost'
//     host: 'localhost',

//     // 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。
//     // 类型： number
//     // 默认值： 5173
//     port: 8080,

//     // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
//     // 类型： boolean
//     strictPort: true,

//     // 启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS。这个值也可以是一个传递给 https.createServer() 的 选项对象。
//     // 需要一个合法可用的证书。对基本使用的配置需求来说，你可以添加 @vitejs/plugin-basic-ssl 到项目插件中，它会自动创建和缓存一个自签名的证书。但我们推荐你创建和使用你自己的证书。
//     // 类型： boolean | https.ServerOptions
//     https: false,

//     // 开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名。
//     // 类型： boolean | string
//     open: true,

//     // 为开发服务器配置自定义代理规则。期望接收一个 { key: options } 对象。
//     // 任何请求路径以 key 值开头的请求将被代理到对应的目标。如果 key 值以 ^ 开头，将被识别为 RegExp。configure 选项可用于访问 proxy 实例。
//     // 请注意，如果使用了非相对的 基础路径 base，则必须在每个 key 值前加上该 base。
//     // 类型： Record<string, string | ProxyOptions>
//     // proxy: {},

//     // 为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。
//     // 类型： boolean | CorsOptions
//     cors: true,

//     // 指定服务器响应的 header。
//     // 类型： OutgoingHttpHeaders
//     // headers: {},

//     // 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽。
//     // 类型： boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean, clientPort?: number, server?: Server }
//     // hmr:

//     // 传递给 chokidar 的文件系统监听器选项。Vite 服务器默认会忽略对 .git/ 和 node_modules/ 目录的监听。如果你需要对 node_modules/ 内的包进行监听
//     // 类型： object
//     // watch:

//     // 以中间件模式创建 Vite 服务器。（不含 HTTP 服务器）
//     // 'ssr' 将禁用 Vite 自身的 HTML 服务逻辑，因此你应该手动为 index.html 提供服务。
//     //  将启用 Vite 自身的 HTML 服务逻辑。
//     // 类型： 'ssr' | 'html'
//     // middlewareMode: ,

//     // 在 HTTP 请求中预留此文件夹，用于代理 Vite 作为子文件夹时使用。应该以 / 字符开始。
//     // 类型： string | undefined
//     // base: ,

//     fs: {
//       // 限制为工作区 root 路径以外的文件的访问。
//       // 类型： boolean
//       // 默认： true (自 Vite 2.7 起默认启用)
//       strict: true,

//       // 限制哪些文件可以通过 /@fs/ 路径提供服务。当 server.fs.strict 设置为 true 时，访问这个目录列表外的文件将会返回 403 结果。
//       // 类型： string[]
//       // allow: [],

//       // 用于限制 Vite 开发服务器提供敏感文件的黑名单。这会比 server.fs.allow 选项的优先级更高。同时还支持 picomatch patterns。
//       // 类型： string[]
//       // 默认： ['.env', '.env.*', '*.{crt,pem}']
//       deny: ['.env', '.env.*', '*.{crt,pem}'],
//     },

//     // 用于定义开发调试阶段生成资产的 origin。
//     // 类型： string
//     // origin: '',
//   },

//   // 构建选项
//   build: {
//     // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值：'modules'，这是指 支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。
//     // Vite 将替换 modules 为 ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
//     // 类型： string | string[]
//     // 默认： 'modules'
//     target: 'modules',

//     // 默认情况下，一个 模块预加载 polyfill 会被自动注入。该 polyfill 会自动注入到每个 index.html 入口的的代理模块中。
//     // 类型： boolean | { polyfill?: boolean, resolveDependencies?: ResolveModulePreloadDependenciesFn }
//     // 默认值： { polyfill: true }
//     modulePreload: { polyfill: true },

//     // 指定输出路径（相对于 项目根目录).
//     // 类型： string
//     // 默认： dist
//     outDir: 'dist',

//     // 指定生成静态资源的存放路径（相对于 build.outDir）。
//     // 类型： string
//     // 默认： assets
//     assetsDir: 'assets',

//     // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
//     // 类型： number
//     // 默认： 4096 (4kb)
//     // 注意：如果你指定了 build.lib，那么 build.assetsInlineLimit 将被忽略，无论文件大小或是否为 Git LFS 占位符，资源都会被内联。
//     assetsInlineLimit: 4096,

//     // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
//     // 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
//     // 注意：如果指定了 build.lib，build.cssCodeSplit 会默认为 false。
//     // 类型： boolean
//     // 默认： true
//     cssCodeSplit: true,

//     // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标。
//     // 类型： string | string[]
//     // 默认值： 与 build.target 一致
//     cssTarget: 'modules',

//     // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
//     // 如果为 'inline'，source map 将作为一个 data URI 附加在输出文件中。
//     // 'hidden' 的工作原理与 'true' 相似，只是 bundle 文件中相应的注释将不被保留。
//     // 类型： boolean | 'inline' | 'hidden'
//     // 默认： false
//     sourcemap: false,

//     // 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。
//     // 类型： RollupOptions
//     // rollupOptions: {},

//     // 传递给 @rollup/plugin-commonjs 插件的选项。
//     // 类型： RollupCommonJSOptions
//     // commonjsOptions: {},

//     // 传递给 @rollup/plugin-dynamic-import-vars 的选项。
//     // 类型： RollupDynamicImportVarsOptions
//     // dynamicImportVarsOptions: {},

//     // 构建为库。entry 是必需的，因为库不能使用 HTML 作为入口。name 则是暴露的全局变量，并且在 formats 包含 'umd' 或 'iife' 时是必需的。
//     // 默认 formats 是 ['es', 'umd']，如果使用了多个配置入口，则是 ['es', 'cjs']。
//     // fileName 是输出的包文件名，默认 fileName 是 package.json 的 name 选项，同时，它还可以被定义为参数为 format 和 entryAlias 的函数。
//     // 类型： { entry: string | string[] | { [entryAlias: string]: string },
//     // name?: string, formats?: ('es' | 'cjs' | 'umd' | 'iife')[],
//     // fileName?: string | ((format: ModuleFormat, entryName: string) => string) }
//     // lib: {},

//     // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 过的资源文件名和 hash 后版本的映射。
//     // 可以为一些服务器框架渲染时提供正确的资源引入链接。当该值为一个字符串时，它将作为 manifest 文件的名字。
//     // 类型： boolean | string
//     // 默认： false
//     manifest: false,

//     // 当设置为 true 时，构建也将生成 SSR 的 manifest 文件，以确定生产中的样式链接与资产预加载指令。当该值为一个字符串时，它将作为 manifest 文件的名字。
//     // 类型： boolean | string
//     // 默认值： false
//     ssrManifest: false,

//     // 生成面向 SSR 的构建。此选项的值可以是字符串，用于直接定义 SSR 的入口，也可以为 true，但这需要通过设置 rollupOptions.input 来指定 SSR 的入口。
//     // 类型： boolean | string
//     // 默认值： false
//     ssr: false,

//     // 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。Benchmarks
//     // 注意，在 lib 模式下使用 'es' 时，build.minify 选项不会缩减空格，因为会移除掉 pure 标注，导致破坏 tree-shaking。
//     // 当设置为 'terser' 时必须先安装 Terser。 npm add -D terser
//     // 类型： boolean | 'terser' | 'esbuild'
//     // 默认： 'esbuild'
//     minify: 'esbuild',

//     // 传递给 Terser 的更多 minify 选项。
//     // 类型： TerserOptions
//     // terserOptions: {},

//     // 设置为 false 来禁用将构建后的文件写入磁盘。这常用于 编程式地调用 build() 在写入磁盘之前，需要对构建后的文件进行进一步处理。
//     // 类型： boolean
//     // 默认： true
//     write: true,

//     // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。若 outDir 在根目录之外则会抛出一个警告避免意外删除掉重要的文件。
//     // 可以设置该选项来关闭这个警告。该功能也可以通过命令行参数 --emptyOutDir 来使用。
//     // 类型： boolean
//     // 默认： 若 outDir 在 root 目录下，则为 true
//     emptyOutDir: true,

//     // 默认情况下，Vite 会在构建阶段将 publicDir 目录中的所有文件复制到 outDir 目录中。可以通过设置该选项为 false 来禁用该行为。
//     // 类型： boolean
//     // 默认： true
//     copyPublicDir: true,

//     // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
//     // 类型： boolean
//     // 默认： true
//     reportCompressedSize: true,

//     // 规定触发警告的 chunk 大小。（以 kbs 为单位）
//     // 类型： number
//     // 默认： 500
//     chunkSizeWarningLimit: 500,

//     // 设置为 {} 则会启用 rollup 的监听器。对于只在构建阶段或者集成流程使用的插件很常用。
//     // 类型： WatcherOptions| null
//     // 默认： null
//     watch: null,
//   },

//   // 预览选项
//   preview: {
//     // 为开发服务器指定 ip 地址。 设置为 0.0.0.0 或 true 会监听所有地址，包括局域网和公共地址。
//     // 类型： string | boolean
//     // 默认： server.host
//     host: 'localhost',

//     // 指定开发服务器端口。注意，如果设置的端口已被使用，Vite 将自动尝试下一个可用端口，所以这可能不是最终监听的服务器端口。
//     // 类型： number
//     // 默认： 4173
//     port: 8080,

//     // 设置为 true 时，如果端口已被使用，则直接退出，而不会再进行后续端口的尝试。
//     // 类型： boolean
//     // 默认： server.strictPort
//     strictPort: true,

//     // 启用 TLS + HTTP/2。注意，只有在与 server.proxy 选项 同时使用时，才会降级为 TLS。该值也可以传递给 https.createServer() 的 options 对象。
//     // 类型： boolean | https.ServerOptions
//     // 默认： server.https
//     https: false,

//     // 开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名。
//     // 如果你想在你喜欢的某个浏览器打开该开发服务器，你可以设置环境变量 process.env.BROWSER （例如 firefox）。
//     // 类型： boolean | string
//     // 默认： server.open
//     open: true,

//     // 为开发服务器配置 CORS。此功能默认启用并支持任何来源。可传递一个 options 对象 来进行配置，或者传递 false 来禁用此行为。
//     // 类型： boolean | CorsOptions
//     // 默认： server.cors
//     cors: true,

//     // 指明服务器返回的响应头。
//     // 类型： OutgoingHttpHeaders
//     // headers: {},
//   },

//   // 依赖优化选项
//   optimizeDeps: {
//     // 默认情况下，Vite 会抓取你的 index.html 来检测需要预构建的依赖项（忽略了node_modules、build.outDir、__tests__ 和 coverage）。
//     // 如果指定了 build.rollupOptions.input，Vite 将转而去抓取这些入口点。
//     // string | string[]
//     entries: [],

//     // 在预构建中强制排除的依赖项。
//     // 类型： string[]
//     exclude: [],

//     // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
//     // 类型： string[]
//     include: [],

//     // 在部署扫描和优化过程中传递给 esbuild 的选项。
//     // 类型： EsbuildBuildOptions
//     esbuildOptions: {},

//     // 设置为 true 可以强制依赖预构建，而忽略之前已经缓存过的、已经优化过的依赖。
//     // 类型： boolean
//     force: false,
//   },

//   // SSR 选项
//   ssr: {
//     // 列出的是要为 SSR 强制外部化的依赖。
//     // 类型: string[]
//     external: [],

//     // 列出的是防止被 SSR 外部化依赖项。如果设为 true，将没有依赖被外部化。
//     // 类型： string | RegExp | (string | RegExp)[] | true
//     noExternal: true,

//     // SSR 服务器的构建目标。
//     // 类型： 'node' | 'webworker'
//     // 默认： node
//     target: 'node',

//     // SSR 服务器的构建语法格式。从 Vite v3 开始，SSR 构建默认生成 ESM 格式。设置为 'cjs' 可以构建为 CJS 格式，但不推荐这样做。
//     // 这个选项被标记为实验性的，以便给用户更多时间更新到 ESM。CJS 构建需要复杂的外部化启发式，但在 ESM 格式中则不需要。
//     // 实验性
//     // 类型： 'esm' | 'cjs'
//     // 默认： esm
//     format: 'esm',
//   },

//   // Worker 选项
//   worker: {
//     // worker 打包时的输出类型。
//     // 类型： 'es' | 'iife'
//     // 默认： iife
//     format: 'iife',

//     // 应用于 worker 打包的 Vite 插件。
//     // 注意 config.plugins 仅会在开发（dev）阶段应用于 worker，若要配置在构建（build）阶段应用于 worker 的插件则应该在本选项这里配置。
//     // 类型： (Plugin | Plugin[])[]
//     plugins: [],

//     // 用于打包 worker 的 Rollup 配置项。
//     // 类型： RollupOptions
//     rollupOptions: {},
//   }
// })
