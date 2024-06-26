<template>
	<view>
		<Header :title="title" :isBack="false" :isFixed="true" :onlyDownload="true">
			<block slot="left">
				<view class="avatar" v-if="isLogin">
					<template @click="toUserInfo">
						<image @click="goToUrl('/pages/common/setting/userInfo')"
							:src="userInfo.headImgUrl || detailLogo">
						</image>
						<view class="username" v-if="isEnd && $store.state.appInfoStore.userInfo.userBalance > 1000">
							{{ parseFloat($store.state.appInfoStore.userInfo.userBalance).toLocaleString(undefined, {
								'minimumFractionDigits': 2, 'maximumFractionDigits': 2
							}) }}
						</view>
						<u-count-to class="username" :decimals="2" :start-val="0"
							:end-val="$store.state.appInfoStore.userInfo.userBalance" @end="isEnd = true"
							v-else-if="!userInfoLoading"></u-count-to>
					</template>
					<uni-icons type="loop" size="18" color="#fff" :class="{ loading: userInfoLoading }"
						@click="freshUserBanlance"></uni-icons>
				</view>
				<view v-else class="login" @click="toLogin">
					{{ $t("components.CommonPages.pages-liuhe.LiuheIndex_01.text1") }}
				</view>
			</block>
			<block slot="right">
				<view class="gift">
					<view class="shiwan" v-if="!isLogin" @click="testLogin">

						{{ $t("components.CommonPages.pages-liuhe.LiuheIndex_01.text2") }}
					</view>
				</view>
			</block>
		</Header>
		<uni-drawer ref="showLeft" mode="left" :width="80"  v-if="showLeftDrawer">
			<header-drawer @close="closeDrawer" />
		</uni-drawer>
		<LeftMenu ref="LeftMenu" v-if="showLeftMenu"/>
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import headerDrawer from '@/components/CommonPages/pages-liuhe/components/drawer.vue';
	import LeftMenu from '@/pages/liuhe/common/LeftMenu.vue';
	export default {
		components: {
			Header,
			headerDrawer,
			LeftMenu
		},
		props: {
			title: String
		},
		data() {
			return {
				isApp: false,
				title: this.$t("components.CommonPages.pages-liuhe.LiuheIndex_01.text10"),
        // 首页刚开始不加载这个组件，点击后调用加载
        showLeftDrawer: false,
        // 首页刚开始不加载这个组件，点击后调用加载
        showLeftMenu: false
			}
		},
		computed: {
			isLogin() {
				return this.$store.state.appInfoStore.userInfo != null;
			},
		},
		mounted() {

			this.isApp = browserPlatform() == browserPlatform.FLUTTER_App;
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "/pages/common/login"
				})
			},
			toUserInfo() {
				uni.navigateTo({
					url: "/pages/common/setting/userInfo"
				})
			},
			showDrawer() {
				this.$refs.showLeft.open();
			},

			closeDrawer() {
				this.$refs.showLeft.close()
			},
      handleShowLeftMenu() {
        // 第一次需要等组件加载
        if (!this.showLeftMenu) {
          this.showLeftMenu = true;
          this.$nextTick(() => {
            this.$refs.LeftMenu.open();
          });
        } else {
          this.$refs.LeftMenu.open();
        }
      },
		}
	}
</script>
