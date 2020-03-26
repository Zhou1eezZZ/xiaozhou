import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  static defaultProps = {
    text: "",
    onClick: () => {}
  };

  render() {
    const { text, onClick } = this.props;
    return (
      <View className='hoverbutton-wrap' onClick={onClick}>
        <Text className='hoverbutton-text'>{text}</Text>
      </View>
    );
  }
}

export default Index;
