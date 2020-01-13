//logs.js
Page({
  data: {

  },
  onLoad: function () {

  },
  Intoclient:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  Intobusiness:function(){
    wx.navigateTo({
      url: '/pages/businesslogin/businesslogin',
    })
  }
})
