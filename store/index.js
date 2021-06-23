export const state = function (state) {
	return {
		locales: ['en', 'es', 'fr', 'de', 'it', 'vi'],
		locale: 'en',
		navArray: [],
		currency: "",
		currencySymbol: "",
		currencyArr: {
			EUR: { Symbol: "€", country: "EU" },
			MXN: { Symbol: "$", country: "MX" },
			USD: { Symbol: "$", country: "US" },
			GBP: { Symbol: "£", country: "GB" },
			VND: { Symbol: "₫", country: "VN" },
		},
		currencyObj: {},
		countryArr: {},
		loginToken: "",
		userId: "",
		email: '',
		userInfo: null,
		apiHeader: {
			// token: "",
			currency: "",
			country: "",
			language: "",
			"guest-token": "",
			"device-id": "",
			"client-ip": "",
			"client-host": "",
			"app-id": 60
		},
		countryObj: null, // 币种国家对象在一起
		country: "",
		cartNum: 0, //添加到购物车的数量
		cartsShop: [], //添加到购物车的数据
		loginDialogVisible: false,  //
		cartDialogVisible: false,//购物车侧边栏
		newUserDialogVisible: true, //New to Foroo
		historySearches: [],//搜索历史记录
		womenClothing: {}, //首页Women's Clothing专区数据
		DealsWeekData: [],//DealsWeek
		TrendingNowData: [],//TrendingNow
		initDataObj: '',
		guestDialogVisible: false,//游客弹框
		combination: ''
	};
};

export const getters = {
	//实时监听state值的变化(最新状态)
	getNavArray(state) {
		//承载变化的showFooter的值
		return state.navArray;
	},
	getCurrencySymbol(state) {
		return state.currencySymbol;
	},
	getLoginToken(state) {
		return state.loginToken;
	},
	getCurrency(state) {
		return state.currency;
	},
	getUserId(state) {
		return state.userId;
	},
	getEmail(state) {
		return state.email;
	},
	getUserInfo(state) {
		return state.userInfo;
	},
	getApiHeader(state) {
		return state.apiHeader;
	},
	getCountryObj(state) {
		return state.countryObj;
	},
	getCountry(state) {
		return state.country;
	},
	getCartNum(state) {
		return state.cartNum;
	},
	getCartShop(state) {
		return state.cartsShop;
	},
	getCurrencyArr(state) {
		return state.currencyArr;
	},
	getCurrencyObj(state) {
		return state.currencyObj;
	},
	getCountryArr(state) {
		return state.countryArr;
	},
	getLoginDialogVisible(state) {
		return state.loginDialogVisible;
	},
	getCartDialogVisible(state) {
		return state.cartDialogVisible;
	},
	getNewUserDialogVisible(state) {
		return state.newUserDialogVisible;
	},
	getGuestDialogVisible(state) {
		return state.guestDialogVisible;
	},
	getHistorySearches(state) {
		return state.historySearches;
	},
	getWomenClothing(state) {
		return state.womenClothing;
	},
	getDealsWeekData(state) {
		return state.DealsWeekData;
	},
	getTrendingNowData(state) {
		return state.TrendingNowData;
	},
	getUserHostIp(state) {
		return state.apiHeader;
	},
	getInitDataObj(state) {
		return state.initDataObj;
	},
	getCombination(state) {
		return state.combination;
	},
};
export const mutations = {
	setNavArray(state, value) {
		//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
		state.navArray = value;
	},
	setCurrencySymbol(state, value) {
		state.currencySymbol = value;
	},
	setLoginToken(state, value) {
		state.loginToken = value;
		if (value && !state.apiHeader.token) {
			state.apiHeader['token'] = value;
		} else {
			state.apiHeader['token'] = value;
			delete state.apiHeader.token;
		}
	},
	setUserHostIp(state, value) {
		state.apiHeader = {
			...state.apiHeader,
			...value
		};
	},
	setCurrency(state, value) {
		state.currency = value;
		state.apiHeader.currency = value;
	},
	setUserId(state, value) {
		state.userId = value;
	},
	setEmail(state, value) {
		state.email = value;
	},
	setUserInfo(state, value) {
		state.userInfo = value;
	},
	setApiHeader(state, value) {
		state.apiHeader = value;
	},
	setCountryObj(state, value) {
		state.countryObj = value;
	},
	//多语言跟着国家切换
	setCountry(state, value) {
		state.country = value.name;
		state.apiHeader.country = value.key;
		let language;
		switch (value.key) {
			case 'GB':
				language = 'en';
				break;
			case 'US':
				language = 'en';
				break;
			// case 'FR':
			// 	language = 'fr';
			// 	break;
			// case 'DE':
			// 	language = 'de';
			// 	break;
			default:
				language = 'en';
				break;
		}
		if (state.locales.includes(language)) {
			state.locale = language;
			state.apiHeader.language = language;
		}
	},
	//保存购物车数量
	setCartNum(state, value) {
		// localStorage.setItem('cartNum',value)
		state.cartNum = value;
	},
	//保存添加到购物车的商品信息
	setCartShop(state, value) {
		// localStorage.setItem('cartsShop',JSON.stringify(value))
		state.cartsShop = value;
	},
	setCurrencyArr(state, value) {
		state.currencyArr = value;
	},
	setCurrencyObj(state, value) {
		state.currencyObj = value;
	},
	setCountryArr(state, value) {
		state.countryArr = value;
	},
	setLoginDialogVisible(state, value) {
		state.loginDialogVisible = value;
	},
	setCartDialogVisible(state, value) {
		state.cartDialogVisible = value;
	},
	setNewUserDialogVisible(state, value) {
		state.newUserDialogVisible = value;
	},
	setGuestDialogVisible(state, value) {
		state.guestDialogVisible = value;
	},
	setHistorySearches(state, value) {
		state.historySearches = value;
	},
	setWomenClothing(state, value) {
		state.womenClothing = value;
	},
	setDealsWeekData(state, value) {
		state.DealsWeekData = value;
	},
	setTrendingNowData(state, value) {
		state.TrendingNowData = value;
	},
	setInitDataObj(state, value) {
		state.initDataObj = value;
	},
	setCombination(state, value) {
		state.combination = value;
	},
};
export const actions = {
	actNavArray(context, value) {
		//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
		context.commit("setNavArray", value);
	},
	actCurrencySymbol(context, value) {
		context.commit("setCurrencySymbol", value);
	},
	actLoginToken(context, value) {
		context.commit("setLoginToken", value);
	},
	actUserHostIp(context, value) {
		context.commit("setUserHostIp", value);
	},
	actCurrency(context, value) {
		context.commit("setCurrency", value);
	},
	actUserId(context, value) {
		context.commit("setUserId", value);
	},
	actEmail(context, value) {
		context.commit("setEmail", value);
	},
	actUserInfo(context, value) {
		context.commit("setUserInfo", value);
	},
	actApiHeader(context, value) {
		context.commit("setApiHeader", value);
	},
	actCountryObj(context, value) {
		context.commit("setCountryObj", value);
	},
	actCountry(context, value) {
		context.commit("setCountry", value);
	},
	actCurrencyArr(context, value) {
		context.commit("setCurrencyArr", value);
	},
	actCurrencyObj(context, value) {
		context.commit("setCurrencyObj", value);
	},
	actCountryArr(context, value) {
		context.commit("setCountryArr", value);
	},
	actCartNum(context, value) {
		context.commit("setCartNum", value);
	},
	actCartShop(context, value) {
		context.commit("setCartShop", value);
	},
	loginDialogVisible(context, value) {
		context.commit("setLoginDialogVisible", value);
	},
	cartDialogVisible(context, value) {
		context.commit("setCartDialogVisible", value);
	},
	newUserDialogVisible(context, value) {
		context.commit("setNewUserDialogVisible", value);
	},
	actGuestDialogVisible(context, value) {
		context.commit("setGuestDialogVisible", value);
	},
	actHistorySearches(context, value) {
		context.commit("setHistorySearches", value);
	},
	actWomenClothing(context, value) {
		context.commit("setWomenClothing", value);
	},
	actDealsWeekData(context, value) {
		context.commit("setDealsWeekData", value);
	},
	actTrendingNowData(context, value) {
		context.commit("setTrendingNowData", value);
	},
	actInitDataObj(context, value) {
		context.commit("setInitDataObj", value);
	},
	actCombination(context, value) {
		context.commit("setCombination", value);
	}
};
