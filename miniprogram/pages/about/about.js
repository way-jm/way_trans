// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  support(){
    const url ='https://7761-way-trans-pf1xk-1303012330.tcb.qcloud.la/support.jpg?sign=6d799ea17b952c22da3515c562778c88&t=1600138521'
    wx.previewImage({
      urls: [url] // 需要预览的图片http链接列表
    })
  },

  goToStory(){
    wx.navigateTo({
      url: '/pages/story/story',
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