<template>
  <view :class="['theme-' + themeColor.name]">
    <Header title="兑换" />
    <template v-if="success">
      <view class="success-box">
        <SvgIcon icon="icon2" class="icon2" />
        <view class="text">转入成功</view>
        <view class="btn" @click="backPage">返回</view>
      </view>
    </template>
    <template v-else>
      <view class="card1">
        <view class="item1">
          <view class="icon-box">
            <SvgIcon icon="icon1" class="icon" />
          </view>
          <view class="text1"> 可兑换金币:{{ parseInt(gold) }} </view>
        </view>
        <view class="text2"> 兑换比例100:1 </view>
      </view>
      <view class="card2">
        <view class="title">兑换数量</view>
        <LHInput
          v-model="value"
          class="input-box"
          placeholder="请输入兑换数量"
          type="number"
          @blur="handleBlur"
        >
          <template #right>
            <view class="text-all" @click="value = gold">全部</view>
          </template>
        </LHInput>
      </view>
      <view class="btn" @click="handleConvert" :class="{ disabled }">确定</view>
    </template>
  </view>
</template>
<script>
import Header from "@/components/common/header/index.vue";
import LHInput from "@/components/common/LHInput/index.vue";
import SvgIcon from "@/components/svg-icon/index.vue";
import Playing from "@/utils/common/playing";
import defaultTemplate from "@/utils/defaultTemplate";
import { mapGetters } from 'pinia';
import { convertData, convert } from "@/utils/user/gold.js";
export default {
  components: {
    Header,
    LHInput,
    SvgIcon,
  },
  data() {
    return {
      value: "",
      success: false,
      gold: 0,
      ratio: 0,
      playing: new Playing(),
    };
  },
  computed: {
    ...mapGetters(["themeColor"]),
    disabled() {
      return !this.value || parseFloat(this.value) > parseFloat(this.gold);
    },
  },
  methods: {
    handleBlur(val) {
      if (val <= 0) {
        val = 1;
      }
      this.value = val;
    },
    backPage() {
      backPage();
    },
    handleConfirm() {
      this.success = true;
    },
    async getConvertData() {
      const res = await convertData();
      console.log(res);
      const { gold, ratio } = defaultTemplate(
        { gold: "", ratio: "" },
        res.result
      );
      this.gold = gold;
      this.ratio = ratio;
    },
    async handleConvert() {
      if (this.disabled) {
        return;
      }
      const res = await convert({ goldNum: parseFloat(this.value) });
      if (res.code !== 200) {
        pop(res.message, 1000);
        return;
      }
      this.success = true;
    },
  },
  mounted() {
    this.getConvertData();
  },
};
</script>
<style lang="scss" scoped>
.card1 {
  margin-top: 20rpx;
  background: #fff;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  padding: 20rpx 28rpx;
  .item1 {
    display: flex;
    align-items: center;
    .icon-box {
      width: 68rpx;
      height: 68rpx;
      border-radius: 24rpx;
      display: grid;
      place-content: center;
      background: var(--theme-auxiliary-color-default);
      .icon {
        width: 48rpx;
        height: 48rpx;
        color: var(--theme-color);
      }
    }
    .text1 {
      color: #404844;
      font-size: 30rpx;
      margin-left: 20rpx;
    }
  }
  .text2 {
    margin-top: 20rpx;
    padding-top: 20rpx;
    border-top: 1px solid var(--theme-auxiliary-color-default);
    color: var(--theme-auxiliary-color-remind);
    font-size: 26rpx;
  }
}
.card2 {
  margin-top: 20rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx 28rpx;
  .title {
    color: #404844;
    font-size: 34rpx;
    display: flex;
    align-items: center;
    &::before {
      content: "";
      width: 8rpx;
      height: 24rpx;
      background: var(--theme-color);
      margin-right: 20rpx;
    }
  }
  .input-box {
    border: 1px solid var(--theme-color);
    border-radius: 24rpx;
    margin-top: 20rpx;
    overflow: hidden;
    /deep/ .lh-input {
      height: 96rpx;
    }
    .text-all {
      font-size: 30rpx;
      color: var(--theme-color);
    }
  }
}
.btn {
  background: var(--theme-color);
  border-radius: 16rpx;
  height: 88rpx;
  display: grid;
  place-content: center;
  color: #fff;
  margin: 40rpx 28rpx;
}
.disabled {
  background: #c4c4c4;
}
.success-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .icon2 {
    margin-top: 100rpx;
    width: 228rpx;
    height: 228rpx;
    color: var(--theme-color);
  }
  .text {
    font-size: 28rpx;
    color: #3e4347;
    margin-top: 20rpx;
  }
  .btn {
    width: calc(100% - 56rpx);
  }
}
</style>
