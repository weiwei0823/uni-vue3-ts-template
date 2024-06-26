<template>
	<view class="mint-tab-container-item"
		:style="{ marginTop: safeHeight,height: `${uWindowHeight + windowBottom }px` }"
		:class="['theme-' + themeColor.name]">
		<!--顶部导航栏-->
		<Header :title="title" :headerStyle="{borderRadius:0}" :headerInnerStyle="{borderRadius:0}">

		</Header>
		<!--条件栏-->
		<view style="height: 50px; display: block;">
			<view class="tab-wrap" :style="{ marginTop: safeHeight }">
				<picker class="tab-item" @change="bindPickerChange" :value="yearList.findIndex(item => item == years)"
					:range="yearList" @cancel="handleCancel">
					<view @click="iconClick">
						{{ $t('pages.luntan.queryHelper.text0') }}
						<text class="arr_down" v-html="arrDown"></text>
					</view>
				</picker>
				<view class="tab-item" @click="rightClick">{{ $t('pages.luntan.queryHelper.text1') }}
					<text class="arr_down" v-html="arrDown"></text>
				</view>
			</view>
		</view>
		<!--筛选-->
		<view class="sel-type" :style="{  height:`${uWindowHeight}px`}" v-show="isShow" @click="cancel">
			<view class="sel-type-box" @click.stop="">
				<view class="btn-wrap">
					<view @click="cancel" class="cancel-btn">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M1.0649 13.7924C0.674377 14.1829 0.674376 14.8161 1.0649 15.2066C1.45543 15.5971 2.08859 15.5971 2.47911 15.2066L7.85795 9.82776L13.3788 15.3486C13.7694 15.7392 14.4025 15.7392 14.793 15.3486C15.1836 14.9581 15.1836 14.325 14.793 13.9344L9.27216 8.41355L15.207 2.47867C15.5976 2.08815 15.5976 1.45498 15.207 1.06446C14.8165 0.673933 14.1833 0.673933 13.7928 1.06446L7.85795 6.99933L2.06513 1.20651C1.6746 0.815985 1.04144 0.815985 0.650912 1.20651C0.260388 1.59703 0.260388 2.2302 0.650912 2.62072L6.44373 8.41355L1.0649 13.7924Z"
								fill="#D9D9D9" />
						</svg>
					</view>
					<view class="active confirm-btn" @click="confirm" :style="{ color: themeColor.themeColor }">
						{{ $t('pages.luntan.queryHelper.text3') }}
					</view>
				</view>
				<view class="sel-type-body">
					<scroll-view scroll-y class="left-type">
						<view v-for="(item, index) in leftType" :key="index"
							:class="isActive == item.queryType ? 'left-type-item active' : 'left-type-item'"
							@click="selectType(item)">
							{{ item.name }}
							<text class="arr_down" v-html="arrRight"></text>
						</view>
					</scroll-view>
					<view class="sp-line">
					</view>
					<scroll-view scroll-y class="right-sel">
						<template v-if="leftType[isActive - 1].queryType === 4">
							<view v-for="(item, index) in leftType[isActive - 1].list" class="right-sel-item">
								<text @click="selectValue(item)"
									:class="checkData.indexOf(item) >= 0 ? 'right-sel-item-text active' : 'right-sel-item-text'">{{ item.text }}</text>
								<!--              <uni-icons v-if="checkData.indexOf(item) >= 0" type="checkmarkempty" size="15"-->
								<!--                         :color="themeColor.themeColor" style="float: right;"></uni-icons>-->
							</view>
						</template>
						<template v-else>
							<view v-for="(item, index) in leftType[isActive - 1].list" class="right-sel-item">
								<text @click="selectValue(item)"
									:class="checkData.indexOf(item) >= 0 ? 'right-sel-item-text active' : 'right-sel-item-text'">{{ item
									}}</text>
							</view>
						</template>


					</scroll-view>
				</view>

			</view>
		</view>
		<!--多选框-->
		<view class="label-qs clearfix">
			<checkbox-group @change="checkBox" type="r" style="display: inline;">
				<view class="checkbox-item">
					<checkbox :checked="selfChecked" value="cb" color="#fff"
						:style="{transform:'scale(0.8)',color:' #fff','--theme-color': themeColor.themeColor}" />
					<view class="checkbox-item-text">{{$t('pages.luntan.queryHelper.text4')}}</view>
				</view>
			</checkbox-group>
			<span class="to-notice" @click="help">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M9.59524 12.5079C8.72222 12.5079 8.54762 12.6825 8.54762 13.5556C8.54762 14.4286 8.72222 14.6032 9.59524 14.6032C10.381 14.6032 10.6429 14.4286 10.6429 13.5556C10.6429 12.5952 10.381 12.5079 9.59524 12.5079ZM9.50794 5C8.80952 5 8.11111 5.0873 7.5 5.2619V6.74603C8.02381 6.57143 8.63492 6.48413 9.24603 6.48413C10.381 6.48413 10.7302 6.65873 10.7302 7.61905C10.7302 8.31746 10.5556 8.49206 9.94444 9.01587C9.07143 9.71429 8.80952 10.1508 8.80952 10.9365V11.5476H10.2937V11.1984C10.2937 10.6746 10.4683 10.4127 11.254 9.80159C12.127 9.27778 12.4762 8.49206 12.5635 7.35714C12.5635 5.52381 11.6032 5 9.50794 5Z"
						fill="#A1A1A1" />
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5ZM20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
						fill="#A1A1A1" />
				</svg></span>
		</view>
		<!--表格-->
		<LuntanLoading class="loading" v-if="loading" />
		<scroll-view scroll-y class="table-wrap" :style="{ height: getHeight}" v-else>
			<table id="tableSvg" v-if="tabData.rols">
				<tr style="line-height: 34px;">
					<th v-for="(item, index) in tabData.rows" :style="{ '--theme-color': themeColor.themeColor }">{{
						item.label }}</th>
				</tr>
				<tr v-for="(item, index) in tabData.rols">
					<td>
						<div>{{ item.yearAndTerm }}</div>
					</td>
					<td>
						<div :class="GetKey(item.normal1)">{{ item.normal1.value }}</div>
					</td>
					<td>
						<div :class="GetKey(item.normal2)">{{ item.normal2.value }}</div>
					</td>
					<td>
						<div :class="GetKey(item.normal3)">{{ item.normal3.value }}</div>
					</td>
					<td>
						<div :class="GetKey(item.normal4)">{{ item.normal4.value }}</div>
					</td>
					<td>
						<div :class="GetKey(item.normal5)">{{ item.normal5.value }}</div>
					</td>
					<td>
						<div :class="GetKey(item.normal6)">{{ item.normal6.value }}</div>
					</td>
					<td>
						<div :class="GetKey(item.special)">{{ item.special.value }}</div>
					</td>
				</tr>
			</table>
			<Empty v-else style="height: 100%;"/>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
import Empty from '@/components/common/empty/empty'
	import {
		doQuery,
		listYear
	} from "@/utils/common/index.js"
	import {
		color
	} from "@/static/js/echarts.min";
	import Header from "@/components/common/header/index"
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
	import {
		setPickerStyle
	} from "@/utils/common.js";
	export default {
		name: "index",
		components: {
			AlertInjectLayer,
			Header,
			Empty
		},
		data() {
			const date = new Date();
			return {
				loading: false,
				arrDown: `<svg t="1695705966894" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3045" width="18" height="18"><path d="M726.62 470.62L545.94 651.31c-18.72 18.72-49.16 18.72-67.88 0L297.38 470.62c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L512 594.75l169.38-169.38c12.5-12.5 32.75-12.5 45.25 0 6.25 6.25 9.38 14.44 9.38 22.62s-3.13 16.39-9.39 22.63zM523.31 606.38v-0.31 0.31z" fill="#A1A1A1" p-id="3046"></path><path d="M128 512c0-211.74 172.26-384 384-384s384 172.26 384 384-172.26 384-384 384-384-172.26-384-384m-64 0c0 247.42 200.58 448 448 448s448-200.58 448-448S759.42 64 512 64 64 264.58 64 512z" fill="#A1A1A1" p-id="3047"></path></svg>`,
				arrRight: `<svg t="1695729041537" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4153" width="18" height="18"><path d="M448 736c-8.19 0-16.38-3.12-22.62-9.38-12.5-12.5-12.5-32.75 0-45.25L594.75 512 425.38 342.62c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l180.69 180.69c18.72 18.72 18.72 49.16 0 67.88l-180.7 180.68c-6.24 6.26-14.43 9.38-22.62 9.38z m158.06-212.69h0.31-0.31z" fill="#A1A1A1" p-id="4154"></path><path d="M512 128c211.74 0 384 172.26 384 384S723.74 896 512 896 128 723.74 128 512s172.26-384 384-384m0-64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z" fill="#A1A1A1" p-id="4155"></path></svg>`,
				title: this.$t('pages.luntan.queryHelper.text5'),
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				years: date.getFullYear(), //默认年份
				selfChecked: false,
				yearList: [],
				isActive: 1,
				isActiveNew: 1,
				isShow: false,
				checkData: [],
				checkDataNew: [],
				leftType: [{
						queryType: 1,
						name: this.$t('pages.luntan.queryHelper.text6'),
						selectNum: 3,
						list: ['01', '02', '03', "04", '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
							'15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28',
							'29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42',
							'43', '44', '45', '46', '47', '48', '49'
						],
					},
					{
						queryType: 2,
						name: this.$t('pages.luntan.queryHelper.text7'),
						selectNum: 3,
						list: [this.$t('pages.luntan.queryHelper.text8'), this.$t('pages.luntan.queryHelper.text9'),
							this.$t('pages.luntan.queryHelper.text10'), this.$t('pages.luntan.queryHelper.text11'),
							this.$t('pages.luntan.queryHelper.text12'), this.$t('pages.luntan.queryHelper.text13'),
							this.$t('pages.luntan.queryHelper.text14'), this.$t('pages.luntan.queryHelper.text15'),
							this.$t('pages.luntan.queryHelper.text16'), this.$t('pages.luntan.queryHelper.text17'),
							this.$t('pages.luntan.queryHelper.text18'), this.$t('pages.luntan.queryHelper.text19')
						]
					},
					{
						queryType: 3,
						name: this.$t('pages.luntan.queryHelper.text20'),
						selectNum: 1,
						list: [this.$t('pages.luntan.queryHelper.text21'), this.$t('pages.luntan.queryHelper.text22'),
							this.$t('pages.luntan.queryHelper.text23'), this.$t('pages.luntan.queryHelper.text24'),
							this.$t('pages.luntan.queryHelper.text25')
						]
					},
					{
						queryType: 4,
						name: this.$t('pages.luntan.queryHelper.text26'),
						selectNum: 1,
						list: [{
								text: this.$t('pages.luntan.queryHelper.text27'),
								key: "红波"
							}, {
								text: this.$t('pages.luntan.queryHelper.text28'),
								key: "蓝波"
							},
							{
								text: this.$t('pages.luntan.queryHelper.text29'),
								key: "绿波"
							}
						]
					},
					{
						queryType: 5,
						name: this.$t('pages.luntan.queryHelper.text30'),
						selectNum: 1,
						list: [this.$t('pages.luntan.queryHelper.text31'), this.$t('pages.luntan.queryHelper.text32')]
					},
					{
						queryType: 6,
						name: this.$t('pages.luntan.queryHelper.text33'),
						selectNum: 1,
						list: ['0' + this.$t('pages.luntan.queryHelper.text39'), '1' + this.$t(
							'pages.luntan.queryHelper.text39'), '2' + this.$t(
							'pages.luntan.queryHelper.text39'), '3' + this.$t(
							'pages.luntan.queryHelper.text39'), '4' + this.$t(
							'pages.luntan.queryHelper.text39'), '5' + this.$t(
							'pages.luntan.queryHelper.text39'), '6' + this.$t(
							'pages.luntan.queryHelper.text39'), '7' + this.$t(
							'pages.luntan.queryHelper.text39'), '8' + this.$t(
							'pages.luntan.queryHelper.text39'), '9' + this.$t(
							'pages.luntan.queryHelper.text39')]
					}
				],
				tabData: {},
				tabData2: {},
				colorList: ['redcolor', 'blue', 'green'],
			}
		},
		computed: {
			...mapGetters(["themeColor", "uWindowHeight", "windowBottom"]),
			getHeight() {
				const systemInfo = uni.getSystemInfoSync();
				return `calc(${this.uWindowHeight}px - ${systemInfo.ua.indexOf('Andorid') != -1 ? 320 : 300}rpx - var(--safe-area-inset-bottom))`;
			}
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
			this.checkData.push(this.leftType[this.isActive - 1].list[0])
		},
		onLoad(option) {
			this.lotteryType = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS
				.LOCAL_STORE_LOTTERYTYPE, this.$config.defaultValues.DEFAULT_SELECT_LOTTERY_TYPE, true);
			this.title = this.$config.configLotties.getLotteryTypePlantNameByLotteryTypeId(this.lotteryType) + this.title;
			uni.setNavigationBarTitle({
				title: this.title
			});
			this.listYear()
			this.doQuery()
		},
		methods: {
			rightClick() {
				this.isShow = true
				// this.$nativeBridge.setStatusBarColor('#B2B2B2')
			},
			iconClick() {
				setPickerStyle(this.themeColor.themeColor);
				// this.$nativeBridge.setStatusBarColor('#B2B2B2')
			},
			handleCancel() {
				// this.$nativeBridge.setStatusBarColor('#fff')
			},
			//返回
			back: function() {
				uni.reLaunch({
					url: "/pages/luntan/home/index/Index" // 返回的页面数，如果 delta 大于现有页面数，则返回到首页
				});
			},
			help() {
				uni.navigateTo({
					url: "help"
				})
			},
			//获取年份列表
			listYear: function() {
				listYear().then(res => {
					this.yearList = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			bindPickerChange: function(e) {
				this.years = this.yearList[e.detail.value]
				this.doQuery()
				this.handleCancel()
			},
			//请求数据
			doQuery: function() {
				this.loading = true
				let value = '';

				if (this.isActive == 6) {
					value = "0" + this.leftType[5].list.indexOf(this.checkDataNew[0])
				} else {
					if (this.isActive === 4) {
						value = this.checkDataNew[0].key;
					} else {
						value = this.checkDataNew.join(",");

					}
				}

				let prams = {
					year: this.years,
					queryType: this.isActive,
					value: value
				};
				doQuery(prams).then(res => {
					this.loading = false
					this.tabData = Object.assign(this.tabData, res.result)
					this.tabData2 = Object.assign(this.tabData2, res.result)
					this.fiterData()
				}).catch(err => {
					console.log(err)
				})
			},
			//取消
			cancel: function() {
				this.checkData = this.checkDataNew
				this.checkData = this.checkDataNew
				this.isShow = false
				this.handleCancel()
			},
			//确认
			confirm: function() {
				this.checkDataNew = this.checkData
				this.checkDataNew = this.checkData
				this.isShow = false
				this.doQuery()
				this.handleCancel()
			},
			//选择类型
			selectType: function(item) {
				this.checkData = []
				this.isActive = item.queryType
				this.checkData.push(this.leftType[this.isActive - 1].list[0])
			},
			selectValue: function(item) {
				if (this.isActive < 3) {
					let key = this.checkData.indexOf(item)
					if (key >= 0) {
						this.checkData.splice(key, 1)
					} else {
						if (this.checkData.length >= 3) {
							uni.showToast({
								title: this.$t('pages.luntan.queryHelper.text38'),
								duration: 2000,
								icon: "none"
							})
							return false
						}
						this.checkData.push(item)
					}
				} else {
					this.checkData = []
					this.checkData.push(item)
				}
			},
			//获得类名
			GetKey: function(value) {
				if (value.right == 1) {
					let color = this.colorList[0];
					if (this.checkData.length > 0) {
						let key = this.checkData.indexOf(value.value)
						color = color + " " + this.colorList[key]
					}
					return color
				} else {
					return ''
				}
			},
			checkBox: function() {
				this.selfChecked = !this.selfChecked
				this.fiterData()
			},
			fiterData: function() {
				let tableData = []
				if (this.selfChecked == true) {
					this.tabData.rols.forEach((item, index) => {
						for (let key in item) {
							if (item[key].right == 1) {
								tableData.push(item)
								break
							}
						}
					})
					this.tabData.rols = tableData
				} else {
					this.tabData = Object.assign({}, this.tabData2)
				}
				// setTimeout(() => {
				// 	this.fnLineChart()
				// }, 2000)
				this.$nextTick(function() {
					// this.fnLineChart()
					this.makeLine()
				})
			},
			makeLine() {
				let linDots = document.querySelectorAll(".line");
				linDots.forEach((ele, index) => {
					ele.remove(ele)
				})
				if (this.isActive == 1 && this.checkData.length <= 1) {
					let eleDots = document.querySelectorAll(".redcolor");
					eleDots.forEach((ele, index) => {
						let eleNext = eleDots[index - 1];
						if (!eleNext) {
							return;
						}
						var eleLine = ele.querySelector("i");
						if (!eleLine) {
							eleLine = document.createElement("i");
							eleLine.class = "line";
							eleLine.setAttribute("class", "line");
							// ele.appendChild(eleLine);
						}
						// 记录坐标
						var boundThis = ele.getBoundingClientRect();
						// 下一个点的坐标
						var boundNext = eleNext.getBoundingClientRect();
						// 计算长度和旋转角度
						var firstPoint = {
							xPoint: boundThis.left,
							YPoint: boundThis.top
						}
						var secondPoint = {
							xPoint: boundNext.left,
							YPoint: boundNext.top
						}
						let line = Math.sqrt(Math.pow((firstPoint.xPoint - secondPoint.xPoint), 2) + Math.pow((
							firstPoint.YPoint - secondPoint.YPoint), 2))
						var elediv = document.createElement('div');
						// top:${firstPoint.YPoint}px;left:${firstPoint.xPoint}px;
						let lineHtmlStr =
							`<div class="line" style="position:absolute;border-top: 1px solid red;width:${line}px;left:12px;transform:rotate(${this.getAngle(firstPoint.xPoint,firstPoint.YPoint,secondPoint.xPoint,secondPoint.YPoint)}deg);transform-origin: 0 50%;"></div>`;
						elediv.innerHTML = lineHtmlStr

						// 添加到body 后面
						ele.append(elediv)

					})
				}
			},
			getAngle(x1, y1, x2, y2) {
				// 获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
				var x = x1 - x2;
				var y = y1 - y2;
				var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
				var cos = y / z;
				var radina = Math.acos(cos); // 用反三角函数求弧度
				var angle = 180 / (Math.PI / radina); // 将弧度转换成角度
				if (x2 > x1 && y2 === y1) {
					// 在x轴正方向上
					angle = 0;
				}
				if (x2 > x1 && y2 < y1) {
					// 在第一象限;
					angle = angle - 90;
				}
				if (x2 === x1 && y1 > y2) {
					// 在y轴正方向上
					angle = -90;
				}
				if (x2 < x1 && y2 < y1) {
					// 在第二象限
					angle = 270 - angle;
				}
				if (x2 < x1 && y2 === y1) {
					// 在x轴负方向
					angle = 180;
				}
				if (x2 < x1 && y2 > y1) {
					// 在第三象限
					angle = 270 - angle;
				}
				if (x2 === x1 && y2 > y1) {
					// 在y轴负方向上
					angle = 90;
				}
				if (x2 > x1 && y2 > y1) {
					// 在四象限
					angle = angle - 90;
				}
				return angle;
			},

			//画线函数
			fnLineChart: function() {
				let linDots = document.querySelectorAll(".line");
				linDots.forEach((ele, index) => {
					ele.remove(ele)
				})
				if (this.isActive == 1 && this.checkData.length <= 1) {
					let eleDots = document.querySelectorAll(".redcolor");
					eleDots.forEach((ele, index) => {
						let eleNext = eleDots[index - 1];
						if (!eleNext) {
							return;
						}
						var eleLine = ele.querySelector("i");
						if (!eleLine) {
							eleLine = document.createElement("i");
							eleLine.class = "line";
							eleLine.setAttribute("class", "line");
							ele.appendChild(eleLine);
						}
						// 记录坐标
						var boundThis = ele.getBoundingClientRect();
						// 下一个点的坐标
						var boundNext = eleNext.getBoundingClientRect();
						// 计算长度和旋转角度
						var x1 = boundThis.left,
							y1 = boundThis.top;
						var x2 = boundNext.left,
							y2 = boundNext.top;
						// 长度
						var distance = Math.sqrt(
							(x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1),
						);
						// 弧度
						var radius = Math.atan2(y2 - y1, x2 - x1);
						//console.warn(radius, "角度");
						// 设置线条样式
						eleLine.style.width = distance + "px";
						eleLine.style.transform = `rotate(${radius}rad)`;
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.mint-tab-container-item {
		position: relative;

		.table-wrap {
			padding: 0 20rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
		}
	}

	/* deep */
	.uni-label-pointer {
		color: #404040;
		text-align: center;

		font-size: 30rpx;
		font-weight: 400;
	}

	/* deep */
	th {
		color: #FFF;

		font-size: 28rpx;
		font-weight: 400;
		background-color: var(--theme-color);
	}

	td {
		color: #404040;

		font-size: 26rpx;
		font-weight: 400;
	}

	.tab-wrap {
		display: flex;
		text-align: center;
		height: 50px;
		line-height: 50px;
		//position: fixed;
		top: 45px;
		width: 100%;
		//z-index: 1;
		max-width: 480px;
		background: #fff;
		border-radius: 0 0 24rpx 24rpx;
	}

	.tab-wrap .tab-item {
		flex: 1;
		color: #404040;
		text-align: center;

		font-size: 30rpx;
		font-weight: 400;
		position: relative;
	}

	.sel-type {
		position: fixed;
		bottom: 0;
		background: rgba(0, 0, 0, .3);
		min-height: calc(var(--vh) - 1rem);
		width: 100%;
		max-width: 480px;
		z-index: 10;

		.sel-type-box {
			position: absolute;
			bottom: 0;
			width: 100%;
			display: flex;
			flex-direction: column;
		}

		.right-sel-item {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20rpx;
		}

		.right-sel-item-text {
			color: #404040;

			font-size: 34rpx;
			font-weight: 400;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
		}

		.right-sel-item-text.active {
			border-radius: 12rpx;
			background: var(--theme-auxiliary-color-default);
		}
	}

	.sel-type .sel-type-body {
		height: 235px;
		background: #fff;
		width: 100%;
		padding: 20rpx 0 20rpx 0;
		box-sizing: border-box;
		display: flex;
		width: 100%;

		.left-type {
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.left-type-item {
				box-sizing: border-box;
				padding: 20rpx;
				color: #404040;
				font-size: 16px;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.left-type-item.active {
				color: var(--theme-color) !important;
			}

		}

		.sp-line {
			width: 1px;
			height: 200px;
			background: var(--theme-auxiliary-color-default);
		}

		.right-sel {
			width: 50%;
		}
	}

	.sel-type .sel-type-body>uni-view:first-of-type {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.sel-type .sel-type-body>uni-view:nth-of-type(2) {
		border-left: 2rpx solid var(--theme-auxiliary-color-default);
		;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	//.sel-type .sel-type-body>uni-view {
	//	float: left;
	//	width: 50%;
	//	height: 100%;
	//	box-sizing: border-box;
	//	padding: 6px 15px 6px 0;
	//	line-height: 37px;
	//	overflow-y: auto;
	//	color: #404040;
	//	font-size: 16px;
	//}

	.sel-type .btn-wrap {
		display: flex;
		text-align: center;
		justify-content: space-between;
		height: 88rpx;
		line-height: 88rpx;
		border-top: 1px solid #b8b8b8;
		width: 100%;
		border-radius: 40rpx 40rpx 0px 0px;
		background: var(--theme-auxiliary-color-default);
		text-align: center;

		font-size: 30rpx;
		font-weight: 400;
	}

	.label-qs {
		padding: 20rpx;
		box-sizing: border-box;
		background: #fff;
		margin-top: 20rpx;
		border-radius: 24rpx 24rpx 0 0;
		display: flex;
		justify-content: space-between;

		.checkbox-item {
			display: flex;
			align-items: center;
			justify-content: center;

			.checkbox-item-text {
				margin-left: 20rpx;
			}
		}

	}

	.label-qs input {
		position: relative;
		float: left;
		height: 24px;
		width: 24px;
		margin: 0;
	}

	.label-qs .to-notice {
		float: right;
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		//line-height: 18px;
		//border-radius: 50%;
		color: #404040;
		//border: 1px solid #A1A1A1;
		margin-top: 3px;
	}

	table {
		width: 100%;
		background: #fff;
		border-collapse: collapse;
		text-align: center;
	}

	table th {
		font-weight: 400;
		color: #fff;
		font-size: 28rpx;

		font-weight: 400;
	}

	table tr:nth-of-type(2n) {
		background: #f8f8f8;
	}

	table tr {
		line-height: 31px;
	}

	table>tr {
		vertical-align: middle;
	}

	table tr td {
		border: 1px solid var(--theme-auxiliary-color-default);
	}

	table tr .redcolor {
		text-align: center;
		line-height: 22px;
		margin: 0 auto;
		color: var(--theme-auxiliary-color-remind);
		text-align: center;

		font-size: 26rpx;
		font-weight: 400;
		background: transparent;
	}

	table tr .redcolor.green {
		background: green;
	}

	table tr .redcolor.blue {
		background: #00f;
	}

	.arr_down {
		position: relative;
		top: 7rpx;
		left: 10rpx;
	}

	.cancel-btn {
		text-align: left;
		padding-left: 28rpx;
		color: #888888 !important;
	}

	.confirm-btn {
		text-align: right;
		padding-right: 28rpx;
	}

	/deep/.uni-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 4rpx solid var(--theme-color) !important;
	}

	/deep/.uni-checkbox-input-checked {
		background: #ffffff !important;
	}

	/deep/.uni-checkbox-input-checked:before {
		font: normal normal normal 28rpx/1 uni;
		content: '' !important;
		font-size: 34rpx;
		display: block;
		width: 30rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		background: var(--theme-color) !important;
		height: 30rpx;
		border-radius: 50%;
	}

	/*deep*/
	.uni-picker-container .uni-picker-header {
		border-radius: 40rpx 40rpx 0 0;
		background: var(--theme-auxiliary-color-default);
	}
</style>
