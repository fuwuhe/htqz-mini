//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    orderlist: [],
    emptyTip: {
      imgUrl: '../../images/my_order_empty@2x.png',
      font: '还没有订单哦~'
    },
    page:1
  },
  LoadList:function(page,from){
    var that = this;
     wx.request({
       url: util.Baseurl +'/distribution/rebateOrder',
       data:{
         token: wx.getStorageSync('token'),
         page: page,
         pagesize:10
       },
       success:function(suc){
         if (suc.data.code == 1) {
           var resdata = suc.data.data;
           if (page == 1) {
             that.setData({
               page: page + 1
             })
           }
           if (from == 'scroll') {                          
             if (resdata.length >= 10) {
               that.setData({
                 page: page + 1
               })
             }
           }
           var list = that.data.orderlist;
           for (var i = 0; i < resdata.length; i++) {
             list.push({
               numbers: resdata[i].order_sn,
               time: util.Num2time(resdata[i].create_time),
               src: resdata[i].image,
               theme: resdata[i].title,
               price: resdata[i].act_pay_money,
               for: "distribution",
               person: resdata[i].nickname,
               phone: util.PhonenumEncrypt(resdata[i].mobile),
               settle: resdata[i].act_pay_money,
               expect: resdata[i].money
             })
           }
           that.setData({
             orderlist: list
           })
         }else{
           wx.showToast({
             title: suc.data.msg,
             icon:'none'
           })
         }
       }
     })
  },
  onLoad: function() {
    util.FontFam()
    var that = this;
    that.LoadList(that.data.page)
  },
  Firstscroll:function(){
    var page = this.data.page;
    console.log(page)
    if (page > 1) {
      this.LoadList(page, 'scroll')
    }
  }
})