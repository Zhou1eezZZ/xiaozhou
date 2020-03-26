import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import bindShow from "../../utils/style";
import "./index.scss";

import Card from "../../components/card/index";
import HeadBar from "../../components/headBar/index";
import Tip from "../../components/tip/index";
import HoverButton from "../../components/hoverButton/index";

export default class Index extends Component {
  state = {
    card: {},
    isAdmin: false,
    loading: false
  };

  componentWillMount() {
    this.login();
    this.getRandomCard();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getRandomCard = () => {
    const { _id } = this.state.card;
    this.setState({ loading: true }, () => {
      Taro.cloud
        .callFunction({
          name: "getRandomCard",
          data: _id ? { _id } : {}
        })
        .then(res => {
          const card = res.result[0];
          this.setState({ card });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
        })
        .catch(console.log);
    });
  };

  login = () => {
    Taro.cloud
      .callFunction({ name: "login" })
      .then(res => {
        const { isAdmin } = res.result;
        this.setState({ isAdmin });
      })
      .catch(console.log);
  };

  handleAddCard = () => {
    Taro.navigateTo({ url: "/pages/add/index" });
  };

  config = {
    navigationBarTitleText: "小周拙见"
  };

  render() {
    const { card, isAdmin, loading } = this.state;
    return (
      <View className='index'>
        {/* 头部logo*/}
        <HeadBar />
        {/* 卡片 */}
        <Card loading={loading} card={card} />
        {/* 悬浮按钮组 */}
        <View className='index-fabs'>
          {/* {isAdmin ? (
            <HoverButton text='添加卡片' onClick={this.handleAddCard} />
          ) : null} */}
          <View style={bindShow(card.content && !loading)}>
            <HoverButton text='换一张' onClick={this.getRandomCard} />
          </View>
        </View>
        {/* tip提示 */}
        <Tip />
      </View>
    );
  }
}
