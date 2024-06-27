<template>
    <u-mask name="alert_advert_instance" v-if="opend" :show="show" :z-index="zIndex" :class="['theme-' + themeColor.name]">
        <swiper class="swiper" :autoplay="false" mode="none" border-radius="0" @change="handleChange">
            <swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
                <view class="image-box">
                    <image class="image" :src="item.img" mode="widthFix" @load="show = true"></image>
                    <view class="btns">
                        <view class="btn close" @click="show = false">关闭</view>
                        <view class="btn confirm" @click="openLink(item)">前往</view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
        <view class="dots" :style="{ top: `calc(${dotBottom}px)` }" v-if="list.length > 1">
            <view class="dot" :class="{ active: index === current }" v-for="(_, index) in list"></view>
        </view>
    </u-mask>
</template>

<script>
import { mapState } from 'pinia';
import { advertList } from "@/utils/common/index.js"
import defaultTemplate from '@/utils/defaultTemplate'
import AppInfoStore from "@/store/modules/appInfoStore";
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
            opend: false,
            show: false,
            current: 0,
            list: [],
            dotBottom: 0
        }
    },
    computed: {
      ...mapState(AppInfoStore, ['themeColor']),
    },
    watch: {
        show(val) {
            if (val) {
                this.$nextTick(() => {
                    const query = uni.createSelectorQuery().in(this);
                    query.selectAll(".image-box").boundingClientRect((data) => {
                        const heights = data.map(item => item.height + item.top - 20)
                        this.dotBottom = Math.max(...heights);
                    }).exec();
                })
            }
        },
    },
    methods: {
        async open() {
            if (isLogin()) return
            let that = this;
            const res = await this.$localdb.getDataByApiOrStoreCache("pageLotteriesAdvers", async function () {
                return new Promise((async resolve => {
                    let info = await advertList({
                        projectType: 2,
                        code: 8,
                    })
                    resolve(that.$localdb.buildSyncFunctionResult(!!info.result, info));
                }))
            }, this.$config.configCache.PAGE_LOTTERIES_ADVERLIST_CACHE);
            this.list = defaultTemplate([{ "img": "", "jumpType": 0, "jumpUrl": '' }], res.result)
            /**
             * TODO
             * @MR 部分全局页面引入 当前组件早期版本 dom常驻页面 mask层 会导致IOS低版本机器遮挡操作
             * 新增opend 操作控制开关 其它图片加载后操作布标
             * 2024-01-13
             */
            this.opend = true;
        },
        handleChange(e) {
            this.current = e.detail.current
        },
        confirm() {
            this.close()
        },
        close() {
            this.show = false
            this.opend = false;
        },
        openLink(item) {
            if (!item.jumpUrl) {
                uni.navigateTo({
                    url: '/pages/common/login'
                })
                return
            }
            if (item.jumpType == 1) {
                uni.navigateTo({
                    url: item.jumpUrl
                })
                return;
            }
            this.$nativeBridge.openUrl(item.jumpUrl)
        },
    }
}
</script>

<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100%;
    max-width: 480px;
    margin: 0 auto;

    .swiper-item {
        height: 100%;
        display: flex;
        align-items: center;

        .image-box {
            width: 600rpx;
            margin: 0 auto;
            position: relative;

            .image {
                width: 100%;
                max-height: 100%;
                display: block;
            }

            .btns {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                bottom: 30rpx;

                .btn {
                    width: 260rpx;
                    height: 80rpx;
                    display: grid;
                    place-content: center;
                    font-size: 24rpx;
                    border-radius: 16rpx;

                    &+.btn {
                        margin-left: 20rpx;
                    }
                }

                .close {
                    color: var(--theme-color);
                    border: 1px solid var(--theme-color);
                }

                .confirm {
                    background: var(--theme-color);
                    color: #fff;
                }
            }
        }
    }
}

.dots {
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    .dot {
        width: 28.8rpx;
        height: 6rpx;
        transition: all .3s;
        flex-shrink: 0;
        border-radius: 3.6rpx;
        background: linear-gradient(180deg, #FFF 9.60%, var(--gradient-color-bg) 53.12%, var(--gradient-color-bg) 100%);
        box-shadow: 0px -0.6px 0px 0px var(--gradient-color-bg), 0px 0.6px 2px 0px var(--gradient-color-bg);

        &+.dot {
            margin-left: 20rpx;
        }
    }

    .active {
        width: 48rpx;
        background: linear-gradient(180deg, #FFF 9.60%, var(--theme-color) 53.12%, var(--theme-color) 86.98%);
        box-shadow: 0px -0.6px 0px 0px var(--theme-color), 0px 0.6px 2px 0px var(--theme-color);
    }
}
</style>
