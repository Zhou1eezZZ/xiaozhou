const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const cardCollection = db.collection('card')

exports.main = async event => {
    try {
        const { OPENID } = cloud.getWXContext()

        if (OPENID !== 'ocequ4uemWWPlKTdu5ND6vd3U8nE') {
            return {
                success: false,
                message: '没有添加权限'
            }
        }
        const data = Object.assign({}, event, { createTime: new Date().getTime() })
        await cardCollection.add({data})
        return {
            success: true,
            message: '添加成功'
        }
    } catch (error) {
        return {
            success: false,
            message: '服务器错误'
        }
    }
}
