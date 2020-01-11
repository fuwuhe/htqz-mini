//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    coupenlist: [],
    id:'',
    gift_status:''
  },

  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.Loadcoupon()
  },
  Loadcoupon:function(){
    var that = this;
    wx.request({
      url: util.Baseurl + '/index/gift_detail',
      data: {
        gift_id: this.data.id
      },
      success: function (res) {
        if (res.data.code == 1) {
          var resdata = res.data.data.list;
          var list = []
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              src: resdata[i].logo_image,
              shopname: resdata[i].name,
              values: resdata[i].content,
              id: resdata[i].id,
              merchants_id: resdata[i].merchants_id,
              for: "list",
              status: resdata[i].type
            })
            //type=1 未领取 2 已领取
          }
          that.setData({
            coupenlist: list,
            gift_status: res.data.data.gift_status
          })
        }
      }
    })
  },
  Click2recept: function(e) {
    var that = this;
    if (this.data.gift_status == 1){
      if (e.currentTarget.dataset.sts == 1) {
        wx.request({
          url: util.Baseurl + '/coupon/get_coupon',
          data: {
            token: wx.getStorageSync('token'),
            coupon_id: e.currentTarget.dataset.id,
            gift_id: that.data.id
          },
          success: function (res) {
            if (res.data.code == 1) {
              that.Loadcoupon();
            } else {
              wx.showToast({
                title: '请先购买礼包',
                icon: 'none'
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '优惠券不可重复领取',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '请先购买礼包',
        icon: 'none'
      })
    }   
  }
})