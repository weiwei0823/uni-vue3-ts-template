<template>
  <view class="vector" :class="['theme-' + themeColor.name]">
    <Header>
      <template #left>
        <view @click="backPage">
          <SvgIcon icon="Light" class="Light" />
        </view>
      </template>
      <template #right>
        <view class="right-text" @click="goDetails">领取记录</view>
      </template>
    </Header>
    <view class="bg">
      <svg
        class="vector-bg"
        width="375"
        height="254"
        viewBox="0 0 375 254"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_2731_145475"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="375"
          height="254"
        >
          <path
            d="M0 0H375V234.095C375 234.095 316 254 187.5 254C53.5 254 0 234.095 0 234.095V0Z"
            fill="url(#paint0_linear_2731_145475)"
          />
        </mask>
        <g mask="url(#mask0_2731_145475)">
          <ellipse
            cx="331.071"
            cy="6.5"
            rx="296.071"
            ry="296.5"
            fill="url(#paint1_linear_2731_145475)"
            fill-opacity="0.2"
          />
          <ellipse
            cx="437.917"
            cy="-33.5"
            rx="296.071"
            ry="296.5"
            fill="url(#paint2_linear_2731_145475)"
            fill-opacity="0.16"
          />
          <ellipse
            cx="555.745"
            cy="-95.5"
            rx="296.071"
            ry="296.5"
            fill="url(#paint3_linear_2731_145475)"
            fill-opacity="0.1"
          />
          <ellipse
            cx="56"
            cy="27.5"
            rx="396"
            ry="292.5"
            fill="url(#paint4_radial_2731_145475)"
            fill-opacity="0.9"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_2731_145475"
            x1="187.5"
            y1="0"
            x2="187.5"
            y2="254.365"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#07C160" />
            <stop offset="1" stop-color="#04AF56" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2731_145475"
            x1="82.5"
            y1="-3"
            x2="331.071"
            y2="303"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2731_145475"
            x1="199"
            y1="-3.49998"
            x2="334"
            y2="242.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2731_145475"
            x1="302"
            y1="-0.499996"
            x2="355"
            y2="106.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <radialGradient
            id="paint4_radial_2731_145475"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(120 14) rotate(68.9788) scale(200 341.563)"
          >
            <stop stop-color="var(--theme-color)" />
            <stop offset="1" stop-color="#07C160" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </view>
    <scroll-view scroll-y class="content">
      <view class="item1">
        <AvatarBox :avatarUrl="userInfo.headImgUrl" :size="96" :radius="16" />
        <view class="center">
          <view class="title">已连续签到{{ parseInt(keepDay) }}天</view>
          <view class="tip">签到可获得{{ parseInt(goldNum) }}金币</view>
        </view>
        <view class="right">
          <SvgIcon icon="coin" class="coin" />
          {{ parseInt(totalGold) }}
        </view>
      </view>
      <view class="card1">
        <view class="title">签到领好礼</view>
        <LuntanLoading class="loading" v-if="loading" />
        <view class="items" v-if="sevenDaySignVos.length">
          <view
            class="item"
            :class="{
              active: [1, 2].includes(item.status),
              receive: item.status === 1,
            }"
            v-for="(item, index) in sevenDaySignVos"
            @click="handleSign(item)"
          >
            <view class="item-title">{{ item.name }}</view>
            <SvgIcon icon="coin" class="coin" />
            <view class="tip">{{ item.rewardNum }}金币</view>
            <SvgIcon
              icon="box"
              class="box"
              v-if="index === sevenDaySignVos.length - 1"
            />
            <view class="receive-box">
              <SvgIcon icon="icon3" class="icon3" />
              <view class="text">已签到</view>
            </view>
          </view>
        </view>
      </view>
      <view class="card2">
        <view class="title">做任务赚金币</view>
        <LuntanLoading class="loading" v-if="loading" />
        <view class="items" v-if="keepSignVos.length">
          <view class="item" v-for="item in keepSignVos">
            <SvgIcon
              icon="calender3"
              class="calender"
              :replaceColor="['stop-color']"
            />
            <view class="center">
              <view class="item-title">
                连续签到
                <view class="number">{{ item.keepDays }}</view>
                天
              </view>
              <view class="tip">
                连续签到3天额外获得{{ item.rewardGoldNum }}金币
              </view>
            </view>
            <view
              class="right"
              :class="{
                active: [1, 2].includes(item.status),
                receive: item.status === 1,
              }"
              @click="handleSignReceive(item)"
            >
              <SvgIcon icon="coin" class="coin" />
              +{{ item.rewardGoldNum }}
              <view class="receive-box">已领取</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script>
import Header from "@/components/common/header/index.vue";
import SvgIcon from "@/components/svg-icon/index.vue";
import defaultTemplate from "@/utils/defaultTemplate";
import { mapGetters } from 'pinia';
import { details, sign, keepSignReceive } from "@/utils/user/gold.js";
import { pop } from "../../../utils/common";
export default {
  components: {
    Header,
    SvgIcon,
  },
  data() {
    return {
      loading: false,
      goldNum: 0,
      keepDay: 0,
      totalGold: 0,
      sevenDaySignVos: [],
      keepSignVos: [],
    };
  },
  computed: {
    ...mapGetters(["themeColor"]),
    userInfo() {
      return this.$store.state.appInfoStore?.userInfo || {};
    },
  },
  async mounted() {
    this.loading = true;
    const res = await details();
    this.loading = false;
    this.setData(res);
  },
  methods: {
    backPage() {
      backPage();
    },
    goDetails() {
      uni.navigateTo({
        url: "./vector-details",
      });
    },
    setData(res) {
      if (res.code !== 200) {
        uni.showToast({ title: res.message, icon: "none" });
        return;
      }
      const { goldNum, keepDay, totalGold, sevenDaySignVos, keepSignVos } =
        defaultTemplate(
          {
            goldNum: 0,
            keepDay: 0,
            totalGold: 0,
            sevenDaySignVos: [],
            keepSignVos: [],
          },
          res.result
        );
      this.goldNum = goldNum;
      this.keepDay = keepDay;
      this.totalGold = totalGold;
      this.keepSignVos = keepSignVos;
      this.sevenDaySignVos = sevenDaySignVos;
    },
    async handleSign(item) {
      if (item.status === 1) {
        uni.showToast({ title: "已领取", icon: "none" });
        return;
      }
      if (item.status !== 2) {
        uni.showToast({ title: "未到签到时间", icon: "none" });
        return;
      }
      const res = await sign({ day: item.signDay });
      this.setData(res);
    },
    async handleSignReceive(item) {
      if (item.status === 1) {
        uni.showToast({ title: "已领取", icon: "none" });
        return;
      }
      if (item.status !== 2) {
        uni.showToast({ title: "未达到领取条件", icon: "none" });
        return;
      }
      const res = await keepSignReceive({ id: item.id });
      this.setData(res);
    },
  },
};
</script>
<style lang="scss" scoped>
.vector {
  ::v-deep .header {
    background: transparent !important;
  }
  .Light {
    width: 24rpx;
  }
  .right-text {
    color: #fff;
    font-size: 34rpx;
    text-align: right;
  }
  .bg {
    z-index: -1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 508rpx;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 160%;
      height: 100%;
      background: var(--theme-color);
      left: -30%;
      border-radius: 0 0 50% 50%;
      z-index: 1;
    }
    .vector-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
  }
  .content {
    padding: 0 28rpx;
    box-sizing: border-box;
    height: calc(var(--vh) - 100rpx);
    .item1 {
      height: 96rpx;
      display: flex;
      align-items: center;
      padding-top: 40rpx;
      .center {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        line-height: 1;
        .title {
          color: #fff;
          font-size: 34rpx;
          font-weight: 500;
        }
        .tip {
          font-size: 26rpx;
          font-weight: 500;
          margin-top: 10rpx;
          color: #fff;
        }
      }
      .right {
        display: flex;
        align-items: center;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 16rpx;
        height: 72rpx;
        padding: 0 20rpx;
        font-weight: 500;
        font-size: 34rpx;
        .coin {
          width: 48rpx;
          height: 48rpx;
          margin-right: 12rpx;
        }
      }
    }
    .card1 {
      border-radius: 16rpx;
      box-shadow: 0px 4px 12px 0px #3939390f;
      background: #fff;
      margin-top: 60rpx;
      display: flex;
      flex-direction: column;
      padding: 34rpx 32rpx;
      .title {
        color: #404040;
        font-size: 34rpx;
        font-weight: 600;
      }
      .items {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24rpx 18rpx;
        margin-top: 28rpx;
        position: relative;
        .item {
          display: flex;
          flex-direction: column;
          background: var(--theme-auxiliary-color-default);
          border-radius: 12rpx;
          overflow: hidden;
          align-items: center;
          padding: 12rpx;
          position: relative;
          .item-title {
            color: #404040;
            font-size: 30rpx;
          }
          .coin {
            width: 48rpx;
            height: 48rpx;
            margin-top: 13rpx;
          }
          .tip {
            color: #a1a1a1;
            font-size: 26rpx;
            margin-top: 12rpx;
          }
          .receive-box {
            position: absolute;
            top: 0;
            background: #00000080;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            font-size: 26rpx;
            .icon3 {
              width: 80rpx;
              height: 80rpx;
            }
            .text {
              color: #fff;
              font-size: 26rpx;
            }
          }
        }
        .item:last-child {
          grid-column: 3 / -1;
          align-items: flex-start;
          padding-left: 40rpx;
          .coin {
            display: none;
          }
          .tip {
            margin-top: 0;
          }
          .box {
            width: 156rpx;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
        .item.active,
        .item.receive {
          background: var(--theme-color);
          .item-title,
          .tip {
            color: #fff;
          }
        }
        .item.receive .receive-box {
          opacity: 1;
        }
      }
    }
    .card2 {
      border-radius: 16rpx;
      box-shadow: 0px 4px 12px 0px #3939390f;
      background: #fff;
      margin-top: 28rpx;
      display: flex;
      flex-direction: column;
      padding: 34rpx 32rpx;
      .title {
        color: #404040;
        font-size: 34rpx;
        font-weight: 600;
      }
      .items {
        display: flex;
        flex-direction: column;
        margin-top: 36rpx;
        .item {
          display: flex;
          align-items: center;
          margin-bottom: 24rpx;
          padding-bottom: 36rpx;
          border-bottom: 1px solid #e6e6e6;
          &:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .calender {
            width: 60rpx;
            height: 60rpx;
            color: var(--theme-color);
          }
          .center {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin: 0 20rpx;
            .item-title {
              display: flex;
              color: #404040;
              font-size: 30rpx;
              .number {
                color: var(--theme-color);
              }
            }
            .tip {
              color: #a1a1a1;
              font-size: 26rpx;
            }
          }
          .right {
            background: var(--theme-auxiliary-color-default);
            border-radius: 62rpx;
            height: 62rpx;
            padding: 0 28rpx;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            font-size: 28rpx;
            .coin {
              width: 40rpx;
              height: 40rpx;
              margin-right: 12rpx;
              color: #404040;
              font-size: 28rpx;
            }
            .receive-box {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background: #00000080;
              color: #fff;
              display: grid;
              place-content: center;
              opacity: 0;
            }
          }
          .right.active {
            background: var(--theme-color);
            color: #fff;
          }
          .right.receive .receive-box {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
