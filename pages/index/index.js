//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    indexlist: [],
    page: 1,
    loading: false
  },
  LoadList: function(page, from) {
    var that = this;
    wx.request({
      url: util.Baseurl + '/index/index',
      data: {
        page: page,
        pagesize: 10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(suc) {
        if (suc.data.code == 1) {
          var resdata = suc.data.data;
          if (page == 1) {
            that.setData({
              page: page + 1
            })
          }
          if (from == 'scroll') {
            if (resdata.length == 0) {
              
            }
            if (resdata.length >= 10) {
              that.setData({
                page: page + 1
              })
            }
          }
          var list = that.data.indexlist;
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              img: resdata[i].image,
              title: resdata[i].name,
              start: resdata[i].starttime,
              end: resdata[i].endtime,
              id: resdata[i].id,
              price: resdata[i].price,
              hour: 0,
              minute: 0,
              second: 0,
              now:''
            })
          }
          var list
          that.setData({
            indexlist: list
          })
        }
      }
    })
  },
  onLoad: function(options) {
    if (options.pid) {
      getApp().globalData.pid = decodeURIComponent(options.pid);      
    }else{
      getApp().globalData.pid = util.getQueryObject(decodeURIComponent(options.q)).pid;
    }
    var that = this;
    this.LoadList(this.data.page)
    // 倒计时
    setInterval(function() {
      var indexlist = that.data.indexlist;
      for (var i = 0; i < indexlist.length; i++) {
        var times = util.TimeDown(indexlist[i].start, indexlist[i].end)
        var hour = 'indexlist[' + i + '].hour';
        var minute = 'indexlist[' + i + '].minute';
        var second = 'indexlist[' + i + '].second';
        var hour = 'indexlist[' + i + '].hour';
        if (times) {
          that.setData({
            ['indexlist[' + i + '].hour']: times.hours,
            ['indexlist[' + i + '].minute']: times.minutes,
            ['indexlist[' + i + '].second']: times.seconds,
            ['indexlist[' + i + '].now']: times.now,
          })
        }
      }
    }, 1000)
  },
  Click2activity: function(e) {
    if (getApp().globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/authoriziation/authoriziation?title=' + e.currentTarget.dataset.title + '&id=' + e.currentTarget.dataset.id,
      })
      wx.set
    } else {
      wx.login({
        success: res => {
          getApp().globalData.code = res.code;
          if (res.code != undefined) {
            wx.request({
              url: util.Baseurl + '/User/WxLogin',
              data: {
                code: res.code,
                nickname: getApp().globalData.userInfo.nickName,
                avatar: getApp().globalData.userInfo.avatarUrl,
                pid: getApp().globalData.pid
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(suc) {
                if (suc.data.msg == "success") {
                  getApp().globalData.logindata = suc.data.data;
                  wx.setStorageSync('token', suc.data.data.token)
                  wx.navigateTo({
                    url: '/pages/activity/activity?title=' + e.currentTarget.dataset.title + '&id=' + e.currentTarget.dataset.id,
                  })
                }
              }
            })
          }
        }
      })

    }
  },
  Scrolltolower: function() {
    var page = this.data.page;
    if (page > 1) {
      this.LoadList(page, 'scroll')
    }
  }
})