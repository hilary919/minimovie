const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 根据评分计算星星状态
const calcStars = rating => {
  let starsArr = [0, 0, 0, 0, 0]
  rating = rating * 1
  if (typeof rating === 'number' && !isNaN(rating)) {
    let actives = Math.round(rating / 2)
    for (let i = 0; i < actives; i++) {
      starsArr[i] = 1
    }
  }
  return starsArr
}

const http = (url, method, callback) => {
  wx.request({
    url: url,
    method: method,
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function () {
      //断网、请求超时
      console.log(error)
    }
  })
}

module.exports = {
  formatTime,
  calcStars
}