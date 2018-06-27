let app = getApp()

Page({

    data: {
        currentCity: ''
    },

    onLoad: function (options) {
        new Promise((resolve, reject) => {
            //定位当前位置
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    resolve(res)
                },
                fail: function (res) {
                    reject(res)
                }
            })
        }).then(res => {
            app.map.reverseGeocoder({
                location: {
                    latitude: res.latitude,
                    longitude: res.longitude
                },
                success: (res) => {
                    if (!res.status) {
                        this.setData({
                            currentCity: res.result.ad_info.city
                        })
                    }
                }
            })
        })
    }
})