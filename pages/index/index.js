Page({
  onGetToken() {
    // code
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: 'http://localhost:3030/v1/token',
            method: 'POST',
            data: {
              account: res.code,
              type: 100
            },
            success: res => {
              console.log 
            }
          })
        }
      }
    })
  },
  onGetLatest() {
    wx.request({
      url: 'http://localhost:3030/v1/latest',
      method: 'GET',
      success: res => {
        console.log(res)
      }
    })
  }
})