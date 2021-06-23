import Vue from "vue";

import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
	preLoad: 1,
	error: require("~/static/images/default@3x.png"),
	loading: require("~/static/images/default@3x.png"),
	attempt: 1,
	// the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
	// listenEvents: ["scroll",'wheel', 'mousewheel',]
});
