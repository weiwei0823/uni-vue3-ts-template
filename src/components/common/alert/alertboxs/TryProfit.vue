<template>
    <u-popup v-model="show" mode="center" border-radius="24" :z-index="zIndex" @open="handleOpen" @close="handleClose">
        <view class="pop-box">
            <view class="top">
                <image class="img" src="/static/img/reward.png" />
                <text class="content">您已盈利<text class="monty">{{ data }}</text>元，财源滚滚！\n 成为正式用户，赚取第一桶金。</text>
            </view>
            <view class="btn-box">
                <view class="btn forget" @click="close">
                    继续试玩4
                </view>
                <view class="btn retry" @click="confirm">
                    立即注册
                </view>
            </view>
        </view>
    </u-popup>
</template>
  
<script>

export default {
    name: "Betting",
    props: {
        zIndex: {
            type: [Number, String],
            default: () => {
                return 10075
            }
        }
    },
    data() {
        return {
            show: false,
            args: {},
            data: 0,
        }
    },
    methods: {
        open(data, args) {
            this.show = true
            this.data = data
            this.args = args
            this.callback = args.callback
        },
        handleOpen() {
            this.$emit('open')
            this.callback && this.callback({
                type: 'open'
            })
        },
        handleClose() {
            this.$emit('close')
            this.callback && this.callback({
                type: 'close'
            })
        },
        confirm() {
            this.$emit('confirm')
            this.args?.confirm && this.args.confirm()
            this.show = false
            uni.navigateTo({
                url: "/pages/common/reg"
            })
        },
        close() {
            this.args?.close && this.args.close()
            this.show = false
        },
    }
}
</script>
  
<style lang="scss" scoped>
.pop-box {
    width: 600rpx;
    background: #FFFFFF;
    padding-top: 40rpx;
    box-sizing: border-box;

    .top {
        display: flex;
        flex-direction: column;
        align-items: center;


        .img {
            width: 88rpx;
            height: 88rpx;
        }

        .content {
            color: #404040;
            margin-top: 20rpx;
            margin-bottom: 40rpx;
            font-size: 30rpx;
            line-height: 56rpx;
            text-align: center;

            .monty {
                color: var(--theme-auxiliary-color-remind);
            }
        }
    }

    .btn-box {
        border-top: 1px solid var(--theme-auxiliary-color-default);
        height: 88rpx;
        display: flex;
        align-items: center;
        padding: 0 56rpx;

        .btn {
            text-align: center;
            font-size: 30rpx;
            display: grid;
            place-content: center;
            flex: 1;
            height: 100%;
        }

        .forget {
            color: #404040;
            border-right: 1px solid var(--theme-auxiliary-color-default);
        }

        .retry {
            color: var(--theme-color);
        }
    }
}
</style>