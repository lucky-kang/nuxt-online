// const BASE_API = process.env.BASE_API;
// https://beta-api.foroo.co.uk/api/v1/sessions/:user_id
export default ({ route, query, store, $axios, params }) => {
	return {
		//获取所有分类
		getAllCategories(params, headerObj) {
			return $axios({
				url: `/v1/products/categories`,
				method: "get",
				data: params
			});
		},
		// 获取顶部导航栏
		getLayout(params, headerObj) {
			return $axios({
				url: `/v1/settings/layout`,
				method: "get",
				data: params
			});
		},
		//猜你喜欢
		mayLikeShop(params) {
			return $axios({
				url: `/v1/products`,
				method: "post",
				data: params
			});
		},
		//推荐商品
		recommendShop(params) {
			return $axios({
				url: `/v1/products`,
				method: 'post',
				data: params
			})
		},
		//商品列表
		getShopList(params) {
			console.log(params, 'params');
			return $axios({
				url: `/v1/products`,
				method: "post",
				data: params
			});
		},
		//获取活动模板页Tag下商品列表
		// getTagShopList(params, headerObj) {
		// 	return $axios({
		// 		url: `/v1/products`,
		// 		method: 'post',
		// 		headers: headerObj || {},
		// 		params
		// 	})
		// },
		//商品详情
		getShopDetail(params, headerObj) {
			return $axios({
				url: `/v1/products/v1.2/${params.id}`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//添加购物车
		addCart(params, headerObj) {
			return $axios({
				url: `/v1/carts`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//批量添加购物车
		batchAddCart(params) {
			return $axios({
				url: `/v1/carts/batch_create`,
				method: "post",
				data: params
			});
		},
		//获取商详页里商品的评论
		getReviews(params, headerObj) {
			return $axios({
				url:
					`/v1/products/comment` +
					"?product_id=" +
					params.product_id +
					"&page=" +
					params.page +
					"&per_page=" +
					params.per_page,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//评论
		addReviews(params) {
			return $axios({
				url: `/v1/products/create_comment`,
				method: "post",
				data: params
			});
		},
		//登录
		login(params, headerObj) {
			return $axios({
				url: `/v1/sessions`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//退出登录
		logOut(params, headerObj) {
			return $axios({
				url: `/v1/sessions/` + params.user_id,
				method: "DELETE",
				// headers: headerObj || {},
				data: params
			});
		},
		//第三方登录
		otherLogin(params, headerObj) {
			let parameter = '?'
			for (let key in params) {
				parameter += key + '=' + params[key] + '&';
			}
			return $axios({
				url: `/v1/sessions/social`,
				method: 'post',
				headers: headerObj || {},
				data: params
			})
		},
		//注册
		register(params, headerObj) {
			return $axios({
				url: `/v1/users`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//发送找回密码邮件
		lostPassword(params) {
			return $axios({
				url: `v1/users/verify_codes`,
				method: "get",
				params
			});
		},
		//验证邮件连接中的token是否有效
		verifyCodes(params) {
			return $axios({
				url: `v1/users/verify_codes`,
				method: "post",
				params
			});
		},
		//重置密码
		resetPassword(params) {
			return $axios({
				url: `/v1/users/lost_password`,
				method: "post",
				params
			});
		},
		//获取用户信息
		getUsetInfo(params, headerObj) {
			return $axios({
				url: `/v1/users/${params.user_id}`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//获取购物车信息
		getCart(params, headerObj) {
			return $axios({
				url: `/v1/carts`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		// 获取购物车商品规格属性
		getCartVariations(params, headerObj) {
			return $axios({
				url: `/v1/products/${params.product_id}/variations`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		// 改变购物车商品规格属性
		changeCart(params, headerObj) {
			return $axios({
				url: `carts/${params.cart_id}`,
				method: "put",
				// headers: headerObj || {},
				data: params
			});
		},
		//获取用户默认地址
		addressDefault(params, headerObj) {
			return $axios({
				url: `/v1/addresses/default`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//批量删除购物车里的商品
		delCartShop(params, headerObj) {
			return $axios({
				url:
					`/v1/carts/batch_delete` +
					"?method=delete&cart_ids=" +
					params.cart_ids,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//操作购物车商品的数量
		changeShopNum(params, headerObj) {
			return $axios({
				url: `/v1/carts/${params.cart_id}`,
				method: "put",
				// headers: headerObj || {},
				data: params
			});
		},
		//检查清算购物车第一步
		checkoutStepOne(params, headerObj) {
			return $axios({
				url: `/v1/carts/checkout`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//发起支付
		checkoutPay(params, headerObj) {
			return $axios({
				url: `/v1/payments`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//支付确认
		payConfirm(params, headerObj) {
			return $axios({
				url: `/v1/payments/confirm`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//订单操作日志
		orderLog(params, headerObj) {
			return $axios({
				url: `/v1/orders/order_log`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//获取checking中的carts
		checking(params, headerObj) {
			return $axios({
				url: `/v1/carts/checking`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//商详页购买
		buyNow(params, headerObj) {
			return $axios({
				url: `/v1/carts/buy_now`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//订单列表
		orderList(params, headerObj) {
			return $axios({
				url:
					`/v1/orders` +
					"?page=" +
					params.page +
					"&per_page=" +
					params.per_page +
					"&type=" +
					params.type,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//订单详情
		orderDetail(params, headerObj) {
			let str = params.email ? `?email=${params.email}` : '';
			return $axios({
				url: `/v1/orders/order/${params.id}` + str,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//取消订单
		clearOrder(params, headerObj) {
			return $axios({
				url: `/v1/orders/order_cancel`,
				method: "put",
				// headers: headerObj || {},
				data: params
			});
		},
		//确认收货
		receiptOrder(params, headerObj){
			return $axios({
				url: `/v1/orders/order_receipt`,
				method: "put",
				// headers: headerObj || {},
				data: params
			});
		},
		//取消订单原因
		cancelOrderReasons(params, headerObj) {
			return $axios({
				url: `/v1/settings/cancel_order_reasons`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//获取地址列表
		getAddressList(params, headerObj) {
			return $axios({
				url: `/v1/addresses`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//获取用户的地址
		getAddressItem(params, headerObj) {
			return $axios({
				url: `/v1/addresses/${params.id}`,
				method: "get",
				// headers: headerObj || {},
				data: params
			});
		},
		//添加地址
		addAddress(params, headerObj) {
			return $axios({
				url: `/v1/addresses`,
				method: "post",
				// headers: headerObj || {},
				data: params
			});
		},
		//更新地址
		setAddress(params, id, headerObj) {
			// console.log(params);
			return $axios({
				url: `/v1/addresses/${id}`,
				method: "put",
				// headers: headerObj || {},
				data: params
			});
		},
		//获取活动模板页的页面数据
		getActivities(params) {
			return $axios({
				url: `/v1/activitys/get_activity`,
				method: "get",
				params
			});
		},
		//领取优惠券
		receiveCoupon(params,userId) {
			return $axios({
				url: `/v1/users/${userId}/coupons`,
				method: 'post',
				data: params
			})
		},
		//热搜
		getHotSearchKeywords(params) {
			return $axios({
				url: `/v1/products/hot_search_keywords`,
				method: 'get',
				data: params
			})
		},
		//获取国家/州
		getCountry(params) {
			return $axios({
				url: `/v1/settings/address`,
				method: 'get',
				data: params
			})
		},
		//初始化获取币种和国家和当前国家、币种的信息
		getSettingsInit(params,headerObj) {
			return $axios({
				url: `/v1/settings/init`,
				method: 'get',
				data: params,
				headers: headerObj || {}
			})
		},
		//本周最佳交易
		getDealsWeek(params) {
			return $axios({
				url: `/v1/products`,
				method: 'post',
				data: params
			})
		},
		//新人领券弹框
		newUserCoupon(params) {
			return $axios({
				url: `/v1/activitys/popup`,
				method: 'get',
				data: params
			})
		},
		//结账页获取领取的优惠券
		getCartCoupon(params) {
			return $axios({
				url: `/v1/carts/checking/coupons`,
				method: 'get',
				params
			})
		},
		//结账页使用优惠券
		applyCoupon(params) {
			return $axios({
				url: `/v1/carts/checking/apply_coupon`,
				method: 'post',
				data: params
			})
		},
		//结账页取消使用优惠券
		removeCoupon(params) {
			return $axios({
				url: `/v1/carts/checking/remove_coupon`,
				method: 'post',
				data: params
			})
		},
		//结账页使用优惠券码
		applyCouponCode(params) {
			return $axios({
				url: `/v1/carts/checking/apply_coupon_code`,
				method: 'post',
				data: params
			})
		},
		//结账页使用积分
		applyPoints(params) {
			return $axios({
				url: `/v1/carts/checking/apply_point`,
				method: 'post',
				data: params
			})
		},
		//结账页移除积分
		removePoints(params) {
			return $axios({
				url: `/v1/carts/checking/remove_point`,
				method: 'post',
				data: params
			})
		},
		//提现的数据
		withdraws(params, headerObj) {
			return $axios({
				url: `/v1/users/invite_withdraws`,
				method: 'get',
				// headers:headerObj || {},
				data: params
			})
		},
		//拼团的商品
		recommendShopId(params) {
			return $axios({
				url: `/v1/products/${params.id}/recommend` + '?page=' + params.page + '&per_page=' + params.per_pag,
				method: 'get',
				data: params
			})
		},
		//拼团详情
		groupDetail(params) {
			return $axios({
				url: `/v1/groups/${params.group_id}`,
				method: 'get',
				data: params
			})
		},
		//活动模板页领取优惠券
		getCoupon(params,user_id) {
			return $axios({
				url: `/v1/users/${user_id}/coupons`,
				method: 'get',
				params
			})
		},
		//邮箱验证
		seekEmail(params) {
			return $axios({
				url: `/v1/users/emails`,
				method: 'get',
				params
			})
		},
		//提交邮箱验证
		submitSeekEmail(params) {
			return $axios({
				url: `/v1/users/emails`,
				method: 'post',
				params
			})
		},
		//生成邀请短链
		firebaseLink(params){
			return $axios({
			  url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDAosMZMS0s_cMzyqaatIRhwg-SYVrKCtQ`,
			  method: 'post',
			  contentType: 'application/json',
				"Access-Control-Allow-Origin": "*",
			  data: params,
			})
		},
		//人机校验
		manMachineVerification(params){
			return $axios({
			  url: `/v1/users/robots`,
			  method: 'post',
			  data: params,
			})
		},
		//查看邮件订单页建议
		suggest(params){
			return $axios({
				url: `/v1/suggest`,
				method: 'post',
				data: params
			})
		},
		//用户收藏/取消收藏
		favorite(params){
			return $axios({
				url: `/v1/users/favorites`,
				method: 'put',
				data: params
			})
		},
		//收藏列表
		getFavoritesList(params,user_id){
			return $axios({
				url: `/v1/users/${user_id}/favorites`,
				method: 'get',
				params
			})
		}
	};
};
