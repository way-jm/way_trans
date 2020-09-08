// pages/translate/translate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lanlist: [
      {name:'英语(English)',key:'en',text:'英'},
      {name:'日语(日本語)',key:'ja',text:'日'},
      {name:'韩语(한국어)',key:'ko',text:'韩'},
      {name:'俄语(по-русски)',key:'ru',text:'俄'},
      {name:'法语(Français)',key:'fr',text:'法'},
    ],
    transHistory:[],
    lanIndex:0,
  },
  inputText(){
    wx.navigateTo({url:'/pages/input/input'})
  },

  bindPickerChange(e){
    this.setData({
      lanIndex: e.detail.value
    })
    const  {lanlist} =  this.data;
    wx.setStorage({
      key:"lanIndex",
      data:{idx:e.detail.value,mark:lanlist[e.detail.value]['key']}
    })
  },

  onDelEvent(e){
    const {detail} =e
    this.setData({
      transHistory:detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {text} = options;
    let lan = 'en'
    let history=[]
    try {
      const value = wx.getStorageSync('lanIndex')
      history = wx.getStorageSync('transHistory')
      if (value) {
        lan = value.mark;
        this.setData({
          lanIndex: value.idx,
        })
      }
      if (history) {
        this.setData({
          transHistory: history
        })
      }
    } catch (e) {
     
    }
   
    if(!text) return;
   
    wx.cloud.callFunction({
      // 云函数名称
      name: 'translate',
      data:{
        text,
        lan
      }
    })
    .then(res => {
      const {result} = res;
      const {TargetText,Target,origin} = JSON.parse(result);
      // 最多存储20条
      if(history&&history.length>20){
        history.shift();
      }
      const data = [...history,{source:origin,target:TargetText,sourceLan:Target}]
      wx.setStorage({
        key:"transHistory",
        data
      }),
      this.setData({
        transHistory:data
      })
    })
    .catch(console.error)
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