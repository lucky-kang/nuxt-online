export default function (){
 return  {
    comment_rating: 3.5,
    type: 0,
    combination: "",
    cart_id: "",
    link: "",
    ids: 0,
    subtotal: 0,
    skuIds: [],
    shopName: "",
    shopImg: null,
    imgArr: [],
    breadcrumb: [],
    shopData: {},
    starNum: 3.5,
    starColor: ["#FFD282", "#FFD282", "#FFD282"],
    value: "",
    minPrice: "",
    maxPrice: "",
    minPrice_: "",
    maxPrice_: "",
    reference_price: "",
    shop_price: "",
    wishListPrice: "",
    shopId: "",
    sku_id: "0",
    in_stock: false,
    priceShow: true,
    attributes: null,
    variations: null,
    selectAllState: false,
    selectKeyArr: [],
    selectShopData: null,
    shopNum: 1,
    cutArr: [
    this.$t("shopDetail.jsMsg.Description"),
    this.$t("shopDetail.jsMsg.ShippingReturns"),
    this.$t("shopDetail.jsMsg.Reviews")
  ],
    cutActive: 1,
    cutActiveName: this.$t("shopDetail.jsMsg.Description"),
    itemColor: "", //选择的Color
    itemSize: "", //选择的Size
    refundPolicyDialogVisible: false, //learn more弹框
    // refundPolicyIsDown: false,
    cardShop: [],
    cartShow: false, //购物车侧边栏是否显示
    payChange: 2,
    ipaylinksCart: "",
    ipaylinksMath: "",
    ipaylinksCVC: "",
    order_id: "",
    loading: false, //列表首次进去页面loading
    addCartLoading: false, //添加购物车loading
    addToWishListLoading: false, //添加心愿单loading
    buyNowLoading: false, //Buy Now loading
    checkoutNowLoading: false, //checkout Now
    cartPopoverVisable: false, //cartPopover是否显示
    shopContinue: true, //有商品规格没选则规格不允许加入购物车和立即购买
    noStock: true, //商品是否有库存
    share_link: "", //获取location.href
    seeMore: true, //seeMore
    noShowSeeMore: true, //noShowSeeMore
    addCartItems: 0, // n item(s) added to cart
    canShopContinue: false,
    delivery_price_limit: "", //国家对应的运费规则
    is_favorite: 0, //是否收藏 0代表未收藏 1代表已收藏
    heratImg: [
    require("../../static/images/icon/red_heart.png"),
    require("../../static/images/icon/close_heart.png")
  ],
    buyMoreOffList: [],//多买优惠促销折扣信息列表
  }
}
