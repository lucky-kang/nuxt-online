import apiGroup from "~/api";
import jsCookie from "@/utils/js-cookie";

export default function (
	{ route, query, $axios, error, env, params, isDev, store, redirect },
	inject
) {
	$axios.setBaseURL(env.APIURL);

	$axios.onRequest((config) => {
		for (let key in store.state.apiHeader) {
			if(config.url != '/v1/settings/init'){
				config.headers[key] = store.state.apiHeader[key];
			}else{
				config.headers['app-id'] = 60;
			}
		}
		//以header头传给后端做实时准确统计广告来源数据
		if(route.query){
			for (const t in route.query) {
				if (route.query.hasOwnProperty(t)) {
					const item = route.query[t];
					if(t == 'utm_source' || t == 'utm_medium' || t == 'utm_campaign'){
						config.headers[t.replace(/_/, '-')] = item;
						jsCookie.set(t.replace(/_/, '-'), item, {
							expires: 7,
							path: "/"
						});
					}
				}
			}
		}
		//若通过广告分享则缓存UTM参数
		if (jsCookie.get("utm-source") || jsCookie.get("utm-medium") || jsCookie.get("utm-campaign")) {
			config.headers['utm-source'] = jsCookie.get("utm-source");
			config.headers['utm-medium'] = jsCookie.get("utm-medium");
			config.headers['utm-campaign'] = jsCookie.get("utm-campaign");
		}
		return config;
	});

	$axios.onResponse((response) => {
		let { data } = response;
		if (data.status == 5000) {
			redirect('/login')
		}
		//token无效或登录过期
		if (data.status == 16005) {
			jsCookie.remove("loginToken");
			jsCookie.remove("userId");
			store.dispatch("actLoginToken", "");
			store.dispatch("actUserId", "");
			store.dispatch("actUserInfo", null);
			store.dispatch("actCartNum", 0);
			redirect('/login')
		}
		return data;
	});
	$axios.onError((err) => {
		console.error(err);
		if (process.client) return Promise.reject(err);
		return error({
			message: err,
			statusCode: 500
		});
	});

	const apis = apiGroup({
		route,
		store,
		query,
		params,
		$axios,
		error,
		env,
		isDev
	});

	inject("apis", apis);
}
