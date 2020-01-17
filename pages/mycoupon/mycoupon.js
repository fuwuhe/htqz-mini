//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    currentIndex: 0,
    firstList: [],
    emptyTip: {
      imgUrl: '../../images/my_order_empty@2x.png',
      font: '还没有优惠券哦~'
    },
    firstpage: 1,
    secondpage: 1,
    thirdpage: 1,
    secondList: [],
    thirdList: [],
    token: '',
    count1: 0,
    count2: 0,
    count3: 0,
  },

  pagechange: function(e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function(e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  Clickfirst: function(e) {
    var index = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '/pages/couponwriteoff/couponwriteoff?id=' + e.currentTarget.dataset.id + '&giftid=' + e.currentTarget.dataset.gift,
    })
  },
  Clicksecond: function(e) {
    wx.navigateTo({
      url: '/pages/couponwriteoff/couponwriteoff?id=' + e.currentTarget.dataset.id + '&giftid=' + e.currentTarget.dataset.gift,
    })
  },
  Clickthird: function(e) {
    wx.navigateTo({
      url: '/pages/couponwriteoff/couponwriteoff?id=' + e.currentTarget.dataset.id + '&over=yes' + '&giftid=' + e.currentTarget.dataset.gift,
    })
  },
  Scrolltolower2: function() {
    this.LoadList(this.data.token, 1, this.data.secondpage, '已使用')
  },
  Scrolltolower: function() {
    this.LoadList(this.data.token, 2, this.data.firstpage, '未使用')
  },
  Scrolltolower3: function() {
    this.LoadList(this.data.token, 3, this.data.thirdpage, '已过期')
  },
  LoadList: function(token, status, page, sname) {
    var that = this;
    wx.request({
      url: util.Baseurl + '/coupon/my_coupon',
      data: {
        token: token,
        status: status,
        page: page,
        pagesize: 10
      },
      success: function(res) {
        if (res.data.code == 1) {
          var resdata = res.data.data.list;
          var list = [];
          if (status == 1) {
            list = that.data.firstList;
            if (page == 1) {
              that.setData({
                firstpage: page + 1
              })
            }
            if (resdata.length >= 10) {
              that.setData({
                firstpage: page + 1
              })
            }
          }
          if (status == 2) {
            list = that.data.secondList;
            if (page == 1) {
              that.setData({
                secondpage: page + 1
              })
            }
            if (resdata.length >= 10) {
              that.setData({
                secondpage: page + 1
              })
            }
          }
          if (status == 3) {
            list = that.data.thirdList;
            if (page == 1) {
              that.setData({
                thirdpage: page + 1
              })
            }
            if (resdata.length >= 10) {
              that.setData({
                thirdpage: page + 1
              })
            }
          }
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              name: resdata[i].name,
              money: resdata[i].price,
              start: util.Num2date(resdata[i].starttime),
              end: util.Num2date(resdata[i].endtime),
              limit: resdata[i].condition,
              status: resdata[i].name,
              num: resdata[i].number,
              avatar: resdata[i].logo_image,
              logo: resdata[i].logo_image,
              status: sname,
              id: resdata[i].id,
              gift_id: resdata[i].gift_id
            })
          }
          if (status == 1) {
            that.setData({
              firstList: list,
              count1: res.data.data.pageCount
            })
          }
          if (status == 2) {
            that.setData({
              secondList: list,
              count2: res.data.data.pageCount
            })
          }
          if (status == 3) {
            that.setData({
              thirdpage: list,
              count3: res.data.data.pageCount
            })
          }
        }
      }
    })
  },
  onLoad: function() {
    util.FontFam()
    if (getApp().globalData.logindata) {
      this.setData({
        token: getApp().globalData.logindata.token
      })
    } else {
      this.setData({
        token: getApp().globalData.logindata.token
      })
    }
    //1 未使用 2 已使用 3 已过期
    this.LoadList(this.data.token, 1, 1, '未使用')
    this.LoadList(this.data.token, 2, 1, '已使用')
    this.LoadList(this.data.token, 3, 1, '已过期')

  }
})