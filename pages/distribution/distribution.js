//logs.js
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    avatar: '',
    nickname: '',
    level: "",
    member: 0,
    money: "",
    mybrokerage: "",
    withdraw: "",
    business: false,
    linklist1: [{
      src: '/images/me_fx_team_z@2x.png',
      width: '61',
      height: '49',
      name: '我的团队',
      nav: '/pages/myteammate/myteammate'
    }, {
        src: '/images/me_fx_share_z@2x.png',
        width: '51',
        height: '51',
        name: '我要推广',
        nav: '/pages/promote/promote'
      }, {
        src: '/images/me_fx_order_z@2x.png',
        width: '42',
        height: '50',
        name: '分销订单',
        nav: '/pages/distributionorder/distributionorder'
      }, {
        src: '/images/me_fx_statistics_z@2x.png',
        width: '49',
        height: '47',
        name: '提现明细',
        nav: '/pages/withdrawdetail/withdrawdetail'
      }, {
        src: '/images/me_fx_cash_withdrawal_z@2x.png',
        width: '48',
        height: '46',
        name: '我要提现',
        nav: '/pages/withdraw/withdraw'
      }, {
        src: '/images/me_fx_bank_card_z@2x.png',
        width: '51',
        height: '43',
        name: '银行卡',
        nav: '/pages/mybankcard/mybankcard'
      }],
    linklist2: [{
      src: '/images/me_fx_team_z@2x.png',
      width: '61',
      height: '49',
      name: '我的团队',
      nav: '/pages/myteammate/myteammate'
    }, {
      src: '/images/me_fx_share_z@2x.png',
      width: '51',
      height: '51',
      name: '我要推广',
      nav: '/pages/promote/promote'
    }, {
      src: '/images/me_fx_order_z@2x.png',
      width: '42',
      height: '50',
      name: '分销订单',
      nav: '/pages/distributionorder/distributionorder'
    }, {
      src: '/images/me_fx_statistics_z@2x.png',
      width: '49',
      height: '47',
      name: '提现明细',
      nav: '/pages/withdrawdetail/withdrawdetail'
    }, {
      src: '/images/me_fx_cash_withdrawal_z@2x.png',
      width: '48',
      height: '46',
      name: '我要提现',
      nav: '/pages/withdraw/withdraw'
    }, {
      src: '/images/me_fx_bank_card_z@2x.png',
      width: '51',
      height: '43',
      name: '银行卡',
      nav: '/pages/mybankcard/mybankcard'
    }, {
      src: '/images/sweepcode@2x.png',
      width: '49',
      height: '49',
      name: '核销扫码',
      nav: 'scan'
    }, {
      src: '/images/writeoff_management@2x.png',
      width: '47',
      height: '53',
      name: '核销管理',
      nav: '/pages/businesswriteoffmng/businesswriteoffmng'
    }]
  },

  onLoad: function() {

    
    var that = this;
    wx.request({
      url: util.Baseurl + '/distribution/center',
      data: {
        token: app.globalData.logindata.token
      },
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            avatar: res.data.data.avatar,
            nickname: res.data.data.nickname,
            money: res.data.data.balance,
            mybrokerage: res.data.data.total_balance,
            withdraw: res.data.data.withdrawal_balance,
            member: res.data.data.invite_num,
            id: res.data.data.id
          })
          if (res.data.data.is_merchants == 1 && wx.getStorageSync('usertype') == 'business') {
            that.setData({
              business: true
            })
          }
          if (res.data.data.is_merchants == 0 && wx.getStorageSync('usertype') == 'business'){
             wx.showToast({
               title: '该用户不是商家',
               icon:'none',
               duration:1500,
               success:function(){
                 wx.navigateBack({
                   delta:2
                 })
               }
             })
          }
          if (res.data.data.distributor == 0) {
            that.setData({
              level: '不是分销商'
            })
          } else if (res.data.data.distributor == 1) {
            that.setData({
              level: '一级分销商'
            })
          } else if (res.data.data.distributor == 2) {
            that.setData({
              level: '二级分销商'
            })
          }
        }
      }
    })
  },

  Selectoption: function(e) {
    var nav = e.currentTarget.dataset.nav;
    if (nav == 'scan') {
      wx.scanCode({
        onlyFromCamera: false,
        success(res) {
          var obj = util.getQueryObject(res.result);
          wx.request({
            url: util.Baseurl + '/merchants/write_after',
            data: {
              merchants_id: getApp().globalData.merchants_id,
              coupon_id: obj.coupon_id,
              gift_id: obj.gift_id,
              time: obj.time,
              user_id: obj.user_id,
            },
            success: function(res) {
              if (res.data.code == 1) {
                wx.navigateTo({
                  url: '/pages/scanresult/scanresult?result=success',
                })
              } else {
                wx.navigateTo({
                  url: '/pages/scanresult/scanresult?result=fail',
                })
              }
            }
          })
        }
      })
    } else {
      wx.navigateTo({
        url: nav,
      })
    }
  },
  Distributenow: function() {
    wx.navigateTo({
      url: '/pages/withdraw/withdraw',
    })
  }
})