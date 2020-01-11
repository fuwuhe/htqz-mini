//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    matelist: [],
    emptyTip: {
      imgUrl: '../../images/teammate_empty@2x.png',
      font: '还没有队友哦，快去邀请吧~'
    },
    page:1
  },
  LoadList: function (page, from) {
    var that = this;
    wx.request({
      url: util.Baseurl + '/distribution/team',
      data: {
        token: wx.getStorageSync('token'),
        page: page,
        pagesize: 10
      },
      success: function (suc) {
        if (suc.data.code == 1) {
          var resdata = suc.data.data;
          if (page == 1) {
            that.setData({
              page: page + 1
            })
          }
          if (from == 'scroll') {
            if (resdata.length == 0) {
              wx.showToast({
                title: '暂无更多内容',
                icon: 'none',
                duration: 1000
              })
            }            
            if (resdata.length >= 10) {
              that.setData({
                page: page + 1
              })
            }
          }
          var list = that.data.matelist;
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              avatar: resdata[i].avatar,
              name: resdata[i].username,
              phone: util.PhonenumEncrypt(resdata[i].mobile),
              id: resdata[i].id
            })
          }
          that.setData({
            matelist: list
          })
        }
      }
    })
  },
  onLoad: function() {
    this.LoadList(this.data.page)
  },
  Firstscroll: function() {
    var page = this.data.page;
    if (page > 1){
      this.LoadList(page, 'scroll')
    }   
  }
})