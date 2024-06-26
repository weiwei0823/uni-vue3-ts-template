<template>
  <view @click="homepage(item)" class="fans-item">
    <uni-row class="list-row">
      <uni-col :span="4" class="img-box">
        <image :src="item.headPic"></image>
      </uni-col>
      <uni-col :span="20" class="text-box">
        <view class="text">{{ item.username }}</view>
      </uni-col>
    </uni-row>
  </view>
</template>

<script>
export default {
  name: "Fans",
  props:{
    item:{
      type:Object,
      default:null,
    }
  },
  methods:{
    //用户主页
    homepage:function (item){
      uni.navigateTo({
        url : "/pages/common/userCenter/homepage/homepage?userId="+item.userId
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .fans-item{
    width: 100%;
    background: white;
  }
.fans-item:first-child{
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
}
.fans-item:last-child{
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
  ::after{
    display: none;
  }
}

.list-row{
  padding: 20rpx 28rpx;
  height: 108rpx;
  position: relative;
  .img-box{
    width: 68rpx;
    height: 68rpx;
    image{
      width: 100%;
      height: 100%;
      border-radius: 16rpx;
    }
  }
  .text-box{
    margin-left: 20rpx;
    .text{
      height: 68rpx;
      line-height: 68rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #404040;
    }
  }


  &::after {
    position: absolute;
    width: calc(100% - 64rpx);
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 32rpx;
    bottom: 0;
    left: 32rpx;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
}
</style>