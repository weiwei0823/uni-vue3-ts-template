<template>
  <view class="ball-list">
    <view :style="setStyle(index, ballChildren.length)" v-for="(item, index) in ballChildren" :class="item.isSelected === true ? 'ball-item selected' : 'ball-item'" :key="item.id" @click="onClickItem(item)">
      <uni-row>
        <uni-col :span="24">
          <view class="left">
            <view class="mark">{{missOrMatchText(item)}}</view>
            <view class="num">{{item.name}}</view>
          </view>
        </uni-col>
      </uni-row>
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
      default: null,
    },
    ball: {},
    dataIndex: {},
    missOrMatch: {
      type: String,
      default: "miss"
    },


    ballMaps:{
      type:Object,
      default:{}
    }
  },
  data () {
    return {
      playing:new Playing(),
      currentArr:[],
    }
  },
  computed: {
    ...mapState(usePlayingStore, ["orderList"]),
      selectIds(){
          let selectedIds = this.orderList.length ? this.orderList[0].content.split(',').map(i => Number(i)) : [];
          return selectedIds;
      },
    selectedDan(){
      let count=0;
      if(!this.selectIds) return  0;
      for (let i in this.selectIds) {
        let id=this.selectIds[i];
        if(this.ballMaps[id].groupIndex==0){
          count++;
        }
      }
      return count;
    },
    selectedTuo(){
      return this.selectIds?(this.selectIds.length-this.selectedDan):0;
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
      let selectedIds =  this.orderList.length ? this.orderList[0].content.split(',').map(i => Number(i)) : [];
      this.currentArr = [];
      if(selectedIds.length === 0){
        this.ballChildren.forEach(child => {
          child.isSelected = false;
          this.$forceUpdate();
        })
        return;
      }
      this.ballChildren.forEach(child => {
        child.isSelected = selectedIds.includes(child.id);
        child.isSelected&&this.currentArr.push(child.id);
      })
      this.$forceUpdate()
    },
    onClickItem(item){
      if (item.groupIndex!=0 && this.selectedDan<1) {
        return  uni.showToast({title:"请至少选择一个胆码",icon:"none"})
      }
        let removeId=-1;
        if(this.currentArr.indexOf(item.id)!=-1){
            removeId=item.id;
            this.currentArr.splice(this.currentArr.indexOf(item.id),1);
        }else {
            if(this.checkCodeReption(item)) return  uni.showToast({title:"生肖互斥",icon:"none"});
            this.currentArr = this.playing.setSelectedArr(this.currentArr, item);
        }
      this.ballChildren.forEach(i=>{
        i.isSelected = this.currentArr.includes(i.id)
      });
      this.$forceUpdate()
      this.$emit('changeData', {ballChildren : this.ballChildren, dataIndex : this.dataIndex, selectedIds:this.currentArr,removeId:removeId, ball: this.ball,ballItem:item})
    },
    checkCodeReption(item){
        for (let i in this.selectIds){
            let id = this.selectIds[i];
            let betInfo = this.ballMaps[id];
            if(betInfo&&betInfo.code==item.code){
                return true;
            }
        }
        return false;
    },


    setStyle(index,len){
      if(len === 10 && index > len -3){
        return {
          width: "50%",
        }
      }else {
        return {
          width: "25%",
        }
      }

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
  flex-wrap:wrap;
   .ball-item{
    box-sizing: border-box;

    background: #DEEAFA;
    border: 1rpx solid #B5D4E6;
    box-shadow: inset 0px 4rpx 3rpx #FFFFFF;
    .left{
      position: relative;
      width: 100%;
      height: 110rpx;
      font-weight: var(--LotteryBetFontWeight);
      font-family: var(--LotteryBetFontFamily);
      .mark{
        position: absolute;
        right: 8rpx;
        top: 8rpx;
        font-size: 20rpx;
        color: #8CB2C9;
      }
      .num{
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        line-height: 67rpx;
        text-align: center;
        width: 100%;
        height: 67rpx;
        color: #03536E;
        font-size: 38rpx;
      }
    }
  }
  .ball-item.selected{
    background: #0099CC;
    box-shadow: inset 0px 3rpx 2rpx rgba(0, 0, 0, 0.5);
    .left{
      .num{
        color: #DEEAFA;
      }
    }
    .right{
      .num{
        color: #DEEAFA;
      }
      .mark{
        color: #DEEAFA;
      }
    }
  }
}

</style>
