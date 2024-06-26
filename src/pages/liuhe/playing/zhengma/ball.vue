<template>
  <view class="ball-list">
    <view :style="setItemStyle(index,ballChildren.length)" v-for="(item, index) in ballChildren" :class="item.isSelected === true ? 'ball-item selected' : 'ball-item'" :key="item.id" @click="onClickItem(item)">
      <view class="box">
          <view class="left">
            <view class="num" :style="setBgColor(item.code,colorList)">{{item.name}}</view>
          </view>
          <view class="right">
            <view class="mark">{{missOrMatchText(item)}}</view>
            <view class="num">
               <span-box :value="item.betMultiple" :ball-info="item"></span-box>
            </view>
          </view>
      </view>
    </view>
  </view>
</template>
<script>
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import Playing from "@/utils/common/playing";
import {mapGetters} from 'pinia';

export default {
  name: "index",
  props:{
    ballChildren:{
      type : Array,
      default: null,
    },
    ball: {},
    dataIndex: {},
    missOrMatch: {
      type: String,
      default: "miss"
    }
  },
  computed: {
    ...mapGetters(['orderList'])
  },
  data () {
    return {
      playing:new Playing(),
      colorList: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYSTATUS).colorList,
      currentArr:[],
    }
  },
  components: {UniCol, UniRow},
  watch:{
    orderList(){
      this.setDefaultSelected()
    }
  },
  mounted(){
    this.setDefaultSelected()
  },
  methods:{
    setDefaultSelected() {
      let selectedIds = this.orderList.length ? this.orderList.map(i => i.playId) : []
      if(selectedIds.length === 0){
        this.currentArr = [];
        this.ballChildren.forEach(child => {
          child.isSelected = false;
          this.$forceUpdate();
        })
        // return;
      }
      // this.ballChildren.forEach(child => {
      //   child.isSelected = selectedIds.includes(child.id);
      // })
      // this.$forceUpdate()
    },
    setItemStyle(index, len){
      return this.playing.setBallItemStyle(index, len)
    },
    setBgColor (code,list) {
      let style = new Object();
      list.forEach(item=>{
        item.list.forEach(c=>{
          if(code === c.number){
            style = this.playing.setBg(c.color)
          }
        })
      })
      return style;
    },
    onClickItem(item){
      this.currentArr = this.playing.setSelectedArr(this.currentArr, item);
      this.ballChildren.forEach(i=>{
        i.isSelected = this.currentArr.includes(i.id)
      })
      this.$forceUpdate()
      this.$emit('changeData', {ballChildren : this.ballChildren, dataIndex : this.dataIndex, selectedIds:this.currentArr, ball: this.ball,ballItem:item})
    },
    missOrMatchText(item) {
      let attrKey = this.missOrMatch;
      return item[attrKey] || item[attrKey] === 0 ? item[attrKey] : "";
    }
  }
}
</script>

<style lang="scss" scoped>
.ball-list{
  display: flex;
  flex-wrap: wrap;
   .ball-item{
    position: relative;
		box-sizing: border-box;
    box-sizing: border-box;
    background: #DEEAFA;
    border: 1rpx solid #B5D4E6;
    box-shadow: inset 0px 4rpx 3rpx #FFFFFF;
    display: flex;
		justify-content: center;
		align-items: center;
    .box{
      width: 153rpx;
			display: flex;
    .left{
      position: relative;
      width: 98.5rpx;
      height: 110rpx;
      display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 30rpx;
      font-weight: var(--LotteryBetFontWeight);
      font-family: var(--LotteryBetFontFamily);
      .num{
        position: absolute;
        z-index: 2;
        left: 29rpx;
        top: 21rpx;
        line-height: 67rpx;
        text-align: center;
        width: 58rpx;
        height: 67rpx;
        color: #404040;
        font-size: 28rpx;
      }
    }
    .right{
      position: relative;
      width: 98.5rpx;
      height: 110rpx;
      .num{
        height: 110rpx;
        text-align: center;
        color: #8CB2C9;
        font-size: 28rpx;
      }
      .mark{
        position: absolute;
        right: 8rpx;
        top: 8rpx;
        font-size: 20rpx;
        color: #8CB2C9;
      }
    }
    }
  }
  .ball-item.selected{
    background: #0099CC;
    box-shadow: inset 0px 3rpx 2rpx rgba(0, 0, 0, 0.5);
  }
}

</style>
