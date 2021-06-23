import Vue from "vue";
import loading from "@/components/loading";
import vfilter from "~/utils/filters";
import common from '~/utils/common';
import buryingPoint from '~/utils/buryingPoint';
import bus from "~/utils/bus"

for (let key in vfilter) {
	Vue.filter(key, vfilter[key]);
}
Vue.prototype.$bus = bus;
Vue.component(loading);
Vue.prototype.common = common;
Vue.prototype.buryingPoint = buryingPoint;
