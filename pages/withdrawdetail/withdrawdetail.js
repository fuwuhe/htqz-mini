//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    withdrawlist: [],
    emptyTip: {
      imgUrl: '../../images/my_order_empty@2x.png',
      font: '还没有提现记录哦~'
    },
    page:1,
    count:0
  },
  LoadList: function (page, from) {
    var that = this;
    wx.request({
      url: util.Baseurl + '/distribution/detailedCommission',
      data: {
        token: getApp().globalData.logindata.token,
        page: page,
        pagesize: 10
      },
      header: {
        'content-type': 'application/json' // 默认值
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
          var list = that.data.withdrawlist;
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              day: util.Num2date(resdata[i].createtime),
              time: util.Num2daytime(resdata[i].createtime),
              towhere: resdata[i].memo,
              num: resdata[i].money,
              operator: resdata[i].operator
            })
          }
          that.setData({
            withdrawlist: list,
            count: suc.data.data.pageCount
          })
        }
      }
    })
  },
  onLoad: function() {
    util.FontFam()
    var that = this;
    this.LoadList(this.data.page)
  },
  Firstscroll: function() {
    var page = this.data.page;
    var totalpage = Math.ceil(this.data.count / 10)
    if (page > 1 && page <= totalpage) {
      this.LoadList(page, 'scroll')
    }
  }
})