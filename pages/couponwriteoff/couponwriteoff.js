//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    ordercode:'1111',
    createtime:'',
    paytime:'',
    paynum:0,
    shopname:'',
    number:1,
    qrcode:'',
    over:false
  },
  onLoad: function (options) {
    //wx.getStorageSync('token')
    var that = this;
    wx.request({
      url: util.Baseurl + '/coupon/coupon_detail',
      data:{
        coupon_id: options.id,
        token: wx.getStorageSync('token'),
        type:1,
        gift_id: options.giftid
      },
      success:function(res){
        if (res.data.code == 1){
          that.setData({
            qrcode: res.data.data.qrocde,
            ordercode: res.data.data.order_number,
            paytime: util.Num2time(res.data.data.paytime),
            createtime: util.Num2time(res.data.data.qrocde_time),
            shopname: res.data.data.name,
            paynum: res.data.data.price,
            number: res.data.data.use_number,
            totel: (res.data.data.nouse_number + res.data.data.use_number)
          })
        }
      }
    })
    if(options.over){
       this.setData({
         over:true
       })
    }
  }
})
