//logs.js
var WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js')
Page({
  data: {
    article:''
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: util.Baseurl +'/index/distribution_rules',
      data:{
        token:wx.getStorageSync('token')
      },
      success:function(res){
         if(res.data.code == 1){
            that.setData({
              article:res.data.data.content
            })
           WxParse.wxParse('article', 'html', that.data.article, that, 5);
         }
      }
    })
   
  }
})
