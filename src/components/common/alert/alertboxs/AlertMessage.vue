<template>
    <u-popup v-model="show" mode="center" border-radius="24" :z-index="zIndex" :mask-close-able="userInfo.userType !== 'sign'">
        <view class="pop-box" :class="['theme-' + themeColor.name]">
            <view class="notice">{{ title }}</view>
            <view class="top" :class="{ sign:userInfo.userType === 'sign' }" v-if="userInfo.userType === 'sign'" style="place-content: center;color: #A0ABA5;font-weight: 400;">
                请继续注册
            </view>
            <view class="top" v-else>
                <view>{{ $t('pages.liuhe.common.text33') }}</view>
                <view>{{ $t('pages.liuhe.common.text35') }}
                    <text :style='{ color: themeColor.themeColor }' @click="login">
                        {{ $t('pages.liuhe.common.text36') }}
                    </text>
                </view>
            </view>
            <view class="btn-box" v-if="userInfo.userType !== 'sign'">
                <view class="btn forget" @click="close">
                    {{ closeText }}
                </view>
                <view class="btn retry" @click="confirm">
                    {{ confirmText }}
                </view>
            </view>
            <view class="btn-box" style="grid-template-columns: repeat(1, 1fr);" v-else>
                <view class="btn retry" @click="confirm">
                    {{ confirmText }}
                </view>
            </view>
        </view>
    </u-popup>
</template>

<script>
import { mapGetters } from 'pinia';
export default {
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
            title: this.$t("pages.liuhe.common.text14"),
            closeText: '取消',
            confirmText: '确定',
            isDemo: false
        }
    },
    computed: {
        ...mapGetters(['themeColor']),
        userInfo() {
            return this.$store.state.appInfoStore?.userInfo || {}
        },
    },
    watch:{
        show(val){
            let color = '#ffffff'
            let isLightColor = false
            if (val) {
                color = '#666666'
                isLightColor = true
            }
            setTimeout(() => {
                this.$nativeBridge.setStatusBarColor(color, isLightColor)
            }, 120);
        }
    },
    methods: {
        open(params) {
            if (params && typeof params === 'object') {
                for (const key in params) {
                    if (Object.hasOwnProperty.call(params, key)) {
                        this[key] = params[key]
                    }
                }
            } else if (params === 'demo') {
                console.log();
                if (this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO).userType === 'sign') {
                    this.closeText = '取消'
                    this.confirmText = '立即完善'
                } else {
                    this.isDemo = true
                    this.closeText = '继续试玩'
                    this.confirmText = '立即注册'
                }
            }
            this.show = true
        },
        confirm() {
            if (this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO).userType === 'sign') {
                uni.navigateTo({
                    url: '/pages/common/supplement',
                    success: () => {
                        this.close()
                    }
                })
            }else{
                uni.navigateTo({
                    url: `/pages/common/${this.isDemo ? 'reg' : 'login'}`,
                    success: () => {
                        this.close()
                    }
                })
            }
        },
        close() {
            this.show = false
        },
        login() {
            uni.navigateTo({
                url: "/pages/common/login",
                success: () => {
                    this.show = false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.pop-box {
    width: 600rpx;
    height: 340rpx;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;

    .notice {
        height: 108rpx;
        font-size: 34rpx;
        text-align: center;
        color: #4d4d4d;
        display: grid;
        place-items: center;
    }

    .top {
        flex: 1;
        display: grid;
        align-items: flex-start;
        justify-content: center;
        font-size: 30rpx;
        color: #a1a1a1;
        line-height: 56rpx;
        padding: 0 42rpx;
        text-align: center;
    }
    .sign{
        margin-top: -32rpx;
    }

    .btn-box {
        border-top: 1px solid var(--theme-auxiliary-color-default);
        height: 88rpx;
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        .btn {
            display: grid;
            place-content: center;
            font-size: 34rpx;
        }

        .btn+.btn {
            border-left: 1px solid var(--theme-auxiliary-color-default);
        }

        .forget {
            color: #a1a1a1;
        }

        .retry {
            color: var(--theme-color);
        }
    }
}
</style>
