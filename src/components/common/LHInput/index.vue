<template>
	<view class="lh-input-box">
		<view class="lh-input" :class="['theme-' + themeColor.name, { 'lh-input-focus': focus }]">
			<slot name="left">
				<image class="left-icon" :src="leftIcon" v-if="leftIcon"></image>
			</slot>
			<slot name="input">
				<view class="center">
					<input class="input" :type="getType" :value="value" :placeholder="placeholder" @focus="handleFocus"
						@blur="handleBlur" @input="handleInput" />
					<view class="" v-if="close && value && focus" style="margin-left:20rpx;line-height:0;"
						@click="handleClose">
						<filterIcon src="@/static/img/all/lh-input/close.png" :width="30" :height="30" />
					</view>
					<!-- <image  class="close" src="@/static/img/all/lh-input/close.png"
						@click="handleClose">
					</image> -->
				</view>
			</slot>
			<slot name="right">
				<image class="password" :src="passwordIcon" v-if="type === 'password'"
					@click="showPassword = !showPassword">
				</image>
				<view class="text" v-if="required">必填</view>
				<view class="text" v-if="optional">选填</view>
			</slot>
		</view>
		<view class="more">
			<view class="message" v-if="message">
				<template>
					<u-icon class="icon" name="error-circle-fill" :color="themeColor.themeAuxiliaryColorRemind"
						size="28"></u-icon>{{ message }}
				</template>
			</view>
			<view class="password-level" :class="'level-' + checkPasswordStrength.level"
				v-if="type === 'password' && showPasswordLevel && value && !message">
				{{ checkPasswordStrength.text }}
			</view>
		</view>
	</view>
</template>
<script>
import imgUser from '@/static/img/all/lh-input/user.png';
import imgLock from '@/static/img/all/lh-input/lock.png';
import imgEdit from '@/static/img/all/lh-input/edit.png';
import imgCellphone from '@/static/img/all/lh-input/cellphone.png';
import imgSecurity from '@/static/img/all/lh-input/security.png';
import imgEvited from '@/static/img/all/lh-input/evited.png';
import imgShowPassword from "@/static/img/all/lh-input/opened-eye.png";
import imgHidePassword from "@/static/img/all/lh-input/closed-eye.png";

	export default {
		props: {
			value: String,
			icon: String,
			placeholder: String,
			type: String,
			close: Boolean,
			required: Boolean,
			optional: Boolean,
			isRule: Boolean,
			rule: Object,
			showPasswordLevel: Boolean
		},
		data() {
			return {
				passwordLevel: '低',
				message: '',
				focus: false,
				showPassword: false,
				iconMap: {
					user: imgUser,
					lock: imgLock,
					edit: imgEdit,
					cellphone: imgCellphone,
					security: imgSecurity,
					evited: imgEvited,
				},
			}
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			theme() {
				return getApp().globalData.themeMap[this.$config.station]
			},
			leftIcon() {
				return this.iconMap[this.icon]
			},
			getType() {
				return this.showPassword ? 'text' : this.type
			},
			passwordIcon() {
        return this.showPassword ? imgShowPassword : imgHidePassword;
			},
			checkPasswordStrength() {
				const password = this.value
				const upperCaseRegex = /[A-Z]/;
				const lowerCaseRegex = /[a-z]/;
				const digitsRegex = /\d/;

				// 记录字符类型数量
				let charTypesCount = 0;
				let charTypesCountText = '弱'

				// 检查是否包含大写字母
				if (upperCaseRegex.test(password)) {
					charTypesCount++;
				}

				// 检查是否包含小写字母
				if (lowerCaseRegex.test(password)) {
					charTypesCount++;
				}

				// 检查是否包含数字
				if (digitsRegex.test(password)) {
					charTypesCount++;
				}

				if (charTypesCount === 1) {
					charTypesCountText = '弱';
				} else if (charTypesCount === 2) {
					charTypesCountText = '中';
				} else {
					charTypesCountText = '强';
				}
				return {
					level: charTypesCount,
					text: charTypesCountText
				}
			}
		},
		methods: {
			emitValue(val) {
				this.$emit('input', val)
				this.checkRule('input')
			},
			handleClose() {
				this.emitValue('')
			},
			handleFocus() {
				this.focus = true
				this.checkRule('focus')
			},
			handleBlur(e) {
				setTimeout(() => {
					this.focus = false
				}, 200);
				this.checkRule('blur')
				this.$emit('blur', e.detail.value)
			},
			handleInput({
				detail: {
					value
				}
			}) {
				this.emitValue(value)
			},
			checkRule(type) {
				this.$nextTick(() => {
					if (!this.isRule) {
						return
					}
					const {
						trigger,
						required,
						message,
						rule,
						ruleMessage,
						validator
					} = this.rule
					if (type !== true && (!Array.isArray(trigger) || !trigger.includes(type))) {
						return
					}
					this.message = ''
					if (required && !this.value) {
						this.message = message
					} else if (rule && !rule.test(this.value)) {
						this.message = ruleMessage
					}
					if (validator && typeof validator === "function") {
						const validatorMessage = validator(this.rule, this.value, type, () => {
						})
						if (validatorMessage === false) {
							this.message = message
							return
						} else if (typeof validatorMessage === 'string') {
							this.message = validatorMessage
						}
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.lh-input {
		height: 108rpx;
		padding: 0px 20rpx;
		display: flex;
		align-items: center;
		border-radius: 20rpx;
		background: #FFF;
		border: 1px solid #fff;

		.left-icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 20rpx;
		}

		.center {
			flex: 1;
			display: flex;
			align-items: center;
			padding-right: 20rpx;

			.input {
				flex: 1;
			}

			.close {
				width: 30rpx;
				height: 30rpx;
				margin-left: 20rpx;
			}
		}

		.password {
			width: 48rpx;
			height: 48rpx;
		}

		.text {
			color: #3E4347;
			font-size: 30rpx;
		}
	}

	//.lh-input-focus {
	//	border: 1px solid var(--them-color);
	//}

	.more {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.message {
			color: var(--theme-auxiliary-color-remind);
			font-size: 24rpx;
			margin-top: 10rpx;

			.icon {
				margin-right: 10rpx;
			}
		}

		.password-level {
			width: 80rpx;
			height: 32rpx;
			font-size: 22rpx;
			border-radius: 8rpx;
			display: grid;
			place-items: center;
			color: #fff;
			margin-top: 10rpx;
			margin-left: auto;
		}

		.level-1 {
			background: #404040;
		}

		.level-2 {
			background: #07C160;
		}

		.level-3 {
			background: var(--theme-auxiliary-color-remind);
		}
	}
</style>
