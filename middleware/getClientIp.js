import common from "~/utils/common";
const requestIP = require("request-ip");

const getcookiesInServer = function (req) {
	let service_cookie = {};
	req &&
		req.headers.cookie &&
		req.headers.cookie.split(";").forEach(function (val) {
			let parts = val.split("=");
			service_cookie[parts[0].trim()] = (parts[1] || "").trim();
		});
	return service_cookie;
};
export default async function (context) {
	let { store, req, app, res } = context;
	let ip;
	let initReq = async function () {
		const initData = await app.$apis.getSettingsInit(null, { 'client-ip': ip });
		console.log(initData, 'initData')
		if (initData.status == 1) {
			let {
				currency,
				country,
				guest_token,
				current_country,
				current_currency,
				payments_config,
			} = initData.data.item;
			let obj = {};
			for (const key in country) {
				let { name, full_name } = country[key];
				obj[name] = {
					country: full_name
				};
			}
			let current_country_name;
			switch (current_country) {
				case "GB":
					current_country_name = "United Kingdom (UK)";
					break;
				case "US":
					current_country_name = "United States (US)";
					break;
				case "FR":
					current_country_name = "France";
					break;
				case "DE":
					current_country_name = "Germany";
					break;
				default:
					break;
			}
			let currencyObj = {};
			for (const key in currency) {
				let { name } = currency[key];
				currencyObj[name] = {
					country: name
				};
			}
			let initDataObj = JSON.stringify({
				countryName: current_country_name,
				countryKey: current_country,
				currency: current_currency,
				countryArr: obj,
				currencyObj,
				uuid: common.generateUUID(),
				ip,
				guest_token,
				stripeKey: payments_config.stripe.client_key
			});
			await store.dispatch(
				"actInitDataObj",
				initDataObj
			);
			let { getCurrencyArr } = store.getters;
			let currency_symbol = getCurrencyArr[current_currency].Symbol;
			await store.dispatch("actCountryArr", obj);
			await store.dispatch("actCurrencyObj", currencyObj);
			await store.dispatch("actCurrency", current_currency);
			await store.dispatch("actCurrencySymbol", currency_symbol);
			await store.dispatch("actCountry", {
				key: current_country,
				name: current_country_name
			});
			await store.dispatch("actUserHostIp", {
				"client-ip": ip,
				"guest-token": guest_token,
				"client-host": req.headers.host,
				"device-id": common.generateUUID()
			});
			// let d = new Date();
			// d.setTime(d.getTime() + 2 * 60 * 1000);
			// let expires = d.toUTCString();
			res.setHeader("Set-Cookie", ["initDataObj=" + initDataObj + "; Path=/"]);
		}
	};
	if (process.server) {
		console.log('server')
		let clientIp = requestIP.getClientIp(req);
		ip = clientIp.split(",")[0];
		ip = clientIp.split(":").slice(-1)[0];
		//获取国家和币种
		if (
			getcookiesInServer(req) &&
			!getcookiesInServer(req).initDataObj
		) {
			console.log('没有init默认值')
			await initReq();
		} else {
			console.log('有init默认值')
			let { initDataObj } = getcookiesInServer(req);
			store.dispatch(
				"actInitDataObj",
				initDataObj
			);
			let obj = JSON.parse(initDataObj);
			let { countryName, countryKey, currency, countryArr, currencyObj, uuid, ip, guest_token, stripeKey } = obj;
			if(!guest_token || !countryName || !countryKey || !currency || !countryArr || !currencyObj || !uuid || !ip || !stripeKey){
				await initReq();
				return;
			}
			console.log('************+++++++')
			let { getCurrencyArr } = store.getters;
			let currencySymbol = getCurrencyArr[currency].Symbol;
			console.log(currencySymbol, 'currencySymbol')
			store.dispatch(
				"actCurrency",
				currency
			);
			store.dispatch(
				"actCurrencySymbol",
				currencySymbol
			);
			store.dispatch("actCountry", {
				key: countryKey,
				name: countryName
			});
			store.dispatch("actCountryArr", countryArr);
			store.dispatch("actCurrencyObj", currencyObj);
			store.dispatch("actUserHostIp", {
				"client-ip": ip,
				"guest-token": guest_token,
				"client-host": req.headers.host,
				"device-id": uuid
			});
		}
	}
	//通过路由切换即是在client端,vuex中store状态保持不变
}