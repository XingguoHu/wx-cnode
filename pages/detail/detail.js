// pages/detail/detail.js
const WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: {
      'ask': '问答',
      'job': '招聘',
      'share': '分享',
      'good': '精华'
    },
    id: '',
    article: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id: options.id
      })
     

      this.fetchArticleDetail()
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
  
  },
  fetchArticleDetail(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.$http.get(`topic/${this.data.id}`,{
      mdrender: true
    })
    .then(res =>{
      const _this = this
      res.data.replies.map(i =>{
        WxParse.wxParse('content', 'md', i.content, _this, 0)
        i.content = this.data.content
        console.log(i.content)
      })
      
      this.setData({
        article: res.data
      })
      WxParse.wxParse('articleContent', 'md', res.data.content, _this, 0)
      wx.hideLoading()
      }).catch(e => { wx.hideLoading()})
  }
})