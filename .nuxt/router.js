import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _04f2805f = () => interopDefault(import('..\\pages\\becomeAnAffiliate.vue' /* webpackChunkName: "pages/becomeAnAffiliate" */))
const _2863000a = () => interopDefault(import('..\\pages\\cart.vue' /* webpackChunkName: "pages/cart" */))
const _20e32821 = () => interopDefault(import('..\\pages\\checkoutDetail.vue' /* webpackChunkName: "pages/checkoutDetail" */))
const _71ce5704 = () => interopDefault(import('..\\pages\\checkoutThree.vue' /* webpackChunkName: "pages/checkoutThree" */))
const _43b9c7a8 = () => interopDefault(import('..\\pages\\checkoutTwo.vue' /* webpackChunkName: "pages/checkoutTwo" */))
const _4a15ca2c = () => interopDefault(import('..\\pages\\confirm_register.vue' /* webpackChunkName: "pages/confirm_register" */))
const _4d006b26 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _b4593370 = () => interopDefault(import('..\\pages\\forgotPassword.vue' /* webpackChunkName: "pages/forgotPassword" */))
const _6d7f8f96 = () => interopDefault(import('..\\pages\\group_deal.vue' /* webpackChunkName: "pages/group_deal" */))
const _7370ad6f = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _8d41e3aa = () => interopDefault(import('..\\pages\\orderTracking.vue' /* webpackChunkName: "pages/orderTracking" */))
const _83d51fb2 = () => interopDefault(import('..\\pages\\registeredSuccess.vue' /* webpackChunkName: "pages/registeredSuccess" */))
const _7f318d3e = () => interopDefault(import('..\\pages\\retrievePassword.vue' /* webpackChunkName: "pages/retrievePassword" */))
const _17ebb742 = () => interopDefault(import('..\\pages\\share_invitation2.vue' /* webpackChunkName: "pages/share_invitation2" */))
const _18733e20 = () => interopDefault(import('..\\pages\\product\\initData.js' /* webpackChunkName: "pages/product/initData" */))
const _abf22de2 = () => interopDefault(import('..\\pages\\user\\address.vue' /* webpackChunkName: "pages/user/address" */))
const _0a49924a = () => interopDefault(import('..\\pages\\user\\coupon.vue' /* webpackChunkName: "pages/user/coupon" */))
const _6320dc29 = () => interopDefault(import('..\\pages\\user\\order.vue' /* webpackChunkName: "pages/user/order" */))
const _fb29e14c = () => interopDefault(import('..\\pages\\user\\orderDetail.vue' /* webpackChunkName: "pages/user/orderDetail" */))
const _7bf13dda = () => interopDefault(import('..\\pages\\user\\wishList.vue' /* webpackChunkName: "pages/user/wishList" */))
const _02368732 = () => interopDefault(import('..\\pages\\activities\\_page.vue' /* webpackChunkName: "pages/activities/_page" */))
const _1d6deba4 = () => interopDefault(import('..\\pages\\categories\\_id.vue' /* webpackChunkName: "pages/categories/_id" */))
const _3194e1b7 = () => interopDefault(import('..\\pages\\footPage\\_page.vue' /* webpackChunkName: "pages/footPage/_page" */))
const _57fafc15 = () => interopDefault(import('..\\pages\\product\\_id.vue' /* webpackChunkName: "pages/product/_id" */))
const _ac6deb50 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/becomeAnAffiliate",
    component: _04f2805f,
    name: "becomeAnAffiliate"
  }, {
    path: "/cart",
    component: _2863000a,
    name: "cart"
  }, {
    path: "/checkoutDetail",
    component: _20e32821,
    name: "checkoutDetail"
  }, {
    path: "/checkoutThree",
    component: _71ce5704,
    name: "checkoutThree"
  }, {
    path: "/checkoutTwo",
    component: _43b9c7a8,
    name: "checkoutTwo"
  }, {
    path: "/confirm_register",
    component: _4a15ca2c,
    name: "confirm_register"
  }, {
    path: "/contact",
    component: _4d006b26,
    name: "contact"
  }, {
    path: "/forgotPassword",
    component: _b4593370,
    name: "forgotPassword"
  }, {
    path: "/group_deal",
    component: _6d7f8f96,
    name: "group_deal"
  }, {
    path: "/login",
    component: _7370ad6f,
    name: "login"
  }, {
    path: "/orderTracking",
    component: _8d41e3aa,
    name: "orderTracking"
  }, {
    path: "/registeredSuccess",
    component: _83d51fb2,
    name: "registeredSuccess"
  }, {
    path: "/retrievePassword",
    component: _7f318d3e,
    name: "retrievePassword"
  }, {
    path: "/share_invitation2",
    component: _17ebb742,
    name: "share_invitation2"
  }, {
    path: "/product/initData",
    component: _18733e20,
    name: "product-initData"
  }, {
    path: "/user/address",
    component: _abf22de2,
    name: "user-address"
  }, {
    path: "/user/coupon",
    component: _0a49924a,
    name: "user-coupon"
  }, {
    path: "/user/order",
    component: _6320dc29,
    name: "user-order"
  }, {
    path: "/user/orderDetail",
    component: _fb29e14c,
    name: "user-orderDetail"
  }, {
    path: "/user/wishList",
    component: _7bf13dda,
    name: "user-wishList"
  }, {
    path: "/activities/:page?",
    component: _02368732,
    name: "activities-page"
  }, {
    path: "/categories/:id?",
    component: _1d6deba4,
    name: "categories-id"
  }, {
    path: "/footPage/:page?",
    component: _3194e1b7,
    name: "footPage-page"
  }, {
    path: "/product/:id?",
    component: _57fafc15,
    name: "product-id"
  }, {
    path: "/",
    component: _ac6deb50,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
