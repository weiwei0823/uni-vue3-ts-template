<template>
	<view class="pact pc-max-width" :style="{ position: `fixed`, height:`${winHeight}px`, marginTop: safeHeight }">
		<view class="" style="height:88rpx;">

			<Header :title="title" :title-style="titleStyle" isFixed>
			</Header>
		</view>
		<scroll-view scroll-y class="pact-content"
			:style="{height:`calc(${uWindowHeight}px - 128rpx)`,backgroundColor:'#fff'}">
			<view class="" style="background-color: #f4f4f4;">

				<view class="first-content">
					<view class="title">平台游戏规则须知</view>
					<view class="line"></view>
					<view class="content">
						<view class="content-item">
							1.本平台所模拟的彩票游戏玩法来源，均为经国家财政部批准发行的彩票品种。本平台所显示的日期与时间均为北京时间，彩票游戏的投注时间以本平台服务系统的服务器为主。</view>
						<view class="content-item">
							2.本平台的金币，为虚拟游戏币，获取方式以系统每天赠送为主。本平台金币不进行任何的充值、兑换、交易操作。
						</view>
						<view class="content-item">
							3.根据国家规定，禁止未满20周岁（未成年）者利用本平台进行彩票模拟游戏。同时，不提倡学生进行彩票模拟游戏，其中包括在校大学生。
						</view>
						<view class="content-item">4.本平台不收取任何形式的服务费。</view>
						<view class="content-item">5.本平台模拟的彩票游戏，每期彩票开奖完成后，将公布开奖号码情况。本平台不对开奖号码的准确性、完整性、及时性承担任何明示或默认的担保责任。
						</view>
					</view>
				</view>
				<view class="second-content">
					<view class="title">有关责任和争端处理</view>
					<view class="desc">发生下列情况本平台不予承担任何法律责任</view>
					<view class="line"></view>
					<view class="content">
						<view class="content-item">
							1.由于用户将密码告知他人或与他人共享账号，由此导致的任何事件。
						</view>
						<view class="content-item">
							2.由于本平台连接的其他网站所造成的个人资料泄露及由此导致的任何争议和后果。
						</view>
						<view class="content-item">
							3.由于彩票中心在彩票销售过程中，临时更改玩法造成的模拟游戏投注失败的。
						</view>
						<view class="content-item">
							4.本平台定期检查，或更新软硬件而造成服务器中断；突发性的软硬件设备与电子通信设备故障产生的纠纷。
						</view>
						<view class="content-item">
							5.任何由于黑客攻击、计算机病毒侵入或发作、网络供应商原因、因国家管制而造成的暂时性关闭等影响网络正常运营之不可抗力而造成的个人资料或游戏模拟投注指令泄露、丢失、被盗用、被繤改或网络线路中断等，由此产生的纠纷。
						</view>
						<view class="content-item">
							6.非本平台自身原因造成的，模拟彩票游戏未能成功投注、兑奖等，如国家法律规定、规章要求。
						</view>
						<view class="content-item">
							7.本平台有权对本规则进行调整或补充，并不另行通知公告、若用户继续使用本平台服务，则视为已阅读并接受该等调整或补充，如不同意，则用户须主动终止使用本平台服务。
						</view>
						<view class="content-item">
							8.本平台任何赠送金币，官方活动均与苹果公司无关。
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from "@/components/common/header/index";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
	import {
		mapGetters
	} from 'pinia';
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";

	export default {
		name: "pact",
		components: {
			AlertInjectLayer,
			Header
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: "平台服务申请",
				headerStyle: {
					backgroundColor: "#03536E"
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				winHeight: 0
			}
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(SystemInfoStore, ["uWindowHeight"]),
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		onShow() {
			this.winHeight = uni.getSystemInfoSync().windowHeight + 30;
		},
	}
</script>

<style lang="scss" scoped>
	.pact {
		background: var(--theme-auxiliary-color-default);
		display: flex;
		flex-direction: column;

		.pact-content {
			// flex: 1;
			height: 0;
			// padding-top: 20rpx;
			margin-top: 20rpx;
			border-radius: 24rpx;
			overflow: hidden;
			// padding-bottom: 148rpx;
			box-sizing: border-box;

			.first-content {
				border-radius: 24rpx;
				background: #FFF;
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: column;
				padding: 0 28rpx;

				.title {
					color: #404040;

					font-size: 34rpx;
					font-weight: 500;
					padding: 20rpx 0 0 0;
				}

				.line {
					margin: 20rpx 0;
					background: var(--theme-auxiliary-color-default);
					height: 2rpx;
				}

				.content {

					.content-item {
						margin-bottom: 20rpx;
						color: #404040;
						text-align: justify;

						font-size: 28rpx;
						font-weight: 400;
						line-height: 40rpx;
					}
				}
			}

			.second-content {
				border-radius: 24rpx 24rpx 0 0;
				background: #FFF;
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: column;
				padding: 0 28rpx;
				padding-bottom: 20rpx;

				.title {
					color: #404040;

					font-size: 34rpx;
					font-weight: 500;
					padding: 20rpx 0 0 0;
				}

				.line {
					margin: 20rpx 0;
					background: var(--theme-auxiliary-color-default);
					height: 2rpx;
				}

				.content {

					.content-item {
						margin-bottom: 20rpx;
						color: #404040;

						font-size: 28rpx;
						font-weight: 400;
						line-height: 40rpx;
					}
				}

				.desc {
					color: var(--theme-auxiliary-color-remind);

					font-size: 30rpx;
					font-weight: 400;
					padding: 20rpx 0 0 0;
				}
			}
		}
	}
</style>
