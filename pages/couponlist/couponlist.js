//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    coupenlist: [],
  },
  
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: util.Baseurl + '/index/gift_detail',
      data: {
        gift_id: options.id
      },
      success: function (res) {
        if (res.data.code == 1) {
          var resdata = res.data.data.list;
          var list = []
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              src: resdata[i].logo_image,
              shopname: resdata[i].name ,
              values: resdata[i].content,
              id: resdata[i].id,
              merchants_id: resdata[i].merchants_id,
              for: "list"
            })
          }
          that.setData({
            coupenlist: list,
          })
        }
      }
    })
  }
})