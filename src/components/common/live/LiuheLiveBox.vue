<template>
    <view class="liuhe-live-box" :class="['theme-' + themeColor.name]">
        <view class="ui-layer">
            <view class="close-btn" @click.stop="doCloseLiveBox">
                <view class="ico">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.706882 13.5858C0.316358 13.9763 0.316357 14.6094 0.706882 15C1.09741 15.3905 1.73057 15.3905 2.1211 15L7.49993 9.62114L13.0208 15.142C13.4113 15.5325 14.0445 15.5325 14.435 15.142C14.8256 14.7515 14.8256 14.1183 14.435 13.7278L8.91414 8.20692L14.849 2.27205C15.2395 1.88152 15.2395 1.24836 14.849 0.857834C14.4585 0.46731 13.8253 0.46731 13.4348 0.857835L7.49993 6.79271L1.70711 0.999887C1.31658 0.609363 0.683418 0.609363 0.292893 0.999887C-0.0976313 1.39041 -0.0976309 2.02358 0.292893 2.4141L6.08572 8.20692L0.706882 13.5858Z" fill="white"/>
                    </svg>
                </view>
            </view>
        </view>
<!--        <view class="ui-waiting-layer" v-if="liveStatus==LiuHeBoxStatus.waiting">-->
<!--            <image @click="downLoad" style="width: 100%" mode="widthFix" :src="require('@/static/frame.png')"></image>-->
<!--        </view>-->


        <view class="ui-loading-layer" v-if="liveStatus==LiuHeBoxStatus.unloading||(liveStatus==LiuHeBoxStatus.closed&&isLoading)">
            <image class="ui-loading-image" :src="require('@/static/img/loading_v3.gif')"></image>
            <text class="ui-loading-txt">{{$t('common.live.liuheLiveBox.loading')}}</text>
        </view>



        <template name="live-notice" v-if="liveStatus==LiuHeBoxStatus.closed&&!isLoading">
            <view  class="ui-layer-close">
              <view class="show-text" v-html="showWaitHtml"></view>
<!--                <text>{{liveInfo.name}}直播时间为开奖日<br>{{ liveInfo.liveStartTime }}-{{ liveInfo.liveEndTime}}(北京时间)，</text>-->
<!--                <text>敬请查看</text>-->
              <view class="live-refresh" style="padding-top: 20px" @click="freshGameLiveMsg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3.82552 2.99802C5.50459 1.54308 7.65269 0.743583 9.87443 0.746683C14.985 0.746683 19.1278 4.8894 19.1278 10C19.1278 11.9765 18.5078 13.8087 17.4529 15.3114L14.5011 10H17.2771C17.2772 8.54874 16.8507 7.12944 16.0507 5.9186C15.2507 4.70776 14.1124 3.75879 12.7774 3.18967C11.4423 2.62056 9.96947 2.45642 8.54191 2.71766C7.11434 2.97889 5.79505 3.65398 4.74808 4.65899L3.82552 2.99802ZM15.9233 17.002C14.2443 18.4569 12.0962 19.2564 9.87443 19.2533C4.76381 19.2533 0.621094 15.1106 0.621094 10C0.621094 8.0235 1.24107 6.19134 2.29595 4.6886L5.24776 10H2.47176C2.47164 11.4513 2.89811 12.8706 3.69814 14.0814C4.49817 15.2923 5.63646 16.2412 6.97149 16.8103C8.30652 17.3794 9.77938 17.5436 11.2069 17.2824C12.6345 17.0211 13.9538 16.346 15.0008 15.341L15.9233 17.002Z" :fill="themeColor.themeColor"/>
                  </svg>
                  <text>点击刷新</text>
              </view>
            </view>
        </template>
      <view class="close-live-download" v-if="liveStatus==LiuHeBoxStatus.waiting">
        <view class="show-text">直播已结束</view>
        <view class="show-text">看高清视频直播揽珠现场</view>
        <view class="show-btn">
          立即下载APP
          <view class="download" @click="downLoad">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.77048 13.844C8.53767 13.844 8.18847 13.7276 7.95566 13.4948L3.78635 9.43133C3.32074 8.97631 3.32074 8.27789 3.78635 7.81228C4.24138 7.34668 4.93979 7.34668 5.4054 7.81228L7.59588 10.0239V1.67472C7.59588 0.976305 8.06148 0.510696 8.7599 0.510696C9.45831 0.510696 9.92392 1.09271 9.92392 1.67472V9.90752L12.0192 7.82287C12.4742 7.35726 13.1726 7.35726 13.6382 7.82287C14.1038 8.27789 14.1038 8.97631 13.6382 9.44191L9.58529 13.4948C9.35249 13.7276 9.11969 13.844 8.77048 13.844ZM2.62105 16.1614H15.3724C16.0708 16.1614 16.5258 16.6271 16.5364 17.3255C16.5364 18.0239 16.0708 18.4895 15.3724 18.4895H2.62105C1.92264 18.4895 1.45703 18.0239 1.45703 17.3255C1.45703 16.6271 1.92264 16.1614 2.62105 16.1614Z" :fill="themeColor.themeColor"/>
            </svg>
          </view>
        </view>
      </view>
        <template name="live-player" v-if="liveStatus==LiuHeBoxStatus.opend">
            <!-- 播放器显示区域 -->
            <!--#ifdef H5-->
            <lives @refreshVideo="refreshVideo" :lottery-type="lotteryType>0?lotteryType:0" :showLoading="true" v-if="isRefresh" :src="liveInfo.liveConfigList[livePlayIndex].livePath" v-on:onLoadingVideoError="onLoadingVieoError"></lives>
            <!--#endif-->
            <!--#ifdef APP_PLUS-->
            <AppLives @refreshVideo="refreshVideo" v-if="isRefresh" :src="liveInfo.liveConfigList[livePlayIndex].livePath"></AppLives>
            <!--#endif-->
            <!-- 播放器显示区域 -->
        </template>



    </view>
</template>

<script>
    import Lives from './live'
    import AppLives from './applive'
    import { videoList, lotteryDetail, live } from "@/utils/live/index.js";
    import {getLiveInfoByLotteryId} from "@/utils/live/index";
    import {mapGetters} from 'pinia';

    export default {
        name: "LiuheLiveBox",
        desc: "",
        props:{
          gameHeaderInfo:{
              type:Object,
              default:()=>{ return null }
          },
          openFreshTimmer:{
              type:Boolean,
              default:true
          }
        },

        computed:{
            ...mapState(AppInfoStore, ['themeColor']),
            liveStatus(){
                if(!this.liveInfo) return this.LiuHeBoxStatus.unloading;
                if(!this.liveInfo.isLive && (this.liveInfo.startLiveCountdown>0||this.liveInfo.endLiveCountdown<0)){
                    return this.LiuHeBoxStatus.waiting;
                }else if(this.liveInfo.startLiveCountdown<=0 && this.liveInfo.endLiveCountdown >= 0){
                    return this.LiuHeBoxStatus.opend;
                }
                return this.LiuHeBoxStatus.closed
            },
            lotteryType(){
                return  this.gameHeaderInfo.lotteryType!==undefined?this.gameHeaderInfo.lotteryType:-1;
            },
            showWaitHtml(){
                let ar1 = this.liveInfo?this.liveInfo.name:"";
                let value = this.$t("common.live.liuheLiveBox.waitingText");
                value=value.replace("[#0]",ar1);
                value=value.replace("[#1]",`<span style="display: contents">${this.dateString}</span>`);
                return value;
            },
            dateString(){
                let liveInfo=this.liveInfo;
                if(liveInfo&&liveInfo.liveStartTime&&liveInfo.liveEndTime){
                    let startDate=new Date(liveInfo.liveStartTime);
                    let endDate=new Date(liveInfo.liveEndTime);
                    if(startDate.getFullYear()==endDate.getFullYear()&&startDate.getMonth()==endDate.getMonth()&&startDate.getDay()==endDate.getDay()){
                       let startTm=(startDate.getHours()).toString().padStart(2,"0")+":"+(startDate.getMinutes()).toString().padStart(2,"0")
                       let endTm=(endDate.getHours()).toString().padStart(2,"0")+":"+(endDate.getMinutes()).toString().padStart(2,"0");
                        return startTm + " - " + endTm;
                    }
                    return  liveInfo.liveStartTime + " - " + liveInfo.liveEndTime;
                }
                return "";
            }
        },

        data(){
           return {
               isRefresh:true,
               //直播接口返回resultInfo
               liveInfo:null,
               liveInfoWaitTimmer:-1,
               LiuHeBoxStatus:{
                   closed:-1,//关闭中
                   unloading:0,//数据加载中
                   waiting:1,//倒计时钟
                   opend:2,//开启
               },
               isLoading:false,
               livePlayIndex:0,

               debugTimes:0,
               beginDate:null,
               endDate:null,
           }
        },
        components:{
            Lives,
            AppLives
        },

        watch:{
            //前端loading加载数据 异步条件穿插比较复杂 暂时使用这种进行初始化 兼容数据异步变化触发刷新
            gameHeaderInfo(newInfo,oldInfo){
                if(oldInfo.lotteryType!=newInfo.lotteryType||oldInfo.lotteryTypeId!=newInfo.lotteryTypeId){
                    this.freshGameLiveMsg();
                }
            }
        },

        mounted(){
            this.freshGameLiveMsg();
        },

        methods:{
            onLoadingVieoError(){
              //alert("加载视频失败")
                let that=this;
                if(!this.liveInfo) return console.error("liveInfo is Error")
                if(this.livePlayIndex+1<this.liveInfo.liveConfigList.length){
                    this.isRefresh=false;
                    this.livePlayIndex++;
                    this.$nextTick(()=>{
                        that.isRefresh=true;
                    });
                }else {
                    setTimeout(function () {
                        that.freshGameLiveMsg();
                    },3000)
                }
            },

            /**
             * 初始化相关的直播信息
             */
            freshGameLiveMsg(){
                let _this=this;
                if(!this.gameHeaderInfo) return console.warn("game headerinfo is null");
                this.isRefresh = false;
                this.isLoading=true;
                this.livePlayIndex=0;
                getLiveInfoByLotteryId({id:this.gameHeaderInfo.lotteryId}).then(res=>{
                        _this.isRefresh = true
                        _this.isLoading=false;
                    if(res.code == 200){
                        // this.isLive = true;
                        _this.liveInfo = res.result;
                        //TODO 调试区域 调试flv直播流格式
                        // this.liveInfo.liveTimer=0;
                        // //https://vdm6-ali.juucpc.com/live/2032-2.flv
                        // this.liveInfo.livePath="https://vdm6-cnts.onmve.com/live/a6-2.flv";
                        _this.doActionAfterFresh();
                    }
                })

            },

            refreshVideo() {
                this.freshGameLiveMsg();
            },

            doActionAfterFresh(){
                let _this=this;
                // 倒计时模式
                clearInterval(this.liveInfoWaitTimmer)
                if (this.liveInfo.live && this.liveInfo.startLiveCountdown > 0) {
                    _this.liveInfoWaitTimmer = setInterval(() => {
                        _this.liveInfo.startLiveCountdown--
                        if (_this.liveInfo.startLiveCountdown <= 0) {
                            clearInterval(_this.liveInfoWaitTimmer)
                        }
                        _this.liveInfo=Object.assign({},_this.liveInfo);
                    }, 1000);
                }
            },


            // 用户左上角点击按钮点击
            doCloseLiveBox(){
                this.$emit("onClose");
            },
            //下载视频
            downLoad: function () {
				const configInfo = this.$store.state.appInfoStore?.contantsConfigTypeMap['6'] || {};
				if (configInfo && configInfo.url) {
					this.$nativeBridge.openUrl(configInfo.url);
					//#ifdef APP-PLUS
					plus.runtime.openURL(configInfo.url)
					//#endif
				}
            },
        }



    }
</script>

<style lang="scss" scoped>
    .liuhe-live-box{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .ui-layer{
        .close-btn{
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
            /*background: #590cee;*/
            line-height: 40rpx;
            position: absolute;
            left: 30rpx;
            top: 30rpx;
            text-align: center;
            font-weight: bold;
            font-size: 30rpx;
            color: grey;
            position: absolute;
            z-index: 1000;
            .ico{
             width: 30rpx;
             height: 30rpx;
            }
        }
    }

    .ui-loading-layer{
        width: 100%;
        height: 100%;
        background: #ccdbed;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .ui-loading-image{
            width: 100rpx;
            height: 76rpx;
        }
        .ui-loading-txt{
            font-size: 24rpx;
            color: #797c85;
        }
    }
    .close-live-download{
      height: 320rpx;
      background: #000000;
      color: #fff;
      text-align: center;

      font-size: 34rpx;
      font-weight: 400;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 30px;
      padding-left: 60rpx;
      padding-right: 60rpx;
      .show-text{
        margin-bottom: 20rpx;
      }
      .show-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        height: 88rpx;
        width: 310rpx;
        padding: 10rpx 20rpx;
        gap: 20rpx;
        border-radius: 30px;
        background: var(--theme-color);
        box-sizing: border-box;
        margin: 0 auto;
        color: #FFF;

        font-size: 30rpx;
        font-weight: 500;
        .download{
          display: flex;
          padding: 16rpx;
          align-items: center;
          gap: 20rpx;
          border-radius: 50%;
          background: #FFF;
        }
      }
    }
    .ui-layer-close {
        height: 320rpx;
        background: #000000;
        color: var(--theme-auxiliary-color-remind);
        text-align: center;

        font-size: 26rpx;
        font-weight: 400;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 30px;
        padding-left: 60rpx;
        padding-right: 60rpx;
      .live-refresh{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text{
          margin-left: 10rpx;
          color: var(--theme-color);
          text-align: center;

          font-size: 26rpx;
          font-weight: 400;
        }
      }
    }

</style>
