//promote.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    invitenum: 0,
    successnum: 0,
    active: "",
    imagePath: "",
    maskHidden: false,
    qrcode: ''
  },
  onLoad: function() {
    util.FontFam()
    var that = this;
    wx.request({
      url: util.Baseurl + '/coupon/coupon_detail',
      data: {
        type: 2,
        token: wx.getStorageSync('token')
      },
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            qrcode: res.data.data.qrocde
          })
        }
      }
    })
  },
  Navtorules: function(e) {
    wx.navigateTo({
      url: '/pages/activityrule/activityrule',
    })
  },
  Sharenow: function() {
    this.setData({
      active: "active"
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#CA0618',
      animation: {
        duration: 200,
        timingFunc: 'easeInOut'
      }
    })
  },
  //微信好友
  Towechatpal: function() {
   
  },
  //生成海报
  Tomakepost: function() {
    var that = this;
    wx.showToast({
      title: '生成中',
      icon: 'loading',
      duration: 10000
    })
    that.CreateCanvas();
  },
  Inviteresult: function() {
    var that = this;
    wx.request({
      url: util.Baseurl + '/distribution/popularize',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            invitenum: res.data.data.ycount,
            successnum: res.data.data.xcount,
          })
        }
      }
    })
  },
  onShow: function() {
    this.Inviteresult()
  },
  onShareAppMessage: function() {
    this.Closelayer();
    this.Inviteresult();
    return {
      title: '鸿图圈子',
      path: '/pages/index/index?pid=' + getApp().globalData.logindata.id,
      imageUrl: 'http://htqzqny.0791jr.com/uploads/20200109/FnpRJfCja_3FQoDcKQt97c8mz1T7.png'
    }
  },
  //canvas 生成海报
  CreateCanvas: function() {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#A20B0B");
    context.fillRect(0, 0, 375, 667);
    wx.getImageInfo({
      src: 'https://htqz.0791jr.com/uploads/20200109/3.png',
      success: function(res) {
        context.drawImage(res.path, 0, 0, 375, 667);
        wx.getImageInfo({
          src: that.data.qrcode,
          success: function(re) {
            context.drawImage(re.path, 104, 450, 167, 167);
            context.draw();
            setTimeout(function() {
              wx.canvasToTempFilePath({
                canvasId: 'mycanvas',
                success: function(res) {
                  var tempFilePath = res.tempFilePath;
                  that.setData({
                    imagePath: tempFilePath,
                    canvasHidden: true,
                    maskHidden: true
                  });
                  that.Closelayer()
                  wx.hideToast()
                },
                fail: function(res) {

                }
              });
            }, 1000);
          }
        })
      }
    })
  },
  Closelayer: function() {
    this.setData({
      active: ""
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
      animation: {
        duration: 200,
        timingFunc: 'easeInOut'
      }
    })
  },
  Cancelpost: function() {
    this.setData({
      maskHidden: false
    })
  },
  Savepost: function() {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function(res) {
            if (res.confirm) {
              that.setData({
                maskHidden: false
              })
            }
          },
          fail: function(res) {

          }
        })
      }
    })
  }
})