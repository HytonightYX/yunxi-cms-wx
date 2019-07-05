import {Base64} from 'js-base64'

Page({
  onGetToken() {
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
              console.log(res.data)
              wx.setStorage({
                key: "token",
                data: res.data.token
              })
            }
          })
        }
      }
    })
  },
  onGetLatest() {
    wx.request({
      url: 'http://localhost:3030/v1/classic/latest',
      method: 'GET',
      success: res => {
        console.log(res)
      },
      header: {
        Authorization: this._encode()
      },
    })
  },
  // 手动进行base64加密
  _encode() {
    const token = wx.getStorageSync('token')
    console.log(token)
    // 格式：Authorization: "Basic username:password"
    // 现在username 就是token，password为空
    const base64 = Base64.encode(token + ':' + '')
    return 'Basic ' + base64
  }
})