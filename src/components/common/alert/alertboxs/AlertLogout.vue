<template>
    <u-popup v-model="show" mode="center" border-radius="10" :z-index="zIndex" @open="handleOpen" @close="handleClose">
        <view class="logout">
            <view class="img">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <circle cx="22" cy="22" r="22" transform="matrix(1 0 0 -1 0 44)"
                        :fill="themeColor.themeAuxiliaryColorRemind" />
                    <path
                        d="M21.5208 26.0108C20.0083 26.0108 19 25.0025 19 23.7421V12.9025C19 11.6421 20.0083 10.6337 21.5208 10.6337C23.0333 10.6337 24.0416 11.642 24.0416 12.9025V23.742C24.0416 25.0025 23.0333 26.0108 21.5208 26.0108ZM21.5208 29.7921C23.0333 29.7921 24.0416 30.8004 24.0416 32.3129C24.0416 33.8254 23.0333 34.8337 21.5208 34.8337C20.0083 34.8337 19 33.8254 19 32.3129C19 30.8004 20.0083 29.7921 21.5208 29.7921Z"
                        fill="white" />
                </svg>
            </view>
            <view class="msg">
                {{ msg }}
            </view>
            <view class="btn" :style="{ color: themeColor.themeColor }" @click="close">
                我已知晓！
            </view>
        </view>
    </u-popup>
</template>

<script>
import defaultTemplate from '../../../../utils/defaultTemplate'
import { mapGetters } from 'pinia';

export default {
    name: "Logout",
    props: {
        zIndex: {
            type: [Number, String],
            default: () => {
                return 10075
            }
        }
    },
    computed: {
        ...mapGetters(['userInfo', 'themeColor']),
    },
    data() {
        return {
            show: false,
            callback: null,
            msg: '检测到您的账号于2023-08-08 17:00:00\n时间登录，如要这不是您人的操作请及时\n修改密码或者联系客服。',
        }
    },
    methods: {
        open(data, { callback }) {
            this.show = true
            this.callback = callback

            const { msgTxt } = defaultTemplate({ msgTxt: '', }, data)
            this.msg = msgTxt
        },
        close() {
            this.show = false;
            this.$store.dispatch("userLoginOut");
            location.href = "/"
            // uni.redirectTo({
            //     url: '/pages/liuhe/home/index'
            // });

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
    }
}
</script>

<style lang="scss" scoped>
::v-deep .u-mask {
    background: rgba(0, 0, 0, 0.3) !important;
}

.logout {
    width: 600rpx;
    border-radius: 24rpx;
    background: #FFFFFF;

    box-sizing: border-box;

    .img {
        padding: 40rpx 0 20rpx;
        width: 100%;
        display: grid;
        place-content: center;
    }

    .msg {
        width: 540rpx;
        font-weight: 400;
        font-size: 30rpx;
        color: #404040;
        white-space: pre-wrap;
        margin-bottom: 40rpx;
        word-break: break-all;
        text-align: center;
        padding: 0 28rpx;
    }

    .btn {
        text-align: center;
        font-size: 34rpx;
        font-style: normal;
        font-weight: 400;
        padding: 20rpx 0;
        border-top: 2rpx solid var(--theme-auxiliary-color-default);
    }
}
</style>
