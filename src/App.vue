<template>
  <div id="app">
    <VideoAnnotation :play-list="PlayList" @get-image-list="getImageList" />
    <ul class="img-list" v-if="imgList.length > 0">
      <li class="img-item" v-for="(item,index) in imgList" :key="index">
        <el-image
          :src="item.imgUrl"
          :preview-src-list="ImageList(imgList)"
          fit="cover"
          style="height:45px;width:80px;"
        ></el-image>
        <div>
          <span>{{item.currentProject.name}} (第{{item.currentFrame}}帧)</span>
          <el-button
            type="text"
            class="del-btn"
            icon="el-icon-delete-solid"
            @click="delMarkImage(item,index)"
          ></el-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import VideoAnnotation from "./components/VideoAnnotation";
export default {
  components: {
    VideoAnnotation
  },
  data() {
    return {
      PlayList: [
        { id: 1, name: "test1", url: "ge.mp4" },
        { id: 2, name: "test2", url: "47HK2MpfKwqx1510325093.mp4" }
      ],
      imgList: []
    };
  },
  methods: {
    getImageList(imageItem) {
      this.imgList.push(imageItem);
    },
    ImageList(imgList) {
      return imgList.map(t => t.imgUrl);
    },
    delMarkImage(data, index) {
      this.imgList.splice(index, 1);
      let bH = document.body.offsetHeight;
    },
  }
};
</script>