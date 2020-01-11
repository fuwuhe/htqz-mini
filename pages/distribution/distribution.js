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
    linklist: [{
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
    }]
  },
  onLoad: function() {
    var that = this;
    wx.request({
      url: util.Baseurl + '/distribution/center',
      data:{
        token:app.globalData.logindata.token
      },
      success:function(res){
        console.log(res)
        if(res.data.code == 1){
          that.setData({
            avatar: res.data.data.avatar,
            nickname: res.data.data.nickname,
            money: res.data.data.balance,
            mybrokerage: res.data.data.total_balance,
            withdraw: res.data.data.withdrawal_balance,
            member: res.data.data.invite_num,
            id: res.data.data.id
          })
          if (res.data.data.distributor == 0){
            that.setData({
              level:'不是分销商'
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
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: this.data.linklist[index].nav,
    })
  },
  Distributenow: function() {
    console.log(1)
    wx.navigateTo({
      url: '/pages/withdraw/withdraw',
    })
  }
})