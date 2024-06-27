<template>
    <view class="hash-intro" :class="['theme-' + themeColor.name]">
        <Header :title="title" isFixed />
        <scroll-view scroll-y class="content">
            <view class="part1">
                <view class="part1-content">
                    <view class="part1-title">哈希验证：</view>
                    <view class="hash">
                        <view class="hash-item" v-if="hashArr.length > 0" v-for="(i, index) in hashArr" :key="index"
                            :style="setStyle(index)">
                            {{ i }}
                        </view>
                    </view>
                    <view class="bottom-line">
                        <view class="hash-result" v-if="hashInfo.hashResult">
                            <view class="hash-result-item"
                                v-for="(i, index) in hashInfo.hashResult"
                                :style="{ 'background-color': hashInfo.hashResultColor[index] }">{{ i }}</view>
                        </view>
                        <view class="btn">
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5.50176 12.4396C5.46051 12.4415 5.4192 12.4375 5.37903 12.428C5.19647 12.3939 5.02655 12.311 4.88729 12.1881C4.74802 12.0652 4.64462 11.9069 4.58804 11.73L0.679601 1.9565C0.601408 1.79097 0.568349 1.60772 0.583771 1.4253C0.599194 1.24288 0.662551 1.06778 0.767424 0.91773C0.863446 0.801087 0.985093 0.708179 1.12289 0.646238C1.26069 0.584298 1.41093 0.554997 1.56191 0.560616C1.6269 0.560813 1.69181 0.565477 1.75617 0.574575L9.29969 1.58136C9.35075 1.58966 9.40095 1.60147 9.44998 1.61662C9.55789 1.62198 9.66018 1.66722 9.73681 1.74385C9.74449 1.75154 9.75186 1.75947 9.7589 1.76765C9.80398 1.79913 9.84686 1.83404 9.88712 1.87217L11.7076 3.69264C11.8797 3.87095 11.9825 4.10488 11.9974 4.35228C12.0124 4.59968 11.9384 4.84427 11.789 5.042L6.33288 11.9854C6.23856 12.1199 6.11451 12.2308 5.97037 12.3096C5.82623 12.3883 5.66588 12.4328 5.50176 12.4396ZM8.50976 2.3544L2.06445 1.4969L5.93121 4.93298L8.50976 2.3544ZM6.35948 5.89402L5.88327 11.1324L10.6777 5.02941L6.35948 5.89402ZM10.8806 4.0999L7.27565 4.81982L9.43886 2.6581L10.8806 4.0999ZM1.81164 2.44037L5.05669 10.5531L5.49849 5.71601L1.81164 2.44037Z"
                                    fill="white" />
                            </svg>
                            <view class="btn-text" @click="checkLink">
                                验证
                                <!-- <a href="https://tron-trx.com/#/" target="_blank">验证</a> -->
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="part2">
                <view class="disc">
                    每期封盘后系统开始转账，仅转一笔，转账金额尾数即为当期期号(例:888期转0.0888）
                </view>
                <view class="wallet-address">
                    <view class="wallet-address-title">钱包A：</view>
                    <view class="address">{{ walletA }}</view>
                    <view class="btn" @click="handleOpenLink(walletA)">
                        查询
                    </view>
                </view>
                <view class="wallet-address">
                    <view class="wallet-address-title">钱包B：</view>
                    <view class="address">{{ walletB }}</view>
                    <view class="btn" @click="handleOpenLink(walletB)">
                        查询
                    </view>
                </view>
                <view class="rich-text" v-html="explainContent"></view>
            </view>
        </scroll-view>
    </view>
</template>
<script>
import Header from '@/components/common/header/index.vue';
import {
    getHashInfo
} from "@/utils/lottery/betting";
import {
		mapGetters
	} from 'pinia';
import useAppInfoStore from "@/store/modules/appInfoStore";
export default {
    name: "hashIntro",
    components: {
        Header,
    },
    computed: {
			...mapState(useAppInfoStore, ['themeColor'])
		},
    data() {
        return {
            title: "哈希介绍",
            lotteryId: null,
            hashInfo: {},
            explainContent: "",
            walletA: "",
            walletB: "",
            hashArr: [],
            externalUrl: 'https://tronscan.org/#/address/'
        }
    },
    onLoad(option) {
        this.lotteryId = option.id;
        this.getHashInfo()
    },
    methods: {
        getHashInfo() {
            getHashInfo({
                lotteryId: this.lotteryId
            }).then(res => {
                this.hashInfo = res.result.hashInfo
                this.hashArr = res.result.hashInfo.hash.split('')
                this.explainContent = res.result.explainContent
                this.walletA = res.result.walletA
                this.walletB = res.result.walletB
            })
        },
        setStyle(index) {
            if (this.hashInfo.pointMap[index]) {
                if (this.hashInfo.pointMap[index].color) {
                    return {
                    color: this.hashInfo.pointMap[index].color,
                    width: '36rpx',
                    height: '40rpx',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8rpx',
                    border: '2rpx solid #D9D9D9',
                    marginRight: '5rpx',
                    marginLeft: '5rpx'
                }
                } else {
                    return {
                        color: '#EC3232',
                        width: '36rpx',
                        height: '40rpx',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8rpx',
                        border: '2rpx solid #D9D9D9',
                        marginRight: '5rpx',
                        marginLeft: '5rpx'
                    }
                }

            }
        },
        handleOpenLink(url) {
            const h5url =`/pages/liuhe/webview/hash_web?url=${this.externalUrl}${url}&title=哈希彩&id=${this.lotteryId}`;
            uni.navigateTo({
                url: h5url,
                success: function (res) {
                    res.eventChannel.emit('argParams', {})
                }
            })
        },
        checkLink() {
            const h5url = '/pages/liuhe/webview/hash_web?' + 'url=' + 'https://tron-trx.com/#/'+'&title=哈希查询'+'&id='+this.lotteryId;
            uni.navigateTo({
                url: h5url,
                success: function (res) {
                    res.eventChannel.emit('argParams', {})
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.hash-intro {
    background: var(--theme-auxiliary-color-default);
    height: var(--vh);
    display: flex;
    flex-direction: column;

    .content {
        padding: 20rpx 28rpx;
        flex: 1;
        height: 0;
        box-sizing: border-box;
        .part1 {
            width: 100%;
            max-height: 304rpx;
            background-color: #fff;
            border-radius: 24rpx;
            padding: 20rpx 28rpx;
            box-sizing: border-box;

            .part1-content {
                .part1-title {
                    font-family: MiSans;
                    font-size: 30rpx;
                    font-weight: 500;
                    line-height: 40rpx;
                    color: #404844;

                }

                .hash {
                    margin-top: 20rpx;
                    font-family: Roboto;
                    font-size: 28rpx;
                    font-weight: 500;
                    line-height: 32rpx;
                    color: #404844;
                    word-wrap: break-word;
                    // word-break: break-all;
                    display: flex;
                    flex-wrap: wrap;

                    .hash-item {
                        display: flex;
                        align-items: center;
                    }
                }

                .bottom-line {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20rpx;

                    .hash-result {
                        display: flex;

                        .hash-result-item {
                            width: 44rpx;
                            height: 44rpx;
                            border-radius: 8rpx;
                            font-family: Roboto;
                            font-size: 28rpx;
                            font-weight: 500;
                            line-height: 44rpx;
                            text-align: center;
                            color: #FFFFFF;
                            margin-right: 20rpx;
                        }
                    }

                    .btn {
                        width: 124rpx;
                        height: 46rpx;
                        border-radius: 8rpx;
                        background-color: #B21D2B;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: MiSans;
                        font-size: 26rpx;
                        font-weight: 500;
                        color: #FFFFFF;

                        .btn-text {
                            margin-left: 10rpx;

                            a {
                                font-family: MiSans;
                                font-size: 26rpx;
                                font-weight: 500;
                                color: #FFFFFF;
                                text-decoration: none;
                            }

                            navigator {
                                font-family: MiSans;
                                font-size: 26rpx;
                                font-weight: 500;
                                color: #FFFFFF;
                                text-decoration: none;
                            }
                        }
                    }
                }

            }
        }

        .part2 {
            width: 100%;
            min-height: 304rpx;
            background-color: #fff;
            border-radius: 24rpx;
            padding: 20rpx 28rpx;
            box-sizing: border-box;
            margin-top: 20rpx;

            .disc {
                font-family: MiSans;
                font-size: 30rpx;
                font-weight: 600;
                line-height: 44rpx;
                text-align: left;
                color: #EC3232;
            }

            .wallet-address {
                .wallet-address-title {
                    font-family: MiSans;
                    font-size: 30rpx;
                    font-weight: 500;
                    text-align: left;
                    color: #07C160;
                    margin-top: 20rpx;
                }

                .address {
                    font-family: Roboto;
                    font-size: 30rpx;
                    font-weight: 500;
                    text-align: left;
                    color: #404844;
                    margin-top: 20rpx;
                    word-wrap: break-word;
                }

                .btn {
                    width: 84rpx;
                    height: 46rpx;
                    background-color: #3E73FE;
                    border-radius: 8rpx;
                    margin-top: 10rpx;
                    text-align: center;
                    line-height: 46rpx;
                    font-weight: 500;
                    color: #FFFFFF;
                    font-size: 26rpx;
                }
            }

            .rich-text {
                margin-top: 20rpx;
            }
        }
    }
}
</style>
