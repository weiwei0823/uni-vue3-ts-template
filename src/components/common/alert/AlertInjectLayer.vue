<template>
  <view v-if="showPopup">
		<Account ref="account" :z-index="1101" />
		<Betting ref="betting" :z-index="1102" />
		<Logout ref="logout" :z-index="11103" />
		<AlertMsg ref="AlertMsg" :z-index="999999" />
		<AlertTestMsg ref="AlertTestMsg" :z-index="1105" />
		<AlertChangePasword ref="AlertChangePasword" :z-index="1106" />
		<TryProfit ref="TryProfit" :z-index="1107" />
		<Verify ref="Verify" :z-index="10001" />
		<AlertSetFundPassword ref="SetFundPassword" :z-index="1109" />
		<AlertMessage ref="AlertMessage" :z-index="999999" />
		<Maintain ref="Maintain" :z-index="1111"></Maintain>
		<AlertCompleteDeposit ref="CompleteDeposit" :z-index="1112"></AlertCompleteDeposit>
		<SaveH5 ref="SaveH5" :z-index="9999"></SaveH5>
		<AlertAdvert ref="AlertAdvert" :z-index="1113" />
		<AlertNick ref="AlertNick" :z-index="999999" />
	</view>
</template>
<script>
// 账户弹窗
import Account from "./alertboxs/AlertAccount";
// 中奖弹窗
import Betting from './alertboxs/AlertBetting'
// 掉线退出弹窗
import Logout from "./alertboxs/AlertLogout";
// confirm提示弹窗
import AlertMsg from './alertboxs/AlertMsg'
import AlertNick from './alertboxs/AlertNick'
// 未登录账号提示弹窗
import AlertTestMsg from './alertboxs/AlertTestMsg'
// 未登录账号提示弹窗
import AlertChangePasword from './alertboxs/AlertChangePassword'
// 试玩盈利
import TryProfit from './alertboxs/TryProfit'
// 验证码
import Verify from './alertboxs/verify/index'
// 设置资金密码
import AlertSetFundPassword from './alertboxs/AlertSetFundPassword'
import AlertMessage from "./alertboxs/AlertMessage";
import AlertAdvert from "./alertboxs/AlertAdvert";
import Maintain from "@/pages/liuhe/common/Maintain";
import AlertCompleteDeposit from "./alertboxs/AlertCompleteDeposit";
import SaveH5 from "./alertboxs/SaveH5"

export default {
		name: "AlertInjectLayer",
		components: {
			Maintain,
			Account,
			Betting,
			Logout,
			AlertMsg,
			AlertTestMsg,
			AlertChangePasword,
			TryProfit,
			Verify,
			AlertSetFundPassword,
			AlertMessage,
			AlertAdvert,
			AlertCompleteDeposit,
			SaveH5,
			AlertNick
		},
  data() {
    return {
      showPopup: false,
    }
  },
		mounted() {
      this.path = this.$route.path;
      uni.$on('showPop', this.handlePopup);
		},
		methods: {
			// 处理显示弹窗
			handlePopup({
				refName,
				data,
				...args
			}) {
				// 如果不是当前页面,不打开弹窗
				if (this.$route.path !== this.path) {
          // console.log("不是当前页面");
        } else if (!this.showPopup) {
          this.showPopup = true;
          // 等待渲染加载
          this.$nextTick(() => {
            this.$refs[refName] && this.$refs[refName].open(data, args);
          });
        } else {
          this.$refs[refName] && this.$refs[refName].open(data, args);
        }
			},
		}
	}
</script>

<style lang="scss" scoped></style>
