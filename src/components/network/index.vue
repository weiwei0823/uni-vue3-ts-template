<template>
	<view>
		<u-popup v-model="show" mode="center" type="dialog" border-radius="12" :class="['theme-' + themeColor.name]">
			<view class="content">
				<view class="title">选择线路</view>
				<u-radio-group v-model="value">
					<view class="list">
						<u-radio class="radio" :class="{ checked: value === item.id }" active-color="#FF9900"
							v-for="(item, index) in list" :key="index" :name="item.id">
							<view class="item">
								<image class="network" src="@/static/img/network1.png" />
								<view class="name">{{ item.name }}</view>
								<view class="ms" :class="item.ping < 150 ? 'green-text' :
                                    item.ping > 150 && item.ping < 300 ? 'orange-text' :
                                        'red-text'">{{ item.ping }}MS</view>
								<view class="selected-box">
									<svg v-if="value === item.id" xmlns="http://www.w3.org/2000/svg" width="24"
										height="24" viewBox="0 0 24 24" fill="none">
										<path
											d="M10.3368 18.6663L4 12.0653L5.62475 10.7313L9.28904 13.6739C10.7914 11.8469 14.125 8.21805 18.7249 5.33301L19.1116 6.248C14.8895 10.2177 11.4333 15.8093 10.3368 18.6663Z"
											fill="#07C160" />
									</svg>
								</view>
							</view>
						</u-radio>
					</view>
				</u-radio-group>
				<view class="btns">
					<view class="btn close" @click="close">取消</view>
					<view class="btn confirm" @click="confrim">确定</view>
				</view>
			</view>
		</u-popup>
		<slot v-if="list.length" v-bind:lineName="lineName" />
	</view>
</template>
<script>
	import {
		lineList
	} from "@/utils/line";
	import defaultTemplate from "@/utils/defaultTemplate";
  import {
    mapGetters, mapState
  } from 'pinia';
	import {
		config
	} from '@/config/config'
  import AppInfoStore from "@/store/modules/appInfoStore";
  import SystemInfoStore from "@/store/modules/systemInfoStore";
  import useWebsocketStore from "@/store/modules/websocketStore";
	export default {
		props: {
			lineName: ''
		},
		data() {
			return {
				show: false,
				checkedValue: 1,
				value: 1,
				list: [],
			}
		},
		computed: {
      ...mapState(AppInfoStore, ["themeColor"]),
      ...mapState(useWebsocketStore, ["debugWebsocketTimeInterval"]),
		},
		watch: {
			show(nv, ov) {
				if (nv) {
					this.$nativeBridge.setStatusBarColor('#666666', true)
					// this.$nativeBridge.setStatusBarColor('#B2B2B2')
				} else {
					this.$nativeBridge.setStatusBarColor('#fff')
				}
			}
		},
		mounted() {
			if (isLogin()) {
				this.getLineList()
			}
		},
		methods: {
			async getLineList() {
				const res = await lineList()
				const result = defaultTemplate([{
					id: '',
					name: "",
					url: ''
				}], res.result)
				for (const item of result) {
					const start = Date.now();
					const img = new Image();
					const getLatencyTime = () => {
						item.ping = Date.now() - start;
					};
					img.onload = getLatencyTime
					img.onerror = getLatencyTime
					img.src = item.url;
				}
				const lineData = uni.getStorageSync('apiDomain') || result?.[0] || {
					id: '0'
				}
				this.value = lineData.id
				this.checkedValue = lineData.id
				this.list = result
				this.list.unshift({
					id: '0',
					name: '默认线路',
					url: '/',
					ping: this.debugWebsocketTimeInterval
				})
			},
			open() {
				if (this.list.length <= 1) return
				this.show = true
			},
			close() {
				this.show = false
				this.value = this.checkedValue
			},
			confrim() {
				const val = this.list.find(item => item.id === this.value)
				config.updateDomain(val)

				this.$emit('update:lineName', val?.name)
				this.show = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-drawer {
		position: fixed !important;
	}

	::v-deep .uni-dialog-content {
		padding-top: 10rpx;
		padding-bottom: 0;
	}

	::v-deep .uni-dialog-title {
		padding-top: 30rpx;

		.uni-popup__error {
			color: #434B47 !important;
		}
	}

	::v-deep .uni-dialog-button {
		.uni-dialog-button-text {
			color: #A1ABA5 !important;
		}

		.uni-button-color {
			color: var(--theme-color) !important;
		}
	}

	.content {
		max-width: 350px;
		overflow: hidden;

		.title {
			font-size: 32rpx;
			line-height: 40rpx;
			text-align: center;
			color: #444444;
			margin: 29rpx 0;
		}

		::v-deep .u-radio-group {
			max-width: 100%;
		}

		.list {
			display: flex;
			flex-direction: column;
			width: 85vw;

			.radio {
				height: 88rpx;
				padding: 20rpx;
				box-sizing: border-box;
				flex-direction: row-reverse;

				::v-deep .u-radio__label {
					width: 100%;
					margin-right: 0;
				}

				::v-deep .u-radio__icon-wrap {
					display: none;
				}

				.item {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					line-height: 34rpx;
					gap: 10rpx;

					.network {
						width: 48rpx;
						height: 48rpx;
						margin-right: 6rpx;
					}

					.selected-box {
						width: 48rpx;
						height: 48rpx;

						.selected {
							width: 100%;
							height: 100%;
						}
					}

					.name {
						flex: 1;
						color: #404040;
						font-size: 30rpx;
					}

					.ms {
						color: #39DD3D;
						font-size: 30rpx;
						min-width: 100rpx;
						text-align: left;
						white-space: nowrap;
					}

					.green-text {
						color: #39DD3D;
					}

					.orange-text {
						color: #ff7010;
					}

					.red-text {
						color: var(--theme-auxiliary-color-remind);
					}
				}
			}

			.checked {
				background: var(--theme-auxiliary-color-default);
			}
		}

		.btns {
			display: flex;
			align-items: center;
			border-top: 1px solid var(--theme-auxiliary-color-default);
			height: 88rpx;

			.btn {
				flex: 1;
				display: grid;
				place-content: center;
				font-size: 34rpx;
				height: 100%;
			}

			.close {
				color: #404040;
				border-right: 1px solid var(--theme-auxiliary-color-default);
			}

			.confirm {
				color: var(--theme-color);
			}
		}
	}
</style>
