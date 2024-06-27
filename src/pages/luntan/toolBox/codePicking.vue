<template>
	<view class="code-picking" :class="['theme-' + themeColor.name]" :style="{height:`calc(${uWindowHeight}px)`}">
		<Header :isBack="false" :isFixed="true">
			<view slot="left" class="nav-title" @click="handleBack">
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
					<path
						d="M9.60938 20.9961C9.86719 21.2539 10.1953 21.3945 10.582 21.3945C11.3555 21.3945 11.9766 20.7852 11.9766 20.0117C11.9766 19.625 11.8125 19.2734 11.543 19.0039L3.33984 10.9883L11.543 2.99609C11.8125 2.72656 11.9766 2.36328 11.9766 1.98828C11.9766 1.21484 11.3555 0.605469 10.582 0.605469C10.1953 0.605469 9.86719 0.746094 9.60938 1.00391L0.492188 9.91016C0.164062 10.2148 0.0117188 10.5898 0 11C0 11.4102 0.164062 11.7617 0.492188 12.0781L9.60938 20.9961Z"
						:fill="themeColor.themeColor" />
				</svg>
				<view class="text">{{ title }}</view>
			</view>
			<view slot="right" class="right-part">
				<view class="right-text" :style="setStyle()" @click="saveCode">{{
					$t('pages.luntan.toolBox.codePicking.text0') }}</view>
				<view class="right-img" @click="toNotebook">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path
							d="M5.70762 17.4462L4.03163 17.5975C3.61225 17.6333 3.26614 17.281 3.30356 16.8693L3.45478 15.1931C3.51559 14.5008 3.8196 13.8568 4.31071 13.3657L17.0113 0.665523C17.9031 -0.221692 19.3421 -0.221692 20.2355 0.665523C21.1226 1.55742 21.1226 2.99661 20.2355 3.88382L7.52859 16.5902C7.04373 17.0751 6.3936 17.3792 5.70762 17.4462Z"
							:fill="themeColor.themeColor" />
						<rect y="19.7998" width="22" height="2.2" rx="1.1" :fill="themeColor.themeColor" />
					</svg>
				</view>
			</view>
		</Header>
		<view class="picking-content">
			<view class="item">
				<view class="code-box">
					<view class="code-box-item" v-for="(item, i) in renderCodes" :style="item.bg">
						{{ item.name }}
					</view>
				</view>
				<view class="kill-box" v-if="killCodeArr.length > 0">
					<view class="title">{{ $t('pages.luntan.toolBox.codePicking.text1') }}</view>
					<view class="ball-list">
						<view class="ball-list-item" v-for="(item, i) in killCodeArr" :style="item.bg">
							{{ item.name }}
						</view>
					</view>
				</view>
				<view class="ctrl-btns">
					<view class="ctrl-btns-item kill" :style="setStyle()" @click="setKill">
						{{ $t('pages.luntan.toolBox.codePicking.text2') }}
					</view>
					<view class="ctrl-btns-item clear" :style="setStyle()" @click="clearAll">
						{{ $t('pages.luntan.toolBox.codePicking.text3') }}
					</view>
					<view class="ctrl-btns-item copy-res" :style="setStyle()" @click="copyRes">
						{{ $t('pages.luntan.toolBox.codePicking.text4') }}
					</view>
				</view>
			</view>
			<scroll-view scroll-y class="code-list"
				:style="{height:`calc(${uWindowHeight}px - ${isApp?500:downloadShow?606:506}rpx)`}">
				<view class="line">
					<view class="line-item" v-for="(item, index) in dateSetArr">
						<view v-for="(code, i) in item" :class="`line-item-code  ${code}`">
							<view v-for="(n, key) in codeContent[code]"
								:class="selectTypes.indexOf(n) != -1 ? 'code active' : 'code'"
								:style="{ '--theme-color': themeColor.themeColor }" @click="onPickingCode(n, code)">
								{{ n.name }}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

			<uni-popup ref="popup" class="pop-box" background-color="#fff">
				<view class="kill-all-num-box">
					<view class="kill-code-title">
						<view class="back" @click="setKillBack">{{ $t('pages.luntan.toolBox.codePicking.text5') }}
						</view>
						<view class="title">{{ $t('pages.luntan.toolBox.codePicking.text6') }}</view>
						<view class="clear" @click="setKillClear">{{ $t('pages.luntan.toolBox.codePicking.text7') }}
						</view>
					</view>
					<scroll-view scroll-y="" class="kill-code-list">
						<view v-for="(item, index) in totalKill" :key="index" @click="setKillArr(item, index)"
							class="kill-code-list-item" :class="{ active: killItemArray.indexOf(item) != -1 }"
							:style="setBgBall(item.name)">
							{{ item.name }}
						</view>
					</scroll-view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import Header from "../../../components/common/header/index.vue";
	import {
		mapGetters
	} from 'pinia';
	import {
		getCodePicking
	} from "../../../utils/toolbox/index";
  import useSystemInfoStore from "@/store/modules/systemInfoStore";
  import useAppInfoStore from "@/store/modules/appInfoStore";

	export default {
		components: {
			Header
		},
		data() {
			return {
				title: this.$t('pages.luntan.toolBox.codePicking.title'),
				isKill: false,
				codeContent: {},
				totalKill: [],
				dateSetArr: [
					["eventOdd", "bigSmall"],
					["animal"],
					["animalType"],
					["eventOddColor"],
					["color"],
					["bigSmallEventOdd"],
					["wuxing"],
					["head"],
					["men"],
					["multipleAnimalType"],
					["tail"],
					["section"],
					["he"],
					["hewei"],
					["tou"]
				],
				//与 关系固定表 对比竞品反推的计算逻辑
				fliterByAndGroups: ["eventOdd", "bigSmall"],


				selectTypes: [],

				killItemArray: [],


				//复制分享那些需要获取code结合的 直接用这个  不要用rendercode再算一遍
				memRenderCodes: [],

				memKillCodes: [],

				codeList: [],
				isApp: false,
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor"]),
      ...mapState(useSystemInfoStore, ["uWindowHeight", "downloadShow"]),
			renderCodes() {
				let selecodes = [];
				let caculatedGroups = {};
				this.memRenderCodes = [];
				for (let index in this.selectTypes) {
					let typeItem = this.selectTypes[index];
					let typeGroupCode = typeItem.groupCode;
					if (!caculatedGroups[typeGroupCode]) caculatedGroups[typeGroupCode] = [];
					typeItem.numberList.forEach((code) => {
						if (caculatedGroups[typeGroupCode].indexOf(code) == -1) {
							caculatedGroups[typeGroupCode].push(code);
						}
					})
				}
				let filteTimes = 0;
				let codeAcrossTimes = {};
				for (let groupCode in caculatedGroups) {
					let groupCodes = caculatedGroups[groupCode];
					if (groupCodes.length > 0) {
						filteTimes++;
					}
					groupCodes.forEach((code) => {
						if (!codeAcrossTimes[code]) codeAcrossTimes[code] = 0;
						codeAcrossTimes[code]++;
					})
				}
				for (let acrossTimeCode in codeAcrossTimes) {
					let acrossTimes = codeAcrossTimes[acrossTimeCode];
					let isInKilledFilter = this.memKillCodes.indexOf(acrossTimeCode) != -1;
					if (acrossTimes >= filteTimes && !isInKilledFilter) {
						let rebuildItem = {
							name: acrossTimeCode,
							bg: this.setBgBall(acrossTimeCode),
						}
						selecodes.push(rebuildItem);
						this.memRenderCodes.push(acrossTimeCode);
					}
				}

				selecodes.sort((a, b) => {
					return a.name - b.name;
				})
				this.codeArr = selecodes;
				return selecodes;
			},

			killCodeArr() {
				let codes = [];
				this.memKillCodes = [];
				let needFilterCode = {};
				let that = this;
				for (let itemIndex in this.killItemArray) {
					let killItem = this.killItemArray[itemIndex];
					if (killItem.numberList) {
						killItem.numberList.forEach((codeItem) => {
							!needFilterCode[codeItem] && codes.push({
								name: codeItem,
								bg: that.setBgBall(codeItem)
							}) && that.memKillCodes.push(codeItem);;
							needFilterCode[codeItem] = true;
						})
					} else {
						!needFilterCode[killItem.name] && codes.push({
							name: killItem.name,
							bg: that.setBgBall(killItem.name)
						}) && that.memKillCodes.push(killItem.name);
						needFilterCode[killItem.name] = true;

					}
				}
				return codes;
			},
		},


		onLoad() {
			this.codePickingData()
			this.codeList = uni.getStorageSync('codeList') || []
		},
		methods: {
			handleBack() {
				backPage()
			},
			setKill() {
				this.isKill = !this.isKill;
				this.$refs.popup.open("bottom")
			},
			setStyle() {
				return {
					color: this.themeColor.themeColor,
					border: `1px solid ${this.themeColor.themeColor}`
				}
			},
			toNotebook() {
				uni.navigateTo({
					url: "/pages/luntan/toolBox/notebook"
				})
			},
			codePickingData() {
				getCodePicking().then(res => {
					if (res.code === 200) {
						let apiResult = res.result;
						for (let groupCode in apiResult) {
							if (groupCode == "totalNumberMap") continue;
							let groupItems = apiResult[groupCode];
							for (let itemIndex in groupItems) {
								let item = groupItems[itemIndex];
								item.groupCode = groupCode;
							}
						}
						this.codeContent = apiResult;
						this.setKillData();
					}
				})
			},
			setKillData() {
				let total = this.codeContent.totalNumberMap;
				let zodic = this.codeContent.animal;
				let arr = [];
				let arr2 = [];
				for (let i in total) {
					let obj = {};
					obj.name = i;
					obj.selected = false;
					arr.push(obj)
				}
				zodic.forEach(item => {
					item.selected = false;
					arr2.push(item)
				})
				this.totalKill = arr.sort().concat(arr2);
			},
			//点选code
			onPickingCode(item, code) {
				let that = this;
				let memIndex = this.selectTypes.indexOf(item);
				//移除与条件同类选中项
				let isFilterByAnd = this.fliterByAndGroups.indexOf(item.groupCode) != -1;
				isFilterByAnd && this.selectTypes.forEach((selectedType) => {
					if (selectedType.groupCode == item.groupCode) {
						let index = that.selectTypes.indexOf(selectedType);
						if (index !== -1) this.selectTypes.splice(index, 1);
					}
				});

				if (memIndex == -1) {
					this.selectTypes.push(item);
				} else {
					this.selectTypes.splice(memIndex, 1);
				}
			},
			//设置球背景
			setBgBall(name) {
				let total = this.codeContent.totalNumberMap;
				let index = total[name] || Math.floor(Math.random() * (3 - 1 + 1) + 1);
				return {
					backgroundImage: `url(/static/img/qiu/${index}.png)`,
					backgroundSize: "contain"
				}
			},
			//根据选择找出对应球号
			findCode(list, arr) {
				list.forEach(i => {
					let obj = {};
					obj.name = i;
					obj.bg = this.setBgBall(i);
					arr.push(obj)
				})
				return arr;
			},
			//杀码球展示集合
			setKillArr(item, index) {
				let memItemIndex = this.killItemArray.indexOf(item);
				if (memItemIndex == -1) {
					this.killItemArray.push(item);
				} else {
					this.killItemArray.splice(memItemIndex, 1);
				}
			},
			//杀码弹窗返回
			setKillBack() {
				this.$refs.popup.close()
			},
			//清空杀码
			setKillClear() {
				this.killItemArray = [];
			},

			clearAll() {
				this.selectTypes = [];
				this.killItemArray = [];
				this.memRenderCodes = [];
				this.memKillCodes = [];
			},

			//复制结果
			copyRes() {
				let arr = [];
				this.codeArr.forEach(item => {
					arr.push(item.name)
				});
				// 复制文本到剪切板
				/* uni.setClipboardData({
					data: arr.toString(),
					success: function() {}
				}) */
				var copyInput = document.getElementById('copyInput');
				if (!copyInput) {
					var copyInput = document.createElement('input');
					copyInput.setAttribute('id', 'copyInput');
					copyInput.setAttribute('disabled', 'disabled');
					copyInput.style.position = 'fixed';
					copyInput.style.left = '-100%';
					copyInput.style.top = '0';
					copyInput.style.zIndex = -100;
					copyInput.style.opacity = 0;
					document.body.appendChild(copyInput);
				}
				copyInput.value = arr.toString();
				copyInput.focus();
				copyInput.select();

				// document.execCommand 可能会被废弃
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					uni.showToast({
						title: this.$t('pages.common.userCenter.index.copySuccess')
					})
				}

				copyInput.blur();
			},
			// 格式化日对象
			getCurrentDate() {
				let date = new Date();
				let sign2 = ":";
				let year = date.getFullYear() // 年
				let month = date.getMonth() + 1; // 月
				let day = date.getDate(); // 日
				let hour = date.getHours(); // 时
				let minutes = date.getMinutes(); // 分
				let seconds = date.getSeconds() //秒
				// 给一位数的数据前面加 “0”
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (day >= 0 && day <= 9) {
					day = "0" + day;
				}
				if (hour >= 0 && hour <= 9) {
					hour = "0" + hour;
				}
				if (minutes >= 0 && minutes <= 9) {
					minutes = "0" + minutes;
				}
				if (seconds >= 0 && seconds <= 9) {
					seconds = "0" + seconds;
				}
				return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
			},
			saveCode() {
				if (this.codeArr.length > 0) {
					let codes = [];
					this.codeArr.forEach(item => {
						codes.push(item.name)
					});
					let obj = {
						codes,
						quantity: codes.length,
						createDate: this.getCurrentDate()
					}
					this.codeList.push(obj);
					uni.setStorageSync('codeList', this.codeList);
					uni.showToast({
						title: this.$t('pages.luntan.toolBox.codePicking.text8'),
						icon: "none"
					})
				} else {
					uni.showToast({
						title: this.$t('pages.luntan.toolBox.codePicking.text9'),
						icon: "none"
					})

				}
			}
		}
	}
</script>
<style lang="scss">
	.pop-box {
		width: 100%;
		max-width: var(--maxWidth);
	}

	.code-picking {
		height: 100%;
		background-color: var(--theme-auxiliary-color-default);

		.nav-title {
			color: #404040;
			font-size: 34rpx;
			font-weight: 600;
			display: flex;
			align-items: center;

			.text {
				margin-left: 20rpx;
			}
		}

		.right-part {
			display: flex;
			width: 280rpx;

			.right-text {
				font-size: 30rpx;
				padding: 8rpx 12rpx;
				height: 56rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				display: grid;
				place-content: center;
				box-sizing: border-box;
			}

			.right-img {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.picking-content {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			margin-top: 20rpx;
			width: 100%;
			box-sizing: border-box;

			.item {
				border-radius: 24rpx;
				background: #fff;
				width: 100%;
				padding: 20rpx 28rpx;
				box-sizing: border-box;
			}

			.code-box {
				border: 2rpx solid var(--theme-auxiliary-color-default);
				padding: 20rpx 20rpx 10rpx;
				box-sizing: border-box;
				min-height: 232rpx;
				width: 100%;
				border-radius: 16rpx;
				display: flex;
				flex-wrap: wrap;

				.code-box-item {
					font-weight: 600;
					display: inline-block;
					height: 56rpx;
					width: 56rpx;
					font-size: 26rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
					color: #000;
					background-repeat: no-repeat;
					background-size: contain;
					display: grid;
					place-content: center;
				}
			}

			.kill-box {
				border: 2rpx solid var(--theme-auxiliary-color-default);
				padding: 20rpx;
				box-sizing: border-box;
				min-height: 156rpx;
				width: 100%;
				border-radius: 16rpx;
				display: flex;
				flex-direction: column;
				margin-top: 20rpx;

				.title {
					font-size: 32rpx;
				}

				.ball-list {
					display: flex;
					flex-wrap: wrap;
					margin-top: 20rpx;

					.ball-list-item {
						font-weight: 600;
						display: inline-block;
						height: 56rpx;
						width: 56rpx;
						font-size: 26rpx;
						margin-right: 10rpx;
						margin-bottom: 10rpx;
						color: #000;
						background-repeat: no-repeat;
						background-size: contain;
						display: grid;
						place-content: center;
					}
				}
			}

			.ctrl-btns {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20rpx;

				.ctrl-btns-item {
					width: 218rpx;
					border-radius: 12rpx;
					height: 76rpx;
					flex-shrink: 0;
					display: flex;
					align-items: center;
					justify-content: center;

					font-size: 30rpx;
					font-weight: 400;
				}
			}

			.code-list {
				width: 100%;
				height: calc(var(--vh) - 496rpx);
				background-color: #fff;
				margin-top: 20rpx;
				border-radius: 24rpx;

				.line {
					width: 100%;
					position: relative;
					height: 100%;
					padding: 0 28rpx;
					box-sizing: border-box;

					.line-item {
						/*display: flex;*/
						border-bottom: 2rpx solid var(--theme-auxiliary-color-default);
						width: 100%;
						display: flex;
						flex-direction: row;

						.line-item-code {
							display: flex;
							flex-wrap: wrap;
							padding-top: 20rpx;
							box-sizing: border-box;

							.code {
								display: flex;
								justify-content: center;
								align-items: center;
								height: 56rpx;
								padding: 0 16rpx;
								box-sizing: border-box;
								border: 1px solid var(--theme-auxiliary-color-default);
								border-radius: 10rpx;
								font-size: 28rpx;
								color: #404040;
								margin-right: 20rpx;
								margin-bottom: 20rpx;
								white-space: nowrap;
							}

							.code.active {
								color: #fff;
								background: var(--theme-color);
								border-color: var(--theme-color);
							}
						}

						.eventOddColor {
							width: 100%;
						}

						.section {
							width: 100%;
						}

						.section .code {
							width: calc(100% / 8);
						}
					}
				}
			}

			::v-deep .content-box {
				border-radius: 24rpx 24rpx 0 0;
				width: 100% !important;
			}

			.kill-all-num-box {
				border-radius: 24rpx 24rpx 0 0;
				overflow: hidden;
				padding-bottom: var(--safe-area-inset-bottom);

				.kill-code-title {
					display: flex;
					height: 88rpx;
					align-items: center;
					background: var(--theme-auxiliary-color-default);
					margin-bottom: 20rpx;

					.back {
						align-items: center;
						padding: 0 28rpx;
						font-size: 30rpx;
						cursor: pointer;
						color: var(--theme-color);
						width: 180rpx;
						box-sizing: border-box;
					}

					.title {
						max-width: 60%;
						margin: 0 auto;
						color: #323233;
						font-weight: 500;
						font-size: 32rpx;
						display: flex;
						justify-content: center;
					}

					.clear {
						align-items: center;
						cursor: pointer;
						padding: 0 28rpx;
						font-size: 30rpx;
						color: var(--theme-color);
						width: 180rpx;
						box-sizing: border-box;
					}
				}

				.kill-code-list {
					display: flex;
					flex-wrap: wrap;
					// padding: 20rpx 28rpx;
					padding: 0 28rpx 20rpx 28rpx;
					box-sizing: border-box;
					height: 476rpx;

					::v-deep .uni-scroll-view-content {
						display: flex;
						flex-wrap: wrap;
					}

					.kill-code-list-item {
						height: 56rpx;
						width: 56rpx;
						font-size: 26rpx;
						font-weight: 600;
						margin-right: 20rpx;
						color: #000;
						margin-bottom: 20rpx;
						display: grid;
						place-content: center;
						background-size: contain;
						background-repeat: no-repeat;
					}

					.active {
						background-image: url("../../../static/img/qiu/normal-selected.png") !important;
					}
				}
			}
		}
	}
</style>

<style lang="scss" scoped>
	::v-deep .header {
		grid-template-columns: repeat(3, 40% 20% 40%) !important;
	}

	.right-part {
		align-items: center;
		justify-content: flex-end;
	}
</style>
