<template>
  <scroll-view class="list-scroll" scroll-y style="height: 100%" @scrolltolower="loadMore" @touchmove.stop>
    <LuntanLoading v-if="!list.length && status === 'loading'" text="加载中" />
    <empty
      style="height: 100%"
      v-if="!list.length && status === 'nomore'"
    ></empty>
    <view class="list-row" v-if="list.length">
      <view
        class="list-item"
        v-for="(item, index) in list"
        @click="detail(item)"
      >
        <view class="image-item">
          <fast-lazy-load
            :src="getImgUrl(item)"
            width="100%"
            height="356rpx"
            radius="8rpx"
            mode="aspectFill"
            :id="`qw${index + 1}`"
            isMark
          >
            <template v-slot:loading>
              <image class="lazy-image" :src="loadingImg"></image>
            </template>
            <template v-slot:error>
              <image class="lazy-image" :src="loadingImg"></image>
            </template>
          </fast-lazy-load>
        </view>
        <view class="text">
          <image
            @click.stop="homepage(item)"
            class="headPic"
            :src="item.headPic"
          ></image>
          <text class="title">{{ item.title }}</text>
          <view class="zan" @click.stop="thumbUp(item)">
            <img
              v-if="item.thumbUpCount > 0"
              src="/static/img/zan-fill.png"
              alt=""
              class="zan-img"
            />
            <img
              v-else
              src="/static/img/zan-stroke.png"
              alt=""
              class="zan-img"
            />
            <span class="num">{{ item.thumbUpCount | moneyFormat }}</span>
          </view>
        </view>
      </view>
    </view>
    <u-loadmore
      v-if="list.length"
      :status="status"
      style="padding-bottom: 20rpx"
    />
    <slot name="footer" v-if="list.length"></slot>
  </scroll-view>
</template>
<script>
import { listLatest } from "@/utils/forum/index.js";
import defaultTemplate from "@/utils/defaultTemplate";
import empty from "@/components/common/empty/empty.vue";
export default {
  components: { empty },
  props: {
    sort: Number,
  },
  data() {
    return {
      list: [],
      pageNum: 1,
      pageSize: 10,
      searchValue: "",
      status: "loadmore",
      loadingImg: "/static/img/zw.png",
      lotteryType: this.$config.getStorageSync(
        this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE
      ),
    };
  },
  mounted() {
    this.initData();
  },

  methods: {
    search(searchValue) {
      this.pageNum = 1;
      this.searchValue = searchValue;
      this.lists();
    },
    loadMore() {
      if (this.status === "nomore") {
        return;
      }
      this.pageNum++;
      this.lists();
    },
    async lists() {
      this.status = "loading";
      const res = await listLatest({
        type: 2,
        sort: this.sort,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        lotteryType: this.lotteryType,
      });
      const { records } = defaultTemplate({ records: [] }, res.result);
	  console.log(records)
      if (!records.length || records.length < this.pageSize) {
        this.status = "nomore";
      }else {
        this.status = 'loadmore';
      }
      this.list = this.list.concat(records);
	  console.log(this.status);
    },
    getImgUrl(item) {
      return item.pictureList?.[0] || item.headPic;
    },
    detail(item) {
      item.read = 1;
      uni.navigateTo({
        url: `/pages/luntan/masterForum/detail?id=${item.articleId}&type=2&createTime=${item.createTime}`,
        success(res) {
          res.eventChannel.emit("argParams", {
            lotteryType: this.lotteryType,
          });
        },
      });
    },
    homepage(item) {
      uni.navigateTo({
        url: `/pages/common/userCenter/homepage/homepage?userId=${item.userId}`,
      });
    },
    initData(){
      console.log("LIST INIT DATA");
      this.pageNum=1;
      this.list=[];
      this.lotteryType=this.$config.getStorageSync(
          this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYTYPE
      ),
      this.lists();
      let configData = this.$config.getStorageSync(
          this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG
      );
      this.loadingImg = configData.find((item) => item.type == 23)?.url || "";
    }

  },
};
</script>
<style lang="scss">
.list-scroll{
  touch-action: none;
}

.list-row {
  padding: 20rpx;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  .list-item:nth-child(2n) {
    margin-left: 5px;
  }
  .list-item:nth-child(2n + 1) {
    margin-right: 5px;
  }
  .list-item {
    width: calc(50% - 5px);
    margin-bottom: 20rpx;
    border-radius: 12rpx;
    position: relative;
    background: #fff;
    .image-item {
      height: 356rpx;
      display: flex;
      .lazy-image {
        width: 100%;
        height: 100%;
        margin: auto;
        background: #f7f8fa;
      }
    }
    .text {
      display: flex;
      align-items: center;
      padding: 20rpx;
      .headPic {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
      }
      .title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 10rpx;
        color: #404040;
        font-size: 24rpx;
      }
      .zan {
        display: flex;
        align-items: center;
        .zan-img {
          width: 30rpx;
          height: 30rpx;
        }
        .num {
          margin-left: 10rpx;
          color: #404040;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
