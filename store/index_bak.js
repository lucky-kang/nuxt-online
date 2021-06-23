export const actions = {
	nuxtServerInit(store, { req, query, params, route }) {
        console.log(11111)
		// const userAgent = process.server
		// 	? req.headers["user-agent"]
		// 	: navigator.userAgent;
		// const SITEQUERY = process.server ? query : route.query;

		// const CLIENT_TYPE = client(userAgent || "");
		// // console.log(this)
		// store.commit("global/GETUSERSTATE", {
		// 	userClient: CLIENT_TYPE,
		// 	siteQuery: SITEQUERY
		// });
		// store.commit('global/GETURLPARAMS', route.query)
	}
};
