<template>
  <view class="ball-list">
    <view :style="setItemStyle(index, ballChildren.length)" v-for="(item, index) in ballChildren" :class="item.isSelected === true  ? 'ball-item selected' : 'ball-item'" :key="item.id" @click="onClickItem(item)">
          <view class="box">
            <view class="left">
              <view class="num" :style="setBallBg(item.code)">
                <text>{{item.name}}</text>
              </view>
            </view>
            <view class="right">
              <view class="num" v-if="ball">
                 <span-box :value="item.betMultiple" :ball-info="item"></span-box>
              </view>
            </view>
          </view>
      <view class="mark">{{missOrMatchText(item)}}</view>
    </view>
  </view>
</template>
<script>
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import Playing from "@/utils/common/playing";
import {mapGetters, mapState} from 'pinia';
import usePlayingStore from "@/store/modules/playIngStore";

export default {
  name: "index",
  props:{
    ballChildren:{
      type : Array,
      default: [],
    },
    ball:{},
    missOrMatch: {
      type: String,
      default: "miss"
    }
  },
  computed: {
    ...mapState(usePlayingStore, ["orderList"]),
  },
  data () {
    return {
      current:null,
      playing:new Playing(),
      colorList: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYSTATUS).colorList
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
    setBallBg(code){
      let style;
      if(code.length == 1){
        code = "0" + code
      }
      let colorObj = this.playing.setBallColorConfig();
      for(let i in colorObj){
        let arr = colorObj[i].split(',');
        arr.forEach(item=>{
          if(code == item){
            style = this.playing.setBg(i)
          }
        })
      }
      return style;
    },
    setDefaultSelected() {
      let selectedIdsOrder = [];
      this.orderList.length ? this.orderList.forEach(order=>{
        if(Number(order.playId)>0) selectedIdsOrder.push(Number(order.playId));
      }) : null;
      let selectedIdsContent = this.orderList.length &&this.orderList[0].content ? this.orderList[0].content.split(',').map(i =>{return  Number(i)}) : [];

      let selectedIds = selectedIdsOrder.length>=selectedIdsContent.length?selectedIdsOrder:selectedIdsContent;
      if(selectedIds.length === 0){
        this.currentArr = [];
        this.ballChildren.forEach(child => {
          child.isSelected = false;
          this.$forceUpdate();
        })
        // return;
      }
      if(selectedIds.length > this.ball.maxNum && this.ball.code !== "kl8brx1d"){
        return;
      }
      this.ballChildren.forEach(child => {
        child.isSelected = selectedIds.includes(child.id);
      })
      this.$forceUpdate()
    },
    setItemStyle(index, len){
      let defaultWidth="30%";
      if (index > len - 3) {
            return {
                width: "50%",
            }
        } else {
            return {
                width: "33.3%",
            }
        }
      return {width:defaultWidth};
    },
    onClickItem(item){
      this.currentArr = this.playing.setSelectedArr(this.currentArr, item);
      if(this.currentArr.length > this.ball.maxNum && this.ball.code !== "kl8brx1d" ){
        uni.showToast({
          title: this.ball.maxNumTips,
          icon:'none'
        })
        return
      }
      this.ballChildren.forEach(i=>{
        i.isSelected = this.currentArr.includes(i.id)
      })
      this.$forceUpdate()
      this.$emit('changeData', {ballChildren : this.ballChildren, dataIndex : this.dataIndex, selectedIds:this.currentArr, ball: this.ball,ballItem:item})
    },
    missOrMatchText(item) {
      let attrKey = this.missOrMatch;
      return item[attrKey] || item[attrKey] === 0 ? item[attrKey] : "";
    },
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
      background: #DEEAFA;
      border: 1rpx solid #B5D4E6;
      box-shadow: inset 0px 4rpx 3rpx #FFFFFF;
      width: 50%;
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
         .num{
           //position: absolute;
           //z-index: 2;
           //left: 29rpx;
           //top: 21rpx;
           line-height: 70rpx;
           text-align: center;
           width: 64.51rpx;
           height: 70rpx;
           font-size: 28rpx;
          //  background-image: url("@/static/img/liuhe/ssc/ball.svg");
           background-size: 100% 100%;
           background-repeat: no-repeat;
           background-position: center;
           text{
            color: #404040;
           }
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

       }
     }
     .mark{
       position: absolute;
       right: 8rpx;
       top: 8rpx;
       font-size: 20rpx;
       color: #8CB2C9;
     }
  }
  .ball-item.selected{
    background: #0099CC;
    box-shadow: inset 0px 3rpx 2rpx rgba(0, 0, 0, 0.5);
    .right{
      .num{
        color: #DEEAFA;
      }
    }
    .mark{
        color: #DEEAFA;
      }
  }
}

</style>
