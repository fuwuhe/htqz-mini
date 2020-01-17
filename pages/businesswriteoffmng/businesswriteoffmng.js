//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    currentIndex: 0,
    firstList: [],
    secondList: [],
    thirdList: [],
    emptyTip: {
      imgUrl: '../../images/my_order_empty@2x.png',
      font: '还没有核销记录哦~'
    },
    firstpage:1,
    secondpage:1,
    thirdpage:1,
    count1:0,
    count2: 0,
    count3: 0,
  },

  pagechange: function(e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function(e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  Firstscroll: function() {
    this.LoadList(1, '待核销', this.data.firstpage, this)

  },
  Secondscroll: function() {
    this.LoadList(2, '已核销', this.data.secondpage, this)
 
  },
  Thirdscroll: function() {
    this.LoadList(3, '已过期', this.data.thirdpage, this)
  },
  LoadList: function(status,sname,page, that) {
    wx.request({
      url: util.Baseurl + '/merchants/write_off',
      data: {
        merchants_id: getApp().globalData.merchants_id,
        status: status,
        page: page,
        pagesize:10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(suc) {
        if(suc.data.code == 1){
          var resdata = suc.data.data.list;          
          var list = [];
          if (status == 1) {
            list = that.data.firstList;
            if (page == 1) {
              that.setData({
                firstpage: page + 1,
                count1: suc.data.data.pageCount,
              })
            }
            if (resdata.length >= 10) {
              that.setData({
                firstpage: page + 1,
                count1: suc.data.data.pageCount,
              })
            }
          }
          if (status == 2) {
            list = that.data.secondList;
            if (page == 1) {
              that.setData({
                secondpage: page + 1,
                count2: suc.data.data.pageCount,                
              })
            }
            if (resdata.length >= 10) {
              that.setData({
                secondpage: page + 1,
                count2: suc.data.data.pageCount,
              })
            }
          }
          if (status == 3) {
            list = that.data.thirdList;
            if (page == 1) {
              that.setData({
                thirdpage: page + 1,
                count3: suc.data.data.pageCount,
              })
            }
            if (resdata.length >= 10) {
              that.setData({
                thirdpage: page + 1,
                count3: suc.data.data.pageCount,
              })
            }
          }
          for(var i=0;i<resdata.length;i++){
            list.push({
              name: resdata[i].nickname,
              money: resdata[i].price,
              logo: resdata[i].logo_image,
              start: util.Num2date(resdata[i].starttime),
              end: util.Num2date(resdata[i].endtime),
              num: resdata[i].number,
              avatar: resdata[i].avatar,
              limit: resdata[i].condition,
              status: sname,
            })
          }
          if(status == 1){
             that.setData({
               firstList:list
             })
          }
          if (status == 2) {
            that.setData({
              secondList: list
            })
          }
          if (status == 3) {
            that.setData({
              thirdList: list
            })
          }
        }
      }
    })
  },
  onLoad: function() {
    //待核销
    //getApp().globalData.merchants_id
    this.LoadList(1,'待核销',1, this)
    this.LoadList(2,'已核销',1, this)
    this.LoadList(3,'已过期',1, this)
  }
})