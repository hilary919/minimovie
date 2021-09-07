var newsData = require('../../../data/news')
var app = getApp()
// pages/article/article-detail/article-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.postId = options.id

    if (!this.data.postId) {
      wx.navigateTo({
        url: '../article',
      })
    }

    var curArticle = newsData.postList.filter((item) => {
      return item.postId == this.data.postId
    })

    if (!curArticle) return

    this.setData({
      curArticle: curArticle[0]
    })

    var postCollected = wx.getStorageSync('postCollected')
    if (postCollected) {
      this.setData({
        collected: postCollected[this.data.postId]
      })
    } else {
      postCollected = {}
      postCollected[this.data.postId] = false
      wx.setStorageSync('postCollected', postCollected)
    }

    if (app.g_isPlayingMusic && app.g_curPlayingMusicId == this.data.postId)
      this.setData({
        playing: true,
        bgAudio: wx.getBackgroundAudioManager()
      })
  },

  onCollectTap: function (e) {
    var postCollected = wx.getStorageSync('postCollected')
    var collected = postCollected[this.data.postId]
    collected = !collected
    this.setData({
      collected: collected
    })
    postCollected[this.data.postId] = collected
    wx.setStorageSync('postCollected', postCollected)
    wx.showToast({
      title: collected ? '收藏成功' : '取消收藏成功',
      icon: 'success',
      duration: 2000
    })
  },

  onShareTap: function () {
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success(res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '是否取消？',
          cancelColor: '#405f80'
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  onMusicTap: function (e) {
    if (!this.data.bgAudio) {
      const bgAudio = wx.getBackgroundAudioManager()
      bgAudio.title = this.data.curArticle.music.title.split('-')[0]
      bgAudio.singer = this.data.curArticle.music.title.split('-')[1]
      bgAudio.coverImgUrl = this.data.curArticle.music.coverImg
      // 设置了 src 之后会自动播放
      bgAudio.src = this.data.curArticle.music.url
      this.setData({
        bgAudio: bgAudio
      })
      // 监听背景音乐暂停
      bgAudio.onPause(() => {
        this.setData({
          playing: false
        })
        app.g_isPlayingMusic = false
        app.g_curPlayingMusicId = null
      })
      // 监听背景音乐播放
      bgAudio.onPlay(() => {
        this.setData({
          playing: true
        })
        app.g_isPlayingMusic = true
        app.g_curPlayingMusicId = this.data.postId
      })
    } else {
      this.data.playing ? this.data.bgAudio.pause() : this.data.bgAudio.play()
    }
    this.setData({
      playing: !this.data.playing
    })
  }
})