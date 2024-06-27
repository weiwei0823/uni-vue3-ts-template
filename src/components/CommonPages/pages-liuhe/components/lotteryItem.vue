<template>
    <view class="item" name="lottery-item" @click="onLotteryItemClick">
        <view class="label label-left" v-if="item.isNew || item.hot">
            <image class="xin" src="@/static/imgs-liuhe/index_02/categorys/item/xin.png" v-if="item.isNew && !item.hot">
            </image>
            <image class="re" src="@/static/imgs-liuhe/index_02/categorys/item/re.png" v-if="!item.isNew && item.hot">
            </image>
            <image class="xin_1" src="@/static/imgs-liuhe/index_02/categorys/item/xin_1.png" v-if="item.isNew && item.hot">
            </image>
            <image class="re_1" src="@/static/imgs-liuhe/index_02/categorys/item/re_1.png" v-if="item.isNew && item.hot">
            </image>
        </view>
        <view class="label label-right" v-if="item.isLive || item.isOpen">
            <image class="zhibo" src="@/static/imgs-liuhe/index_02/categorys/item/zhibo.png"
                v-if="item.isLive && !item.showDraw"></image>
            <image class="jrkj" src="@/static/imgs-liuhe/index_02/categorys/item/jrkj.png"
                v-if="!item.isLive && item.showDraw"></image>
            <image class="zhibo_1" src="@/static/imgs-liuhe/index_02/categorys/item/zhibo_1.png"
                v-if="item.isLive && item.showDraw"></image>
            <image class="jrkj_1" src="@/static/imgs-liuhe/index_02/categorys/item/jrkj_1.png"
                v-if="item.isLive && item.showDraw"></image>
        </view>
      <lazy-image class="lazy-image icon"
                  :scroll-top="scrollTop"
                  :src="item.icon"
                  :width="'100%'"
                  mode="widthFix">
        <template #loading>
          <image mode="widthFix" class="loading-image" :src="loadingImg"></image>
        </template>
      </lazy-image>
        <view class="right">
            <view class="name">{{ item.name }}</view>
            <view class="content">{{ item.content }}</view>
        </view>
    </view>
</template>

<script>
import lazyImage from "@/components/lazy-image/index.vue";

export default {
  components: {lazyImage},
  props: {
    item: Object,
    scrollTop: Number
  },
  data() {
    return {
      loadingImg: this.$store.state.appInfoStore.contantsConfigTypeMap['23']?.url,
    }
  },
  methods: {
    onLotteryItemClick() {
      this.$config.gameRouterMgr.doOpenGameDetails(this.item, this);
    },
  }
}
</script>
<style lang="scss" scoped>
.item {
    width: 336rpx;
    height: 136rpx;
    box-sizing: border-box;
    border-radius: 24rpx;
    background: var(--theme-auxiliary-color-default);
    padding: 20rpx;
    display: flex;
    position: relative;

    .label {
        position: absolute;
        top: 0;
        z-index: 1;
        line-height: 1;
        display: flex;

        image {
            height: 28rpx;
        }

        image+image {
            margin-left: 1px;
        }

        .xin,
        .re {
            width: 54rpx;
        }

        .xin_1 {
            width: 38rpx;
        }

        .re_1 {
            width: 56rpx;
        }

        .jrkj {
            width: 108rpx;
        }

        .jrkj_1 {
            width: 90rpx;
        }

        .zhibo,
        .zhibo_1 {
            width: 76rpx;
        }
    }

    .label-left {
        left: 0;
    }

    .label-right {
        right: 0;
    }

    .icon {
        width: 96rpx;
        height: 96rpx;
        margin-right: 20rpx;
        flex-shrink: 0;
    }

  .lazy-image {
    ::v-deep {
      .loading-img, .origin-img {
        width: 96rpx;
        height: 96rpx;

        img {
          object-fit: contain;
        }
      }
    }
  }

  .right {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .name {
            font-size: 28rpx;
            width: 200rpx;
            overflow: hidden;
            color: #404040;
            text-overflow: ellipsis;
        }

        .content {
            color: #404040;
            font-size: 22rpx;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}
</style>
