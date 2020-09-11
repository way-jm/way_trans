// pages/kuchi/kuchi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originSrc:'/images/up.png',
    alpha:50,
    lipsticks:[],
    active:{
      color:'#D62352',
      name:'撩骚'
    },
    afterPic:'',
    originData:null,
    currentSeries:'圣罗兰-莹亮纯魅唇膏',
    multiArray: [
      ['圣罗兰', '香奈儿可可','迪奥','美宝莲','纪梵希'], 
      ['莹亮纯魅唇膏', '纯口红', '莹亮纯魅美唇膏', '纯色唇釉叛逆裸唇', '莹亮绚染唇油', '甜吻唇颊霜','莹亮灿金唇彩'],
  ],
    multiIndex: [0, 0],
  },
  getColumn(one_index){
    const originData = this.data.originData;
    const series = originData[one_index]['series'];
    const temp =[]
    series.forEach(item=>{
      temp.push(item.name)
    })
    return temp;
  },

  downLoad(){
    const url = this.data.afterPic
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success (res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success:()=>{
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },
     
  boardTap(e){
    const {currentTarget} = e;
    const {dataset:{id}} = currentTarget;
    const {originData,multiIndex} = this.data;
    this.setData({
      active:originData[multiIndex[0]]['series'][multiIndex[1]]['lipsticks'][id]
    })
  },
  getLipColorInfo(){
    const {active,alpha} = this.data;
    const color = active.color; 

    const R=parseInt(color.substring(1,3), 16)
    const G=parseInt(color.substring(3,5), 16)
    const B=parseInt(color.substring(5,7), 16)
    return {RGBA:{R,G,B,A:alpha}}
  },
  preview(){
    const url = this.data.afterPic
    wx.previewImage({
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  start(){
    wx.showLoading({
      title: '正在捕获嘴唇位置',
    })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'kuchi',
      data:{
        Url:this.data.originSrc,
        LipColorInfo:this.getLipColorInfo()
      }
    }).then(res=>{
      console.log(res)
      const {result} = res;
      const {ResultUrl}= JSON.parse(result);
      wx.hideLoading()
      this.setData({
        afterPic:ResultUrl
      })
    })
  },
  bindMultiPickerChange: function (e) {
    const {value} = e.detail
    //选取lipsticks
    const  brand = this.data.originData[value[0]]['name']
    const  series = this.data.originData[value[0]]['series'];
    const  seriesName = series[value[1]]['name']
    const  lipsticks = series[value[1]]['lipsticks']
    this.setData({
      multiIndex: e.detail.value,
      lipsticks:lipsticks,
      currentSeries:`${brand}-${seriesName}`
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    //当第一列发生变化
    if(e.detail.column===0){
      data.multiArray[1]= this.getColumn(e.detail.value)
      data.multiIndex[1] = 0;
      data.active = this.data.originData[e.detail.value]['series'][0]['lipsticks'][0]
      this.setData(data);
    }
    if(e.detail.column===1){
      data.multiIndex[1] = e.detail.value;
      data.active = this.data.originData[this.data.multiIndex[0]]['series'][e.detail.value]['lipsticks'][0]
      this.setData(data);
    }
  },

  // 设置alpha通道
  sliderchange(e){
    const {detail:{value}} = e;
    this.setData({
      alpha:value
    })
  },

  upload(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=>{
        wx.showLoading({
          title: '图片剪裁中',
        })
        const files =  res.tempFiles;
        const target= files[0]
        if(target.size>3000000){
          wx.showToast({
            title: '选择的图片过大',
            duration: 2000
          })
        return;
        }

        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+ 'example.png', // 上传至云端的路径
          filePath: target.path, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            wx.cloud.getTempFileURL({
              fileList: [res.fileID],
              success: res => {
                this.setData({
                  originSrc:res.fileList[0]['tempFileURL']
                })
                wx.hideLoading()
              }
            })
          }
        })
      }
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
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://way-trans-pf1xk.7761-way-trans-pf1xk-1303012330/colors.json', 
      success: res => {
        let fs=wx.getFileSystemManager()
        let result = fs.readFileSync(res.tempFilePath,"utf-8")
        const data = JSON.parse(result)
        this.setData({
          originData:data,
          lipsticks:data[0]['series'][0]['lipsticks']
        });
        wx.hideLoading()
      },
    })


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