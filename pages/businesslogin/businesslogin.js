//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    token: '',
    loginname: '',
    password: ''
  },
  onLoad: function() {
    if (getApp().globalData.logindata) {
      this.setData({
        token: getApp().globalData.logindata.token
      })
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
          if (suc.data.code != 1) {
            wx.showToast({
              title: suc.data.msg,
              icon: 'none',
              duration: 1500
            })
          } else {
            getApp().globalData.busphonenum = that.data.loginname;
            wx.setStorageSync('busphonenum', that.data.loginname);
            getApp().globalData.merchants_id = suc.data.data
            wx.setStorageSync('usertype', 'business')
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    }
  }
})