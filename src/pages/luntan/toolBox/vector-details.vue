<template>
  <view class="vector-details" :class="['theme-' + themeColor.name]">
    <Header title="金币记录" fixed/>
    <view class="content">
      <view class="head">
        <view class="select">
          <uni-data-select
            v-model="searchValue"
            :localdata="range"
            :clear="false"
            showStatusBarColor="#fff"
            @input="handleSearch"
          >
            <template #itemImg="item">
              <view class="item-img">
                <image
                  class="img"
                  v-if="item.value === searchValue"
                  src="@/static/imgs-liuhe/activity/item-selected.png"
                >
                </image>
              </view>
            </template>
          </uni-data-select>
        </view>
        <view class="right">
          <view class="name">金币：</view>
          <view class="num">{{ count }}</view>
        </view>
      </view>
      <LuntanLoading class="loading" v-if="loading" />
      <scroll-view
        scroll-y
        class="list"
        @scrolltolower="getGoldRecords"
        v-else-if="records.length"
      >
        <view class="item" v-for="item in records">
          <view class="left">
            <view class="title">{{ item.recordName }}</view>
            <view class="tip">{{ item.createTime }}</view>
          </view>
          <view
            class="right"
            :style="{ color: item.type === 3 ? '#07C160' : '' }"
          >
            {{ (item.type === 3 ? "-" : "") + item.goldNum }}
          </view>
        </view>

        <u-loadmore :status="loadmore" />
      </scroll-view>
      <Empty style="height: calc(var(--vh) - 220rpx);" v-else></Empty>
    </view>
  </view>
</template>
<script>
import Header from "@/components/common/header/index.vue";
import Empty from "@/components/common/empty/empty";
import defaultTemplate from "@/utils/defaultTemplate";
import Playing from "@/utils/common/playing";

import { mapGetters } from 'pinia';
import { goldRecords } from "@/utils/user/gold.js";

export default {
  components: {
    Header,
    Empty,
  },
  computed: {
    ...mapState(useAppInfoStore, ['themeColor']),
    count() {
      return this.records.reduce((total, item) => {
        return total + (item.type === 1 ? item.goldNum : -item.goldNum);
      }, 0);
    },
  },
  data() {
    return {
      loadmore: "loading",
      loading: false,
      playing: new Playing(),
      records: [],
      pages: 1,
      pageNum: 0,
      searchValue: 0,
      range: [
        {
          value: 0,
          text: this.$t("pages.liuhe.activity.log.Today"),
        },
        {
          value: -1,
          text: this.$t("pages.liuhe.activity.log.Yesterday"),
        },
        {
          value: 7,
          text: this.$t("pages.liuhe.activity.log.Last7Days"),
        },
        {
          value: 15,
          text: this.$t("pages.liuhe.activity.log.Last15Days"),
        },
        {
          value: 30,
          text: this.$t("pages.liuhe.activity.log.Last30Days"),
        },
      ],
    };
  },
  async mounted() {
    this.getGoldRecords();
  },
  methods: {
    handleSearch() {
      this.pageNum = 0;
      this.pages = 1;
      this.records = [];
      this.getGoldRecords();
    },
    async getGoldRecords() {
      if (this.pageNum >= this.pages) {
        return;
      }
      this.pageNum++;
      if (this.pageNum === 1) {
        this.loading = true;
      }
      const res = await goldRecords({
        dateType: this.searchValue,
        pageNum: this.pageNum,
      });
      this.loading = false;
      const { records, pages } = defaultTemplate(
        { records: [], pages: "" },
        res.result
      );
      this.records = this.records.concat(records);
      this.pages = pages;
      if (pages == this.pageNum) {
        this.loadmore = "nomore";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.vector-details {
  .content {
    padding: 0 28rpx;
    .head {
      padding-right: 20rpx;
      display: flex;
      justify-content: space-between;
      background: #fff;
      border-radius: 16rpx;
      margin: 20rpx 0;
      height: 88rpx;
      .select {
        width: 100px;

        .item-img {
          width: 36rpx;
          height: 36rpx;
          display: flex;
          align-items: center;
          margin-right: 10rpx;

          .img {
            width: 100%;
            height: 100%;
          }
        }

        ::v-deep .uni-select {
          border: none;
          width: 288rrpx;
          height: 88rpx;
          .uni-select--mask {
            background: #0000000f;
            z-index: 999;
          }

          .uni-select__input-text {
            width: fit-content;
            margin-right: 20rpx;
            color: #404040;
          }

          .uni-icons {
            border: 1px solid #a1a1a1;
            width: 32rpx;
            height: 32rpx;
            border-radius: 32rpx;
            transform: rotate(180deg);
            line-height: 34rpx;
          }

          .uni-select__selector {
            z-index: 999;
            transform: translate(90rpx, -112rpx);
          }

          .uni-popper__arrow {
            display: none;
          }

          .uni-select__selector-item {
            border-bottom: 1px solid var(--theme-auxiliary-color-default);
            align-items: center;

            &:last-child {
              border: none;
            }
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .name {
          color: #404844;
          font-size: 28rpx;
        }
        .num {
          color: var(--theme-auxiliary-color-remind);
          font-size: 34rpx;
        }
      }
    }
    .list {
      display: flex;
      flex-direction: column;
      height: calc(var(--vh) - 220rpx);
      .item {
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 24rpx;
        margin-bottom: 20rpx;
        height: 116rpx;
        padding: 0 20rpx;
        .left {
          display: flex;
          flex-direction: column;
          flex: 1;
          .title {
            color: #404844;
            font-size: 28rpx;
          }
          .tip {
            color: #a0aba5;
            font-size: 24rpx;
            margin-top: 10rpx;
          }
        }
        .right {
          color: var(--theme-auxiliary-color-remind);
          font-size: 28rpx;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
