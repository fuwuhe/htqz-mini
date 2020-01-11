//logs.js
var WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js')

Page({
  data: {
   article:'<span style="color:#000">111</span>'
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: util.Baseurl + '/index/about_us',
      success: function (res) {
        if(res.data.code == 1){
          that.setData({
            article: res.data.data.content
          })
        }
        WxParse.wxParse('article', 'html', that.data.article, that, 5);
      }
    })
    
  }
})
