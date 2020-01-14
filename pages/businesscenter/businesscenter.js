//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    shopname: "",
    background: ""
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: util.Baseurl + '/merchants/center',
      data: {
        merchants_id: getApp().globalData.merchants_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }else{
          that.setData({
            shopname:res.data.data.name,
            background: res.data.data.image
          })
        }
      }
    })
  },
  Navtowriteoff: function() {
    wx.navigateTo({
      url: '/pages/businesswriteoffmng/businesswriteoffmng',
    })
  },
  //扫描二维码
  Scancode: function() {
    wx.scanCode({
      onlyFromCamera: false,
      success(res) {
        var obj = util.getQueryObject(res.result);
        wx.request({
          url: util.Baseurl +'/merchants/write_after',
          data:{
            merchants_id: getApp().globalData.merchants_id,
            coupon_id: obj.coupon_id,
            gift_id: obj.gift_id,
            time: obj.time,
            user_id: obj.user_id,
          },
          success:function(res){
            if (res.data.code == 1){
               wx.navigateTo({
                 url: '/pages/scanresult/scanresult?result=success',
               })
            }else {
              wx.navigateTo({
                url: '/pages/scanresult/scanresult?result=fail',
              })
            }
          }
        })
      }
    })
  }
})