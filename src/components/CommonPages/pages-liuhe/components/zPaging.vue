<template>
	<z-paging ref="paging" v-model="list" @query="$emit('query', { pageNo: $event, ref: $refs.paging })"
		:use-page-scroll="pageScroll" :scroll-with-animation="false" lower-threshold="1px"
		:refresher-enabled="refresherEnabled" :refresherAnimated="false"
		:refresher-default-text="zpageUIConfig['refresher-default-text']"
		:show-refresher-update-time="zpageUIConfig['show-refresher-update-time']"
		:refresher-pulling-text="zpageUIConfig['refresher-pulling-text']"
		:refresher-title-style="zpageUIConfig['refresher-title-style']"
		:refresher-default-img="zpageUIConfig['refresher-pulling-img']"
		:refresher-pulling-img="zpageUIConfig['refresher-pulling-img']"
		:refresher-refreshing-img="zpageUIConfig['refresher-pulling-img']" :refresher-default-style="'#EEEEEE'"
		:refresher-img-style="zpageUIConfig['refresher-img-style']"
		:refresher-refreshing-text="zpageUIConfig['refresher-refreshing-text']"
		:loading-more-loading-icon-custom-style="zpageUIConfig['loading-more-loading-icon-custom-style']"
		:loading-more-loading-icon-custom-image="zpageUIConfig['loading-more-loading-icon-custom-image']"
		:loading-more-custom-style="{ 'padding-top': '20rpx', }" :loading-more-loading-animated="false"
		:loading-more-no-more-text="'没有更多数据了'" :empty-view-text="$t('pages.luntan.masterForum.noData')"
		:empty-view-img="'/static/imgs-liuhe/activity/empty.png'" :empty-view-style="{ 'margin-bottom': '170px' }"
		:empty-view-img-style="{ 'width': '199px', 'height': '199px' }"
		:empty-view-title-style="{ 'min-height': '100px', 'color': ' #999999', 'font-size': '30rpx', 'line-height': '44rpx', 'margin-top': '10rpx' }"
		:loading-more-enabled="loadingMoreEnabled" :fixed="fixed" :paging-style="pageStyle"
		:scroll-to-bottom-bounce-enabled="false" @contentHeightChanged="onContentHeightChanged ">
		<slot></slot>
	</z-paging>
</template>

<script>
	import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	export default {
		mixins: [ZPMixin],
		props: {
			value: Array,
			refresherEnabled: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			loadingMoreEnabled: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			scrollTop: Number,
			query: Function,
			pageScroll: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			fixed: {
				type: Boolean,
				default: () => {
					return true
				}
			},
			pageStyle: {
				type: Object,
				default: () => {
					return {}
				}
			},
			height: {
				type: String,
				default: null
			}
		},
		data() {
			return {
				list: [],
				z_scrollTop: 0,
				old_scrollTop: 0
			}
		},
		computed: {
			zpageUIConfig() {
				return this.$config.configUIMgr.z_page_loading['t1'];
			}
		},

		watch: {
			scrollTop(val) {
				this.$refs.paging.updatePageScrollTop(val)
			},
			list: {
				handler(val) {
					this.$emit('input', val)
				},
				deep: true
			},
		},
		methods: {
			onContentHeightChanged() {
				this.$emit("contentHeightChanged");
			}
		}
	}
</script>
<style lang="scss" scoped></style>