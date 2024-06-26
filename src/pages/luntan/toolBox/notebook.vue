<template>
	<view class="notebook" :class="['theme-' + themeColor.name]">
		<Header :title="title">
			<template #right>
				<view class="right">
					<view class="save" :class="{ dis: !isUpdate }"
						:style="{ border: `1px solid ${themeColor.themeColor}`, color: themeColor.themeColor }"
						@click="saveCodeList">
						{{ $t('pages.luntan.toolBox.notebook.text0') }}
					</view>
				</view>
			</template>
		</Header>
		<scroll-view scroll-y class="code-list" v-if="codeList.length > 0">
			<view class="code-list-item" v-for="(item, i) in codeList">
				<view class="title">{{ $t('pages.luntan.toolBox.notebook.text1') }}</view>
				<view class="codes">
					<template v-for="(text, index) in item.codes">
						<input maxlength="2" class="input" :value="text" @input="textUpdate($event, item, index)">
						<text class="dou" v-if="index < item.codes.length - 1">,</text>
					</template>
					{{ $t('pages.luntan.toolBox.notebook.text2') }}
					{{ item.quantity }}
					{{ $t('pages.luntan.toolBox.notebook.text3') }}
				</view>
				<view class="date">{{ item.createDate }}</view>
			</view>
		</scroll-view>
		<empty v-else></empty>
	</view>
</template>
<script>
	import Header from "@/components/common/header/index.vue";
	import {
		mapGetters
	} from 'pinia';
	import Empty from "../../../components/common/empty/empty.vue";
	export default {
		components: {
			Header,
			Empty
		},
		computed: {
			...mapGetters(["themeColor"])
		},
		data() {
			return {
				title: this.$t('pages.luntan.toolBox.notebook.title'),
				codeList: [],
				isUpdate: false,
				setDate: null
			}
		},
		onLoad() {
			const codeList = uni.getStorageSync('codeList') || []
			this.codeList = codeList.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		methods: {
			textUpdate(e, data, index) {
				const {
					value
				} = e.detail
				this.$set(data.codes, index, value)
				this.setDate = () => {
					data.createDate = this.$u.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
				}
				this.isUpdate = true
			},
			saveCodeList() {
				if (!this.isUpdate) {
					return
				}
				this.setDate && this.setDate()
				uni.setStorageSync('codeList', this.codeList);
				this.isUpdate = false
				uni.showToast({
					title: this.$t('pages.luntan.toolBox.codePicking.text8'),
					icon: "none"
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.notebook {
		background-color: var(--theme-auxiliary-color-default);

		.save {
			width: 100rpx;
			height: 56rpx;
			display: grid;
			place-content: center;
			border: 2rpx solid var(--theme-color);
			color: var(--theme-color);
			border-radius: 10rpx;
			float: right;
		}

		.dis {
			border-color: #404040 !important;
			color: #404040 !important;
		}

		.code-list {
			height: calc(var(--vh) - 130rpx);
			margin-top: 20rpx;
			overflow: hidden;
			border-radius: 24rpx;

			.code-list-item {
				padding: 20rpx 28rpx;
				background: #fff;
				border-radius: 24rpx;
				margin-bottom: 20rpx;

				.title {
					color: #404040;
					font-size: 30rpx;
					display: flex;
					align-items: center;

					&::before {
						content: '';
						width: 6rpx;
						height: 24rpx;
						border-radius: 6rpx;
						background: var(--theme-color);
						margin-right: 14rpx;
					}
				}

				.codes {
					color: #404040;
					font-size: 30rpx;
					padding: 20rpx 0;
					border-bottom: 1px solid var(--theme-auxiliary-color-default);
					word-wrap: break-word;

					.input {
						width: 40rpx;
						color: #404040;
						font-size: 30rpx;
						float: left;
					}

					.dou {
						float: left;
					}
				}

				.date {
					margin-top: 20rpx;
					color: #404040;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
