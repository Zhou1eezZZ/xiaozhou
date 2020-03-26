import Taro, { Component } from "@tarojs/taro";
import { View, Text, Textarea, Input, Button, Image } from "@tarojs/components";
import bindShow from "../../utils/style";

import "./index.scss";

import HeadBar from "../../components/headBar/index";

class Index extends Component {
  state = {
    content: "",
    img: "",
    author: "",
    name: ""
  };
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleContentChange({ detail }) {
    const { value } = detail;
    this.setState({ content: value });
  }

  handleAuthorChange({ detail }) {
    const { value } = detail;
    this.setState({ author: value });
  }

  handleNameChange({ detail }) {
    const { value } = detail;
    this.setState({ name: value });
  }

  handleChooseImage() {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"]
    }).then(res => {
      const { tempFilePaths } = res;
      this.setState({ img: tempFilePaths[0] });
    });
  }

  handleSubmit() {
    try {
      const { content, img, author, name } = this.state;
      if (!content.trim()) {
        throw new Error("请输入卡片内容");
      }
      if (!img) {
        throw new Error("请选择图片");
      }
      if (!author) {
        throw new Error("请输入图源作者");
      }
      if (!name) {
        throw new Error("请输入图源名");
      }

      Taro.showLoading({
        title: "处理中"
      });
      // 先上传图片到云存储
      const filePath = img;
      const suffix = /\.[^\.]+$/.exec(filePath)[0]; // 获取文件扩展名
      Taro.cloud
        .uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath
        })
        .then(res => {
          const { fileID, statusCode } = res;
          if (statusCode !== 200) {
            throw new Error("上传图片失败");
          }
          const data = {
            content,
            img: fileID,
            imgOrigin: {
              author,
              name
            }
          };
          Taro.cloud.callFunction({ name: "addCard", data }).then(addRes => {
            const { result } = addRes;
            if (!result.success) {
              throw new Error(result.message);
            }
            Taro.showToast({ icon: "none", title: "添加成功" }).then(() => {
              Taro.navigateTo({ url: "/pages/index/index" });
            });
          });
        })
        .finally(() => {
          Taro.hideLoading();
        });
    } catch (error) {
      Taro.showToast({ icon: "none", title: error.message });
    }
  }

  render() {
    const { content, img, author, name } = this.state;
    return (
      <View className='add'>
        {/* 头部logo*/}
        <HeadBar />
        <View className='add-form'>
            Add
          {/* <Button size='mini' onClick={() => this.handleChooseImage()}>
            选图
          </Button>
          <Image style={bindShow(img)} src={img} mode='widthFix'></Image>
          <Text className='add-form-label'>图源作者：</Text>
          <Input
            className='add-form-border'
            value={author}
            type='text'
            onInput={this.handleAuthorChange}
          />
          <Text className='add-form-label'>图源名：</Text>
          <Input
            className='add-form-border'
            value={name}
            type='text'
            onInput={this.handleNameChange}
          />
          <Text className='add-form-label'>内容：</Text>
          <Textarea
            style='height:200rpx'
            className='add-form-border'
            value={content}
            placeholder='请输入卡片内容'
            maxlength={150}
            onInput={this.handleContentChange}
          />
          <Button
            style='width:100%;margin-top:20rpx'
            onClick={() => this.handleSubmit()}
          >
            提交
          </Button> */}
        </View>
      </View>
    );
  }
}

export default Index;
