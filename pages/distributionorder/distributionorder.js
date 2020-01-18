//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    orderlist: [],
    emptyTip: {
      imgUrl: '../../images/my_order_empty@2x.png',
      font: '还没有订单哦~'
    },
    page:1,
    count:0
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
           var resdata = suc.data.data.list;
           if (page == 1) {
             that.setData({
               page: page + 1
             })
           }
           if (from == 'scroll') {                          
             if (resdata.length > 0) {
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
             orderlist: list,
             count: suc.data.data.pageCount
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
    var totalpage = Math.ceil(this.data.count / 10)
    if (page > 1 && page <= totalpage) {
      this.LoadList(page, 'scroll')
    }
  }
})