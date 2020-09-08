// components/translateHistory/translateHistory.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    historyList:Array
  },
 
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindlongpress(e){
     const {currentTarget} = e;
     const {dataset} = currentTarget;
     const {id=''} = dataset;
     const _this = this;

     wx.showActionSheet({
      itemList: ['复制译文', '删除', '清空全部'],
      success (res) {
        const {tapIndex} = res;
        if(tapIndex === 2) {
          wx.setStorage({
            key:"transHistory",
            data:[]
          })
          _this.triggerEvent('delEvent',[])
        }else if(tapIndex === 1){
          try {
            const value = wx.getStorageSync('transHistory');
            if (value) {
              // Do something with return value
              value.splice(id, 1);
              wx.setStorage({
                key:"transHistory",
                data:value
              })
              _this.triggerEvent('delEvent',value)
            }
          } catch (e) {
          }
          
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
    },
  }
})
