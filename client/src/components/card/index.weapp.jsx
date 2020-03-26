import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import bindShow from "../../utils/style";
import "./index.scss";

export default class Login extends Component {
  static defaultProps = {
    card: {
      content: "",
      createTime: 0,
      img: "",
      imgOrigin: {
        author: "",
        name: ""
      }
    },
    loading: false
  };

  render() {
    const { card, loading } = this.props;
    return (
      <View style={bindShow(!loading)} className='card'>
        <Image
          style='width:100%;position:relative;'
          src={card.img}
          mode='widthFix'
        >
          <View className='card-tip'>
            <Text>{`图源：${card.imgOrigin.author} ${card.imgOrigin.name}`}</Text>
          </View>
        </Image>
        <View className='card-body'>
          <Text>{card.content ? card.content : "???"}</Text>
        </View>
      </View>
    );
  }
}
