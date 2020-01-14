//app.js
const util = require('utils/util.js')
App({
  onLaunch: function(options) {
    var pid = options.query.id;
    this.globalData.pid = options.query.id;
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              var that = this;
              if (res.userInfo) {
                wx.login({
                  success: resp => {
                    that.globalData.code = resp.code
                    wx.request({
                      url: util.Baseurl + '/User/WxLogin',
                      data: {
                        code: resp.code,
                        nickname: res.userInfo.nickName,
                        avatar: res.userInfo.avatarUrl,
                        pid: options.query.id
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function(suc) {
                        if (suc.data.msg == "success") {
                          that.globalData.logindata = suc.data.data;
                          wx.setStorageSync('token', suc.data.data.token)
                        }
                      }
                    })
                  }
                })
              }
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    })
  },
  TestFun: function() {

  },
  globalData: {
    userInfo: null,
    selectcard: '',
    logindata: null,
    merchants_id: 0,
    code: '',
    phonenum: '',
    pid:''
  }
})