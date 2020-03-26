const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const cardCollection = db.collection('card')

exports.main = async event => {
    const { _id } = event
    try {
        let result = []
        _id
            ? await cardCollection
                  .aggregate()
                  .match({ _id: db.command.neq(_id) })
                  .sample({ size: 1 })
                  .end()
                  .then(res => {
                      result = res.list
                  })
            : await cardCollection
                  .aggregate()
                  .sample({ size: 1 })
                  .end()
                  .then(res => {
                      result = res.list
                  })
        return result
    } catch (error) {
        return {
            success: false,
            message: '服务器错误'
        }
    }
}
