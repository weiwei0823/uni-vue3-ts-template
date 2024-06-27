<template>
	<view class="container" :class="['theme-' + themeColor.name]">
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-position="top">
			<uni-forms-item :label="$t('pages.common.promoteEarn.components.AccountDirectly.text1')" required
				name="userName">
				<uni-easyinput v-model="formData.userName"
					:placeholder="$t('pages.common.promoteEarn.components.AccountDirectly.text2')" />
			</uni-forms-item>
			<uni-forms-item :label="$t('pages.common.promoteEarn.components.AccountDirectly.text3')" required
				name="pwd">
				<uni-easyinput :type="pwdShow?'text':'password'" v-model="formData.pwd"
					:adjust-position="true"
					placeholder="密码请输入8～12个字符" customEyeIcon
					:passwordIcon="false" :clearable="false">
					<template #right>
						<svg @click="pwdShow=false" v-if="pwdShow" xmlns="http://www.w3.org/2000/svg" width="24"
							height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M21.8008 11.8719C22.0676 12.2035 22.0507 12.478 21.8431 12.7849C21.2715 13.6324 20.6169 14.4109 19.9088 15.1451M21.8008 11.8719C21.0223 10.9048 20.1791 9.99815 19.2464 9.1774M21.8008 11.8719L21.2039 12.3524L21.203 12.3532L21.1094 12.4285C21.113 12.4429 21.1171 12.4543 21.1205 12.4624C21.1227 12.4675 21.124 12.47 21.124 12.4699C21.1238 12.4696 21.1177 12.4585 21.0998 12.4363C21.0803 12.412 21.0607 12.3879 21.0411 12.3637M21.8008 11.8719L21.2038 12.3523L21.2029 12.3531L21.1094 12.4283C21.1046 12.4092 21.1007 12.385 21.1001 12.3568C21.0995 12.3286 21.1023 12.3053 21.1058 12.2876C21.1058 12.2871 21.1059 12.2867 21.106 12.2862C21.1111 12.2615 21.1174 12.2481 21.1174 12.2481C21.1175 12.2481 21.1126 12.2584 21.0977 12.2805L21.0969 12.2817C21.0784 12.3091 21.0598 12.3364 21.0411 12.3637M19.2464 9.1774C18.1427 8.20672 16.9461 7.37823 15.591 6.7947C14.4071 6.28508 13.1732 6.00282 11.8048 6C10.9355 6.00282 10.0141 6.15063 9.11588 6.44205M19.2464 9.1774L18.652 9.85322C18.652 9.85316 18.6519 9.8531 18.6518 9.85304M19.2464 9.1774L18.6518 9.85304M9.11588 6.44205C7.96922 6.81441 6.92041 7.37753 5.94692 8.08425M9.11588 6.44205L9.39363 7.29812M9.11588 6.44205L9.39363 7.29812M5.94692 8.08425C4.47436 9.15417 3.22283 10.4416 2.17261 11.9261C1.93822 12.257 1.94173 12.4421 2.1881 12.761C3.0905 13.9301 4.08229 15.017 5.20501 15.9799M5.94692 8.08425L6.47594 8.81235M5.94692 8.08425L6.47565 8.81256M5.20501 15.9799C6.377 16.9829 7.65247 17.8185 9.11025 18.3534M5.20501 15.9799L5.79094 15.2967C5.79085 15.2967 5.79077 15.2966 5.79068 15.2965M5.20501 15.9799L5.79022 15.2961C5.79037 15.2963 5.79053 15.2964 5.79068 15.2965M9.11025 18.3534C10.4892 18.8588 11.9047 19.0313 13.3618 18.8272C14.538 18.6624 15.6333 18.2591 16.6673 17.6833C17.8808 17.0076 18.9465 16.1418 19.9088 15.1451M9.11025 18.3534L9.4203 17.5085M9.11025 18.3534L9.41996 17.5084M19.9088 15.1451L19.2613 14.52M19.9088 15.1451L19.261 14.5203C19.2611 14.5202 19.2612 14.5201 19.2613 14.52M19.2613 14.52C18.3489 15.465 17.3521 16.2719 16.2295 16.897C15.2764 17.4277 14.2865 17.7889 13.237 17.9359L13.2369 17.9359C11.9355 18.1182 10.6691 17.9662 9.4203 17.5085M19.2613 14.52C19.9178 13.8392 20.5178 13.1277 21.0411 12.3637M9.4203 17.5085L9.41996 17.5084M9.4203 17.5085L9.39385 7.29805C10.2064 7.03444 11.0342 6.90276 11.8053 6.9C13.0424 6.90287 14.1556 7.15668 15.2351 7.62131L15.591 6.79476L15.2352 7.62137C16.4816 8.15817 17.5992 8.92732 18.6518 9.85304M9.41996 17.5084C8.0895 17.0201 6.90559 16.2506 5.79068 15.2965M9.41996 17.5084L2.99145 12.3281M21.0411 12.3637C20.3059 11.4573 19.5167 10.6141 18.6518 9.85304M5.79068 15.2965C4.76026 14.4127 3.83895 13.4133 2.99145 12.3281M2.99145 12.3281C3.9699 10.9699 5.12535 9.79371 6.47565 8.81256M2.99145 12.3281L6.47565 8.81256M2.99145 12.3281C2.96326 12.3672 2.93523 12.4065 2.90734 12.4459L2.90697 12.4464C2.8784 12.4868 2.86934 12.5044 2.86925 12.5044C2.86923 12.5044 2.87024 12.5023 2.87188 12.4984C2.87674 12.4868 2.88453 12.465 2.89068 12.4349C2.89072 12.4347 2.89077 12.4344 2.89081 12.4342C2.89645 12.4064 2.90067 12.3716 2.89991 12.3313C2.89911 12.2881 2.89287 12.2514 2.88551 12.2227C2.88547 12.2225 2.88543 12.2224 2.88539 12.2222C2.87831 12.1947 2.87022 12.1745 2.86493 12.1632C2.86288 12.1587 2.86161 12.1564 2.86163 12.1564C2.86171 12.1564 2.87122 12.1731 2.90029 12.2107L2.90057 12.2111C2.93077 12.2502 2.96106 12.2892 2.99145 12.3281ZM6.47565 8.81256L6.47594 8.81235M6.47594 8.81235C7.3839 8.15325 8.349 7.63738 9.39363 7.29812M6.47594 8.81235L9.39363 7.29812"
								stroke="#A1A1A1" stroke-width="1.8" stroke-miterlimit="10" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M11.999 15C14.2082 15 15.999 13.2091 15.999 11C15.999 8.79086 14.2082 7 11.999 7C9.78988 7 7.99902 8.79086 7.99902 11C7.99902 13.2091 9.78988 15 11.999 15ZM11.8137 9.36785C12.0674 9.42543 12.3198 9.26644 12.3774 9.01272C12.4349 8.75901 12.2759 8.50666 12.0222 8.44907C11.5357 8.33864 10.5993 8.34226 9.8371 9.24062C9.47106 9.67204 9.37193 10.2545 9.3455 10.6581C9.33158 10.8707 9.3364 11.0597 9.34459 11.1957C9.34871 11.264 9.35374 11.3199 9.35788 11.3598C9.35995 11.3797 9.36181 11.3957 9.36324 11.4073L9.36502 11.4214L9.36562 11.4259L9.36584 11.4275L9.366 11.4287C9.40196 11.6863 9.64 11.8661 9.89767 11.8301C10.1549 11.7942 10.3345 11.5566 10.2992 11.2994L10.2991 11.2984L10.2984 11.2927C10.2976 11.2865 10.2964 11.2762 10.295 11.2624C10.2921 11.2345 10.2882 11.1923 10.285 11.139C10.2786 11.0317 10.2749 10.8834 10.2856 10.7196C10.3085 10.3703 10.3913 10.0437 10.5555 9.85015C11.0272 9.29426 11.5622 9.31077 11.8137 9.36785Z"
								fill="#A1A1A1" />
						</svg>

						<svg @click="pwdShow=true" v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24"
							viewBox="0 0 24 24" fill="none">
							<rect x="8.22803" y="12.0977" width="1.46295" height="4.09778" rx="0.731473"
								transform="rotate(30 8.22803 12.0977)" fill="#A1A1A1" />
							<rect width="1.46295" height="4.09778" rx="0.731473"
								transform="matrix(0.866025 -0.5 -0.5 -0.866025 16.4229 16.2607)" fill="#A1A1A1" />
							<rect x="10.9595" y="12.7812" width="1.46295" height="4.09778" rx="0.731473"
								fill="#A1A1A1" />
							<rect x="17.3608" y="10.9062" width="1.46295" height="4.51201" rx="0.731473"
								transform="rotate(-60 17.3608 10.9062)" fill="#A1A1A1" />
							<rect width="1.46295" height="4.51201" rx="0.731473"
								transform="matrix(0.5 0.866025 0.866025 -0.5 2 12.0977)" fill="#A1A1A1" />
							<path
								d="M3.44678 8C4.19933 8.97503 5.02584 9.88196 5.96271 10.6838C6.94008 11.5209 8.00316 12.2177 9.21945 12.6632C10.3694 13.0847 11.5499 13.2285 12.765 13.0583C13.7459 12.9209 14.6593 12.5851 15.5216 12.1044C16.5336 11.5409 17.4223 10.8188 18.2248 9.98762C18.8153 9.37537 19.3607 8.72555 19.8379 8.01937"
								stroke="#A1A1A1" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" />
						</svg>

					</template>
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item :label="$t('pages.common.promoteEarn.components.AccountDirectly.text5')" name="confirmPwd">
				<uni-easyinput :passwordIcon="false" :type="confirmPwdShow?'text':'password'"
					v-model="formData.confirmPwd"
					placeholder="请再次输入密码" customEyeIcon
					:clearable="false">
					<template #right>
						<svg @click="confirmPwdShow=false" v-if="confirmPwdShow" xmlns="http://www.w3.org/2000/svg"
							width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M21.8008 11.8719C22.0676 12.2035 22.0507 12.478 21.8431 12.7849C21.2715 13.6324 20.6169 14.4109 19.9088 15.1451M21.8008 11.8719C21.0223 10.9048 20.1791 9.99815 19.2464 9.1774M21.8008 11.8719L21.2039 12.3524L21.203 12.3532L21.1094 12.4285C21.113 12.4429 21.1171 12.4543 21.1205 12.4624C21.1227 12.4675 21.124 12.47 21.124 12.4699C21.1238 12.4696 21.1177 12.4585 21.0998 12.4363C21.0803 12.412 21.0607 12.3879 21.0411 12.3637M21.8008 11.8719L21.2038 12.3523L21.2029 12.3531L21.1094 12.4283C21.1046 12.4092 21.1007 12.385 21.1001 12.3568C21.0995 12.3286 21.1023 12.3053 21.1058 12.2876C21.1058 12.2871 21.1059 12.2867 21.106 12.2862C21.1111 12.2615 21.1174 12.2481 21.1174 12.2481C21.1175 12.2481 21.1126 12.2584 21.0977 12.2805L21.0969 12.2817C21.0784 12.3091 21.0598 12.3364 21.0411 12.3637M19.2464 9.1774C18.1427 8.20672 16.9461 7.37823 15.591 6.7947C14.4071 6.28508 13.1732 6.00282 11.8048 6C10.9355 6.00282 10.0141 6.15063 9.11588 6.44205M19.2464 9.1774L18.652 9.85322C18.652 9.85316 18.6519 9.8531 18.6518 9.85304M19.2464 9.1774L18.6518 9.85304M9.11588 6.44205C7.96922 6.81441 6.92041 7.37753 5.94692 8.08425M9.11588 6.44205L9.39363 7.29812M9.11588 6.44205L9.39363 7.29812M5.94692 8.08425C4.47436 9.15417 3.22283 10.4416 2.17261 11.9261C1.93822 12.257 1.94173 12.4421 2.1881 12.761C3.0905 13.9301 4.08229 15.017 5.20501 15.9799M5.94692 8.08425L6.47594 8.81235M5.94692 8.08425L6.47565 8.81256M5.20501 15.9799C6.377 16.9829 7.65247 17.8185 9.11025 18.3534M5.20501 15.9799L5.79094 15.2967C5.79085 15.2967 5.79077 15.2966 5.79068 15.2965M5.20501 15.9799L5.79022 15.2961C5.79037 15.2963 5.79053 15.2964 5.79068 15.2965M9.11025 18.3534C10.4892 18.8588 11.9047 19.0313 13.3618 18.8272C14.538 18.6624 15.6333 18.2591 16.6673 17.6833C17.8808 17.0076 18.9465 16.1418 19.9088 15.1451M9.11025 18.3534L9.4203 17.5085M9.11025 18.3534L9.41996 17.5084M19.9088 15.1451L19.2613 14.52M19.9088 15.1451L19.261 14.5203C19.2611 14.5202 19.2612 14.5201 19.2613 14.52M19.2613 14.52C18.3489 15.465 17.3521 16.2719 16.2295 16.897C15.2764 17.4277 14.2865 17.7889 13.237 17.9359L13.2369 17.9359C11.9355 18.1182 10.6691 17.9662 9.4203 17.5085M19.2613 14.52C19.9178 13.8392 20.5178 13.1277 21.0411 12.3637M9.4203 17.5085L9.41996 17.5084M9.4203 17.5085L9.39385 7.29805C10.2064 7.03444 11.0342 6.90276 11.8053 6.9C13.0424 6.90287 14.1556 7.15668 15.2351 7.62131L15.591 6.79476L15.2352 7.62137C16.4816 8.15817 17.5992 8.92732 18.6518 9.85304M9.41996 17.5084C8.0895 17.0201 6.90559 16.2506 5.79068 15.2965M9.41996 17.5084L2.99145 12.3281M21.0411 12.3637C20.3059 11.4573 19.5167 10.6141 18.6518 9.85304M5.79068 15.2965C4.76026 14.4127 3.83895 13.4133 2.99145 12.3281M2.99145 12.3281C3.9699 10.9699 5.12535 9.79371 6.47565 8.81256M2.99145 12.3281L6.47565 8.81256M2.99145 12.3281C2.96326 12.3672 2.93523 12.4065 2.90734 12.4459L2.90697 12.4464C2.8784 12.4868 2.86934 12.5044 2.86925 12.5044C2.86923 12.5044 2.87024 12.5023 2.87188 12.4984C2.87674 12.4868 2.88453 12.465 2.89068 12.4349C2.89072 12.4347 2.89077 12.4344 2.89081 12.4342C2.89645 12.4064 2.90067 12.3716 2.89991 12.3313C2.89911 12.2881 2.89287 12.2514 2.88551 12.2227C2.88547 12.2225 2.88543 12.2224 2.88539 12.2222C2.87831 12.1947 2.87022 12.1745 2.86493 12.1632C2.86288 12.1587 2.86161 12.1564 2.86163 12.1564C2.86171 12.1564 2.87122 12.1731 2.90029 12.2107L2.90057 12.2111C2.93077 12.2502 2.96106 12.2892 2.99145 12.3281ZM6.47565 8.81256L6.47594 8.81235M6.47594 8.81235C7.3839 8.15325 8.349 7.63738 9.39363 7.29812M6.47594 8.81235L9.39363 7.29812"
								stroke="#A1A1A1" stroke-width="1.8" stroke-miterlimit="10" />
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M11.999 15C14.2082 15 15.999 13.2091 15.999 11C15.999 8.79086 14.2082 7 11.999 7C9.78988 7 7.99902 8.79086 7.99902 11C7.99902 13.2091 9.78988 15 11.999 15ZM11.8137 9.36785C12.0674 9.42543 12.3198 9.26644 12.3774 9.01272C12.4349 8.75901 12.2759 8.50666 12.0222 8.44907C11.5357 8.33864 10.5993 8.34226 9.8371 9.24062C9.47106 9.67204 9.37193 10.2545 9.3455 10.6581C9.33158 10.8707 9.3364 11.0597 9.34459 11.1957C9.34871 11.264 9.35374 11.3199 9.35788 11.3598C9.35995 11.3797 9.36181 11.3957 9.36324 11.4073L9.36502 11.4214L9.36562 11.4259L9.36584 11.4275L9.366 11.4287C9.40196 11.6863 9.64 11.8661 9.89767 11.8301C10.1549 11.7942 10.3345 11.5566 10.2992 11.2994L10.2991 11.2984L10.2984 11.2927C10.2976 11.2865 10.2964 11.2762 10.295 11.2624C10.2921 11.2345 10.2882 11.1923 10.285 11.139C10.2786 11.0317 10.2749 10.8834 10.2856 10.7196C10.3085 10.3703 10.3913 10.0437 10.5555 9.85015C11.0272 9.29426 11.5622 9.31077 11.8137 9.36785Z"
								fill="#A1A1A1" />
						</svg>

						<svg @click="confirmPwdShow=true" v-else xmlns="http://www.w3.org/2000/svg" width="24"
							height="24" viewBox="0 0 24 24" fill="none">
							<rect x="8.22803" y="12.0977" width="1.46295" height="4.09778" rx="0.731473"
								transform="rotate(30 8.22803 12.0977)" fill="#A1A1A1" />
							<rect width="1.46295" height="4.09778" rx="0.731473"
								transform="matrix(0.866025 -0.5 -0.5 -0.866025 16.4229 16.2607)" fill="#A1A1A1" />
							<rect x="10.9595" y="12.7812" width="1.46295" height="4.09778" rx="0.731473"
								fill="#A1A1A1" />
							<rect x="17.3608" y="10.9062" width="1.46295" height="4.51201" rx="0.731473"
								transform="rotate(-60 17.3608 10.9062)" fill="#A1A1A1" />
							<rect width="1.46295" height="4.51201" rx="0.731473"
								transform="matrix(0.5 0.866025 0.866025 -0.5 2 12.0977)" fill="#A1A1A1" />
							<path
								d="M3.44678 8C4.19933 8.97503 5.02584 9.88196 5.96271 10.6838C6.94008 11.5209 8.00316 12.2177 9.21945 12.6632C10.3694 13.0847 11.5499 13.2285 12.765 13.0583C13.7459 12.9209 14.6593 12.5851 15.5216 12.1044C16.5336 11.5409 17.4223 10.8188 18.2248 9.98762C18.8153 9.37537 19.3607 8.72555 19.8379 8.01937"
								stroke="#A1A1A1" stroke-width="1.8" stroke-miterlimit="10" stroke-linecap="round" />
						</svg>
					</template>
				</uni-easyinput>
			</uni-forms-item>
		</uni-forms>
		<button class="btn" type="primary" @click="submit">{{
			$t('pages.common.promoteEarn.components.AccountDirectly.text26') }}</button>
		<u-popup v-model="successShow" mode="center" border-radius="24">
			<view class="success-box">
				<view class="title">开户成功</view>
				<view class="content">
					<view class="text">账户：{{ formData.userName }}</view>
					<view class="text">密码：{{ formData.pwd }}</view>
					<view class="text">网站链接：{{ url }}</view>
					<view class="copy" @click="copyText">复制</view>
				</view>
				<view class="ok-btn" @click="closeShow">我知道了！</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import {
		underOpenAccount
	} from "@/utils/ptp";
	import {
		mapGetters
	} from 'pinia';
	export default {
		data() {
			return {
				pwdShow: true,
				confirmPwdShow: true,
				successShow: false,
				formData: {
					userName: "",
					pwd: "",
					confirmPwd: "",
				},
				rules: {
					userName: {
						rules: [{
								required: true,
								errorMessage: this.$t("pages.common.promoteEarn.components.AccountDirectly.text7"),
							},
							{
								pattern: /^[a-zA-Z0-9]{4,16}$/,
								errorMessage: this.$t("pages.common.promoteEarn.components.AccountDirectly.text8"),
							},
						],
					},
					pwd: {
						rules: [{
								required: true,
								errorMessage: this.$t("pages.common.promoteEarn.components.AccountDirectly.text9"),
							},
							{
								pattern: /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,16}/,
								errorMessage: this.$t("pages.common.promoteEarn.components.AccountDirectly.text10"),
							},
						],
					},
					confirmPwd: {
						rules: [{
								required: true,
								errorMessage: this.$t("pages.common.promoteEarn.components.AccountDirectly.text11"),
							},
							{
								// pattern: /^(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{6,16}$/,
								pattern: /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{6,16}/,
								errorMessage: this.$t("pages.common.promoteEarn.components.AccountDirectly.text12"),
							},
							{
								validateFunction: (rule, value, data, callback) => {
									if (value !== this.formData.pwd) {
										callback(this.$t(
											"pages.common.promoteEarn.components.AccountDirectly.text13"));
									}
									return true;
								},
							},
						],
					},
				},
			};
		},
		computed: {
			...mapState(useAppInfoStore, ['themeColor']),
			url() {
				return location.host
			}
		},
		methods: {
			closeShow() {
				this.successShow = false;
				this.formData = {
					userName: "",
					pwd: "",
					confirmPwd: "",
				};
			},
			copyText() {
				const {
					userName,
					pwd
				} = this.formData
				const data = `${userName} ${pwd} ${this.url}`
				uni.setClipboardData({
					data,
					success: () => {
						this.copySuccess()
						// this.formData = {
						// 	userName: "",
						// 	pwd: "",
						// 	confirmPwd: "",
						// };
					}
				});
			},
			copySuccess() {
				// this.successShow = false;
				pop('复制成功', 1000)
				this.closeShow();
			},
			async submit() {
				const vali = await this.$refs.valiForm.validate().catch((err) => {});
				if (vali) {
					uni.$emit("showPop", {
						refName: "Verify",
						data: {
							verifyType: 'Slide',
							key: '直属开户',
							check_website: false
						},
						success: (resVerify) => {
							if (resVerify.close) resVerify.close();
							const userInfo = this.$config.getStorageSync(this.$config.enumMgr
								.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO);
							const key = userInfo.id || uni.getStorageSync(config.enumMgr
								.APP_LOCALSTORE_KEYS.MEM_CLIENT_ID);
							underOpenAccount({
								...this.formData,
								code: resVerify.data,
								codeKey: key,
								ticket: resVerify.ticket,
								randStr: resVerify.randstr,
							}).then((res) => {
								this.successShow = true

								if (res.code !== 200) {
									return;
								}

							});
						},
						fail: (e) => {},
					});
				}
			},
		},
	};
</script>
<style lang="scss">
	::v-deep .uni-forms {
		.uni-forms-item__label {
			padding: 20rpx !important;
			color: var(--theme-color);
			font-size: 30rpx;
			width: fit-content !important;

			&::before {
				content: '';
				width: 6rpx;
				height: 24rpx;
				background: var(--theme-color);
				border-radius: 6rpx;
				margin-right: 14rpx;
			}

			.is-required {
				display: none;
			}
		}

		.uni-easyinput__content {
			border-radius: 16rpx;
			padding-right: 20rpx;

			.uni-easyinput__content-input {
				height: 88rpx;
				font-size: 24rpx;
			}
		}

		.uni-easyinput__placeholder-class {
			color: #A1A1A1
		}
	}

	.btn {
		background: var(--theme-color);
		border-radius: 16rpx;
	}

	.success-box {
		width: 600rpx;
		// height: 484rpx;

		.title {
			height: 108rpx;
			padding: 10rpx;
			display: grid;
			place-content: center;
			box-sizing: border-box;
			color: #404040;
			font-size: 34rpx;
		}

		.content {
			color: #404040;
			font-size: 30rpx;
			padding: 0 28rpx;

			.text {
				line-height: 58rpx;
			}

			.copy {
				width: 544rpx;
				height: 58rpx;
				margin: 28rpx auto;
				color: #404040;
				font-size: 28rpx;
				display: grid;
				place-content: center;
				border-radius: 8rpx;
				background: var(--theme-auxiliary-color-default);
			}
		}

		.ok-btn {
			// height: 88rpx;
			display: grid;
			place-content: center;
			color: var(--theme-color);
			font-size: 34rpx;
			border-top: 2rpx solid var(--theme-auxiliary-color-default);
			padding: 20rpx 0;
		}
	}
</style>
