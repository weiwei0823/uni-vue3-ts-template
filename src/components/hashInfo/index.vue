<template>
    <view class="hashInfo">
        <view class="title" v-if="stampType === 3">
            <text class="title-text" @click="goHash">哈希验证：</text><text>{{ `第${nextShorNo}期正在获取` }}</text>
        </view>
        <view class="title hash-title" ref="hashTitleRef" v-else>
            <text class="title-text" @click="goHash">哈希验证：</text>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && index < 51 && lotteryId === 96"
                v-for="(i, index) in setArr(hashInfo)" :key="index" :style="setStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && lotteryId === 99"
                v-for="(i, index) in setSSCArr(hashInfo)" :key="index" :style="setShishiStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && lotteryId === 97"
                v-for="(i, index) in setSSCArr(hashInfo)" :key="index" :style="setShishiStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && lotteryId === 98"
                v-for="(i, index) in setSSCArr(hashInfo)" :key="index" :style="setShishiStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && index < 30 && lotteryId === 103"
                v-for="(i, index) in setArr(hashInfo)" :key="index" :style="setStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && index < 30 && lotteryId === 104"
                v-for="(i, index) in setArr(hashInfo)" :key="index" :style="setStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && index < 35 && lotteryId === 105"
                v-for="(i, index) in setArr(hashInfo)" :key="index" :style="setStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && index < 45 && lotteryId === 100"
                v-for="(i, index) in setArr(hashInfo)" :key="index" :style="setStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && index < 44 && lotteryId === 101"
                v-for="(i, index) in setArr(hashInfo)" :key="index" :style="setStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && index < 43 && lotteryId === 102"
                v-for="(i, index) in setArr(hashInfo)" :key="index" :style="setStyle(index)">
                {{ i }}
            </view>
            <view class="hash-item" v-if="setArr(hashInfo).length > 0 && index < 40 && lotteryId === 106"
                v-for="(i, index) in setArr(hashInfo)" :key="index" :style="setStyle(index)">
                {{ i }}
            </view>
            <view class="exceed" v-if="setPoint(lotteryId)">...</view>
        </view>
        <view class="hash-result" v-if="hashInfo.hashResult && stampType !== 3">
            <view class="hash-result-item" v-for="(i, index) in hashInfo.hashResult"
                :style="{ 'background-color': hashInfo.hashResultColor[index] }">{{ i }}</view>
        </view>
        <view class="hash-result" v-else>
            <view class="hash-result-item" v-for="(i, index) in hashInfo.hashResult"
                :style="{ 'background-color': hashInfo.hashResultColor[index] }">?</view>
        </view>
    </view>
</template>

<script>
export default {
    name: "hashInfo",
    props: {
        hashInfo: {},
        stampType: {},
        nextShorNo: {},
        lotteryId: {}
    },
    data(){
        return {
            exceed:false
        }
    },
    mounted() {
        const { scrollHeight, clientHeight } = this.$refs.hashTitleRef?.$el || {};
        this.exceed = scrollHeight > clientHeight
    },
    methods: {
        setArr(hashInfo){
            return hashInfo.hash.split('')
        },
        goHash(){
            this.$emit('goHash')
        },
        setSSCArr(hashInfo){
            let arr = hashInfo.hash.split('');
            arr.forEach((element, index) => {
                if(index === 48) {
                    arr.splice(48, 0, '...');
                }
            });
            return arr;
        },
        setPoint(lotteryId) {
            if (lotteryId === 99 || lotteryId === 98 || lotteryId === 97) {
                return false
            } else {
                return true
            }
        },
        setShishiStyle(index) {
            if (22 < index && index < 45) {
                return {
                        display: 'none',
                        alignItems: 'center'
                    }
            }else {
                return this.setStyle(index)
            }
        },
        setStyle(index) {
            if (this.hashInfo.pointMap[index]) {
                if(this.hashInfo.pointMap[index].color != '') {
                    return {
                        color: this.hashInfo.pointMap[index].color,
                        display: 'flex',
                        alignItems: 'center'
                    }
                } else {
                    return {
                        color: '#FFD43D',
                        borderRadius: '8rpx',
                        border: '2rpx solid #ffffff',
                        width: '36rpx',
                        height: '36rpx',
                        justifyContent: 'center',
                        margin: '0 5rpx'
                    }
                }
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.hashInfo {
    padding-left: 20rpx;
    width: 100%;

    .title {
        font-size: 28rpx;
        color: #fff;
        font-family: MiSans;
        font-weight: 500;
        line-height: 36rpx;
        text-align: left;
        width: 500rpx;
        min-height: 80rpx;
        text-overflow: ellipsis;
        overflow-wrap: break-word;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        .title-text {
            color: #F5A225;
            width: 140rpx;
        }

        .hash-item {
            display: flex;
            align-items: center;
        }
        .exceed{
            // position: absolute;
            // right: 0;
            // bottom: 0;
        }
    }
    .hash-title{
        max-height: 80rpx;
        overflow: hidden;
    }

    .hash-result {
        display: flex;
        padding-left: 12rpx;
        margin-top: 10rpx;
        margin-bottom: 10rpx;

        .hash-result-item {
            width: 36rpx;
            height: 36rpx;
            border-radius: 6rpx;
            margin-right: 30rpx;
            font-family: Roboto;
            font-size: 24rpx;
            font-weight: 500;
            line-height: 35rpx;
            text-align: center;
            color: #FFFFFF;
        }

        .hash-result-item:first-child {
            margin-left: 4rpx;
        }

        .hash-result-item:last-child {
            margin-left: 32rpx;
            margin-right: 0;
        }
    }
}
</style>