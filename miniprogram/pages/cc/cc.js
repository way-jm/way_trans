// pages/cc/cc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottom:0,
    value:'',
    toast:'item0',
    chartHistory:[
      {origin:'way',content:'Hi,我是小M同学'},
      {origin:'way',content:'你可以说讲个笑话或者今天天气怎么样？'},
    ]
  },
  inputfocus(e){
    const {detail} = e;
    const {height} = detail;
    this.setData({
      bottom:height
    })
  },
  inputBlur(){
    this.setData({
      bottom:0
    })
  },
  inputIn(e){
    const {detail} = e;
    const {value} = detail;
    this.setData({
      value:value
    })
  },


  addToChartHistory(item){
      const rootData =  this.data.chartHistory
      this.setData({
        chartHistory:[...rootData,item],
        toast:`item${rootData.length}`
      })
  },
  sendMsg(){
   const text = this.data.value;
   

   this.addToChartHistory({origin:'tang',content:text})
   this.setData({value:''});
   wx.cloud.callFunction({
    // 云函数名称
    name: 'chart',
    data:{
      text,
    }
  }).then(res=>{
    const {result} = res;
    const {Reply} = JSON.parse(result);
    this.addToChartHistory({origin:'way',content:Reply})
    this.setData({value:''});
  }).catch(e=>{
    console.log(e)
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