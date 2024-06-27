<template>
	<view class="lottery-page" :style="{ marginTop: safeHeight }" :class="['theme-' + themeColor.name]">
		<Header :title="title" isFixed />
		<view class="list-row">
			<view class="list-item">
				<view class="left">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path
							d="M10.2588 0C11.7534 0 13.1557 0.268698 14.4656 0.806095C15.7755 1.34349 16.9175 2.07821 17.8915 3.01026C18.8655 3.94231 19.6338 5.03809 20.1964 6.29762C20.759 7.55714 21.0403 8.90063 21.0403 10.3281C21.0403 11.7723 20.7506 13.1242 20.1712 14.3838C19.5919 15.6433 18.7984 16.7433 17.7907 17.6837C17.4717 18.0364 17.0518 18.2127 16.5312 18.2127C16.1618 18.2127 15.8175 18.1036 15.4984 17.8852C14.7931 17.4318 14.2851 16.9574 13.9744 16.462C13.6637 15.9666 13.437 15.4544 13.2942 14.9254C13.1515 14.3964 13.0507 13.859 12.992 13.3132C12.9332 12.7674 12.8114 12.2216 12.6267 11.6758C12.442 11.13 12.1439 10.58 11.7324 10.0258C11.321 9.47162 10.6954 8.91743 9.85574 8.36324C9.4359 8.09454 9.04125 7.89301 8.67179 7.75866C8.30233 7.62432 7.93287 7.50256 7.56341 7.3934C7.19395 7.28424 6.83288 7.16669 6.48022 7.04074C6.12755 6.91478 5.75809 6.72166 5.37184 6.46136C4.98558 6.20105 4.58673 5.85678 4.17529 5.42855C3.76385 5.00031 3.33141 4.43352 2.87798 3.72819C3.29782 3.12362 3.79743 2.59042 4.37681 2.12859C4.95619 1.66677 5.57336 1.27632 6.22831 0.957238C6.88327 0.638158 7.55501 0.398849 8.24355 0.239309C8.93209 0.0797697 9.60384 0 10.2588 0ZM11.342 11.7388C11.5771 12.2594 11.7408 12.7632 11.8332 13.2502C11.9256 13.7372 11.9969 14.2074 12.0473 14.6609C12.0977 15.1143 12.1691 15.5467 12.2614 15.9582C12.3538 16.3696 12.5217 16.7643 12.7652 17.1421C13.0087 17.52 13.3572 17.881 13.8106 18.2253C14.2641 18.5696 14.8938 18.8929 15.6999 19.1951C15.7503 19.2455 15.7923 19.3421 15.8259 19.4848C15.8595 19.6276 15.9015 19.7913 15.9518 19.976C16.0022 20.1608 16.082 20.3749 16.1911 20.6184C16.3003 20.8619 16.464 21.1096 16.6824 21.3615C15.1709 21.731 13.7687 21.9409 12.4755 21.9913C11.1824 22.0417 9.88093 21.8737 8.57103 21.4875C8.72217 21.118 8.83133 20.7821 8.8985 20.4799C8.96568 20.1776 9.00766 19.8963 9.02446 19.636C9.04125 19.3757 9.04545 19.128 9.03705 18.8929C9.02865 18.6577 9.01606 18.4142 8.99926 18.1623C8.96568 17.6753 8.79354 17.373 8.48286 17.2555C8.17218 17.1379 7.81111 17.1085 7.39967 17.1673C6.98823 17.2261 6.57678 17.3268 6.16534 17.4696C5.75389 17.6123 5.42222 17.7005 5.17031 17.7341C4.88482 17.7845 4.58673 17.8223 4.27605 17.8474C3.96537 17.8726 3.67568 17.8642 3.40698 17.8223C3.13828 17.7803 2.92416 17.7005 2.76462 17.5829C2.60508 17.4654 2.5505 17.2807 2.60089 17.0288C2.63447 16.8272 2.67226 16.5921 2.71424 16.3234C2.75623 16.0547 2.77722 15.7776 2.77722 15.4921C2.77722 15.2066 2.73104 14.9337 2.63867 14.6734C2.54631 14.4131 2.38257 14.1906 2.14746 14.0059C2.04669 13.9387 1.88296 13.8506 1.65624 13.7414C1.42953 13.6322 1.21541 13.5105 1.01389 13.3761C0.812362 13.2418 0.661219 13.1074 0.560457 12.9731C0.459695 12.8387 0.484886 12.7044 0.636029 12.57C0.971902 12.3181 1.31617 12.0326 1.66884 11.7136C2.0215 11.3945 2.2902 11.0502 2.47493 10.6808C2.5589 10.5128 2.60928 10.3365 2.62608 10.1518C2.64287 9.96703 2.63867 9.79489 2.61348 9.63535C2.58829 9.47581 2.5589 9.33307 2.52531 9.20712C2.49173 9.08116 2.47493 8.9762 2.47493 8.89224C2.47493 8.80827 2.44135 8.69911 2.37417 8.56476C2.307 8.43041 2.23982 8.24568 2.17265 8.01057C2.10547 7.77546 2.05509 7.48157 2.0215 7.1289C1.98792 6.77624 2.00471 6.3312 2.07189 5.79381C1.63525 5.91136 1.32457 6.16327 1.13984 6.54952C0.955108 6.93578 0.89633 7.41439 0.963505 7.98538C0.694806 7.58233 0.552061 7.20867 0.535267 6.8644C0.518473 6.52013 0.573052 6.20945 0.699005 5.93236C0.824957 5.65526 1.00969 5.40755 1.2532 5.18924C1.4967 4.97092 1.75281 4.78619 2.0215 4.63505C2.45814 5.57549 2.93256 6.28082 3.44477 6.75105C3.95697 7.22127 4.49437 7.57813 5.05696 7.82164C5.61954 8.06515 6.18633 8.24148 6.75731 8.35064C7.3283 8.4598 7.88669 8.62354 8.43248 8.84186C8.97827 9.06017 9.49888 9.38345 9.99429 9.81169C10.4897 10.2399 10.9389 10.8823 11.342 11.7388Z"
							:fill="themeColor.themeColor" />
					</svg>
					<view class="title">{{$t("common.setting.userInfo.list1")}}</view>
				</view>
				<view class="right" @click="toUrl('./setHead')">
					<image :src="userHeadImageUrl"></image>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
			</view>
			<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
			<view class="list-item">
				<view class="left">
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M4.0307 17.5968L5.70663 17.4456C6.39259 17.3785 7.0427 17.0745 7.52755 16.5896L20.234 3.88359C21.1211 2.9964 21.1211 1.55726 20.234 0.665391C19.3407 -0.221797 17.9017 -0.221797 17.01 0.665391L4.30976 13.3652C3.81867 13.8563 3.51467 14.5003 3.45386 15.1925L3.30264 16.8687C3.26522 17.2803 3.61132 17.6327 4.0307 17.5968ZM1.09997 19.8007C0.492472 19.8007 0 20.2931 0 20.9006C0 21.5081 0.492472 22.0006 1.09997 22.0006H20.8994C21.5069 22.0006 21.9993 21.5081 21.9993 20.9006C21.9993 20.2931 21.5069 19.8007 20.8994 19.8007H1.09997Z"
							:fill="themeColor.themeColor" />
					</svg>

					<view class="title">{{$t("common.setting.userInfo.list2")}}</view>
				</view>
				<view class="right" @click="toUrl('./setNickname')">
					<text class="title">{{ userInfo.nickname }}</text>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
			</view>
			<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
			<view class="list-item">
				<view class="left">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<path
							d="M20.0072 18.994V18.995C20.0072 20.0522 19.0862 21 17.8492 21H4.158C2.92291 21 2 20.054 2 18.995C2 16.0706 4.51717 13.6058 7.7144 13.6058H14.2961C17.4935 13.6058 20.0099 16.0706 20.0072 18.994ZM15.9747 5.6803C15.9747 8.21321 13.7911 10.3606 11.0052 10.3606C8.21936 10.3606 6.0358 8.21321 6.0358 5.6803C6.0358 3.14738 8.21936 1 11.0052 1C13.7911 1 15.9747 3.14738 15.9747 5.6803Z"
							:stroke="themeColor.themeColor" stroke-width="2" />
					</svg>
					<view class="title">{{$t("common.setting.userInfo.list3")}}</view>
				</view>
				<view class="right">
					<text class="title dis-title">{{ userInfo.userName }}</text>
				</view>
			</view>
			<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
			<view class="list-item">
				<view class="left">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<rect x="6.5" width="9" height="2" rx="1" :fill="themeColor.themeColor" />
						<path
							d="M18.3696 19.5404V19.5413C18.3696 20.2977 17.7059 21 16.7857 21H5.58382C4.66497 21 4 20.2989 4 19.5413C4 17.2575 5.96949 15.3138 8.4936 15.3138H13.8786C16.403 15.3138 18.3717 17.2575 18.3696 19.5404ZM15.0702 8.64752C15.0702 10.6111 13.3737 12.295 11.1861 12.295C8.99855 12.295 7.30202 10.6111 7.30202 8.64752C7.30202 6.68395 8.99855 5 11.1861 5C13.3737 5 15.0702 6.68395 15.0702 8.64752Z"
							:stroke="themeColor.themeColor" stroke-width="2" />
					</svg>
					<view class="title">{{$t("common.setting.userInfo.list4")}}</view>
				</view>
				<view class="right">
					<text class="title dis-title">{{ userInfo.id }}</text>
				</view>
			</view>
			<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
			<view class="list-item" style="border:none">
				<view class="left">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M23.0476 11.67C23.0476 11.2722 22.9345 10.8827 22.7213 10.5469C22.5738 10.3146 22.3819 10.1136 22.1567 9.95541C21.9315 9.79723 21.6773 9.68498 21.4087 9.62505C21.1401 9.56512 20.8624 9.5587 20.5913 9.60614C20.3202 9.65359 20.0611 9.75398 19.8288 9.90157L11.5018 15.1905L3.22143 9.911C2.90471 9.70912 2.53955 9.59609 2.16417 9.58374C1.78879 9.57138 1.41699 9.66015 1.08768 9.84076C0.758376 10.0214 0.48367 10.2872 0.292319 10.6104C0.100967 10.9335 5.1638e-06 11.3022 0 11.6778V18.8571C0 19.6907 0.331122 20.4901 0.920522 21.0795C1.50992 21.6689 2.30932 22 3.14286 22H19.9048C20.7383 22 21.5377 21.6689 22.1271 21.0795C22.7165 20.4901 23.0476 19.6907 23.0476 18.8571V11.67ZM18.9842 0.920521C18.3948 0.331121 17.5954 0 16.7619 0H6.28571C5.45218 0 4.65278 0.331121 4.06338 0.920521C3.47398 1.50992 3.14286 2.30932 3.14286 3.14286V8.38095L11.5411 13.619L19.9048 8.38095V3.14286C19.9048 2.30932 19.5736 1.50992 18.9842 0.920521ZM11.5238 9.43036C11.7677 9.43036 12.0017 9.33398 12.1749 9.16221V9.16273L14.5614 6.78987L14.5996 6.75059C14.9852 6.34792 15.1972 5.80996 15.19 5.25253C15.1829 4.69509 14.9571 4.16275 14.5614 3.77011C14.1574 3.36953 13.6115 3.14478 13.0426 3.14478C12.4737 3.14478 11.9278 3.36953 11.5238 3.77011C11.1198 3.36953 10.5739 3.14478 10.005 3.14478C9.4361 3.14478 8.89022 3.36953 8.48623 3.77011C8.08954 4.1636 7.86365 4.69739 7.85737 5.25609C7.8511 5.8148 8.06495 6.35353 8.45271 6.75582L8.48623 6.78935L10.8727 9.16221C11.0459 9.33398 11.2799 9.43036 11.5238 9.43036Z"
							:fill="themeColor.themeColor" />
					</svg>
					<view class="title">{{$t("common.setting.userInfo.list5")}}</view>
				</view>
				<view class="right">
					<text class="title dis-title">{{ userInfo.inviteCode }}</text>
				</view>
			</view>
		</view>

		<view class="list-row">
			<view class="list-item">
				<view class="left">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
						<g clip-path="url(#clip0_104_19036)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M3 3C3 1.34315 4.34315 0 6 0H15.5833C17.2402 0 18.5833 1.34315 18.5833 3V19C18.5833 20.6569 17.2402 22 15.5833 22H6C4.34314 22 3 20.6569 3 19V3ZM4.83322 3.83423C4.83322 2.72966 5.72865 1.83423 6.83322 1.83423H14.7499C15.8545 1.83423 16.7499 2.72966 16.7499 3.83423V15.4176C16.7499 16.5221 15.8545 17.4176 14.7499 17.4176H6.83322C5.72865 17.4176 4.83322 16.5221 4.83322 15.4176V3.83423ZM9.41667 20.625C8.91041 20.625 8.5 20.2146 8.5 19.7083C8.5 19.2021 8.91041 18.7917 9.41667 18.7917H12.1667C12.6729 18.7917 13.0833 19.2021 13.0833 19.7083C13.0833 20.2146 12.6729 20.625 12.1667 20.625H9.41667Z"
								:fill="themeColor.themeColor" />
						</g>
						<defs>
							<clipPath id="clip0_104_19036">
								<rect width="22" height="22" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<view class="title">{{$t("common.setting.userInfo.list6")}}</view>
				</view>
				<view class="right" @click="toUrl('./upMobile')" v-if="init.isBindMobile == 1">
					<text class="title">{{ phoneFilter(init.phone) }}</text>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
				<view class="right" @click="toUrl('./setMobile')" v-else>
					<text class="title">{{$t("common.setting.userInfo.list7")}}</text>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
			</view>
			<u-line :color="themeColor.themeAuxiliaryColorDefault" margin="0 auto" length="694" />
			<view class="list-item">
				<view class="left">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M1.5 18.9519C1.5 15.4861 4.42113 12.6571 8.04269 12.5789C8.0939 12.5778 8.14526 12.5772 8.19675 12.5772H11.4789H14.603H14.7611C14.8126 12.5772 14.864 12.5778 14.9152 12.5789C15.8199 12.5984 16.681 12.7896 17.4636 13.1196C18.1826 13.4227 18.8354 13.8428 19.3952 14.3545C18.8011 14.1048 18.1485 13.9668 17.4636 13.9668C16.5902 13.9668 15.7692 14.1913 15.0552 14.5857C13.5168 15.4353 12.475 17.0737 12.475 18.9555C12.475 19.2961 12.5091 19.6287 12.5741 19.9501C12.7237 20.6891 13.0365 21.3689 13.4734 21.9501H11.1478H4.6497C2.91494 21.9501 1.5 20.6063 1.5 18.9519ZM8.19675 14.5772H12.0161C11.052 15.7752 10.475 17.298 10.475 18.9555C10.475 19.2929 10.499 19.625 10.5454 19.9501H4.6497C3.92411 19.9501 3.5 19.4087 3.5 18.9519C3.5 16.6334 5.51487 14.5772 8.19675 14.5772ZM11.4789 11.3348C10.3978 11.3348 9.38298 11.0589 8.50802 10.5772C6.72666 9.59644 5.52519 7.76262 5.52519 5.66742C5.52519 2.54311 8.19679 0 11.4789 0C14.7611 0 17.4327 2.54311 17.4327 5.66742C17.4327 7.76262 16.2312 9.59644 14.4498 10.5772C13.5749 11.0589 12.56 11.3348 11.4789 11.3348ZM15.4327 5.66742C15.4327 7.59541 13.7505 9.33484 11.4789 9.33484C9.20732 9.33484 7.52519 7.59541 7.52519 5.66742C7.52519 3.73943 9.20732 2 11.4789 2C13.7506 2 15.4327 3.73943 15.4327 5.66742ZM19.0606 16.9227C18.8879 16.9227 18.7498 16.7847 18.703 16.6184C18.5442 16.0544 18.0259 15.6409 17.4111 15.6409C16.7963 15.6409 16.2781 16.0544 16.1193 16.6184C16.0725 16.7847 15.9344 16.9227 15.7617 16.9227C15.5797 16.9227 15.4311 16.7711 15.4667 16.5926C15.6479 15.6844 16.4496 15 17.4111 15C18.3727 15 19.1743 15.6844 19.3556 16.5926C19.3912 16.7711 19.2426 16.9227 19.0606 16.9227ZM15.7818 17.5499C15.0739 17.5499 14.5 18.1238 14.5 18.8317V20.7682C14.5 21.4761 15.0739 22.05 15.7818 22.05H19.2183C19.9262 22.05 20.5001 21.4761 20.5001 20.7682V18.8317C20.5001 18.1238 19.9262 17.5499 19.2183 17.5499H15.7818ZM18.1001 19.351C18.1001 19.5731 17.9794 19.767 17.8001 19.8707V20.5509C17.8001 20.7165 17.6658 20.8509 17.5001 20.8509C17.3344 20.8509 17.2001 20.7165 17.2001 20.5509V19.8708C17.0207 19.767 16.9001 19.5731 16.9001 19.351C16.9001 19.0196 17.1687 18.751 17.5001 18.751C17.8315 18.751 18.1001 19.0196 18.1001 19.351Z"
							:fill="themeColor.themeColor" />
					</svg>
					<view class="title">{{$t("common.setting.userInfo.list8")}}</view>
				</view>
				<view class="right" @click="toUrl('./setPwd')">
					<text class="title">{{$t("common.setting.userInfo.list9")}}</text>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
			</view>

			<!-- <view class="list-item">
				<view class="left">
					<filterIcon src="@/static/img/liuhe/setting/lock stroke.png" :width="44" :height="44" />
					<view class="title">{{$t("common.setting.userInfo.list10")}} </view>
				</view>
				<view class="right" @click="toUrl('/pages/common/userCenter/pwd/update_pwd')"
					v-if="init.isBindPinCode == 1">
					<text class="title">{{$t("common.setting.userInfo.list9")}}</text>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
				<view class="right" @click="toUrl('/pages/common/userCenter/pwd/set_pwd')" v-else>
					<text class="title">{{$t("common.setting.userInfo.list11")}}</text>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
			</view> -->

			<!-- <view class="list-item">
				<view class="left">
					<filterIcon src="@/static/img/liuhe/setting/finger lock.png" :width="44" :height="44" />
					<view class="title">{{$t("common.setting.userInfo.list12")}}</view>
				</view>
				<view class="right" @click="updateSafe">
					<text class="title">{{$t("common.setting.userInfo.list9")}}</text>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
			</view> -->

			<!-- <view class="list-item" style="border:none">
				<view class="left">
					<filterIcon src="@/static/img/liuhe/setting/device lock.png" :width="44" :height="44" />
					<view class="title">{{$t("common.setting.userInfo.list13")}}</view>
				</view>
				<view class="right" @click="updateSafe">
					<text class="title">{{$t("common.setting.userInfo.list9")}}</text>
					<uni-icons type="right" style="font-size: 40rpx;color: #999999"></uni-icons>
				</view>
			</view> -->

		</view>
		<view class="testLogin" v-if="isLogin && ['demo'].includes(userInfo.userType)">
			<view class="reg-btn" @click="toReg('/pages/common/reg')">{{$t("common.setting.userInfo.text1")}}</view>
			<view class="login-btn" @click="toReg('/pages/common/login')">{{$t("common.setting.userInfo.text2")}}</view>
		</view>
		<view class="logut-btn" @click="loginOut">{{$t("common.setting.userInfo.text3")}}</view>

		<u-popup ref="confirm" mode="center" border-radius="24">
			<view class="confirm-box">
				<view class="head-box">{{$t("common.setting.userInfo.text4")}}</view>
				<view class="title">{{$t("common.setting.userInfo.text5")}}</view>
				<view class="btn-box">
					<view class="btn cancel-btn" @click="cancel">{{$t("common.setting.userInfo.text6")}}</view>
					<view class="btn confirm-btn" @click="confirm">{{$t("common.setting.userInfo.text7")}}</view>
				</view>
			</view>
		</u-popup>
		<AlertInjectLayer />
	</view>
</template>

<script>
	import Header from '@/components/common/header/index.vue';
	import {
		info
	} from "@/utils/user/index";
	import {
		mySecurityCenter
	} from "@/utils/lottery/mine";
	import {
		logout
	} from "@/utils/common/index";
	import AlertInjectLayer from "@/components/common/alert/AlertInjectLayer.vue"
  import useAppInfoStore from "@/store/modules/appInfoStore";

	export default {
		name: "index",
		components: {
			Header,
			AlertInjectLayer
		},
		mounted() {
			uni.$emit("on_page_mounted", this)
		},
		data() {
			return {
				safeHeight: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.SYSTEM_INFO).safeArea
					.top + "px",
				title: this.$t("common.setting.userInfo.title"),
				headerStyle: {
					backgroundColor: '#1794FF',
				},
				fontColor: "#FFFFFF",
				titleStyle: {
					color: "#FFFFFF"
				},
				isLogin: false,
				userInfo: {},
				msg: '',
				init: {}
			}
		},
		computed: {
      ...mapState(useAppInfoStore, ["themeColor", "userHeadImageUrl"]),
		},

		onLoad(option) {
			uni.$on('setSucc', data => {
				this.msg = data.msg
			})
			uni.$on('emitParams', data => {
				this.msg = data.msg
			})
		},
		onShow() {
			if (this.msg) {
				pop(this.msg, 2000)
				this.msg = ''
				uni.$emit('emitParams', {
					msg: null
				})
			}
			if (isLogin()) {
				this.isLogin = true
				this.getUserInfo()
				this.getInit()
			} else {
				this.toLogin()
			}
		},

		methods: {
			// 加密手机号
			phoneFilter(val) {
				let reg = /^(.{3}).*(.{4})$/;
				return !val ? '' : val.replace(reg, '$1****$2');
			},
			getUserInfo() { //从storage获取用户信息
				this.userInfo = this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO);
				let prams = {}
				info(prams).then(res => {
					this.userInfo = res.result
					this.$localdb.set("userInfo.setUserInfo", this.userInfo, (v) => {
						return v != null
					})
					this.$store.dispatch("appInfoStoreInit")
				}).catch(err => {
					console.log(err)
				})
			},
			getInit() {
				mySecurityCenter().then(res => {
					this.init = res.result
				}).catch(err => {
					console.log(err)
				})
			},
			toUrl(url) {
				if (['sign','demo'].includes(this.userInfo.userType)) {
					uni.$emit('showPop', {
						refName: 'AlertTestMsg',
					})
					return false
				}
				uni.navigateTo({
					url: url
				})
			},
			toReg(url) {
				uni.navigateTo({
					url: url
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/common/login'
				})
			},
			updateSafe() {
				//#ifdef H5
				this.$refs.confirm.open()
				//#endif
				//#ifdef APP-PLUS

				//#endif
			},
			cancel() {
				this.$refs.confirm.close()
				this.checked = false
			},
			confirm() {
				uni.navigateTo({
					url: "/pages/common/userCenter/downloadPage",
				})
			},
			loginOut() {
				logout().then(res => {
					if (res.code === 200) {
						this.$store.dispatch("userLoginOut");
						this.isLogin = false
						uni.navigateTo({
							url: "/pages/common/login"
						});
					} else {
						uni.showToast({
							title: this.$t("common.setting.userInfo.faild"),
							duration: 2000,
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lottery-page {
		padding-bottom: 211rpx;
		background: var(--theme-auxiliary-color-default);
	}

	.list-row {
		border-radius: 24rpx;
		background: #ffffff;
		margin-top: 20rpx;
		border-radius: 20rpx;

		.list-item {
			display: flex;
			height: 96rpx;
			align-items: center;
			padding: 0 28rpx;

			.left {
				width: 35%;
				display: flex;

				image {
					height: 44rpx;
					width: 44rpx;
				}

				.title {
					margin-left: 20rpx;
					font-weight: 400;
					font-size: 30rpx;
					color: #404040;
					white-space: nowrap;
				}
			}

			.right {
				width: 65%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				position: relative;
				// right: -10rpx;

				image {
					height: 80rpx;
					width: 80rpx;
					border-radius: 80rpx;
					margin-right: 10rpx;
				}

				.title {
					margin-right: 10rpx;
					font-weight: 500;
					font-size: 28rpx;
					color: #404040;
				}

				.dis-title {
					color: #404040;
					// padding-right: 40rpx;
				}
			}
		}
	}

	.testLogin {
		display: flex;
		justify-content: center;
		margin-top: 30rpx;

		.reg-btn,
		.login-btn {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 337.5rpx;
			height: 90rpx;
			border-radius: 50rpx;
			font-weight: 400;
			font-size: 32rpx;
		}

		.reg-btn {
			background: #FFFFFF;
			border: 1px solid #39B4AA;
			color: #39B4AA;
			margin-right: 30rpx;
		}

		.login-btn {
			background: linear-gradient(89.45deg, #2DB49C 0.35%, #09B371 94.83%);
			border: 1px solid #39B4AA;
			color: #FFFFFF;
		}
	}

	.logut-btn {
		margin: 0 32rpx;
		height: 88rpx;
		display: grid;
		place-content: center;
		border-radius: 20rpx;
		border: 1px solid var(--theme-color);
		color: var(--theme-color);
		font-size: 34rpx;
		margin-top: 80rpx;
	}

	.confirm-box {
		width: 600rpx;
		height: 340rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;

		.head-box {
			height: 108rpx;
			font-size: 34rpx;
			text-align: center;
			color: #404040;
			display: grid;
			place-items: center;
		}

		.title {
			flex: 1;
			display: grid;
			align-items: flex-start;
			justify-content: center;
			font-size: 30rpx;
			color: #404040;
			line-height: 56rpx;
			padding-top: 26rpx;
		}

		.btn-box {
			border-top: 1px solid var(--theme-auxiliary-color-default);
			height: 88rpx;
			display: grid;
			grid-template-columns: repeat(2, 1fr);

			.btn {
				display: grid;
				place-content: center;
				font-size: 34rpx;
			}

			.btn+.btn {
				border-left: 1px solid var(--theme-auxiliary-color-default);
			}

			.cancel-btn {
				color: #404040;
			}

			.confirm-btn {
				color: var(--theme-color);
			}
		}
	}
</style>
