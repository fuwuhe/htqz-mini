//promote.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    invitenum: 2,
    successnum: 3,
    active: "",
    imagePath:"",
    maskHidden:false,
    qrcode:''
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: util.Baseurl +'/coupon/coupon_detail',
      data:{
        type:2,
        token:wx.getStorageSync('token')
      },
      success:function(res){
        console.log(res)
        if(res.data.code == 1){
          console.log(res.data.data.qrocde)
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
    this.setData
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
      duration: 3000
    })
    that.CreateCanvas();
    setTimeout(function () {
      that.Closelayer()
      wx.hideToast()      
      that.setData({
        maskHidden: true
      });
    }, 3000)
  },
  onShareAppMessage:function(){
    this.Closelayer();
    wx.request({
      url: util.Baseurl +'/distribution/popularize',
      data:{
        token: wx.getStorageSync('token')
      },
      success:function(res){
        console.log(res)
      }
    })
  },
  //canvas 生成海报
  CreateCanvas:function(){
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#A20B0B");
    context.fillRect(0, 0, 375, 667);
    wx.getImageInfo({
      src: 'https://htqz.0791jr.com/uploads/20200109/3.png',
      success: function (res) {
        context.drawImage(res.path, 0, 0, 375, 667);
        wx.getImageInfo({
          src: that.data.qrcode,
          success: function (re) {
            context.drawImage(re.path, 97.5, 444, 180, 180);
            context.draw();
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'mycanvas',
                success: function (res) {
                  var tempFilePath = res.tempFilePath;
                  that.setData({
                    imagePath: tempFilePath,
                    canvasHidden: true
                  });
                },
                fail: function (res) {
                  console.log(res);
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
  Cancelpost:function(){
    this.setData({
      maskHidden:false
    })
  },
  Stopprops:function(){
   
  },
  Savepost:function(){
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          }, fail: function (res) {

          }
        })
      }
    })
  }
})