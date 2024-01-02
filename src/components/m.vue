<template>
  <div class="page-moments">
    <header class="header">
      <div class="header-banner"></div>
      <!-- 自己的用户名、头像 -->
      <div class="header-user">
        <span class="user-name">{{ user.name }}</span>
        <a class="user-link" href="#">
          <img :src="user.avatar" alt="" />
        </a>
      </div>
    </header>
    <!-- 朋友圈列表 -->
    <div class="moments-list">
      <div class="moments-item" v-for="(item, i) in items" :index="i" :key="i">
        <!-- 用户头像 -->
        <a class="item-left" href="#">
          <img :src="item.user.avatar" width="42" height="42" alt="" />
        </a>
        <!-- 用户发表的内容 -->
        <div class="item-right">
          <a class="item-name" href="#">{{ item.user.name }}</a>
          <p class="item-msg">{{ item.title }}</p>
          <ul class="item-pic" v-if="item.images.length > 0">
            <img
              v-for="(img, imgIndex) in item.images"
              class="pic-item"
              :src="img"
              alt=""
              :key="imgIndex"
            />
          </ul>
          <a v-if="item.share.img" class="item-share" href="#">
            <img
              class="share-img"
              :src="item.share.img"
              width="40"
              height="40"
              alt=""
            />
            <p>{{ item.share.text }}</p>
          </a>
          <!-- 时间 -->
          <div class="item-ft">
            <span class="item-time">{{ item.timestr }}</span>
            <div class="item-reply-btn">
              <span class="item-reply">
                <i class="iconfont icon-gengduo"></i>
              </span>
            </div>
            <div class="reply-panel z-show">
              <div class="reply-btn js-like" v-if="!item.thumbsupTextIndex">
                <i class="iconfont icon-like"></i>
                <span class="reply-btn-text">点赞</span>
              </div>
              <div class="reply-btn js-unlike" v-if="item.thumbsupTextIndex">
                <i class="iconfont icon-like_fill"></i>
                <span class="reply-btn-text">取消</span>
              </div>
              <div class="reply-btn js-comment">
                <i class="iconfont icon-pinglun"></i>
                <span class="reply-btn-text" @click="showCommentPanel"
                  >评论</span
                >
              </div>
            </div>
          </div>
          <!-- 回复区域 -->
          <div class="reply-zone">
            <!-- 点赞列表 -->
            <div v-if="item.thumbsup.length > 0" class="reply-like">
              <i class="iconfont icon-like"></i>
              <a
                v-for="(tu, tindex) in item.thumbsup"
                class="reply-who"
                href="#"
                :key="tindex"
                >{{ tu }}</a
              >
            </div>
            <div v-if="item.replies.length > 0" class="reply-comment">
              <div
                v-for="(reply, rindex) in item.replies"
                class="comment-item"
                :key="rindex"
              >
                <a class="reply-who" href="#">{{ reply.user }}</a
                >: <span @click="showReplyPanel(i)">{{ reply.text }}</span>
              </div>
            </div>
          </div>
          <div v-if="item.showReplyPanel">
            <h2>回复区</h2>
          </div>
        </div>
      </div>
      <div :class="{ commenter: true, 'z-show': showCommenter }">
        <input class="commenter-input" type="text" placeholder="评论" />
        <button class="js-send-msg z-work">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      // 提交评论数据，show 控制评论对话框的显示与隐藏，text绑定评论内容，
      // currIndex记录朋友圈的记录的索引
      commenter: { show: false, text: "", currIndex: null },
    };
  },
  computed: {
    showCommenter() {
      return this.commenter.show;
    },
  },
  mounted() {
    this.items = this.loadMoments();
    // this.addClickListener()
  },
  methods: {
    loadMoments() {
      return [
        {
          user: {
            name: "阳和",
            avatar:
              "https://iconfont.alicdn.com/p/illus/preview_image/tYrKasQ01AdP/98d7e268-3c93-4512-a21e-d2533e8b7a08.png",
          },
          title: "华仔真棒，新的一年继续努力",
          images: [
            "https://iconfont.alicdn.com/p/illus/preview_image/qbG63uQ5S5I6/ca27e540-8864-467e-8cdd-ec7e7dc3ad30.png",
            "https://iconfont.alicdn.com/p/illus/preview_image/qbG63uQ5S5I6/6091fd53-8662-47e5-a58b-c9cd9ff88a06.png",
            "https://iconfont.alicdn.com/p/illus/preview_image/qbG63uQ5S5I6/f129fe65-7613-4781-80a5-aa0d1ca70a50.png",
            "https://iconfont.alicdn.com/p/illus/preview_image/qbG63uQ5S5I6/02d22723-01cb-4aef-a850-712f48be883f.png",
          ],
          timestr: "3分钟前",
          showReplyPanel: false,
          share: {},
          thumbsup: ["Guo 封面", "源小神"],
          thumbsupTextIndex: 0,
          replies: [
            { user: "Guo 封面", text: "你也喜欢华仔哈" },
            { user: "喵仔zsy", text: "华仔实至名归" },
          ],
        },
        {
          user: {
            name: "伟科大人",
            avatar:
              "https://iconfont.alicdn.com/p/illus/preview_image/tYrKasQ01AdP/9467e915-6b9b-41e4-8fb2-8e145e33e967.png",
          },
          title: "全面读书日",
          images: [],
          timestr: "50分钟前",
          showReplyPanel: false,
          share: {
            img: "http://codelover.club/icons/taskgroup/icon5.svg",
            text: "飘洋过海来看你",
          },
          thumbsup: ["阳和"],
          thumbsupTextIndex: 0,
          replies: [],
        },
        {
          user: {
            name: "深圳周润发",
            avatar:
              "https://iconfont.alicdn.com/p/illus/preview_image/tYrKasQ01AdP/9b5d9981-e2a2-413f-be1b-507b8f7a5310.png",
          },
          title: "很好的色彩",
          images: ["https://cn.vuejs.org/logo.svg"],
          timestr: "一小时前",
          showReplyPanel: false,
          share: {},
          thumbsup: [],
          thumbsupTextIndex: 0,
          replies: [],
        },
        {
          user: {
            name: "喵仔咖啡",
            avatar:
              "https://iconfont.alicdn.com/p/illus/preview_image/tYrKasQ01AdP/29e5f7f0-1fc7-480a-823d-5fa22d3141a3.png",
          },
          title: "以后的咖啡不敢浪费了",
          images: [],
          timestr: "2小时前",
          showReplyPanel: false,
          share: {},
          thumbsup: [],
          thumbsupTextIndex: 0,
          replies: [],
        },
      ];
    },
    // 监听点击事件
    addClickListener() {
      var self = this;
      document.addEventListener("click", function (e) {
        for (let i = 0; i < self.$refs.replyArea.length || 0; i++) {
          if (e.target == self.$refs.replyArea[i]) {
            return;
          }
        }
        for (let i = 0; i < self.items.length; i++) {
          self.items[i].showReplyPanel = false;
        }
      });
    },
    // 显示回复对话框
    showReplyPanel(index) {
      this.items[index].showReplyPanel = this.items[index].showReplyPanel
        ? false
        : true;
    },
    // 显示评论区
    showCommentPanel() {
      this.commenter.show = true;
    },
  },
};
</script>

<style>
@import "../../static/css/common.css";

.header {
  position: relative;
}

.header-banner {
  height: 250px;
  background: url("https://iconfont.alicdn.com/p/illus/preview_image/Iims03atLedq/4dabab6a-32de-4dc0-a5f2-f32d9486f15a.png")
    no-repeat center;
  background-color: #f9f9f9;
}

.header-user {
  position: absolute;
  right: 10px;
  bottom: -20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.user-name {
  margin-right: 10px;
  color: #fff;
  font-weight: bold;
}

.user-link img {
  width: 70px;
  height: 70px;
}

.moments-list {
  margin-top: 50px;
  padding: 0 8px;
}

.moments-item {
  display: flex;
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid #b3b3b3;
}

.moments-item .item-left {
  width: 42px;
  height: 42px;
}

.moments-item .item-left img {
  width: 100%;
  height: 100%;
}

.moments-item .item-right {
  margin: 0;
  margin-left: 8px;
  padding: 0;
  flex: 1;
}

.moments-item .item-right .item-name {
  color: #5892d1;
  font-size: 14px;
}

.moments-item .item-right .item-msg {
  margin-bottom: 8px;
  font-size: 15px;
}

.moments-item .item-right .item-pic {
  display: flex;
  align-items: flex-start;
  justify-items: flex-start;
  flex-flow: wrap;
}

.moments-item .item-right .item-pic img {
  margin-right: 8px;
  margin-bottom: 8px;
  width: 75px;
  height: 75px;
}

.moments-item .item-right .item-share {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: rgb(240, 240, 240);
  color: #000;
}

.share-img {
  margin-right: 8px;
}

.moments-item .item-right .item-ft {
  position: relative;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.moments-item .item-right .item-ft .item-time {
  font-size: 14px;
  color: #b3b3b3;
}

.reply-panel {
  position: absolute;
  right: 20px;
  display: none;
  background: rgb(62, 62, 62);
}

.reply-panel .reply-btn {
  text-align: center;
  line-height: 30px;
  width: 75px;
  height: 30px;
  color: #fff;
}

.moments-item .item-right .reply-zone {
  margin-top: 10px;
  background: rgb(240, 240, 240);
}

.moments-item .item-right .reply-like,
.moments-item .item-right .reply-who {
  color: #5892d1;
}

.moments-item .item-right .reply-like {
  padding: 3px 5px;
}

.moments-item .item-right .reply-comment {
  padding: 5px;
  border-top: 1px solid #b3b3b3;
}

.commenter {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 8px 0 12px;
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 55px;
  background: #f7f7f7;
}

.z-show {
  display: flex;
}

.commenter .commenter-input {
  padding-left: 8px;
  flex: 1;
  height: 40px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 1px solid;
  border-color: #e5e5e5;
  border-radius: 3px;
}

input[type="text"]:focus {
  border-color: #e5e5e5;
  outline: #e5e5e5;
}

.commenter .js-send-msg {
  background: rgb(60, 165, 17);
  border: none;
  height: 30px;
  border-radius: 3px;
  color: #fff;
}
</style>