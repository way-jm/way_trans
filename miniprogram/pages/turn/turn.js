// pages/turn/turn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 600,//转盘大小,
    musicflg: false, //声音
    fastJuedin: false,//快速决定
    repeat: false,//不重复抽取
    probability: false,// 概率
    s_awards: '???',//结果
    option: '标题',
    zhuanpanArr:{
         id: 0,
         option: '我帅吗？',//转盘的标题名称
         awards: [
            {
               id: 0,                // id递增
               name: "清空购物车",           // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
               color: '#cf1322',    // 选项的背景颜色
               probability: 0       // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
            },
            {
               id: 1,
               name: "年内迪士尼",
               color: '#bae637',
               probability: 10
            },
            {
               id: 2,
               name: "圣诞礼物X2",
               color: '#f759ab',
            },
            {
              id: 3,
              name: "爱的抱抱",
              color: '#13c2c2',
           },
           {
              id: 4,
              name: "125购物红包",
              color: '#9254de',
           },
           {
              id: 5,
              name: "888购物红包",
              color: '#FF4500',
           },
           {
              id: 6,
              name: "选项6",
              color: '#69c0ff',
           },
           {
              id: 7,
              name: "选项5",
              color: '#ff4d4f',
           },
           {
              id: 8,
              name: "选项4",
              color: '#fa541c',
           },
           {
              id: 9,
              name: "选项3",
              color: '#fadb14',
           },
           {
              id: 10,
              name: "选项2",
              color: '#722ed1',
           },
           {
              id: 11,
              name: "选项1",
              color: '#597ef7',
           }
        ]
     }, 
     animationData: {}
},
getAwards(e){
  var animation = wx.createAnimation({
    duration: 1000,
    timingFunction: 'ease',
  })

  this.animation = animation

  animation.scale(0.8,0.8).step()
  animation.scale(1.1,1.1).step()

  this.setData({
    animationData:animation.export()
  })

  setTimeout(function() {
    animation.translate(30).step()
    this.setData({
      animationData:animation.export()
    })
  }.bind(this), 1000)
  this.setData({
    s_awards:e.detail.s_awards
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})