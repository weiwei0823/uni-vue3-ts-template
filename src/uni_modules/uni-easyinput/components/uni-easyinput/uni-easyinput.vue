<template>
	<view class="uni-easyinput" :class="{ 'uni-easyinput-error': msg }" :style="boxStyle">
		<view class="uni-easyinput__content" :class="inputContentClass" :style="inputContentStyle">
			<slot name="left"></slot>
			<uni-icons v-if="prefixIcon" class="content-clear-icon" :type="prefixIcon" color="#c0c4cc"
				@click="onClickIcon('prefix')" size="22"></uni-icons>
			<textarea v-if="type === 'textarea'" class="uni-easyinput__content-textarea"
				:class="{ 'input-padding': inputBorder }" :name="name" :value="val" :placeholder="placeholder"
				:placeholderStyle="placeholderStyle" :disabled="disabled"
				placeholder-class="uni-easyinput__placeholder-class" :maxlength="inputMaxlength" :focus="focused"
				:autoHeight="autoHeight" @input="onInput" @blur="_Blur" @focus="_Focus" @confirm="onConfirm"></textarea>
			<input v-else :type="type === 'password' ? 'text' : type" class="uni-easyinput__content-input"
				:style="inputStyle" :name="name" :value="val" :password="!showPassword && type === 'password'"
				:placeholder="placeholder" :placeholderStyle="placeholderStyle"
				placeholder-class="uni-easyinput__placeholder-class" :disabled="disabled" :maxlength="inputMaxlength"
				:focus="focused" :confirmType="confirmType" @focus="_Focus" @blur="_Blur" @input="onInput"
				@confirm="onConfirm" />
			<template v-if="type === 'password' && passwordIcon">
				<!-- 开启密码时显示小眼睛 -->
				<view v-if="customEyeIcon && isVal" @click="onEyes">
					<svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
						fill="none">
						<path
							d="M21.8008 11.8719C22.0676 12.2035 22.0507 12.478 21.8431 12.7849C21.2715 13.6324 20.6169 14.4109 19.9088 15.1451M21.8008 11.8719C21.0223 10.9048 20.1791 9.99815 19.2464 9.1774M21.8008 11.8719L21.2039 12.3524L21.203 12.3532L21.1094 12.4285C21.113 12.4429 21.1171 12.4543 21.1205 12.4624C21.1227 12.4675 21.124 12.47 21.124 12.4699C21.1238 12.4696 21.1177 12.4585 21.0998 12.4363C21.0803 12.412 21.0607 12.3879 21.0411 12.3637M21.8008 11.8719L21.2038 12.3523L21.2029 12.3531L21.1094 12.4283C21.1046 12.4092 21.1007 12.385 21.1001 12.3568C21.0995 12.3286 21.1023 12.3053 21.1058 12.2876C21.1058 12.2871 21.1059 12.2867 21.106 12.2862C21.1111 12.2615 21.1174 12.2481 21.1174 12.2481C21.1175 12.2481 21.1126 12.2584 21.0977 12.2805L21.0969 12.2817C21.0784 12.3091 21.0598 12.3364 21.0411 12.3637M19.2464 9.1774C18.1427 8.20672 16.9461 7.37823 15.591 6.7947C14.4071 6.28508 13.1732 6.00282 11.8048 6C10.9355 6.00282 10.0141 6.15063 9.11588 6.44205M19.2464 9.1774L18.652 9.85322C18.652 9.85316 18.6519 9.8531 18.6518 9.85304M19.2464 9.1774L18.6518 9.85304M9.11588 6.44205C7.96922 6.81441 6.92041 7.37753 5.94692 8.08425M9.11588 6.44205L9.39363 7.29812M9.11588 6.44205L9.39363 7.29812M5.94692 8.08425C4.47436 9.15417 3.22283 10.4416 2.17261 11.9261C1.93822 12.257 1.94173 12.4421 2.1881 12.761C3.0905 13.9301 4.08229 15.017 5.20501 15.9799M5.94692 8.08425L6.47594 8.81235M5.94692 8.08425L6.47565 8.81256M5.20501 15.9799C6.377 16.9829 7.65247 17.8185 9.11025 18.3534M5.20501 15.9799L5.79094 15.2967C5.79085 15.2967 5.79077 15.2966 5.79068 15.2965M5.20501 15.9799L5.79022 15.2961C5.79037 15.2963 5.79053 15.2964 5.79068 15.2965M9.11025 18.3534C10.4892 18.8588 11.9047 19.0313 13.3618 18.8272C14.538 18.6624 15.6333 18.2591 16.6673 17.6833C17.8808 17.0076 18.9465 16.1418 19.9088 15.1451M9.11025 18.3534L9.4203 17.5085M9.11025 18.3534L9.41996 17.5084M19.9088 15.1451L19.2613 14.52M19.9088 15.1451L19.261 14.5203C19.2611 14.5202 19.2612 14.5201 19.2613 14.52M19.2613 14.52C18.3489 15.465 17.3521 16.2719 16.2295 16.897C15.2764 17.4277 14.2865 17.7889 13.237 17.9359L13.2369 17.9359C11.9355 18.1182 10.6691 17.9662 9.4203 17.5085M19.2613 14.52C19.9178 13.8392 20.5178 13.1277 21.0411 12.3637M9.4203 17.5085L9.41996 17.5084M9.4203 17.5085L9.39385 7.29805C10.2064 7.03444 11.0342 6.90276 11.8053 6.9C13.0424 6.90287 14.1556 7.15668 15.2351 7.62131L15.591 6.79476L15.2352 7.62137C16.4816 8.15817 17.5992 8.92732 18.6518 9.85304M9.41996 17.5084C8.0895 17.0201 6.90559 16.2506 5.79068 15.2965M9.41996 17.5084L2.99145 12.3281M21.0411 12.3637C20.3059 11.4573 19.5167 10.6141 18.6518 9.85304M5.79068 15.2965C4.76026 14.4127 3.83895 13.4133 2.99145 12.3281M2.99145 12.3281C3.9699 10.9699 5.12535 9.79371 6.47565 8.81256M2.99145 12.3281L6.47565 8.81256M2.99145 12.3281C2.96326 12.3672 2.93523 12.4065 2.90734 12.4459L2.90697 12.4464C2.8784 12.4868 2.86934 12.5044 2.86925 12.5044C2.86923 12.5044 2.87024 12.5023 2.87188 12.4984C2.87674 12.4868 2.88453 12.465 2.89068 12.4349C2.89072 12.4347 2.89077 12.4344 2.89081 12.4342C2.89645 12.4064 2.90067 12.3716 2.89991 12.3313C2.89911 12.2881 2.89287 12.2514 2.88551 12.2227C2.88547 12.2225 2.88543 12.2224 2.88539 12.2222C2.87831 12.1947 2.87022 12.1745 2.86493 12.1632C2.86288 12.1587 2.86161 12.1564 2.86163 12.1564C2.86171 12.1564 2.87122 12.1731 2.90029 12.2107L2.90057 12.2111C2.93077 12.2502 2.96106 12.2892 2.99145 12.3281ZM6.47565 8.81256L6.47594 8.81235M6.47594 8.81235C7.3839 8.15325 8.349 7.63738 9.39363 7.29812M6.47594 8.81235L9.39363 7.29812"
							stroke="#A1A1A1" stroke-width="1.8" stroke-miterlimit="10" />
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM11.8147 9.36785C12.0684 9.42543 12.3207 9.26644 12.3783 9.01272C12.4359 8.75901 12.2769 8.50666 12.0232 8.44907C11.5366 8.33864 10.6003 8.34226 9.83808 9.24062C9.47204 9.67204 9.37291 10.2545 9.34648 10.6581C9.33255 10.8707 9.33738 11.0597 9.34557 11.1957C9.34969 11.264 9.35471 11.3199 9.35886 11.3598C9.36093 11.3797 9.36279 11.3957 9.36421 11.4073L9.366 11.4214L9.3666 11.4259L9.36681 11.4275L9.36697 11.4287C9.40294 11.6863 9.64097 11.8661 9.89864 11.8301C10.1559 11.7942 10.3355 11.5566 10.3002 11.2994L10.3001 11.2984L10.2994 11.2927C10.2986 11.2865 10.2974 11.2762 10.296 11.2624C10.2931 11.2345 10.2892 11.1923 10.286 11.139C10.2795 11.0317 10.2759 10.8834 10.2866 10.7196C10.3095 10.3703 10.3922 10.0437 10.5565 9.85015C11.0281 9.29426 11.5632 9.31077 11.8147 9.36785Z"
							fill="#A1A1A1" />
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<rect x="8.22852" y="12.0978" width="1.46295" height="4.09778" rx="0.731473"
							transform="rotate(30 8.22852 12.0978)" fill="#A1A1A1" />
						<rect width="1.46295" height="4.09778" rx="0.731473"
							transform="matrix(0.866025 -0.5 -0.5 -0.866025 16.4238 16.2612)" fill="#A1A1A1" />
						<rect x="10.959" y="12.7808" width="1.46295" height="4.09778" rx="0.731473" fill="#A1A1A1" />
						<rect x="17.3613" y="10.9065" width="1.46295" height="4.51201" rx="0.731473"
							transform="rotate(-60 17.3613 10.9065)" fill="#A1A1A1" />
						<rect width="1.46295" height="4.51201" rx="0.731473"
							transform="matrix(0.5 0.866025 0.866025 -0.5 2 12.0978)" fill="#A1A1A1" />
						<path
							d="M3.44727 8C4.19981 8.97503 5.02633 9.88196 5.9632 10.6838C6.94057 11.5209 8.00365 12.2177 9.21993 12.6632C10.3699 13.0847 11.5504 13.2285 12.7655 13.0583C13.7464 12.9209 14.6598 12.5851 15.5221 12.1044C16.5341 11.5409 17.4228 10.8188 18.2253 9.98762C18.8158 9.37537 19.3611 8.72555 19.8384 8.01937"
							stroke="#A1A1A1" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" />
					</svg>
				</view>
				<template v-else>
					<uni-icons v-if="isVal" class="content-clear-icon" :class="{ 'is-textarea-icon': type === 'textarea' }"
						:type="showPassword ? 'eye-slash-filled' : 'eye-filled'" :size="22"
						:color="focusShow ? primaryColor : '#c0c4cc'" @click="onEyes">
					</uni-icons>
				</template>
			</template>
			<template v-else-if="suffixIcon">
				<uni-icons v-if="suffixIcon" class="content-clear-icon" :type="suffixIcon" color="#c0c4cc"
					@click="onClickIcon('suffix')" size="22"></uni-icons>
			</template>
			<template v-else>
				<uni-icons v-if="clearable && isVal && !disabled && type !== 'textarea'" class="content-clear-icon"
					:class="{ 'is-textarea-icon': type === 'textarea' }" :type="clearableType" :size="clearSize"
					:color="msg ? '#dd524d' : (focusShow || primaryColorFocus ? primaryColor : '#c0c4cc')"
					@click="onClear"></uni-icons>

			</template>
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
/**
 * Easyinput 输入框
 * @description 此组件可以实现表单的输入与校验，包括 "text" 和 "textarea" 类型。
 * @tutorial https://ext.dcloud.net.cn/plugin?id=3455
 * @property {String}	value	输入内容
 * @property {String }	type	输入框的类型（默认text） password/text/textarea/..
 * 	@value text			文本输入键盘
 * 	@value textarea	多行文本输入键盘
 * 	@value password	密码输入键盘
 * 	@value number		数字输入键盘，注意iOS上app-vue弹出的数字键盘并非9宫格方式
 * 	@value idcard		身份证输入键盘，信、支付宝、百度、QQ小程序
 * 	@value digit		带小数点的数字键盘	，App的nvue页面、微信、支付宝、百度、头条、QQ小程序支持
 * @property {Boolean}	clearable	是否显示右侧清空内容的图标控件，点击可清空输入框内容（默认true）
 * @property {Boolean}	autoHeight	是否自动增高输入区域，type为textarea时有效（默认true）
 * @property {String }	placeholder	输入框的提示文字
 * @property {String }	placeholderStyle	placeholder的样式(内联样式，字符串)，如"color: #ddd"
 * @property {Boolean}	focus	是否自动获得焦点（默认false）
 * @property {Boolean}	disabled	是否禁用（默认false）
 * @property {Number }	maxlength	最大输入长度，设置为 -1 的时候不限制最大长度（默认140）
 * @property {String }	confirmType	设置键盘右下角按钮的文字，仅在type="text"时生效（默认done）
 * @property {Number }	clearSize	清除图标的大小，单位px（默认15）
 * @property {String}	prefixIcon	输入框头部图标
 * @property {String}	suffixIcon	输入框尾部图标
 * @property {String}	primaryColor	设置主题色（默认#2979ff）
 * @property {Boolean}	trim	是否自动去除两端的空格
 * @value both	去除两端空格
 * @value left	去除左侧空格
 * @value right	去除右侧空格
 * @value start	去除左侧空格
 * @value end		去除右侧空格
 * @value all		去除全部空格
 * @value none	不去除空格
 * @property {Boolean}	inputBorder	是否显示input输入框的边框（默认true）
 * @property {Boolean}	passwordIcon	type=password时是否显示小眼睛图标
 * @property {Object}	styles	自定义颜色
 * @event {Function}	input	输入框内容发生变化时触发
 * @event {Function}	focus	输入框获得焦点时触发
 * @event {Function}	blur	输入框失去焦点时触发
 * @event {Function}	confirm	点击完成按钮时触发
 * @event {Function}	iconClick	点击图标时触发
 * @example <uni-easyinput v-model="mobile"></uni-easyinput>
 */
function obj2strClass(obj) {
	let classess = ''
	for (let key in obj) {
		const val = obj[key]
		if (val) {
			classess += `${key} `
		}
	}
	return classess
}

function obj2strStyle(obj) {
	let style = ''
	for (let key in obj) {
		const val = obj[key]
		style += `${key}:${val};`
	}
	return style
}
export default {
	name: 'uni-easyinput',
	emits: ['click', 'iconClick', 'update:modelValue', 'input', 'focus', 'blur', 'confirm', 'clear', 'eyes', 'change'],
	model: {
		prop: 'modelValue',
		event: 'update:modelValue'
	},
	options: {
		virtualHost: true
	},
	inject: {
		form: {
			from: 'uniForm',
			default: null
		},
		formItem: {
			from: 'uniFormItem',
			default: null
		},
	},
	props: {
		customEyeIcon: Boolean,
		name: String,
		value: [Number, String],
		modelValue: [Number, String],
		type: {
			type: String,
			default: 'text'
		},
		clearable: {
			type: Boolean,
			default: true
		},
		clearableType: {
			type: String,
			default: () => {
				return 'clear'
			}
		},
		autoHeight: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: ' '
		},
		placeholderStyle: String,
		focus: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		maxlength: {
			type: [Number, String],
			default: 140
		},
		confirmType: {
			type: String,
			default: 'done'
		},
		clearSize: {
			type: [Number, String],
			default: 24
		},
		inputBorder: {
			type: Boolean,
			default: true
		},
		prefixIcon: {
			type: String,
			default: ''
		},
		suffixIcon: {
			type: String,
			default: ''
		},
		trim: {
			type: [Boolean, String],
			default: true
		},
		passwordIcon: {
			type: Boolean,
			default: true
		},
		primaryColor: {
			type: String,
			default: '#2979ff'
		},
		primaryColorFocus: Boolean,
		styles: {
			type: Object,
			default() {
				return {
					color: '#404040',
					disableColor: '#F7F6F6',
					borderColor: '#e5e5e5'
				}
			}
		},
		errorMessage: {
			type: [String, Boolean],
			default: ''
		}
	},
	data() {
		return {
			focused: false,
			val: '',
			showMsg: '',
			border: false,
			isFirstBorder: false,
			showClearIcon: false,
			showPassword: false,
			focusShow: false,
			localMsg: '',
			isEnter: false // 用于判断当前是否是使用回车操作
		};
	},
	computed: {
		// 输入框内是否有值
		isVal() {
			const val = this.val
			// fixed by mehaotian 处理值为0的情况，字符串0不在处理范围
			if (val || val === 0) {
				return true
			}
			return false
		},

		msg() {
			// console.log('computed', this.form, this.formItem);
			// if (this.form) {
			// 	return this.errorMessage || this.formItem.errMsg;
			// }
			// TODO 处理头条 formItem 中 errMsg 不更新的问题
			return this.localMsg || this.errorMessage
		},
		// 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
		inputMaxlength() {
			return Number(this.maxlength);
		},

		// 处理外层样式的style
		boxStyle() {
			return `color:${this.inputBorder && this.msg ? '#e43d33' : this.styles.color};`
		},
		// input 内容的类和样式处理
		inputContentClass() {
			return obj2strClass({
				'is-input-border': this.inputBorder,
				'is-input-error-border': this.inputBorder && this.msg,
				'is-textarea': this.type === 'textarea',
				'is-disabled': this.disabled
			})
		},
		inputContentStyle() {
			const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor
			const borderColor = this.inputBorder && this.msg ? '#dd524d' : focusColor
			return obj2strStyle({
				'border-color': borderColor || '#e5e5e5',
				'background-color': this.disabled ? this.styles.disableColor : '#fff'
			})
		},
		// input右侧样式
		inputStyle() {
			const paddingRight = this.type === 'password' || this.clearable || this.prefixIcon ? '' : '10px'
			return obj2strStyle({
				'padding-right': paddingRight,
				'padding-left': this.prefixIcon ? '' : '10px'
			})
		}
	},
	watch: {
		value(newVal) {
			this.val = newVal
		},
		modelValue(newVal) {
			this.val = newVal
		},
		focus(newVal) {
			this.$nextTick(() => {
				this.focused = this.focus
				this.focusShow = this.focus
			})
		}
	},
	created() {
		this.init()
		// TODO 处理头条vue3 computed 不监听 inject 更改的问题（formItem.errMsg）
		if (this.form && this.formItem) {
			this.$watch('formItem.errMsg', (newVal) => {
				this.localMsg = newVal
			})
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.focused = this.focus
			this.focusShow = this.focus
		})
	},
	methods: {
		/**
		 * 初始化变量值
		 */
		init() {
			if (this.value || this.value === 0) {
				this.val = this.value
			} else if (this.modelValue || this.modelValue === 0) {
				this.val = this.modelValue
			} else {
				this.val = null
			}
		},

		/**
		 * 点击图标时触发
		 * @param {Object} type
		 */
		onClickIcon(type) {
			this.$emit('iconClick', type)
		},

		/**
		 * 显示隐藏内容，密码框时生效
		 */
		onEyes() {
			this.showPassword = !this.showPassword
			this.$emit('eyes', this.showPassword)
		},

		/**
		 * 输入时触发
		 * @param {Object} event
		 */
		onInput(event) {
			let value = event.detail.value;
			// 判断是否去除空格
			if (this.trim) {
				if (typeof (this.trim) === 'boolean' && this.trim) {
					value = this.trimStr(value)
				}
				if (typeof (this.trim) === 'string') {
					value = this.trimStr(value, this.trim)
				}
			};
			if (this.errMsg) this.errMsg = ''
			this.val = value
			// TODO 兼容 vue2
			this.$emit('input', value);
			// TODO　兼容　vue3
			this.$emit('update:modelValue', value)
		},

		/**
		 * 外部调用方法
		 * 获取焦点时触发
		 * @param {Object} event
		 */
		onFocus() {
			this.$nextTick(() => {
				this.focused = true
			})
			this.$emit('focus', null);
		},

		_Focus(event) {
			this.focusShow = true
			this.$emit('focus', event);
		},

		/**
		 * 外部调用方法
		 * 失去焦点时触发
		 * @param {Object} event
		 */
		onBlur() {
			this.focused = false
			this.$emit('focus', null);
		},
		_Blur(event) {
			let value = event.detail.value;
			this.focusShow = false
			this.$emit('blur', event);
			// 根据类型返回值，在event中获取的值理论上讲都是string
			if (this.isEnter === false) {
				this.$emit('change', this.val)
			}
			// 失去焦点时参与表单校验
			if (this.form && this.formItem) {
				const {
					validateTrigger
				} = this.form
				if (validateTrigger === 'blur') {
					this.formItem.onFieldChange()
				}
			}
		},

		/**
		 * 按下键盘的发送键
		 * @param {Object} e
		 */
		onConfirm(e) {
			this.$emit('confirm', this.val);
			this.isEnter = true;
			this.$emit('change', this.val)
			this.$nextTick(() => {
				this.isEnter = false
			})
		},

		/**
		 * 清理内容
		 * @param {Object} event
		 */
		onClear(event) {
			this.val = '';
			// TODO 兼容 vue2
			this.$emit('input', '');
			// TODO 兼容 vue2
			// TODO　兼容　vue3
			this.$emit('update:modelValue', '')
			// 点击叉号触发
			this.$emit('clear')
		},

		/**
		 * 去除空格
		 */
		trimStr(str, pos = 'both') {
			if (pos === 'both') {
				return str.trim();
			} else if (pos === 'left') {
				return str.trimLeft();
			} else if (pos === 'right') {
				return str.trimRight();
			} else if (pos === 'start') {
				return str.trimStart()
			} else if (pos === 'end') {
				return str.trimEnd()
			} else if (pos === 'all') {
				return str.replace(/\s+/g, '');
			} else if (pos === 'none') {
				return str;
			}
			return str;
		}
	}
};
</script>

<style lang="scss">
$uni-error: #e43d33;
$uni-border-1: #DCDFE6 !default;

.uni-easyinput {
	/* #ifndef APP-NVUE */
	width: 100%;
	/* #endif */
	flex: 1;
	position: relative;
	text-align: left;
	color: #404040;
	font-size: 14px;
}

.uni-easyinput__content {
	flex: 1;
	/* #ifndef APP-NVUE */
	width: 100%;
	display: flex;
	box-sizing: border-box;
	// min-height: 36px;
	/* #endif */
	flex-direction: row;
	align-items: center;
	// 处理border动画刚开始显示黑色的问题
	border-color: #fff;
	transition-property: border-color;
	transition-duration: 0.3s;
}

.uni-easyinput__content-input {
	/* #ifndef APP-NVUE */
	width: auto;
	/* #endif */
	position: relative;
	overflow: hidden;
	flex: 1;
	line-height: 1;
	font-size: 14px;
	height: 35px;
	// min-height: 36px;
}

.uni-easyinput__placeholder-class {
	color: #999;
	font-size: 12px;
	// font-weight: 200;
}

.is-textarea {
	align-items: flex-start;
}

.is-textarea-icon {
	margin-top: 5px;
}

.uni-easyinput__content-textarea {
	position: relative;
	overflow: hidden;
	flex: 1;
	line-height: 1.5;
	font-size: 14px;
	margin: 6px;
	margin-left: 0;
	height: 80px;
	min-height: 80px;
	/* #ifndef APP-NVUE */
	min-height: 80px;
	width: auto;
	/* #endif */
}

.input-padding {
	padding-left: 10px;
}

.content-clear-icon {
	padding: 0 5px;
}

.label-icon {
	margin-right: 5px;
	margin-top: -1px;
}

// 显示边框
.is-input-border {
	/* #ifndef APP-NVUE */
	display: flex;
	box-sizing: border-box;
	/* #endif */
	flex-direction: row;
	align-items: center;
	border: 1px solid $uni-border-1;
	border-radius: 4px;
	/* #ifdef MP-ALIPAY */
	overflow: hidden;
	/* #endif */
}

.uni-error-message {
	position: absolute;
	bottom: -17px;
	left: 0;
	line-height: 12px;
	color: $uni-error;
	font-size: 12px;
	text-align: left;
}

.uni-error-msg--boeder {
	position: relative;
	bottom: 0;
	line-height: 22px;
}

.is-input-error-border {
	border-color: $uni-error;

	.uni-easyinput__placeholder-class {
		color: mix(#fff, $uni-error, 50%);
		;
	}
}


.uni-easyinput--border {
	margin-bottom: 0;
	padding: 10px 15px;
	// padding-bottom: 0;
	border-top: 1px #eee solid;
}

.uni-easyinput-error {
	padding-bottom: 0;
}

.is-first-border {
	/* #ifndef APP-NVUE */
	border: none;
	/* #endif */
	/* #ifdef APP-NVUE */
	border-width: 0;
	/* #endif */
}

.is-disabled {
	background-color: #F7F6F6;
	color: #D5D5D5;

	.uni-easyinput__placeholder-class {
		color: #D5D5D5;
		font-size: 12px;
	}
}
</style>
