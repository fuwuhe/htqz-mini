//logs.js
Page({
  data: {

  },
  onLoad: function () {
    // wx.login({
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
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
