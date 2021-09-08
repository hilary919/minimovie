// pages/movies/movies-more/movies-more.js
var util = require('../../../utils/util')
var movies = require('../../../data/movies')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    this.setData({
      moviesData: this.getData(options.sid)
    })
  },

  getData: function (id) {
    let movie = null
    for (let i in movies) {
      for (let j in movies[i]) {
        if (movies[i][j] == id) {
          movie = movies[i]
          break;
        }
      }
    }
    if (movie) {
      movie.data.map(item => {
        item['stars'] = util.calcStars(item.rating)
      })
    }
    return movie
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready')
    wx.setNavigationBarTitle({
      title: this.data.moviesData.type,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
    wx.showNavigationBarLoading({
      success: () => {
        setTimeout(() => {
          let mData = this.data.moviesData
          mData.data.push(...mData.data)
          this.setData({
            moviesData: mData
          })
          wx.hideNavigationBarLoading()
        }, 1000)
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage')

  }
})