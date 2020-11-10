
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     */
    // 基本路径
    // vue2.0的本地配置和打包配置是分开的，3.0是合并的，所以要加上三元判断
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/dist',
    // 输出文件目录
    outputDir: 'dist',
    assetsDir: '',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: config => {
        // config.resolve.alias
        //     .set('@', resolve('src'))
        //     .set('@style', resolve('src/assets/style'))
        //     .set('@img', resolve('src/assets/img'))
        //     .set('@components', resolve('src/components'))
    },
configureWebpack: config => {
    config.optimization = {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vue: {
                    name: 'vue',
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    priority: -10
                },
                vuex: {
                    name: 'vuex',
                    test: /[\\/]node_modules[\\/]vuex[\\/]/,
                    priority: -10
                },
                'vue-router': {
                    name: 'vue-router',
                    test: /[\\/]node_modules[\\/]vue-router[\\/]/,
                    priority: -10
                },
                'element-ui': {
                    name: 'element-ui',
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    priority: -10
                },
                'vendors': {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -20
                }
            }
        }
    }
},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 4000, // 打开项目的端口号
        https: false,
        hotOnly: false,
        proxy: {
            // 接口代理配置
        },
        before: app => {}
    }
}

// 如果想修改打包文件夹名字，修改两处地方
// publicPath: process.env.NODE_ENV === 'development' ? '/' : '/xx',
// outputDir: 'xx',

// module.exports = {
//     publicPath: '/',
//     filenameHashing: true,
//     productionSourceMap: process.env.NODE_ENV !== 'production',
//     devServer: {
//         port: 8077
//     },
//     chainWebpack: config => {
//         config.resolve.symlinks(true)
//         if (process.env.VUE_APP_TYPE === 'analyze') {
//             config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
//                 {
//                     analyzerMode: "static"
//                 }
//             ])
//         }
//     },
//     pages: {
//         index: {
//             entry: 'src/main.ts',
//             template: 'public/index.html',
//             filename: 'index.html',
//             title: 'sass-admin',
//             chunks: ['vendors', 'vue', 'vuex', 'vue-router', 'element-ui', 'index']
//         }
//     }
// }