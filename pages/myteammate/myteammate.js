//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    matelist: [],
    emptyTip: {
      imgUrl: '../../images/teammate_empty@2x.png',
      font: '还没有队友哦，快去邀请吧~'
    },
    page:1,
    count:0
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
          var resdata = suc.data.data.list;
          if (page == 1) {
            that.setData({
              page: page + 1
            })
          }
          if (from == 'scroll') {           
            if (resdata.length >= 0) {
              that.setData({
                page: page + 1
              })
            }
          }
          var list = that.data.matelist;
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              avatar: resdata[i].avatar,
              name: resdata[i].nickname,
              phone: util.PhonenumEncrypt(resdata[i].mobile),
              id: resdata[i].id
            })
          }
          that.setData({
            matelist: list,
            count: suc.data.data.pageCount
          })
        }
      }
    })
  },
  onLoad: function() {
    util.FontFam()
    this.LoadList(this.data.page)
  },
  Firstscroll: function() {
    var page = this.data.page;
    var totalpage = Math.ceil(this.data.count / 10);
    if (page > 1 && page <= totalpage) {
      this.LoadList(page, 'scroll')
    }  
  }
})