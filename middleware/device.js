// @ts-nocheck
import { deviceType } from "~/utils/deviceType";
export default function (context) {
    let { route, redirect } = context;
    let { name, query, fullPath } = route;
    let url = '';
    if(process.env.NODE_MODE == 'test'){
        url = 'https://beta-m.frissonlife.com';
    }else if(process.env.NODE_MODE == 'prod'){
        url = 'https://m.frissonlife.com';
    }else{
        url = 'https://beta-m.frissonlife.com';
    }
    console.log(url,'url')
    context.userAgent = process.server
        ? context.req.headers["user-agent"]
        : navigator.userAgent;
    // 给全局上下文添加一个属性来保存我们返回的匹配信息
    context.deviceType = deviceType(context.userAgent);
    // 若是判断UA非移动端的,就在这里做处理了
    // 若是内部访问可以直接用router对象push
    if (context.deviceType.type !== "pc") {
        console.log(name, '手機')
        if (name == 'activitys-page') {
            redirect(302,`${url}/activeModule?id=${query.id}`);
            return;
        }
        if (name == 'categories-id') {
            if(query.search == undefined){
                // console.log('無search')
                redirect(302,`${url}/shopList?id=${query.category}&name=${query.navName}`);
            }else{
                // console.log('有search')
                let path = fullPath.split('?')[1];
                redirect(302,`${url}/search?${path}`);
            }
            return;
        }
        if (
            name == 'contact' || 
            name == 'index' || 
            name == 'footPage-page' || 
            name == 'product-id' || 
            name == 'orderTracking' || 
            name == 'retrievePassword' ||
            name == 'confirm_register' ||
            name == 'cart'
        ) {
            redirect(302, `${url}${fullPath}`);
            return;
        }
        //忘记密码M站是登录页的下拉蒙版非路由页
        if (name == 'forgotPassword') {
            redirect(302,`${url}/login?forgotPwShow=1`);
            return;
        }
        if (name == 'login') {
            redirect(302,`${url}/`);
            return;
        }
    }
}