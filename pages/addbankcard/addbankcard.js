//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    temp: [],
    isShow_01: false,
    listData_01: [],
    picker_01_data: [],
    personname: "",
    cardnum: ""
  },
  bindPickerChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  showPicker_01: function() {
    this.setData({
      isShow_01: true
    })
  },
  sureCallBack_01(e) {
    let data = e.detail
    this.setData({
      isShow_01: false,
      picker_01_data: e.detail.choosedData,
      picker_01_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_01() {
    this.setData({
      isShow_01: false,
    })
  },
  onLoad: function() {
    var that = this;
    //银行卡类型
    wx.request({
      url: util.Baseurl + '/bank/bank_list',
      success:function(res){
         console.log(res)
         if(res.data.code == 1){
           var resdata = res.data.data;
           var list = [];
           for(var i=0;i<resdata.length;i++){
             list.push(resdata[i].name)
           }
           console.log(list)
           var listdata = [];
           listdata[0] = list
           console.log(listdata)
           that.setData({
             listData_01: listdata
           })
         }
      }
    })
  },
  Suretoadd: function() {
    console.log(this.data.picker_01_data[0])
    console.log(this.data.personname)
    console.log(this.data.cardnum)
    var that = this;
    if (this.data.picker_01_data.length == 0){
      wx.showToast({
        title: '请选择开户行',
        icon: 'none',
        duration: 1000
      })
    }
    if (this.data.personname == '') {
      wx.showToast({
        title: '请输入持卡人姓名',
        icon: 'none',
        duration: 1000
      })
    }
    if (this.data.cardnum == '') {
      wx.showToast({
        title: '请输入银行卡卡号',
        icon: 'none',
        duration: 1000
      })
    }
    if (this.data.picker_01_data.length > 0 && this.data.personname != '' && this.data.cardnum != ''){
      if (!/^[0-9]*$/.test(this.data.cardnum)){
        wx.showToast({
          title: '请输入格式正确的银行卡卡号',
          icon: 'none',
          duration: 1000
        })
       }else{
         wx.request({
           url: util.Baseurl +'/bank/save_bank_card',
           data:{
             token: getApp().globalData.logindata.token,
             account: this.data.cardnum,
             realname: this.data.personname,
             bank_name: this.data.picker_01_data[0]
           },
           success:function(res){
             console.log(res)
             if(res.data.code == 1){
               wx.navigateBack({
                 delta:1
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
  },
  Blurpername: function(e) {
    this.setData({
      personname: e.detail.value
    })
  },
  Blurcarnum: function(e) {
    this.setData({
      cardnum: e.detail.value
    })
  }
})