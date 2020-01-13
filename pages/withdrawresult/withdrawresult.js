//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
  },
  onLoad: function () {
  },
  Back2index:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})
