//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    shopname: "",
    background: ""
  },
  onLoad: function() {
    console.log(getApp().globalData.merchants_id)
    var that = this;
    wx.request({
      url: util.Baseurl + '/merchants/center',
      data: {
        merchants_id: 73,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log(res)
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }else{
          console.log(res.data.data.image)
          that.setData({
            shopname:res.data.data.name,
            background: res.data.data.image
          })
        }
      }
    })
  },
  Navtowriteoff: function() {
    console.log(1)
    wx.navigateTo({
      url: '/pages/businesswriteoffmng/businesswriteoffmng',
    })
  },
  //扫描二维码
  Scancode: function() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  }
})