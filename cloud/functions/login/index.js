const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async () => {
    const wxContext = cloud.getWXContext()

    return {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        isAdmin: wxContext.OPENID === 'ocequ4uemWWPlKTdu5ND6vd3U8nE' ? true : false
    }
}
