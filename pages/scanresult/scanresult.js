//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    tipword: '',
    imgsrc: '/images/submit-pro@2x.png',
    leftword:true
  },
  onLoad: function(options) {
    if (options.result == "fail") {
      this.setData({
        tipword: '核销失败',
        imgsrc: '/images/fail@2x.png',
        leftbtn:false,

      })
      wx.setNavigationBarTitle({
        title: "核销失败"
      })
    } else {
      this.setData({
        tipword: '核销成功',
        imgsrc: '/images/submit-pro@2x.png',
        leftbtn: true
      })
      wx.setNavigationBarTitle({
        title: "核销成功"
      })
    }
  },
  Back2index:function(){
    wx.navigateBack({
      delta:1
    })
  },
  Continue:function(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: false,
      success(res) {
        var obj = util.getQueryObject(res.result);
        wx.request({
          url: util.Baseurl + '/merchants/write_after',
          data: {
            merchants_id: getApp().globalData.merchants_id,
            coupon_id: obj.coupon_id,
            gift_id: obj.gift_id,
            time: obj.time,
            user_id: obj.user_id,
          },
          success: function (res) {
            if (res.data.code == 1) {
              const pages = getCurrentPages()
              const currentPage = pages[pages.length - 1]
              that.onLoad({result:'success'});
            } else {
              const pages = getCurrentPages()
              const currentPage = pages[pages.length - 1]
              that.onLoad({result:'fail'});
            }
          }
        })
      }
    })
  }
})