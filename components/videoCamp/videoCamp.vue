<template>
    <div class="videoCoat">
        <div
            v-show="item.type == 1"
            class="prism-player"
            id="video"
        ></div>
        <el-image
            v-show="!item.type"
            :src="item.image"
            @click.stop="handleClickItem"
            :preview-src-list="[item.image]"
        ></el-image>
    </div>
</template>

<script>

export default {
  name: "videoCamp",
  props: {
    item: {
      type: Object,
      value: null
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    let script = document.createElement("script");
    script.src = "https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js";
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://g.alicdn.com/de/prismplayer/2.9.1/skins/default/aliplayer-min.css";
    script.onload = () => {
      this.init();
    };
    document.body.appendChild(script);
    document.body.appendChild(link);
  },
  methods: {
    handleClickItem(){
		this.$nextTick(()=>{
			// 获取遮罩层dom
			let domImageMask = document.querySelector(".el-image-viewer__mask");
			 if (!domImageMask) {
		 	  return;
		 	}
			domImageMask.addEventListener("click", () => {
			 	  // 点击遮罩层时调用关闭按钮的 click 事件
			  	 document.querySelector(".el-image-viewer__close").click();
			});
		})
},
    init() {
      this.player = new Aliplayer(
        {
          id: "video",
          width: "100%",
          autoplay: false,
          isLive: false,
          //支持播放地址播放,此播放优先级最高
          source: this.item.video,
          cover: this.item.image,
          rePlay: false,
          playsinline: true,
          preload: false,
          language: "en-us",
          controlBarVisibility: "hover",
          useH5Prism: true,
          skinLayout: [
            {
              name: "bigPlayButton",
              align: "blabs",
              x: 30,
              y: 80
            },
            {
              name: "H5Loading",
              align: "cc"
            },
            {
              name: "errorDisplay",
              align: "tlabs",
              x: 0,
              y: 0
            },
            {
              name: "infoDisplay"
            },
            {
              name: "tooltip",
              align: "blabs",
              x: 0,
              y: 56
            },
            {
              name: "thumbnail"
            },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                {
                  name: "progress",
                  align: "blabs",
                  x: 0,
                  y: 44
                },
                {
                  name: "playButton",
                  align: "tl",
                  x: 15,
                  y: 12
                },
                {
                  name: "timeDisplay",
                  align: "tl",
                  x: 10,
                  y: 7
                },
                {
                  name: "fullScreenButton",
                  align: "tr",
                  x: 10,
                  y: 12
                },
                {
                  name: "setting",
                  align: "tr",
                  x: 15,
                  y: 12
                },
                {
                  name: "volume",
                  align: "tr",
                  x: 5,
                  y: 10
                }
              ]
            }
          ]
        },
        function(player) {
          console.log("播放器创建好了。", player);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.videoCoat {
  width: 100%;
  height: 100%;
  position: relative;
  /deep/ .el-image{
    min-height: 548px;
    min-width: 548px;
  }
  /deep/ .el-image-viewer__close{
    display: none;
  }
  /deep/ .el-icon-zoom-out,/deep/ .el-icon-zoom-in, /deep/ .el-icon-full-screen, /deep/ .el-icon-refresh-left, /deep/ .el-icon-refresh-right{
    color: #fff;
  }
  #video {
    height: 100% !important;
    /deep/ .prism-big-play-btn {
      left: 43% !important;
      top: 43% !important;
      bottom: 0% !important;
    }
    /deep/ .prism-setting-list {
      .setting-content {
        span {
          color: #fff;
        }
      }
    }
    /deep/ .prism-speed-selector,
    /deep/ .prism-setting-selector {
      .header {
        span {
          color: #fff;
        }
      }
      .selector-list {
        li {
          span {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>