import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  render() {
    return (
      <View className='headbar-wrap'>
        <Image
          className='logo'
          src='https://7869-xiaozhou-puioe-1301588312.tcb.qcloud.la/logo.png?sign=a1f99afbe2bef6d87d3d1d93eac45946&t=1584503585'
          mode='widthFix'
        ></Image>
        <Text className='headbar-text'>By:深沉的小周</Text>
        <Image
          className='headbar-wave'
          src='https://7869-xiaozhou-puioe-1301588312.tcb.qcloud.la/wave.gif?sign=200fc795da4c5aead2263dbae7bcfa2d&t=1584497796'
          mode='scaleToFill'
        ></Image>
      </View>
    );
  }
}

export default Index;
