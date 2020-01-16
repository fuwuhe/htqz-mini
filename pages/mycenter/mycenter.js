//logs.js
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    phonenum: '',
    linklist: [{
      src: '/images/my_order@2x.png',
      name: '我的订单',
      url: 'pages/myorder/myorder',
      width: '42',
      height: '46'
    }, {
      src: '/images/my_coupon@2x.png',
      name: '我的优惠券',
      url: 'pages/mycoupon/mycoupon',
      width: '54',
      height: '43'
    }, {
      src: '/images/my_distribution_center@2x.png',
      name: '分销中心',
      url: 'pages/distribution/distribution',
      width: '50',
      height: '50'
    }, {
      src: '/images/my_sharing_courtesy@2x.png',
      name: '分享有礼',
      url: 'pages/promote/promote',
      width: '50',
      height: '48'
    }, {
      src: '/images/my_about_us@2x.png',
      name: '关于我们',
      url: 'pages/aboutus/aboutus',
      width: '50',
      height: '50'
    }],
    username: "用户昵称",
    avatar: "/images/default_avatar.png"
  },
  onLoad: function() {

  },
  onShow: function() {
    var that = this;
    if (app.globalData.userInfo != null && wx.getStorageSync('busphonenum') != '' && wx.getStorageSync('usertype') == 'business') {
      wx.request({
        url: util.Baseurl + '/User/bind_mobile',
        data: {
          token: getApp().globalData.logindata.token,
          mobile: wx.getStorageSync('busphonenum')
        },
        success: function(suc) {
          if (suc.data.code == 1) {
            if (suc.data.data.is_merchants == 0 && wx.getStorageSync('usertype') == 'business') {
              wx.showToast({
                title: '当前登录账号不是商家，请重新选择角色',
                icon: 'none',
                complete: function() {
                  setTimeout(function() {
                    wx.reLaunch({
                      url: '/pages/welcome/welcome'
                    })
                  }, 1500)
                }
              })
            }
            if (suc.data.data.is_merchants == 1 && wx.getStorageSync('usertype') == 'business') {
              that.setData({
                phonenum: util.PhonenumEncrypt(wx.getStorageSync('busphonenum'))
              })
            }
          }
        }
      })
    }
    if (app.globalData.userInfo != null && wx.getStorageSync('phonenum') != '' && wx.getStorageSync('usertype') == 'customer') {
      that.setData({
        phonenum: util.PhonenumEncrypt(wx.getStorageSync('phonenum'))
      })
    }
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '温馨提示',
        content: '该功能需要您的授权',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/authoriziation/authoriziation?from=center',
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {
      this.setData({
        avatar: app.globalData.userInfo.avatarUrl,
        username: app.globalData.userInfo.nickName,
      })
    }
  },
  Selectoption: function(e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: "/" + this.data.linklist[index].url,
    })
  },
  getPhoneNumber: function(e) {
    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok" && e.detail.encryptedData != undefined) {
      wx.login({
        success: function(resp) {
          wx.request({
            url: util.Baseurl + '/user/getMobile',
            data: {
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
              code: resp.code
            },
            success: function(res) {
              if (res.data.code == 1 && typeof(res.data.data) != "number") {
                if (res.data.data.phoneNumber) {
                  that.setData({
                    phonenum: util.PhonenumEncrypt(res.data.data.phoneNumber)
                  })
                  getApp().globalData.phonenum = res.data.data.phoneNumber;
                  wx.setStorageSync('phonenum', res.data.data.phoneNumber);
                  wx.request({
                    url: util.Baseurl + '/User/bind_mobile',
                    data: {
                      token: getApp().globalData.logindata.token,
                      mobile: res.data.data.phoneNumber
                    },
                    success: function(suc) {
                      if (suc.data.code == 1) {
                        if (suc.data.data.is_merchants == 0 && wx.getStorageSync('usertype') == 'business') {
                          wx.showToast({
                            title: '当前登录账号不是商家，请重新选择角色',
                            icon: 'none',
                            complete: function() {
                              setTimeout(function() {
                                wx.reLaunch({
                                  url: '/pages/welcome/welcome'
                                })
                              }, 1500)
                            }
                          })
                        }
                      }
                    }
                  })
                }
              } else {
                wx.showToast({
                  title: '网络错误，请再试一次',
                  icon: 'none'
                })
              }
            }
          })
        }
      })
    }
  }
})