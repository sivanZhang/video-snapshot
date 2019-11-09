<template>
  <div class="draw-context" id="drawContext" v-show="drawContextDisplay">
    <div id="drawToolbar">
      <el-button class="icon-btn" title="画笔工具" @click="changeCanvasMode('pencel')">
        <img src="./icons/icon-pencel.svg" />
      </el-button>
      <el-button class="icon-btn" title="椭圆工具" @click="changeCanvasMode('circle')">
        <img src="./icons/icon-circle.svg" />
      </el-button>
      <el-button class="icon-btn" title="矩形工具" @click="changeCanvasMode('rec')">
        <img src="./icons/icon-rec.svg" />
      </el-button>
      <el-button class="icon-btn" title="文字工具" @click="changeCanvasMode('text')">
        <img src="./icons/icon-text.svg" />
      </el-button>
      <el-button class="icon-btn" title="箭头工具" @click="changeCanvasMode('arrowhead')">
        <img src="./icons/icon-arrowhead.svg" />
      </el-button>
      <el-color-picker v-model="lineColor" title="颜色选择器"></el-color-picker>
      <el-button class="icon-btn" title="撤销" @click="undoDrawImage">
        <img src="./icons/icon-undo.svg" />
      </el-button>
      <el-button class="icon-btn" title="完成" @click="saveDrawImage">
        <img src="./icons/icon-complete.svg" />
      </el-button>
      <el-button class="icon-btn" title="取消" @click="exitDrawImage">
        <img src="./icons/icon-cancel.svg" />
      </el-button>
    </div>
    <canvas
      id="ImageDraw"
      :width="width-50"
      :height="height"
      style="margin-left:50px;"
      @mousedown="canvasDown($event)"
      @mouseup="canvasUp($event)"
      @mousemove="canvasMove($event)"
      @touchstart="canvasDown($event)"
    ></canvas>
  </div>
</template>

<script>
import "canvas-arrow";

export default {
  name: "ImageDraw",
  props: {
    url: {
      type: String,
      required: false
    },
    width: {
      // 绘图区域宽度
      type: Number
    },
    height: {
      // 绘图区域高度
      type: Number
    }
  },
  data() {
    return {
      drawContextDisplay: false,
      canvas: null,
      pWidth: 0,
      pHeight: 0,
      lineType: "pencel",
      lineColor: "#ff0000",
      lineWidth: 2,
      imageBase64: "",
      context: {},
      canDraw: true,
      // 是否处于绘制状态
      canvasMoveUse: false,
      // 绘制矩形和椭圆时用来保存起始点信息
      beginRec: {
        x: "",
        y: "",
        imageData: ""
      },
      beginArrowhead: {
        x: "",
        y: ""
      },
      // 储存坐标信息
      drawInfo: [],
      img: new Image(),
      imgStack: [],
      beginDraw: false
    };
  },
  created() {},
  mounted() {
    this.canvas = document.getElementById("ImageDraw");
    this.context = this.canvas.getContext("2d");
    this.context.clearRect(0, 0, this.width, this.width);
    this.initDraw();
  },
  methods: {
    loadImage(url) {
      this.context.clearRect(0, 0, this.width, this.width);
      this.imageBase64 = url;
      this.drawContextDisplay = true;
      this.initDraw();
    },
    initDraw() {
      this.canvasMoveUse = false;
      let _self = this;
      var temp = document.getElementById("textAreaCanvas");
      if (temp) {
        document.getElementById("drawContext").removeChild(temp);
      }
      this.context.clearRect(0, 0, this.width, this.width);
      this.imgStack.length = 0;
      this.img.src = this.imageBase64;
      this.img.onload = () => {
        let imageH = (_self.width-50)*9/16
        _self.context.drawImage(
          _self.img,
          0,
          _self.height/2-imageH/2,
          _self.width - 50,
          imageH
        );
      };
      this.context.lineWidth = this.lineWidth;
      this.context.strokeStyle = this.lineColor;
    },
    // 鼠标按下
    canvasDown(e) {
      if (this.canDraw) {
        this.context.strokeStyle = this.lineColor;
        this.canvasMoveUse = true;
        // client是基于整个页面的坐标，offset是cavas距离pictureDetail顶部以及左边的距离
        const canvasX = e.layerX;
        const canvasY = e.layerY;
        // 记录起始点和起始状态
        this.beginRec.x = canvasX;
        this.beginRec.y = canvasY;
        this.beginRec.imageData = this.context.getImageData(
          0,
          0,
          this.width,
          this.height
        );
        // 存储本次绘制坐标信息
        this.drawInfo.push({
          x: canvasX / this.width,
          y: canvasY / this.height,
          type: this.lineType
        });
        var imgData = this.context.getImageData(0, 0, this.width, this.width*9/16);
        this.imgStack.push(imgData);
        if (this.lineType == "pencel") {
          this.beginDraw = true;

          this.context.putImageData(this.beginRec.imageData, 0, 0);
          this.context.save();
          this.context.beginPath();
          // this.context.moveTo(e.layerX, e.layerY)
        } else if (this.lineType == "circle") {
          var imgData = this.context.getImageData(
            0,
            0,
            this.width,
            this.height
          );
          // this.imgStack.push(imgData);
        } else if (this.lineType == "rec") {
          var imgData = this.context.getImageData(
            0,
            0,
            this.width,
            this.height
          );
          this.imgStack.push(imgData);
        } else if (this.lineType == "arrowhead") {
          this.beginDraw = true;
          var imgData = this.context.getImageData(
            0,
            0,
            this.width,
            this.height
          );
          //this.imgStack.push(imgData);
          this.context.putImageData(this.beginRec.imageData, 0, 0);
          this.context.save();
          this.context.beginPath();
          this.beginArrowhead = { x: e.layerX, y: e.layerY };
        } else if (this.lineType == "text") {
          var imgData = this.context.getImageData(
            0,
            0,
            this.width,
            this.height
          );
          // this.imgStack.push(imgData);
          var temp = document.getElementById("textAreaCanvas");
          if (temp) {
            document.getElementById("drawContext").removeChild(temp);
          }
          let x = e.layerX;
          let y = e.layerY;
          var textArea = document.createElement("textarea");
          document.getElementById("drawContext").appendChild(textArea);
          textArea.style.position = "absolute";
          textArea.style.top = y - 15 + "px";
          textArea.style.left = x + 50 + "px";
          textArea.style.background = "transparent";
          textArea.style.color = this.lineColor;
          // textArea.focus();
          textArea.style.font = "italic small-caps bold 14px arial";
          textArea.id = "textAreaCanvas";
          let _self = this;
          this.canvasMoveUse = false;

          textArea.onblur = function() {
            _self.drawText(textArea.value, x, y);
          };
        }
      }
    },
    // 鼠标移动时绘制
    canvasMove(e) {
      console.log(this.lineType, this.canvasMoveUse, this.canDraw);
      let _self = this;
      if (this.canvasMoveUse && this.canDraw) {
        this.context.strokeStyle = this.lineColor;
        // client是基于整个页面的坐标，offset是cavas距离pictureDetail顶部以及左边的距离
        let canvasX = e.layerX;
        let canvasY = e.layerY;
        if (this.lineType === "rec") {
          // 绘制矩形时恢复起始点状态再重新绘制

          this.context.putImageData(this.beginRec.imageData, 0, 0);
          this.context.beginPath();
          this.context.rect(
            this.beginRec.x,
            this.beginRec.y,
            canvasX - this.beginRec.x,
            canvasY - this.beginRec.y
          );
          let info = this.drawInfo[this.drawInfo.length - 1];
          info.w = canvasX / this.width - info.x;
          info.h = canvasY / this.height - info.y;
        } else if (this.lineType === "circle") {
          // 绘制椭圆时恢复起始点状态再重新绘制

          this.context.putImageData(this.beginRec.imageData, 0, 0);
          this.context.beginPath();
          let a = (canvasX - this.beginRec.x) / 2;
          let b = (canvasY - this.beginRec.y) / 2;
          this.drawEllipse(
            this.context,
            this.beginRec.x + a,
            this.beginRec.y + b,
            a > 0 ? a : -a,
            b > 0 ? b : -b
          );
          let info = this.drawInfo[this.drawInfo.length - 1];
          info.a = a / this.width;
          info.b = b / this.height;
        } else if (this.lineType == "pencel") {
          if (this.beginDraw) {
            this.context.lineTo(e.layerX, e.layerY);
            this.context.stroke();
          }
        } else if (this.lineType === "arrowhead") {
          if (this.beginDraw) {
            this.context.putImageData(this.beginRec.imageData, 0, 0);
            this.context.beginPath();
            this.context.fillStyle = this.lineColor;
            this.context.fillArrow(
              this.beginArrowhead.x,
              this.beginArrowhead.y,
              e.layerX,
              e.layerY
            ); //或ctx.drawArrow(10, 10, 80, 100)
            this.context.fill();
          }
        } else if (this.lineType === "text") {
          this.canvasMoveUse = false;
        }
        this.context.stroke();
      }
    },
    // 鼠标抬起
    canvasUp(e) {
      if (this.canDraw) {
        this.canvasMoveUse = false;
        if (this.lineType == "pencel") {
          // this.context.closePath();
        } else if (this.lineType == "arrowhead") {
          this.context.closePath();
        }
      }
    },
    drawText(text, x, y) {
      console.log(text);
      var _self = this;
      _self.context.textAlign = "stleft art";
      _self.context.font = "italic small-caps bold 14px arial";
      _self.context.fillStyle = _self.lineColor;
      _self.context.fillText(text, x, y);
    },
    // 绘制椭圆
    drawEllipse(context, x, y, a, b) {
      context.save();
      var r = a > b ? a : b;
      var ratioX = a / r;
      var ratioY = b / r;
      context.scale(ratioX, ratioY);
      context.beginPath();
      context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
      context.closePath();
      context.restore();
    },
    Area(p0, p1, p2) {
      let area = 0.0;
      area =
        p0.x * p1.y +
        p1.x * p2.y +
        p2.x * p0.y -
        p1.x * p0.y -
        p2.x * p1.y -
        p0.x * p2.y;
      return area / 2;
    },
    // 计算多边形质心
    getPolygonAreaCenter(points) {
      let sum_x = 0;
      let sum_y = 0;
      let sum_area = 0;
      let p1 = points[1];
      for (var i = 2; i < points.length; i++) {
        let p2 = points[i];
        let area = this.Area(points[0], p1, p2);
        sum_area += area;
        sum_x += (points[0].x + p1.x + p2.x) * area;
        sum_y += (points[0].y + p1.y + p2.y) * area;
        p1 = p2;
      }
      return {
        x: sum_x / sum_area / 3,
        y: sum_y / sum_area / 3
      };
    },
    // 根据坐标信息绘制图形
    drawWithInfo() {
      this.info.forEach(item => {
        this.context.beginPath();
        if (!item.type) {
          // 设置颜色
          this.context.strokeStyle = item.regionColor;
          this.context.fillStyle = item.regionColor;
          // 绘制多边形的边
          if (typeof item.region === "string") {
            item.region = JSON.parse(item.region);
          }
          item.region.forEach(point => {
            this.context.lineTo(point.x * this.width, point.y * this.height);
          });
          this.context.closePath();
          // 在多边形质心标注文字
          let point = this.getPolygonAreaCenter(item.region);
          this.context.fillText(
            item.areaName,
            point.x * this.width,
            point.y * this.height
          );
        } else if (item.type === "rec") {
          this.context.rect(
            item.x * this.width,
            item.y * this.height,
            item.w * this.width,
            item.h * this.height
          );
        } else if (item.type === "circle") {
          this.drawEllipse(
            this.context,
            (item.x + item.a) * this.width,
            (item.y + item.b) * this.height,
            item.a > 0 ? item.a * this.width : -item.a * this.width,
            item.b > 0 ? item.b * this.height : -item.b * this.height
          );
        }
        this.context.stroke();
      });
    },
    saveDrawImage() {
      this.imageBase64 = this.canvas.toDataURL("image/png");
      this.$emit("getDrawImage", this.imageBase64);
      this.drawContextDisplay = false;
      this.$emit("getEditMode", true);
    },
    exitDrawImage() {
      this.drawContextDisplay = false;
      this.$emit("getEditMode", true);
    },
    /**
     * 修改画笔模式
     */
    changeCanvasMode(type) {
      this.context.save;
      let temp = document.getElementById("textAreaCanvas");
      if (temp) {
        document.getElementById("drawContext").removeChild(temp);
      }
      this.beginDraw = false;
      this.lineType = type;
      this.canvasMoveUse = false;
    },
    undoDrawImage: function() {
      console.log(this.imgStack.length);
      let temp = document.getElementById("textAreaCanvas");
      if (temp) {
        document.getElementById("drawContext").removeChild(temp);
      }
      if (this.imgStack.length > 0) {
        this.context.clearRect(0, 0, this.width, this.width*9/16);
        var imgData = this.imgStack.pop();
        this.context.putImageData(imgData, 0, 0);
      } else {
        this.initDraw();
        // this.$message.error('已经是最后一步了')
      }
    }
  }
};
</script>


<style lang="scss">
#drawToolbar {
  width: 50px;
  height: 80%;
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  .icon-btn {
    background: #ddd;
    border: 0;
    border-bottom: 1px solid #ddd;
    padding: 5px;
    margin-top: 10px;
    display: block;
    margin: 12px auto;
    img{
      height: 20px;
    }
  }
  .icon-btn:first-child {
    margin-top: 60px;
  }
}
</style>
