import bodyParser from "body-parser";
import apiConfig from './apiConfig'
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

console.log(process.env.NODE_MODE)
export default {
	mode: "universal",
	performance: {
		prefetch: false
	},
	env: {
		APIURL: apiConfig[process.env.NODE_MODE].apiUrl,
		NODE_MODE: process.env.NODE_MODE,
		PUB_KEY: apiConfig[process.env.NODE_MODE].pubKey,//stripe支付key公共配置
		AD_ID: apiConfig[process.env.NODE_MODE].advertiserId,//awin广告商ID
	},
	target: "server",
	server: {
		port: process.env.PORT || 3001, // default: 3001
		host: process.env.HOST || 'localhost' // default: localhost,
	},
	router: {
		middleware: ["auth", "getClientIp", "device"]
	},
	head: {
		title: "Frisson | You deserve a better life",
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content:
					"Frisson gathers together the very best in everything you need with free express shipping."
			}
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	css: ["assets/style/normalize.scss", "assets/page-transletion.css", "assets/font/font.css"],

	plugins: [
		"~/plugins/axios",
		"~/plugins/element-ui",
		"~/plugins/i18n.js",
		"~/plugins/vue-lazyload.js",
		{
			src: "~/plugins/custom.js"
		},
		{
			src: "~/plugins/vue-swiper.js",
			mode: "client"
		}
	],

	components: true,
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		// "@nuxtjs/eslint-module",
		"@nuxtjs/style-resources"
	],
	modules: [
		[
			"@nuxtjs/axios",
			{
				retry: {
					retries: 3
				}
			}
		]
	],
	styleResources: {
		scss: "~/globalStyle/app.scss"
	},
	/*
	 ** Build configuration
	 ** See https://nuxtjs.org/api/configuration-build/
	 */
	build: {
		// analyze: true,
		//splitChunks: 設定 Chunks的最大和最小size,优化vendor.js、styles.js、commons.js单个体积大的被拆分成n个体积小的文件
		// webpack4.x 用于提取公共代码
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: { name: 'common', chunks: 'initial', maxInitialRequests: 5, minSize: 0, reuseExistingChunk: true },
					styles: { name: 'styles', test: /\.(css|vue)$/, chunks: 'all', enforce: true },
					vendors: { name: 'vendor', test: /[\\/]node_modules[\\/]/, minSize: 10000, maxSize: 250000, chunks: 'initial', priority: 10, enforce: true }
				}
			}
		},
		//对于第三方js库的优化，分离打包
		externals: {
			vue: 'Vue',
			vuex: 'Vuex',
			'vue-router': 'VueRouter',
			axios: 'axios',
			'element-ui': 'ELEMENT',
			'vue-awesome-swiper': 'vueAwesomeSwiper'
		},
		// 为 JS 和 Vue 文件设定自定义的 babel 配置。
		babel: {
			plugins: [
				[
					'component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
				]
			]
		},
		extractCSS: true,
		// extend(config, ctx) {
		// 	config.plugins.push(
		// 		new VuetifyLoaderPlugin()
		// 	)
		// },
		publicPath: "/_nuxt/",
		postcss: {
			plugins: {
				"postcss-import": {}, // 能够使用import语法 @import "cssrecipes-defaults";
				"postcss-cssnext": {}, //PostCSS-cssnext是一个PostCSS插件，可以帮助您使用最新的CSS语法。 它将CSS规范转换为更兼容的CSS，因此您不需要等待浏览器支持。
				cssnano: {}
			},
			preset: {
				autoprefixer: {
					grid: true
				}
			}
		},
		transpile: [/^element-ui/]
	},
	serverMiddleware: [bodyParser.json()],
	loading: false
};
