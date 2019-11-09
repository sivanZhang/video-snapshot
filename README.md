# video-snapshot

> 这是一个视频标注的组件，可以对视频的任何一帧截图并且在截图中做标注、保存截图。

## 视频预览
  
<video src="https://github.com/sivanZhang/video-snapshot/public/video.mp4" controls="controls" width="800" height="450">您的浏览器不支持播放该视频！</video>
[![ScreenShot](/upload/ask/29/W/WebMole_Youtube_Video.png)](./public/video.mp4)

## 使用说明
   使用时直接把[本git项目](https://github.com/sivanZhang/video-snapshot)中components文件夹下的video-snapshot文件夹复制到需要引用的项目中，然后inport使用：


template:
```html
<VideoSnapshot :play-list="PlayList" @get-image-list="getImageList" />
```
js:
```js
<script>
import VideoSnapshot from "@/components/video-snapshot";
export default {
  components: {
    VideoSnapshot
  },
  data() {
    return {
      PlayList: [//传入组件的播放列表
        { id: 1, name: "test1", url: "ge.mp4" },
        { id: 2, name: "test2", url: "47HK2MpfKwqx1510325093.mp4" }
      ]
    };
  },
  methods: {
   /**
     * 视频标注成功后触发
     *
     * @param {Object} imageItem 当前标注完成的对象
     *
     */
    getImageList(imageItem) {
      console.log(imageItem)
    },
  }
};
</script>
```
# DEMO
> 本项目可下载到本地，作为demo参考。
## Demo结构

``` bash
│ 
├── App.vue    # 引入了video-snapshot组件，并在该页面有使用demo
└── components
    └── video-snapshot    # 封装video-snapshot组件文件夹
```
## 启动demo项目

```bash
# 克隆项目
git clone https://github.com/sivanZhang/video-snapshot.git

# 进入项目目录
cd 项目目录

# 安装依赖
npm install

# 启动服务
npm run serve
```


# 组件说明

##  Attribute


| 属性名称 | 说明 | 类型 | 默认值 |
| --------- | --------- | --------- | --------- |
| play-list| 播放列表,属性说明：id（视频id）,name(视频名称，在播放列表中会显示)，url（视频地址）| Array| — |



##  Events


| 事件名称 | 说明 | 回调参数 |
| --------- | --------- | --------- | 
| get-image-list| 视频标注完成后触发| getImageList：标注完后返回的标注对象；属性说明：currentFrame（当前截图的帧数），imgUrl（图片地址，base64格式），currentPosition（当前播放位置或者时间点），currentProject（播放对象数据）|
