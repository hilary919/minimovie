var movies = require('../../data/movies')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var moviesData = []
    if (movies.hotMovies.code == 200) {
      var hotMovies = {
        id: movies.hotMovies.id,
        type: movies.hotMovies.type,
        data: movies.hotMovies.data.slice(0, 3)
      }
      moviesData.push(hotMovies)
    }

    if (movies.topMovies.code == 200) {
      var topMovies = {
        id: movies.topMovies.id,
        type: movies.topMovies.type,
        data: movies.topMovies.data.slice(0, 3)
      }
      moviesData.push(topMovies)
    }

    this.setData({
      moviesData: moviesData
    })

    // wx.request({
    //   url: '',
    //   success: function (res) {
    //     console.log(res);
    //   }
    // })
  },

  getMoviesData: function (type) {
    var data = {}
    var typeMovie = movies[type]
    if (typeMovie && typeMovie.code == 200) {
      data = {
        id: typeMovie.id,
        type: typeMovie.type,
        data: typeMovie.data.slice(0, 3)
      }
      // typeMovie.data.slice(0, 3)
    }
  },

  onMovieTap: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./movies-detail/movies-detail?mid=${id}`,
    })
  },

  onMoreTap: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `./movies-more/movies-more?sid=${id}`,
    })
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