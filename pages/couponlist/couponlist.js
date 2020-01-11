//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    coupenlist: [],
    emptyTip: {
      imgUrl: '../../images/my_order_empty@2x.png',
      font: '还没有提现记录哦~'
    }
  },
  
  onLoad: function(options) {
    var that = this;
    //options.id
    wx.request({
      url: util.Baseurl + '/index/gift_detail',
      data: {
        gift_id: 2
      },
      success: function (res) {
        if (res.data.code == 1) {
          console.log(res.data)
          var resdata = res.data.data.list;
          var list = []
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              src: resdata[0].logo_image,
              shopname: resdata[0].name + '（' + resdata[0].address + '）',
              values: resdata[0].content,
              id: resdata[0].id,
              merchants_id: resdata[0].merchants_id,
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