//logs.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js')
var qqmapsdk;
var demo = new QQMapWX({
  key: 'VCDBZ-D3ACX-GU74A-T2MHT-FC7E5-CNBHE' // 必填
});
Page({
  data: {
    bannerlist: [],
    shopname:"",
    location:"",
    article:''
  },
  onLoad: function(options) {
    console.log(options)
    var that = this;
    wx.request({
      url: util.Baseurl + '/merchants/detail',
      data: {
        type: 2,
        coupon_id: options.id
      },
      success: function (res) {
        if (res.data.code == 1) {
          var resdata = res.data.data;
          var bannerlist = [];
          var images = resdata.images
          for (var i = 0; i < images.length; i++) {
            bannerlist.push({
              url: images[i]
            })
          }
          that.setData({
            article: resdata.content,
            bannerlist: bannerlist,
            shopname: resdata.name,
            location: resdata.address
          })
          WxParse.wxParse('article', 'html', that.data.article, that, 5);
        }
      }
    })

    WxParse.wxParse('article', 'html', this.data.article, this, 5);
  },
  OpenLocation: function () {
    var that = this;
    demo.geocoder({
      address: that.data.location,
      success:function(res){
        console.log(res);
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          name: that.data.shopname,
          address: that.data.location,
          scale: 18
        })
      }
    })
  }
})