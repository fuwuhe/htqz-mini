//logs.js
Page({
  data: {

  },
  onLoad: function (options) {
    if(options.pid){
      getApp().globalData.pid = decodeURIComponent(options.pid);
    }
    
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
