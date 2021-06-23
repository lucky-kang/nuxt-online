const apis = {
	prod: {
		advertiserId: "22530",
		apiUrl: "https://api.frissonlife.com",
		pubKey: 'pk_live_SGDoMznP1fxV7PeUdfXfAmkM00bR2iXeKb'//stripe支付线上的key
	},
	test: {
		advertiserId: "22530",
		apiUrl: "https://beta-api.frissonlife.com",
		pubKey: 'pk_test_a6sZa6KHAT8MtDGVoiWWWD8r0013bSWpsa'//stripe支付测试的key
	},
	dev: {
		advertiserId: "22530",
		apiUrl: "https://beta-api.frissonlife.com",
		pubKey: 'pk_test_a6sZa6KHAT8MtDGVoiWWWD8r0013bSWpsa'//stripe支付测试的key
	}
};

export default apis;
