<template>
  <view class="ball-odds" name="span-box">
    <view class="odds">
      <view
        class="odds-item"
        v-if="useIn == 'ball-odds'"
        v-for="(i, index) in ballOddsValue"
        :key="index"
        :style="{ fontSize: adjustedFontSizes[index] + 'rpx' }"
      >
        {{ index !== ballOddsValue.length - 1 ? i + '/' : i }}
      </view>
    </view>
  </view>
</template>

<script>
import usePlayingStore from "@/store/modules/playIngStore";

export default {
  name: "BetOddsNum",
  props: {
    value: {
      type: [Number, String],
      default: "0"
    },
    useIn: {
      type: String,
      default: "ball-odds"
    },
    ballInfo: {
      type: Object,
      default: () => {
        return null;
      }
    },
    // 当前ball在第几个盒子
    ballPosInfo: {
      type: Object,
      default: () => {
        return null;
      }
    }

  },
  data() {
    return {
      baseFontSize: 26,
      minFontSize: 18
    };
  },

  computed: {
    ...mapState(usePlayingStore, ["lotteryRabetaInfo", "inLotteryUserRabetaNum"]),
    ballOddsValue() {
      if (this.lotteryRabetaInfo && this.inLotteryUserRabetaNum > 0) {
        let maxRabeta = parseFloat(this.lotteryRabetaInfo.maxRebate);
        let maxUserRabeta = parseFloat(this.lotteryRabetaInfo.userRebate);
        if (!this.ballInfo) {
          console.error("组件中未包含关键计算信息");
          return this.value.split('/');
        }
        let useCaculationed = parseInt(Number(maxRabeta) * 1000);
        //(最高赔率 - 最低赔率)* (（13-会员的返点）/13) + 最低赔率 = 会员当前的赔率显示
        // let maxOdds = parseInt(Number(this.ballInfo.maxOdds)*1000);
        let maxArr = this.setOdds(this.ballInfo.betMaxMultiple);
        let minArr = this.setOdds(this.ballInfo.betMinMultiple);
        // console.log('maxArr', maxArr, minArr)
        // let maxOdds = parseInt(Number(this.ballInfo.maxOdds)*1000);
        // let minOdds = parseInt(Number(this.ballInfo.minOdds)*1000);
        let inBaseNum = parseInt(Number(this.inLotteryUserRabetaNum) * 1000);
        // let oddsAfterReteba =  (maxOdds - minOdds) * intFixed(useCaculationed - inBaseNum,3)/useCaculationed + minOdds;
        // return parseFloat(parseInt(oddsAfterReteba)/1000);
        return this.setReteba(maxArr, minArr, useCaculationed, inBaseNum);
      }
      return this.value.split('/');
    },

    // 动态字体大小
    adjustedFontSizes() {
      let fontSizeArr;

      let computedFontSizeArr = this.ballOddsValue.map(text => {
        const lengthFactor = text.toString().length / 3;
        const sizeAdjustment = Math.floor(this.baseFontSize - lengthFactor);
        return Math.max(this.minFontSize, sizeAdjustment);
      });

      // 不太确定这个页面具体有多少地方引用过，所以做一次判断
      if(this.ballPosInfo) {
        // 与这个"@/utils/common/playing";文件里这个setBallItemStyle函数设置的布局对应
        const {index, length} = this.ballPosInfo
        // 当父盒子宽度是50%时，宽度足够
        if(index > length - 5) {
          fontSizeArr = this.ballOddsValue.map(() => 28);
        }
        // 当父盒子宽度是33.3%，动态计算字体大小
        else {
          fontSizeArr = computedFontSizeArr;
        }
      } else {
        fontSizeArr = computedFontSizeArr;
      }

      return fontSizeArr
    },


  },

  mounted() {
  },
  methods: {
    formatter(str) {
      // return str;
      let v = "";
      if (!str?.split(".")?.length > 1) return str;
      let a = str.split(".")[1];
      if (a?.length < 2) {
        return str;
      }
      if (a && a.length > 1 && a?.[1] == 0) {
        a = [a[0]]
      }
      if (a && a.length >= 1 && a[0] == 0) {
        a = [];
      }
      const t = a && a.length ? ("." + a.toString()) : "";
      return str.split(".")[0] + t;
    },
    setOdds(betInfo) {
      let maxArr = [];
      if (betInfo) {
        betInfo.split('/').forEach(element => {
          maxArr.push(element * 1000)
        });
      }
      return maxArr
    },

    //(最高赔率 - 最低赔率)* (（13-会员的返点）/13) + 最低赔率 = 会员当前的赔率显示
    setReteba(max, min, useCaculationed, inBaseNum) {
      let newArr = [];
      let oddsAfterReteba = 0;
      max.forEach(element => {
        min.forEach(element2 => {
          oddsAfterReteba = (element - element2) * (useCaculationed - inBaseNum) / useCaculationed + element2;
        })
        newArr.push(parseFloat(parseInt(oddsAfterReteba) / 1000))
      })
      return newArr;
    }
  }
}

</script>


<style scoped lang="scss">
.ball-odds {
  height: 100%;
  display: flex;
  align-items: center;

  .odds {
    max-width: 100%;
    .odds-item {
      display: flex;
      flex-direction: column;
      line-height: 30rpx;
      // word-break: break-all;
    }
  }
}
</style>
