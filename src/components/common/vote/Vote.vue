<template>
  <view
    role="dialog"
    class="van-dialog"
    style="z-index: 2065"
    :class="['theme-' + themeColor.name]"
  >
    <view class="van-dialog__header">{{ year }}年第{{ period }}期</view>
    <view class="show">
      <view
        class="item-box"
        :class="{ act: animalId == item.animalId }"
        v-for="(item, index) in voteResult"
        :key="index"
        @click="animalId = item.animalId"
      >
        <view class="title">{{ item.animalName }}</view>
        <view class="text">{{ item.voteCount }}票</view>
      </view>
    </view>
    <view class="van-hairline--top van-dialog__footer" @click="vote">
      <view class="vote-btn-box">投票</view>
    </view>
  </view>
</template>

<script>
import { vote } from "../../../utils/user/index.js";
import { mapGetters } from 'pinia';
export default {
  name: "Vote",
  props: {
    relatedId: {
      type: Number,
      default: 0,
    },
    year: {
      type: Number,
      default: 0,
    },
    period: {
      type: Number,
      default: 0,
    },
    voteResult: {
      type: Array,
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      animalId: 0,
    };
  },
  computed: {
    ...mapGetters(["themeColor"]),
  },
  methods: {
    //投票
    vote: function () {
      if (!isLogin()) {
        this.$emit("closeVote");
        this.$emit("openPopup");
        return false;
      }
      if (!this.animalId) {
        pop("请选择要投票的选项");
        return false;
      }
      let prams = {
        animalId: this.animalId,
        relatedId: this.relatedId,
        type: this.type,
      };
      vote(prams)
        .then((res) => {
          this.$emit("closeVote");
          if (res.code == 200) {
          }
          pop(res.message, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.van-dialog {
  max-width: 960rpx;
}

.van-dialog {
  position: fixed;
  top: 45%;
  left: 50%;
  width: 600rpx;
  overflow: hidden;
  font-size: 32rpx;
  background-color: #fff;
  border-radius: 32rpx;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, -webkit-transform;
  transition-property: transform, opacity;
  transition-property: transform, opacity, -webkit-transform;
}

.van-dialog__header {
  height: 96rpx;
  display: grid;
  place-content: center;
  font-weight: 500;
  color: #404040;
  font-size: 34rpx;
}

.van-dialog__content {
  display: inline-block;
}

.dialog-set-vote {
}

.dialog-set-vote .item.act {
  background: var(--theme-color);
  color: #fff;
}

.dialog-set-vote .item.act .text {
  color: #fff !important;
}

.dialog-set-vote .item {
  border: 2rpx solid #f1f1f1;
  text-align: center;
  border-radius: 8rpx;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  padding: 16rpx 0;
}

.dialog-set-vote .item uni-view {
  font-size: 24rpx;
  color: #7e7e7e;
  padding-top: 6rpx;
}

.van-dialog__footer {
  height: 88rpx;
  width: 100%;
  color: var(--theme-color);
  border-top: 1px solid var(--theme-auxiliary-color-default);
  display: grid;
  place-content: center;
  margin-top: 28rpx;
}
</style>

<style lang="scss" scoped>
.show {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 38rpx;

  .item-box {
    margin-left: 20rpx;
    margin-top: 20rpx;
    width: 116rpx;
    height: 116rpx;
    display: grid;
    place-content: center;
    border-radius: 12rpx;
    border: 1px solid var(--theme-auxiliary-color-default);
    text-align: center;

    &:nth-child(-n + 4) {
      margin-top: 0;
    }

    &:nth-child(4n + 1) {
      margin-left: 0;
    }

    .title {
      font-size: 30rpx;
    }

    .text {
      font-size: 28rpx;
      color: #404040;
    }
  }

  .act {
    border: 1px solid var(--theme-color);
    color: var(--theme-color);
    .text {
      color: var(--theme-color);
    }
  }
}
</style>
