<template>
  <div class="video-cont">
    <div id="videoSliderList">
      <el-button
        size="mini"
        v-for="(item,index) in selectList"
        :key="index"
        :type="currentPlayId==item.id?'success':''"
        @click="initSource(index),getCurrentPlayId(item.id)"
        icon="el-icon-video-play"
        style="margin: 10px 2%;"
      >{{item.name}}</el-button>
    </div>
    <el-divider content-position="left">选中播放审核：</el-divider>
    <el-checkbox-group v-model="selectProjectIds">
      <div class="list">
        <div class="item" v-for="(item,index) in PlayList" :key="index">
          <el-checkbox
            :label="index"
            :key="index"
            @change="changeCheckedProject($event,item,index)"
          >
            <p class="pro-name">{{item.name}}</p>
          </el-checkbox>
        </div>
      </div>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: "VideoList",
  data() {
    return {
      selectProjectIds: [],
      selectList: [],
      currentPlayId: -1
    };
  },
  props: {
    PlayList: {
      type: Array
    }
  },
  created() {},
  methods: {
    getCurrentPlayId(id) {
      this.currentPlayId = id;
    },
    initSource(index) {
      let selectVideo = this.selectList[index];
      let PlayList = [];
      PlayList[0] = selectVideo;
      if (index + 1 != this.selectList.length) {
        PlayList[1] = this.selectList[index + 1];
      } else {
        PlayList[1] = null;
      }
      this.$emit("initSource", PlayList, index, this.selectList);
    },
    /**
     * 卡片选中状态切换 ，更新展示的播放列表
     * @param {Boolean} e 点击卡片的多选按钮返回的状态表示是否选中
     * @param {Object} item 点击卡片多选按钮时返回的资产对象
     */
    changeCheckedProject(e, item, index) {
      if (e) {
        this.selectList.push(item);
      } /* else if (e && !item.path) {
        e = false;
        this.$message.warning("镜头路径为空");
      } */ else {
        this.selectList = this.selectList.filter(t => {
          return t.id !== item.id;
        });
      }
    },
    addVideoList() {}
  }
};
</script>
<style lang="scss" scoped>
.el-divider {
  margin: 20px 0 10px;
}
#videoSliderList {
  display: block;
  white-space: nowrap;
  width: 100%;
  height: 50px;
  overflow: auto;
  /* li {
    width: 20%;
    display: inline-block;
    margin: 10px 2%;
    .color-slider {
      display: block;
      width: 100%;
      height: 25px;
      background: red;
      cursor: pointer;
      text-align: center;
      color: #fff;
      line-height: 25px;
    }
    .on {
      background: #67c23a;
    }
  } */
}
.video-cont {
  width: 100%;
  height: 100%;
  .list {
    list-style: none;
    padding: 10px;
    margin: 0;
    overflow: hidden;
    height: 100%;
    height: calc(100% - 90px);
    display: flex;
    .item {
      width: 19%;
      border: 1px dotted #ddd;
      margin: 0 0.5%;
      background: #fff;
      padding: 0 10px;
    }
  }
}
</style>
