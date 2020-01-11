//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    notauth: true,
    title:'',
    from:'',
    id:''
  },
  onLoad: function(options) {
    console.log(options)
    if (options.title){
      this.setData({
        title: options.title,
        id: options.id
      }) 
    }
    if(options.from){
      this.setData({
        from:'center'
      })
    }
       
    //center
  },

  onShow: function() {
    var that = this;
    setTimeout(function() {
      if (app.globalData.userInfo) {
        //  wx.navigateTo({
        //    url: '/pages/welcome/welcome',
        //  })
      } else {
        that.setData({
          notauth: true
        })
      }
    }, 500)
  },
  onGotUserInfo: function(e) {
    var that = this;    
    if (e.detail.userInfo != undefined) {
      wx.login({
        success: res => {
          if (res.code != undefined) {
            getApp().globalData.code = res.code;
            wx.request({
              url: util.Baseurl + '/User/WxLogin',
              data: {
                code: res.code,
                nickname: e.detail.userInfo.nickName,
                avatar: e.detail.userInfo.avatarUrl
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(suc) {
                if (suc.data.msg == "success") {
                  getApp().globalData.logindata = suc.data.data;
                  getApp().globalData.userInfo = e.detail.userInfo;
                  wx.setStorageSync('token', suc.data.data.token)
                  if(that.data.from == 'center'){
                    wx.switchTab({
                      url: '/pages/mycenter/mycenter'
                    })
                  }else{
                    wx.navigateTo({
                      url: '/pages/activity/activity?title=' + that.data.title + '&id=' + that.data.id+'&from=auth',
                    })
                  }
                }
              }
            })
          }
        }
      })
    }
  },
})