//服务端中间件针对product页面整体缓存
const LRU = require('lru-cache');
let cachePage = new LRU({
    max: 100, // 缓存队列长度
    maxAge: 1000 * 60 // 缓存1分钟
})
export default function ({req, res}) {
    //判断首次进入页面非server端渲染则不执行cache缓存
    console.log(!process.server,'process.server')
    if (!process.server) {
        // let {pathname,origin,search} = window.location;
        // console.log(window,'window.location.reload',this)
        // window.location.replace('/');
        // if(pathname == '/'){
        //     replace(origin+pathname+search);
        //     console.log(origin+pathname+search,'origin+pathname+search')
        //     return;
        // }
        // if(pathname == '/product'){
        //     replace(origin+pathname+search);
        //     return;
        // }
        // if(pathname == '/categories'){
        //     replace(origin+pathname+search);
        //     return;
        // }
        return;
    }
    let url = req._parsedOriginalUrl;
    let pathname = url.pathname;
    // 通过路由判断，只有product页才进行缓存
    if (pathname.includes('/product')) {
        const existsHtml = cachePage.get('productData');
        if (existsHtml) {
            return res.end(existsHtml.html, 'utf-8');
        } else {
            res.original_end = res.end;
            // 重写res.end
            res.end = function (data) {
                if (res.statusCode === 200) {
                    // 设置缓存
                    cachePage.set('productData', { html: data });
                }
                // 最终返回结果
                res.original_end(data, 'utf-8');
            }
        }
        return;
    }
    // if (pathname.includes('/categories')) {
    //     console.log('categories')
    //     const existsHtml = cachePage.get('categoriesData');
    //     if (existsHtml) {
    //         return res.end(existsHtml.html, 'utf-8');
    //     } else {
    //         res.original_end = res.end;
    //         // 重写res.end
    //         res.end = function (data) {
    //             if (res.statusCode === 200) {
    //                 // 设置缓存
    //                 cachePage.set('categoriesData', { html: data });
    //             }
    //             // 最终返回结果
    //             res.original_end(data, 'utf-8');
    //         }
    //     }
    //     return;
    // }
}