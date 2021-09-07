// pages/article/article.js
var newsData = require('../../data/news.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      content: newsData.postList
    })
  },

  onItemTap: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./article-detail/article-detail?id=${id}`,
    })
  },
  onSwiperTap: function (e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: `./article-detail/article-detail?id=${id}`,
    })
  }
})