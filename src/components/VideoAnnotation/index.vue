<template>
  <div id="video-check">
    <el-row class="page" :gutter="15">
      <el-col :span="24" class="page-left" style="height:850px;">
        <div class="video-player" style="height：550px;">
          <!-- 播放器 -->
          <video-player
            ref="videoPlayer"
            @getCutImg="getMarkImage"
            @getCurrentVideoMode="getCurrentVideoMode"
            @getCurrentPlayId="getCurrentPlayId"
          />
        </div>
        <div class="video-list">
          <!-- 视频列表 -->
          <video-list ref="videoList" @initSource="initSource" :play-list="playList"></video-list>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VideoPlayer from "../VideoPlayer";
import VideoList from "../VideoList";
export default {
  components: { VideoPlayer, VideoList },
  props: {
    playList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentVideoIsEdit: false,
      pWidth: 0,
      pHeight: 0,
      submitList: [],
      currentId: null
    };
  },
  mounted() {
    let bH = document.body.offsetHeight;
    let videoPlayer = document.getElementsByClassName("video-player");
    this.pHeight = videoPlayer[0].offsetHeight;
    this.pWidth = videoPlayer[0].offsetWidth;
  },
  methods: {
    //点击播放列表回传  projectLists播放列表   index 当前点击的item 下标
    initSource(projectList, index, projectLists) {
      this.currentId = projectList[0].id;
      this.submitList = [...projectLists];
      if (this.currentVideoIsEdit) {
        this.$message.error("处于视频标注模式");
      } else {
        this.$refs.videoPlayer.initVideoUrl(
          projectList[0],
          this.pWidth,
          this.pHeight
        );
        this.$refs.videoPlayer.initNextVideo(index, projectList);
      }
    },
    getMarkImage(obj) {
      this.$emit("get-image-list", obj);
      let bH = document.body.offsetHeight;
    },
    //传递 获取视频是否属于编辑中
    getCurrentVideoMode(mode) {
      this.currentVideoIsEdit = !mode;
      // console.log("currentVideoIsEdit", this.currentVideoIsEdit);
    },
    getCurrentPlayId({ task }) {
      this.$refs.videoList.getCurrentPlayId(task.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin scrollStyle {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
#video-check {
  width: 100%;
  min-height: calc(100vh - 84px);
  background-color: #eee;
  .page {
    width: 100%;
    height: 100%;
    min-width: 1200px;
    overflow-y: hidden;
    background-color: #eeeeee;
    .page-left {
      height: 100%;
      width: 62%;
      margin-right: 0.5%;
      .video-player {
        width: 100%;
        height: 65%;
        background: #fff;
      }
      .video-list {
        width: 100%;
        margin-top: 1%;
        background: #fff;
      }
    }
  }
}
</style>