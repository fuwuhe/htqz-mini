//logs.js
var WxParse = require('../../wxParse/wxParse.js');
const util = require('../../utils/util.js');
const innerAudioContext = wx.createInnerAudioContext();

Page({
  data: {
    bannersrc: '',
    joinnum: 0,
    joinList: [],
    shopnum: 0,
    shopList: [],
    recordlist: [],
    displaynum: 1,
    coupenlist: [],
    ranklist: [],
    article: '',
    mclass: true,
    optionsid: '',
    giftstatus: 0
  },
  onReady: function() {
    innerAudioContext.src = 'http://htqz.0791jr.com/uploads/1.mp3';
    innerAudioContext.loop = true;
  },
  onLoad: function(options) {
    util.FontFam()
    innerAudioContext.play();
    this.setData({
      optionsid: options.id
    })
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      })
    }
    var that = this;
    //参与人数
    wx.request({
      url: util.Baseurl + '/index/join_people',
      data: {
        gift_id: options.id
      },
      success: function(res) {
        if (res.data.code == 1) {
          var resdata = res.data.data.peopleList;
          var list = [];
          if (resdata.length <= 14) {
            list = resdata
          } else {
            list = resdata.slice(0, 13)
          }
          that.setData({
            joinnum: res.data.data.num,
            joinList: list
          })
        }
      }
    })
    //合作商家
    wx.request({
      url: util.Baseurl + '/index/merchants',
      data: {
        gift_id: options.id
      },
      success: function(res) {
        if (res.data.code == 1) {
          var resdata = res.data.data.merchantsList;
          that.setData({
            shopnum: res.data.data.pageCount,
            shopList: resdata
          })
        }
      }
    })
    //购买记录
    wx.request({
      url: util.Baseurl + '/index/buy_record',
      data: {
        gift_id: options.id
      },
      success: function(res) {
        if (res.data.code == 1) {
          var resdata = res.data.data.list;
          var list = [];
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              recordsrc: resdata[i].avatar,
              name: resdata[i].nickname,
              price: resdata[i].price,
              theme: resdata[i].title,
              time: resdata[i].createtime,
            })
          }
          if (resdata.length >= 4) {
            that.setData({
              displaynum: 4
            })
          } else {
            that.setData({
              displaynum: resdata.length
            })
          }
          that.setData({
            recordlist: list
          })
        }
      }
    })
    //规则
    wx.request({
      url: util.Baseurl + '/index/gift_rules',
      data: {
        token: wx.getStorageSync('token')
      },
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            article: res.data.data.content
          })
          WxParse.wxParse('article', 'html', that.data.article, that, 5);
        }
      }
    })
    //排行榜
    wx.request({
      url: util.Baseurl + '/distribution/money_list',
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            ranklist: res.data.data
          })
        }
      }
    })
  },
  onShow: function() {
    this.Loadcoupon();
  },
  Loadcoupon: function() {
    var that = this;
    //礼包
    wx.request({
      url: util.Baseurl + '/index/gift_detail',
      data: {
        gift_id: that.data.optionsid,
        token: wx.getStorageSync("token")
      },
      success: function(res) {
        if (res.data.code == 1) {
          var resdata = res.data.data.list;
          var list = []
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              src: resdata[i].logo_image,
              shopname: resdata[i].name + '（' + resdata[i].address + '）',
              values: resdata[i].content,
              id: resdata[i].id,
              merchants_id: resdata[i].merchants_id,
              status: resdata[i].type
            })
            //type: 1待领取2已领取
          }
          //gift_status  1：已购买 0：未购买 
          that.setData({
            coupenlist: list,
            bannersrc: res.data.data.back_image,
            giftstatus: res.data.data.gift_status
          })
        }
      }
    })
  },

  Click2detail: function(e) {
    wx.navigateTo({
      url: '/pages/businessdetail/businessdetail?id=' + e.currentTarget.dataset.id,
    })
  },
  Click2coupondetail: function(e) {
    var that = this;
    if (this.data.giftstatus == 1) {
      if (e.currentTarget.dataset.sts == 1) {
        wx.request({
          url: util.Baseurl + '/coupon/get_coupon',
          data: {
            token: wx.getStorageSync('token'),
            coupon_id: e.currentTarget.dataset.id,
            gift_id: this.data.optionsid
          },
          success: function(res) {
            wx.navigateTo({
              url: '/pages/coupondetail/coupondetail?id=' + e.currentTarget.dataset.id,
            })
          }
        })
      } else {
        wx.navigateTo({
          url: '/pages/coupondetail/coupondetail?id=' + e.currentTarget.dataset.id,
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/coupondetail/coupondetail?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  Clcik2buy: function() {
    var that = this;
    if (that.data.giftstatus == 0 || that.data.giftstatus == null) {
      wx.request({
        url: util.Baseurl + '/index/buy_gift',
        data: {
          token: getApp().globalData.logindata.token,
          gift_id: this.data.optionsid,
        },
        success: function(re) {
          if (re.data.data.order_id != undefined) {
            wx.request({
              url: util.Baseurl + '/pay/pays',
              data: {
                token: getApp().globalData.logindata.token,
                order_id: re.data.data.order_id,
                zftype: 'wechat',
              },
              success: function(res) {
                if (res.data.code == 1) {
                  var resdata = JSON.parse(res.data.data);
                  wx.requestPayment({
                    timeStamp: resdata.timeStamp,
                    nonceStr: resdata.nonceStr,
                    package: resdata.package,
                    signType: resdata.signType,
                    paySign: resdata.paySign,
                    success: function(res) {
                      wx.showToast({
                        title: '支付成功',
                      })
                      that.Loadcoupon();
                      that.setData({
                        giftstatus:1
                      })
                      wx.navigateTo({
                        url: '/pages/payresult/payresult',
                      })
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  onUnload: function() {
    innerAudioContext.stop();
  },
  Playmusic: function() {
    this.setData({
      mclass: !this.data.mclass
    })
    if (this.data.mclass) {
      innerAudioContext.play();
    } else {
      innerAudioContext.pause();
    }
  },
  Click2recept: function(e) {
    var that = this;
    if (e.currentTarget.dataset.sts == 1) {
      wx.request({
        url: util.Baseurl + '/coupon/get_coupon',
        data: {
          token: wx.getStorageSync('token'),
          coupon_id: e.currentTarget.dataset.id,
          gift_id: this.data.optionsid
        },
        success: function(res) {
          if (res.data.code == 1) {
            that.Loadcoupon();
          } else {
            wx.showToast({
              title: '请先购买礼包',
              icon: 'none'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '优惠券不可重复领取',
        icon: 'none'
      })
    }
  }
})