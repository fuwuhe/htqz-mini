//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    emptyTip: {
      imgUrl: '../../images/bank_card_empty@2x.png',
      font: '还没有银行卡，快去添加吧~'
    },
    fromwd: true,
    cardlist: []
  },
  onLoad: function(options) {
    util.FontFam()
    if (options.from != undefined) {
      this.setData({
        fromwd: true
      })
    } else {
      this.setData({
        fromwd: false
      })
    }
    var that = this;    
  },
  Loadlist:function(){
    var that = this;
    wx.request({
      url: util.Baseurl + '/bank/user_bank_list',
      data: {
        token: getApp().globalData.logindata.token,
        page: 1,
        pagesize: 20
      },
      success: function (res) {
        if (res.data.code == 1) {
          var resdata = res.data.data.list;
          var list = [];
          for (var i = 0; i < resdata.length; i++) {
            list.push({
              name: resdata[i].openbank,
              number: resdata[i].account,
              numbers: resdata[i].bankaccount,
              id: resdata[i].id,
              branchbank: resdata[i].branchbank,
              logo: resdata[i].ico,
            })
          }
          that.setData({
            cardlist: list
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  onShow:function(){    
    this.Loadlist();
  },
  Unbindcard: function(e) {
    var that = this;
    wx.showModal({
      title: '',
      content: '你确定解除绑定吗？',
      confirmColor: '#CA0618',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: util.Baseurl +'/bank/delete_bank_card',
            data:{
              token: getApp().globalData.logindata.token,
              bank_id: e.currentTarget.dataset.id
            },
            success:function(res){
               if(res.data.code == 1){
                 that.Loadlist()
               }else{
                 wx.showToast({
                   title: res.data.msg,
                   icon: 'none'
                 })
               }
            }
          })
        } else if (res.cancel) {
         
        }
      }
    })
  },
  Click2add: function() {
    wx.navigateTo({
      url: '/pages/addbankcard/addbankcard',
    })
  },
  Back2withdraw: function(e) {
    var index = e.currentTarget.dataset.index;
    var bankid = e.currentTarget.dataset.id;
    var nownum = this.data.cardlist[index].numbers;
    app.globalData.selectcard = this.data.cardlist[index].number;
    // 参数传递
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      fromadd: nownum,
      bankid: bankid
    })
    wx.navigateBack({
      delta: 1
    })
  }
})