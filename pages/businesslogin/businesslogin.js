//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    token: '22e3f80f-33f9-45e2-826d-b12d5b06d98e',
    loginname: '',
    password: ''
  },
  onLoad: function() {
    console.log(getApp().globalData.logindata)
    if (getApp().globalData.logindata) {
      this.setData({
        token: getApp().globalData.logindata.token
      })
    } else {

    }
  },
  Blurname: function(e) {
    this.setData({
      loginname: e.detail.value
    })
  },
  Blurpassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  Click2login: function() {
    console.log(this.data.password)
    if (this.data.password.length == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1000
      })
    }
    if (this.data.loginname.trim().length == '') {
      wx.showToast({
        title: '请输入账户',
        icon: 'none',
        duration: 1000
      })
    }
    if (this.data.password.length != '' && this.data.loginname.trim().length != '') {
      var that = this;
      //18710614188
      wx.request({
        url: util.Baseurl + '/merchants/login',
        data: {
          mobile: that.data.loginname,
          password: that.data.password,
          token: that.data.token
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(suc) {
          console.log(suc.data.code)
          if (suc.data.code != 1) {
            wx.showToast({
              title: suc.data.msg,
              icon: 'none',
              duration: 1000
            })
          } else {
            getApp().globalData.merchants_id = suc.data.data
            wx.navigateTo({
              url: '/pages/businesscenter/businesscenter',
            })
          }
        }
      })
    }

  }
})