<template>
  <view class="lottery-type-tabs" v-show="sortLotteryTypeTabs.length > 1">
    <div v-for="(item, index) in sortLotteryTypeTabs" :key="index" @click="cutover(item, index)"
      class="ft-icon-text-item" :style="{
        backgroundColor: lotteryType == item.lotteryType ? item.color : '',
        border: `2rpx solid ${item.color}`,
        color: lotteryType == item.lotteryType ? '#ffffff' : item.color,
      }">
      <template v-if="showTypeImage">
        <image v-if="item.icon && item.hideIcon" :src="lotteryType == item.lotteryType ? item.hideIcon : item.icon"
          style="width: 40rpx;height: 40rpx;margin-right: 10rpx">
        </image>
        <image v-else
          :src="lotteryType == item.lotteryType ? '@/static/img/menu/act-' + item.lotteryType + '.png' : '@/static/img/menu/' + item.lotteryType + '.png'"
          style="width: 40rpx;height: 40rpx;;margin-right: 10rpx;">
        </image>
      </template>

      <view class="ft-text">{{ item.lotteryName }}</view>
    </div>
  </view>
</template>


<script>
import { mapGetters } from 'pinia';
import { config } from "../../../config/config";
import useAppInfoStore from "@/store/modules/appInfoStore";

export default {
  name: "LotteryTypeTab",
  props: {
    lotteryTime: {
      type: Array,
      default: () => {
        return [];
      }
    },
    sortTypeIds: {
      type: Array,
      default: () => {
        return config.lotterTimesTabsSort
      }
    },
    styleMap: {
      type: Object,
      default: () => {
        return {
          2: {
            color: "#07C160"
          },
          1: {
            color: "#DE2011"
          },
          5: {
            color: "#FF8A00"
          },
          3: {
            color: "#000095"
          },
          4: {
            color: "#B301BF"
          }
        }

      }
    },


    showTypeImage: {
      type: Boolean,
      default: false
    },
    lotteryType: {
      type: [Number, String],
      default: () => { return -1 }
    }

  },
  computed: {
    ...mapState(useAppInfoStore, ['themeColor']),
    sortLotteryTypeTabs() {
      let buildAr = [];
      for (let key in this.lotteryTime) {
        let lotteryInfo = this.lotteryTime[key];
        let copyLotteryInfo = Object.assign({}, lotteryInfo);
        let lotteryStyleConfig = this.styleMap[copyLotteryInfo.lotteryType];
        if (lotteryStyleConfig && !copyLotteryInfo.color) copyLotteryInfo = Object.assign(copyLotteryInfo, lotteryStyleConfig);
        console.log("item", lotteryInfo.lotteryType, lotteryInfo.color);
        copyLotteryInfo.sortIndex = this.sortTypeIds.indexOf(Number(copyLotteryInfo.lotteryType));
        buildAr.push(copyLotteryInfo);
      }
      // buildAr.sort((a,b)=>{
      //   return a.sortIndex - b.sortIndex;
      // })
      return buildAr;
    }


  },
  data() {
    return {
      safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea.top + "px",
      isForceHideBack: false
    }
  },

  mounted() {

  },

  methods: {
    cutover(item, index) {
      this.$emit("onTabClick", item);
    }
  }
}
</script>



<style scoped lang="scss">
.lottery-type-tabs {
  width: 100%;
  display: flex;


  .ft-icon-text-item {
    flex: 1;
    display: flex;
    height: 60rpx;
    border: 1px solid;
    border-radius: 5px;
    background: #fff;
    font-size: 13px;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
