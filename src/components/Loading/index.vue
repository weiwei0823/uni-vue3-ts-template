<template>
    <view class="loading_box" v-if="is_loading" @click="switch_loading">
        <view class="loading">
            <view class="loader loader-17">
              <image src="/static/img/loading_v2.gif"></image>
              <view class="text">
                  {{loadingText}}
              </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        },
        methods:{
            switch_loading(){
                //this.$store.commit("SWITCH_LOADING")
            }
        },
        //实测直接在标签属性里写  $store.state.XX  拿不到数据  所以这里通过 计算属性去监听一下
        computed:{
            is_loading(){
                return this.$store.state.componentsDataStore.uiGlobalLoading;
            },

            loadingText(){
                return this.$store.state.componentsDataStore.uiGlobalLogindgText||"加载中..";
            }
        },
        watch: {
            is_loading(val){
            }
        }
    }
</script>

<style lang="scss" >
.loading_box {
    position: fixed;
    width: 150rpx;
    height: 150rpx;
    background: rgba(255,255,255,0.8);
    left:50%;
    top:50%;
    z-index: 999999999;
    margin-left: -75rpx;
    margin-top: -75rpx;
    border-radius: 20rpx;
    .loader {
        margin-top: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    image {
        width: 80rpx;
        height: 80rpx;
    }
    .text {
        font-size: 26rpx;
    }
}
</style>