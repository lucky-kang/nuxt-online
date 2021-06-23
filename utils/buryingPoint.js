const buryingPoint = {
  //衡量商品详情获得的浏览
  viewContent(productId, productName) {
    console.log(productId, '商品浏览', productName);
    fbq('track', 'ViewContent', {
      content_ids: [productId],
      content_type: 'product',    // 写死 product
      contents: [{
        'id': productId,
        'quantity': '1'
      }],
    });
    gtag('event', 'view_item', {
      event_label: 'pc_view_product',
      items: [
        {
          id: productId,
          name: productName,
        }
      ]
    });
    //<!-- Pinterest Tag -->
    pintrk('track', 'pagevisit');
  },
  //加入心愿单事件
  addToWishList(id, currency, value, items, goods_name, quantity, categoryName) {
    fbq('track', 'AddToWishlist', {
      content_name: goods_name,
      content_category: categoryName,
      content_ids: [id],
      contents: [{
        'id': id,
        'quantity': quantity
      }],
      currency,
      value,
    });
  },
  //加入购物车
  addToCart(id, currency, value, items, goods_name, quantity) {
    // fbq('track', 'AddToCart', {
    //   'content_ids': id,
    //   'content_type': 'add_to_cart',
    //   'currency': currency,
    //   'value': value
    // });
    fbq('track', 'AddToCart', {
      content_ids: [id],
      content_name: goods_name,
      currency,
      value,// 商品单价，多规格取 min_sale_price
      content_type: 'product',// 写死 product
      contents: [{
        'id': id,
        'quantity': quantity
      }],
    });
    gtag('event', 'add_to_cart', {
      event_label: 'pc_add_to_cart',
      currency,
      items,
      value
    })
    pintrk('track', 'addtocart', {
      value,
      order_quantity: items[0].quantity,
      currency
    });
  },
  //捆绑加购
  combinationAddToCart(id, currency, value, items, sku) {
    fbq('track', 'AddToCart', {
      'content_ids': id,
      'content_type': 'add_to_cart',
      'currency': currency,
      'value': value
    });
    gtag('event', 'add_to_cart', {
      event_label: 'pc_combination_add_to_cart',
      currency,
      items,
      value
    });
    gtag('event', 'bundlePurchase', {
      "Value": sku,
    })
  },
  //捆绑加购
  bundlePurchase(sku, objs) {
    fbq('trackCustom', 'bundlePurchase', {
      'sku_id': sku
    });
    gtag('event', 'bundlePurchase', {
      "Value": sku,
    })
    console.log(objs)
    // event_label
    gtag('event', 'add_to_cart', {
      event_label: 'pc_combination_add_to_cart',
      value: objs.value,
      currency: objs.currency,
      items: objs.items
    });
  },
  // 访客点击“buy now”按钮。
  BuyNow(id, shopType, currency, value, shopName) {
    fbq('trackCustom', 'BuyNow', {
      'ProductId': id
    });
    fbq('track', 'AddToCart', {
      'content_ids': id,
      'content_type': shopType,
      'currency': currency,
      'value': value
    });
    gtag('event', 'BuyNow', {
      event_label: 'pc_buy_now',
      currency,
      items: [{
        id: id,
        name: shopName,
      }],
      value
    })
  },
  //准备支付，checkout 第二步，生成订单之后调用
  initiateCheckout(value, currency, num_items, content_ids, contents) {
    fbq('track', 'InitiateCheckout',
      {
        value,    // 数量 * 单价 + 数量 * 单价
        currency,
        num_items,// "contents 里面所有 quantity 之和",
        content_ids, //["商品id1", "商品id2", "商品id3"],
        contents
      })
  },
  // 访客在购物车页面点击“结账”按钮）
  CheckoutCart(objs) {
    gtag('event', 'begin_checkout', objs);
  },
  // 访客点击“结账”按钮。 
  checkOut(objs) {
    gtag('event', 'checkout', objs);
  },
  // 成功支付
  purchase(currency, value, product, paymentMethod, service_fee, transaction_id, quantityTotal, contents) {
    fbq('track', 'Purchase',
      {
        value,      // 数量 * 单价 + 数量 * 单价
        currency,
        num_items: quantityTotal,
        contents,
        content_type: 'product'
      });
    gtag('event', 'purchase', {
      event_label: 'pc_purchase',
      affiliation: paymentMethod,//用于指定供应公司或实体店位置的商品关联商户
      currency,//与事件相关的购买或商品所用的币种
      items: product,
      transaction_id,
      shipping: service_fee,//交易对应的运费
      value,//交易的货币价值
    })
    pintrk('track', 'checkout', {
      value,
      order_quantity: quantityTotal,
      currency
    });
  },
  // 访客在您的网站上搜索产品。
  search(search_string) {
    fbq('track', 'Search', { 'search_string': search_string });
    gtag('event', 'search', {
      event_label: 'pc_search',
      search_term: search_string
    })
  },
  //商品点击
  productClick(productId, productName) {
    // fbq('track', 'ViewContent', { 'content_ids': productId });
    console.log(productId, '商品点击', productName)
    gtag('event', 'select_item', {
      content_type: "product",
      event_label: 'pc_click_product',
      items: [
        {
          id: productId,
          name: productName,
        }
      ]
    });
  },
  // 对每个页面访问次数做统计
  pageView() {
    var GAid = '';
    if (window.location.host == 'm.frissonlife.com') {
      GAid = 'UA-188160147-1';
    } else {
      GAid = 'UA-178154933-1';
    }
    let pageName = window.location.href;
    fbq('track', 'PageView', { pageName });
    gtag('event', 'page_view', {
      event_label: 'pc_page_view',
      page_title: pageName,
      page_location: pageName,
      page_path: pageName,
      send_to: GAid
    });

  },
  // 新人注册弹框
  registerPopup(useId) {
    fbq('trackCustom', 'RegisterPopup', { useId });
    gtag('event', 'RegisterPopup', {
      event_label: 'pc_register_popup',
      "UserId": useId
    })
  },
  // 关闭新人注册弹框
  registerPopupShut(useId) {
    fbq('trackCustom', 'RegisterPopupShut', { useId: 0 });
    gtag('event', 'RegisterPopupShut', {
      event_label: 'pc_registerPopup_shut',
      "UserId": 0
    })
  },
  // 移除购物车事件
  RemoveFromCart(ids, items) {
    fbq('trackCustom', 'RemoveFromCart', { ProductId: JSON.stringify(ids) });
    let { id, currency, value, shopName } = items;
    gtag('event', 'remove_from_cart', {
      event_label: 'pc_RemoveFromCart',
      currency,
      items: [{
        id: id,
        name: shopName,
      }],
      value
    })
  },
  //衡量商品分类页面获得的浏览
  ViewCategory(name) {
    fbq('trackCustom', 'ViewCategory', { 'CategoryName': name });
    gtag('event', 'ViewCategory', {
      event_label: 'pc_view_category',
      "CategoryName": name
    })
  },
  // 登录
  login(Method, UserId) {
    // gtag('event', 'login', {
    //   "Method": Method,
    //   "UserId": UserId
    // })
    gtag('event', Method, {
      event_label: Method,
      'value': UserId
    });
    gtag('set', {'user_id': UserId});
  },
  // 注册
  CompleteRegistration(UserId) {
    gtag('event', 'CompleteRegistration', {
      event_label: 'pc_complete_registration',
      "UserId": UserId
    })
    gtag('set', {'user_id': UserId});
  },
  // 促销活动
  ViewPromotion(PromotionId, PromotionName) {
    gtag('event', 'ViewPromotion', {
      event_label: 'pc_view_promotion',
      "Method": PromotionId,
      "UserId": PromotionName
    })
  },
  // 用户点击分享按钮
  Share(Method, Content_id) {
    gtag('event', 'Share', {
      event_label: 'pc_share',
      "Method": Method,
      "Content_id": Content_id,
      value: [{ Content_id, Method }]
    })
  }
}
export default buryingPoint;
