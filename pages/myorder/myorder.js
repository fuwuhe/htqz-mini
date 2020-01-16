//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    orderlist: [],
    emptyTip: {
      imgUrl: '../../images/my_order_empty@2x.png',
      font: '还没有订单哦~'
    },
    page:1
  },
  Click2detail:function(e){
    wx.navigateTo({
      url: '/pages/couponlist/couponlist?id=' + e.currentTarget.dataset.id,
    })
  },
  LoadList: function (page, from) {
    var that = this;
    wx.request({
      url: util.Baseurl + '/order/my_order',
      data: {
        token: wx.getStorageSync('token'),
        page: page,
        pagesize: 10
      },
      success: function (suc) {
        if (suc.data.code == 1) {
          var resdata = suc.data.data;
          if (page == 1) {
            that.setData({
              page: page + 1
            })
          }
          if (from == 'scroll') {
            if (resdata.length == 0) {

            }            
            if (resdata.length >= 10) {
              that.setData({
                page: page + 1
              })
            }
          }
          var list = that.data.orderlist;
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              numbers: resdata[i].order_number,
              time: util.Num2time(resdata[i].createtime),
              src: resdata[i].image,
              theme: resdata[i].name,
              price: resdata[i].price,
              id: resdata[i].gift_id
            })
          }
          that.setData({
            orderlist: list
          })
        }
      }
    })
  },
  onLoad: function() {
    util.FontFam();
    this.LoadList(this.data.page)
  },
  Scrolltolower:function(){
    var page = this.data.page;    
    if (page > 1) {
      this.LoadList(page, 'scroll')
    }
  }
})