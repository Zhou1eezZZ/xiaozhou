import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'

class Index extends Component {

    render() {
        return (
            <View className='tip-wrap'>
                <Text>世间哪有真理 其实都是拙见</Text>
            </View>
        )
    }
}

export default Index