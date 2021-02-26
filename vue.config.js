const PATH = require("path");
const autoprefixer = require('autoprefixer')

function resolve(dir) {
  return PATH.join(__dirname, ".", dir);
}
module.exports = {
  publicPath: process.env.VUE_APP_publicPath,
  outputDir: process.env.VUE_APP_outputDir,
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
      postcss: {
        plugins: [autoprefixer],
      },
    },
  },
  pluginOptions: {
    moment: {
      locales: ["zh-cn", "en"],
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        PATH.resolve(__dirname, 'src/assets/css/_variables.scss')
      ]
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
    config.entry("main").add("babel-polyfill"); // main是入口js文件
  },
  // devServer: {
  //   https: false,
  //   overlay: {
  //     warnings: false,
  //     errors: false,
  //   },
  //   proxy: {
  //     "/api": {
  //       target: process.env.VUE_APP_ApiUrl, // 需要请求的地址
  //       changeOrigin: true, // 是否跨域
  //       ws: true,  
  //       pathRewrite: {
  //         "^/api": "",
  //       },
  //     },
  //   },
  // }
}