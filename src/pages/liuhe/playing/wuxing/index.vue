<template>
	<scroll-view scroll-y="true" class="ping-te">
		<view class="content-list">
			<view class="tab-item">
				<view class="type-name">
					{{ playData.name }}
					<image src="@/static/img/liuhe/desc.png" @click="showRule" />
				</view>
				<view class="balls">
            <view :style="setStyle(index,ballChildren.length)" v-for="(item, index) in ballChildren" :class="item.isSelected === true ? 'ball-item selected' : 'ball-item'" :key="item.id" @click="onClickItem(item)">
              <view class="box">
                <view class="left">
                  <view class="num">{{item.name}}</view>
                </view>
                <view class="right">
                  <view class="num">
                     <span-box :value="item.betMultiple" :ball-info="item"></span-box>
                  </view>
                </view>
              </view>
              <view class="mark">{{missOrMatchText(item)}}</view>
            </view>
					</view>
				</view>
			</view>
	</scroll-view>
</template>

<script>
import UniRow from "@/uni_modules/uni-row/components/uni-row/uni-row";
import UniCol from "@/uni_modules/uni-row/components/uni-col/uni-col";
import {
	mapGetters
} from 'pinia';
import Playing from "@/utils/common/playing";
export default {
	name: "index",
	props: {
		playData: {
			default: {},
			type: Object
		},
		ball: {},
		dataIndex: {},
		missOrMatch: {
			type: String,
			default: "miss"
		}
	},
	components: {
		UniCol,
		UniRow,
	},
	computed: {
		...mapGetters(['orderList']),
    ballChildren(){
        try {
          return  this.playData.children[0].children[0].children
        }catch (e){
          return  [];
        }
    }
	},
	data() {
		return {
			playing: new Playing(),
			currentType: 2,
			currentName: "",
			zodiac: null,
			types: [],
			ballList: [],
			currentArr: [],
			zodiacList: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYSTATUS)
				.shengxiaoList,
		}
	},
	watch: {
		orderList() {
			this.setDefaultSelected()
		}
	},
	mounted() {
		uni.$emit("on_page_mounted", this)

		this.setDefaultSelected()
	},
	methods: {
		setDefaultSelected() {
			let selectedIds = this.orderList.length ? this.orderList.map(i => i.playId) : []
			if (selectedIds.length === 0) {
				this.currentArr = [];
				this.playData.children[0].children[0].children.forEach(child => {
					child.isSelected = false;
					this.$forceUpdate();
				})
				// return;
			}
			// this.playData.children[0].children[0].children.forEach(child => {
			//   child.isSelected = selectedIds.includes(child.id);
			// })
			// this.$forceUpdate()
		},
		onSelectedType(item) {
			this.currentType = item.id;
			this.currentName = item.name;
			this.ballList = item.children;
		},
		showRule() {
			this.$emit('open', this.playData.children[0].children[0])
		},
		onSeletedOne(num) {
			this.$refs.ball[num].onClickItem(num)
		},
		setZodiac(name) {
			let zodiac = this.zodiacList;
			for (let i = 0; i < zodiac.length; i++) {
				if (name === zodiac[i].name) {
					return zodiac[i].list;
				}
			}
		},
		setBg(color) {
			return this.playing.setBg(color)
		},
		onClickItem(item) {
			this.currentArr = this.playing.setSelectedArr(this.currentArr, item);
			this.playData.children[0].children[0].children.forEach(i => {
				i.isSelected = this.currentArr.includes(i.id)
			})
			this.$forceUpdate()
			this.changeChildren({
				ballChildren: this.playData.children[0].children[0].children,
				dataIndex: this.dataIndex,
				selectedIds: this.currentArr,
				ball: this.playData.children[0].children[0],
				ballItem: item
			})
		},
		changeChildren(dataObj) {
			let {
				ballChildren,
				dataIndex,
				selectedIds,
				ball
			} = dataObj;
			let param = {
				"lotteryId": 69,
				"lotteryNo": "202302091209",
				"orderList": []
			}
			let orderList = this.playing.setOrders(ball, selectedIds);
			this.$store.dispatch('setOrderList', orderList).then(() => { })
			this.$emit("selectedBall", dataObj)
		},
		missOrMatchText(item) {
			let attrKey = this.missOrMatch;
			return item[attrKey] || item[attrKey] === 0 ? item[attrKey] : "";
		},
    setStyle(index,len){
      let defaultWidth="50%";
      if(len<=5){
        if(len%2!=0 && index==len-1){
          defaultWidth = "100%";
        }
      }else if(len%2!=0 && index >= len - 3) {
        defaultWidth = "33.3%"
      }
      return {width:defaultWidth};

    },
	},

}
</script>

<style lang="scss" scoped>
.ping-te {
	height: 100%;

	.selected {
		.left {
			color: #fff!important;
		}
	}

	.type-name {
		height: 70rpx;
		line-height: 70rpx;
		color: #8CB2C9;
		font-size: 34rpx;
		text-align: center;
		background: #CCDBEE;
		border: 1rpx solid #B5D4E6;
		box-shadow: inset 0rpx 2rpx 2rpx #CCCCCC;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 34rpx;
			height: 34rpx;
			margin-left: 22rpx;
		}
	}



	.balls {
    display: flex;
    flex-wrap:wrap;
    .ball-item{
      position: relative;
      box-sizing: border-box;
      background: #DEEAFA;
      border: 1rpx solid #B5D4E6;
      box-shadow: inset 0px 4rpx 3rpx #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      .box{
        display: flex;
        .left{
          position: relative;
          width: 100%;
          height: 110rpx;
          margin-right: 20rpx;
          white-space: nowrap;
          font-weight: var(--LotteryBetFontWeight);
          font-family: var(--LotteryBetFontFamily);
          .num{
            line-height: 110rpx;
            text-align: center;
            height: 110rpx;
            color: #03536e;
            font-weight: var(--LotteryBetFontWeight);
            font-family: var(--LotteryBetFontFamily);
            font-size: 38rpx;
          }
        }
        .right{
          position: relative;
          width: 100%;
          height: 110rpx;
          .num{
            height: 110rpx;
            text-align: center;
            color: #8CB2C9;
            font-size: 28rpx;
          }
        }
      }

      .mark{
        position: absolute;
        right: 8rpx;
        top: 8rpx;
        font-size: 20rpx;
        color: #8CB2C9;
      }
    }
    .ball-item.selected{
			.mark{
				color: #DEEAFA;
			}
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

      }
    }
	}
}
</style>
