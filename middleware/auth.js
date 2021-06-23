let whiteList = [
	"login",
	"index",
	"categories-id",
	"product-id",
	"footPage-page",
	"cart",
	"contact",
	"orderTracking",
	"forgotPassword",
	"retrievePassword",
	"activitys-page",
  "share_invitation2",
  "group_deal",
  "confirm_register"
].map((item) => item.toUpperCase());


const getcookiesInServer = function(req) {
	let service_cookie = {};
	req &&
		req.headers.cookie &&
		req.headers.cookie.split(";").forEach(function(val) {
			let parts = val.split("=");
			service_cookie[parts[0].trim()] = (parts[1] || "").trim();
		});
	return service_cookie;
};
export default async function({ req, store, error, redirect, route }) {
	if (process.server) {
		if (getcookiesInServer(req).loginToken) {
			await store.dispatch(
				"actLoginToken",
				getcookiesInServer(req).loginToken
			);
		}
	
		if (getcookiesInServer(req).userId) {
			await store.dispatch(
				"actUserId",
				getcookiesInServer(req).userId
			);
		}
	
		if (getcookiesInServer(req).email) {
			await store.dispatch(
				"actEmail",
				getcookiesInServer(req).email
			);
		}
		console.log(route,'route.name')
		// if (
		// 	!store.state.loginToken && 
		// 	whiteList.indexOf(route.name ? route.name.toUpperCase() : null) <= -1
		// ) {
		// 	if(!!getcookiesInServer(req).guest){
		// 		await store.dispatch(
		// 			"actGuestDialogVisible",
		// 			true
		// 		);
		// 		return;
		// 	}
		// 	redirect("/login");
		// }
	}
}
