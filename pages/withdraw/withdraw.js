//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    wxchecked: true,
    withdrawnum: '',
    balance: '',
    lowest: '',
    bankname: '',
    fromadd: '',
    bankid: ''
  },
  onLoad: function(options) {
    util.FontFam()
    var that = this;
    wx.request({
      url: util.Baseurl + '/bank/withdraw_info',
      data: {
        token: getApp().globalData.logindata.token,
      },
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            balance: res.data.data.balance,
            lowest: res.data.data.min_withdraw,
          })
        }
      }
    })
  },
  onShow: function(options) {
    if (this.data.fromadd != '') {
      this.setData({
        wxchecked: false
      })
    }
  },
  Withdrawall: function() {
    this.setData({
      withdrawnum: this.data.balance
    })
  },
  Navtobanklist: function() {
    wx.navigateTo({
      url: '/pages/mybankcard/mybankcard?from=wd',
    })
  },
  radioChange: function(e) {
    if (e.detail.value == "wechat") {
      this.setData({
        wxchecked: true
      })
    } else {
      this.setData({
        wxchecked: false
      })
    }
  },
  InputNum: function(e) {

  },
  BlurNum: function(e) {
    this.setData({
      withdrawnum: e.detail.value
    })
  },
  Back2lastpage: function() {
    var that = this;
    if (this.data.wxchecked) {
      if (this.data.withdrawnum.trim() == '') {
        wx.showToast({
          title: '请完善提现金额',
          icon: 'none',
          duration: 1000
        })
      }
      if (this.data.withdrawnum.trim() != '') {
        if (/^([^0][0-9]+|0)$/.test(this.data.withdrawnum) == false && /^(([^0][0-9]+|0)\.([0-9]{1,2}))$/.test(this.data.withdrawnum) == false) {
          wx.showToast({
            title: '请输入正确格式的提现金额',
            icon: 'none',
            duration: 1000
          })
        } else {
          if ( Number(this.data.withdrawnum) >= this.data.lowest == false) {
            wx.showToast({
              title: '提现金额不能少于最低限额！',
              icon: 'none'
            })
          } else if (Number(this.data.withdrawnum) >= this.data.lowest) {
            wx.request({
              url: util.Baseurl + '/bank/apply_withdraw',
              data: {
                token: getApp().globalData.logindata.token,
                type: 1,
                money: this.data.withdrawnum,
              },
              success: function(res) {
                if (res.data.code == 1) {
                  wx.navigateTo({
                    url: '/pages/withdrawresult/withdrawresult',
                  })
                }else{
                  wx.showToast({
                    title: res.data.msg,
                    icon:'none'
                  })
                }
              }
            })
          }
        }
      }
    } else {
      if (this.data.fromadd.trim() == '') {
        wx.showToast({
          title: '请选择银行卡',
          icon: 'none',
          duration: 1000
        })
      }
      if (this.data.withdrawnum.trim() == '') {
        wx.showToast({
          title: '请完善提现金额',
          icon: 'none',
          duration: 1000
        })
      }
      if (this.data.withdrawnum.trim() != '' && this.data.fromadd.trim() != '') {
        if (/^([^0][0-9]+|0)$/.test(this.data.withdrawnum) == false && /^(([^0][0-9]+|0)\.([0-9]{1,2}))$/.test(this.data.withdrawnum) == false) {
          wx.showToast({
            title: '请输入正确格式的提现金额',
            icon: 'none',
            duration: 1000
          })
        } else {
          if (Number(this.data.withdrawnum) >= this.data.lowest == false) {
            wx.showToast({
              title: '提现金额不能少于最低限额！',
              icon: 'none'
            })
          } else if (Number(this.data.withdrawnum) >= this.data.lowest) {
            wx.request({
              url: util.Baseurl + '/bank/apply_withdraw',
              data: {
                token: getApp().globalData.logindata.token,
                type: 2,
                money: this.data.withdrawnum,
                bank_id: this.data.bankid
              },
              success: function(res) {
                if (res.data.code == 1) {
                  wx.navigateTo({
                    url: '/pages/withdrawresult/withdrawresult',
                  })
                }
              }
            })
          }
        }
      }
    }
  }
})