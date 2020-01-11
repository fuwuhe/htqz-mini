//logs.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
var qqmapsdk;
var demo = new QQMapWX({
  key: 'VCDBZ-D3ACX-GU74A-T2MHT-FC7E5-CNBHE' // 必填
});
Page({
  data: {
    bannerlist: [],
    shopname: "",
    location: "北京市海淀区彩和坊路海淀西大街74号",
    article: ''
  },
  onLoad: function(options) {
    console.log(options)
    var that = this;
    wx.request({
      url: util.Baseurl + '/merchants/detail',
      data:{
        type:1,
        merchants_id: options.id
      },
      success:function(res){
         if(res.data.code == 1){
           var resdata = res.data.data;
           var bannerlist = [];
           var images = resdata.images
           for(var i=0;i<images.length;i++){
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
    
  },
  OpenLocation: function() {
    var that = this;
    //115.8883,28.685272
    demo.geocoder({
      address: that.data.location,
      success:function(res){
        wx.openLocation({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          name: that.data.shopname,
          address: that.data.location,
          scale: 18
        })
      }
    })
    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function(res) {
    //     demo.reverseGeocoder({
    //       location: {
    //         latitude: res.latitude,
    //         longitude: res.longitude
    //       },
    //       success: function(resp) {
    //         wx.openLocation({
    //           latitude: 28.685272,
    //           longitude: 115.8883,
    //           name: that.data.shopname,
    //           address: that.data.location,
    //           scale: 18
    //         })
    //       },
    //       fail: function(res) {
    //         console.log(res);
    //       },
    //     })
    //   }
    // })
  }
})