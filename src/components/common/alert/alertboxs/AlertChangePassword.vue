<template>
    <u-popup v-model="show" mode="center" border-radius="24" :z-index="zIndex" :mask-close-able="false" @open="handleOpen"
        @close="handleClose">
        <view class="change-password">
            <view class="title">修改登录密码</view>
            <uni-forms ref="valiForm" :rules="rules" :modelValue="formData">
                <uni-forms-item name="pwd">
                    <uni-easyinput type="password" v-model="formData.pwd" placeholder="请输入密码" customEyeIcon>
                        <template #left>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M14.2 6.6V6.5C14.2 4.1804 12.3196 2.3 10 2.3C7.6804 2.3 5.8 4.1804 5.8 6.5V6.6C5.8 7.09706 5.39706 7.5 4.9 7.5C4.40294 7.5 4 7.09706 4 6.6V6.5C4 3.18629 6.68629 0.5 10 0.5C13.3137 0.5 16 3.18629 16 6.5V6.6C16 7.09706 15.5971 7.5 15.1 7.5C14.6029 7.5 14.2 7.09706 14.2 6.6Z"
                                    fill="#A1A1A1" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11 16.7324C11.5978 16.3866 12 15.7403 12 15C12 13.8954 11.1046 13 10 13C8.89543 13 8 13.8954 8 15C8 15.7403 8.4022 16.3866 9 16.7324V19C9 19.5523 9.44772 20 10 20C10.5523 20 11 19.5523 11 19V16.7324Z"
                                    fill="#A1A1A1" />
                                <path
                                    d="M0.9 13C0.9 11.2879 2.28792 9.9 4 9.9H16C17.7121 9.9 19.1 11.2879 19.1 13V20C19.1 21.7121 17.7121 23.1 16 23.1H4C2.28792 23.1 0.9 21.7121 0.9 20V13Z"
                                    stroke="#A1A1A1" stroke-width="1.8" />
                            </svg>
                        </template>
                    </uni-easyinput>
                </uni-forms-item>
                <uni-forms-item name="confirmPwd">
                    <uni-easyinput type="password" v-model="formData.confirmPwd" placeholder="请确认密码" customEyeIcon>
                        <template #left>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M14.2 6.6V6.5C14.2 4.1804 12.3196 2.3 10 2.3C7.6804 2.3 5.8 4.1804 5.8 6.5V6.6C5.8 7.09706 5.39706 7.5 4.9 7.5C4.40294 7.5 4 7.09706 4 6.6V6.5C4 3.18629 6.68629 0.5 10 0.5C13.3137 0.5 16 3.18629 16 6.5V6.6C16 7.09706 15.5971 7.5 15.1 7.5C14.6029 7.5 14.2 7.09706 14.2 6.6Z"
                                    fill="#A1A1A1" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11 16.7324C11.5978 16.3866 12 15.7403 12 15C12 13.8954 11.1046 13 10 13C8.89543 13 8 13.8954 8 15C8 15.7403 8.4022 16.3866 9 16.7324V19C9 19.5523 9.44772 20 10 20C10.5523 20 11 19.5523 11 19V16.7324Z"
                                    fill="#A1A1A1" />
                                <path
                                    d="M0.9 13C0.9 11.2879 2.28792 9.9 4 9.9H16C17.7121 9.9 19.1 11.2879 19.1 13V20C19.1 21.7121 17.7121 23.1 16 23.1H4C2.28792 23.1 0.9 21.7121 0.9 20V13Z"
                                    stroke="#A1A1A1" stroke-width="1.8" />
                            </svg>
                        </template>
                    </uni-easyinput>
                </uni-forms-item>
            </uni-forms>
            <view class="tip">您是首次登录或被重置密码，为了账户安全，请修改密码。</view>
            <button class="btn" type="primary" @click="submit">提交</button>
        </view>
    </u-popup>
</template>

<script>
import { underOpenAccountUpdatePwd } from '@/utils/ptp'
import { info } from '@/utils/user/index.js'
import { mapGetters } from 'pinia';
export default {
    name: "Account",
    props: {
        zIndex: {
            type: [Number, String],
            default: () => {
                return 10075
            }
        }
    },
    data() {
        return {
            show: false,
            callback: null,
            formData: {
                pwd: '',
                confirmPwd: '',
            },
            rules: {
                pwd: {
                    rules: [
                        {
                            required: true,
                            errorMessage: '登陆密码不能为空'
                        },
                        // { pattern: /^(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{6,16}$/, errorMessage: '登陆密码格式不正确' }
                    ]
                },
                confirmPwd: {
                    rules: [
                        {
                            required: true,
                            errorMessage: '确认密码不能为空'
                        },
                        // { pattern: /^(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{6,16}$/, errorMessage: '确认密码格式不正确' },
                        {
                            validateFunction: (rule, value, data, callback) => {
                                if (value !== this.formData.pwd) {
                                    callback('两次密码输入不一致')
                                }
                                return true
                            }
                        }
                    ]
                }
            },
        }
    },
    computed: {
        ...mapGetters(["openAlert"]),
    },
    watch: {
        '$store.state.appInfoStore.userInfo.createType': {
            handler(val) {
                if (val === '1') {
                    if (this.openAlert.AlertChangePassword) {
                        return
                    }
                    this.show = true
                }
            },
            immediate: true
        }
    },
    methods: {
        open(_, { callback }) {
            this.show = true
            this.callback = callback
        },
        close() {
            this.show = false
        },
        handleOpen() {
            this.$emit('open')
            this.callback && this.callback({
                type: 'open'
            })
        },
        handleClose() {
            this.$emit('close')
            this.callback && this.callback({
                type: 'close'
            })
        },
        async submit() {
            const vali = await this.$refs.valiForm.validate().catch(err => {
            })
            if (vali) {
                const res = await underOpenAccountUpdatePwd(this.formData)
                pop(res.message, 1000)
                if (res.code === 200) {
                    const res = await info()
                    this.$config.setStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO, res.result);
                    await this.$store.dispatch("initUserInfo")
                    this.close()
                    this.$store.commit("SET_OPEN_ALERT", { ...this.openAlert, AlertChangePassword: true });
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.change-password {
    padding: 20rpx;
    width: 600rpx;

    .title {
        height: 68rpx;
        display: grid;
        place-content: center;
        color: #404040;
        text-align: center;
        font-size: 34rpx;
        margin-bottom: 20rpx;
    }

    ::v-deep .uni-forms-item {
        margin-bottom: 32rpx;

        .uni-easyinput__content {
            height: 88rpx;
            font-size: 30rpx;
            padding: 0 20rpx;
            border-radius: 20rpx;
            border: none;
            background: var(--theme-auxiliary-color-default) !important;

            .uni-easyinput__placeholder-class {
                font-size: 30rpx;
            }
        }
    }


    .tip {
        color: #404040;
        font-size: 26rpx;
        line-height: 37rpx;

        &::before {
            content: '*';
            color: var(--theme-auxiliary-color-remind);
        }
    }

    .btn {
        border-radius: 16rpx;
        background: var(--theme-color);
        margin-top: 40rpx;
        margin-bottom: 20rpx;
        width: calc(100% - 20rpx);
        height: 88rpx;
    }
}
</style>
