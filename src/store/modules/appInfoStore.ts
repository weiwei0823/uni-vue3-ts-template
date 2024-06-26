import { defineStore } from 'pinia'
import { config } from '@/config/config'
import { showUserBalance, getChatRoomInfoByTab } from '@/utils/lottery/betting'
import defaultTemplate from '@/utils/defaultTemplate'

import {
  demoLogin as apiDemoLogin,
  doBindUserDeviceToken
} from '@/utils/common/index'
import { info } from '@/utils/user/index.js'
import { configs } from '@/utils/common/index.js'
import language from '@/config/models/configLanguage.js'
import { vipSpeed } from '@/utils/user/vip'
import { formatterColor } from '@/utils/common/theme.js'
import coreUtils from '@/utils/core/index'
import { detailInfo } from '@/utils/lottery/mine'

const AppInfoStore = defineStore('AppInfo', {
  state: {
    configs: null,
    chatRoomUrl: '',
    chatRoomLastSync: 0,
    userInfo: null,
    // 用户信息是否正在同步
    userInfoInSync: false,
    webSiteConfig: {
      /**
       * 真人验证开关（验证码）
       */
      // 综合站点
      website_real_person_switch: 1, // 1开启 0关闭
      // 彩票站点
      liuhe_person_verify: 1, // 1开启 0关闭
      // 论坛站点
      luntan_person_verify: 1, // 1开启 0关闭

      // 默认站点注册是否需要验证码
      website_register_phone_check: 1,
      // 彩票站点注册是否需要验证码
      // cp_reg: 1,
      liuhe_reg: 1,

      // 综合站点 论坛页版本 1老版 2新版
      // all_luntan_config: 1,
      liuhe_setting: 1,

      website_home_platform_switch: 1,

      // 综合站点，皮肤主题 1绿色 2蓝色 3蔚蓝色 4中国红 5国际黑
      skin_setting: 1,
      // 六合，皮肤主题 1绿色 2蓝色 3蔚蓝色
      liuhe_skin: 1,
      // 论坛，皮肤主题 1绿色 2蓝色 3蔚蓝色
      luntan_skin: 1,
      // 是否显示在线人数
      website_online_switch: 1,
      liuhe_online: 1,
      luntan_online: 1,
      language_setting: 2
      // all_luntan_language_auto: 1,
      // liuhe_language_auto: 1,
      // lluntan_language_auto: 1,
    },
    userSetSkinId: -1,
    contantsConfigs: [],
    contantsConfigTypeMap: {},
    userDefaultLanguageValue: -1,
    openAlert: {
      AlertChangePassword: false
    },
    openLottery: {},
    openLiveLotteryMsg: {},
    openGameIntercept: true
  },
  getters: {
    openGameIntercept: (state) => state.openGameIntercept,
    openLottery: (state) => state.openLottery,
    configs: (state) => state.configs,
    chatRoomUrl: (state) => state.chatRoomUrl,
    userInfo: (state) => state.userInfo,
    userHeadImageUrl: (state) =>
      state.userInfo
        ? state.userInfo.headImgUrl
        : '/static/img/user/Frame21.png',
    webSiteConfig: (state) => state.webSiteConfig,
    themeColor: (state) => {
      const defaultSkinId = state.webSiteConfig?.skin_setting
      let userSetId = state.userSetSkinId
      if (userSetId === -1) {
        // 不同站点 域名不同 不需要按站点分开存储信息
        let userSaveKey = config.enumMgr.APP_LOCALSTORE_KEYS.MEM_USER_THEME_ID
        // 如果区分用户存储 则添加ID 区分存储键
        if (config.saveThemeColorByUserId && state.userInfo)
          userSaveKey = `${userSaveKey}:${state.userInfo.id}`
        userSetId = uni.getStorageSync(userSaveKey)
        if ((!!userSetId || userSetId === 0) && !isNaN(userSetId)) {
          userSetId = parseInt(userSetId)
        } else {
          userSetId = null
        }
      }
      return formatterColor(
        !config.isForceServerTheme
          ? userSetId === null
            ? defaultSkinId
            : userSetId
          : defaultSkinId
      )
      // return formatterColor(defaultSkinId)
    },
    language: (state) => {
      return uni.getLocale()
    },
    openAlert: (state) => state.openAlert,
    openLiveLotteryMsg: (state) => state.openLiveLotteryMsg,
    contantsConfigTypeMap: (state) => state.contantsConfigTypeMap
  },
  mutations: {
    SET_OPEN_LOTTERY: (state, lotteryInfo) => {
      const lotteryMsg = state.openLottery
      state.openLottery = {}
      const keyName = 'type'
      lotteryMsg[keyName + lotteryInfo.lotteryType] = lotteryInfo
      state.openLottery = lotteryMsg
    },
    SET_WEBSITE_CONFIG: (state, config) => (state.webSiteConfig = config),
    SET_OPENLIVELOTTERYMSG: (state, livemsgs) => {
      const mapOfLotteryType = {}
      if (livemsgs instanceof Array == false) return
      livemsgs.forEach((lotteryMsg) => {
        mapOfLotteryType[lotteryMsg.lotteryType] = lotteryMsg
      })
      state.openLiveLotteryMsg = mapOfLotteryType
    },
    SET_CONFIGS: (state, obj) => (state.configs = obj),
    SET_CHAT_ROOM_URL: (state, url) => (state.chatRoomUrl = url),
    SET_USERINFO: (state, userInfo) => (state.userInfo = userInfo),
    SET_USERINFO_NULL: (state) => (state.userInfo = null),
    // 更新用户某个属性
    SET_USERINFO_PROPERTY: (state, properties) => {
      if (state.userInfo) {
        const userInfoCopy = { ...state.userInfo }
        const localStoreUserInfo = config.getStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO
        )
        let rewriteLocalStore = false
        for (const property in properties) {
          userInfoCopy[property] = properties[property]
          if (
            localStoreUserInfo &&
            localStoreUserInfo[property] != properties[property]
          ) {
            localStoreUserInfo[property] = properties[property]
            rewriteLocalStore = true
          }
        }
        rewriteLocalStore && uni.setStorageSync('userInfo', localStoreUserInfo)
        // 使用备份重新赋值 避免Object形式更新扫描不到更新
        state.userInfo = userInfoCopy
      }
    },
    SET_CONSTANTS_CONFIG: (state, constantsList) => {
      state.contantsConfigs = constantsList
      const map = {}
      for (const index in constantsList) {
        const constantItem = constantsList[index]
        map[constantItem.type] = constantItem
      }
      state.contantsConfigTypeMap = map
    },
    /**
     * 设置用户当前皮肤配置id
     * @param state
     * @param id
     * @constructor
     */
    SET_USER_THEME_ID: (state, id) => {
      console.log(id)
      const numId = parseInt(id)
      if (isNaN(numId))
        return console.error('SET_USER_THEME_ID id is Not Number')
      let userSaveKey = config.enumMgr.APP_LOCALSTORE_KEYS.MEM_USER_THEME_ID
      if (config.saveThemeColorByUserId && state.userInfo)
        userSaveKey = `${userSaveKey}:${state.userInfo.id}`
      uni.setStorageSync(userSaveKey, numId)
      state.userSetSkinId = numId
    },
    SET_OPEN_ALERT: (state, config) => (state.openAlert = config)
  },
  actions: {
    // 调配到单个函数 在APP onLaunch 生命周期行数中调用 。
    async appInfoStoreInit({ commit, dispatch, state }) {
      dispatch('initConfig')
      dispatch('initUserInfo')
      dispatch('initWebSiteConfig')
      dispatch('initLotteryStore')
      dispatch('initUniSystemInfo')
    },

    initConfig: ({ commit }, type) => {
      commit('SET_CONFIGS', config)
      // return new Promise((resolve => {
      // 	// setTimeout(function() {
      // 	// 	resolve(1);
      // 	// }, 10000)
      // }))
    },
    /**
     * 用户退出登录调用
     * @param commit
     */
    userLoginOut: ({ commit, state }, from) => {
      // MR 20231218 按照需求 暂时移除掉登出调用logout接口逻辑 。暂时不删除怕以后有新的需求逻辑点
      // doLogout({});
      setTimeout(() => {
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        uni.$emit('loginUpdate', {})
        commit('SET_USERINFO_NULL')
      })
    },

    initUserInfo: ({ commit, dispatch, state }) => {
      const localStoreUserInfo = config.getStorageSync(
        config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO
      )
      // 本地检测到用户信息
      return new Promise(async (resolve) => {
        // 使用阻塞形式 后续可以扩展检测token是否已经失效问题
        if (localStoreUserInfo) {
          await dispatch('updateUserInfo', localStoreUserInfo)
          await dispatch('updateUserBalanceFromServer')
          return resolve(true)
        }
        resolve(false)
      })
    },

    initWebSiteConfig: ({ commit }) => {
      const _config = config.getStorageSync(
        config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_WEBSITECONFIG
      )
      if (_config) {
        commit('SET_WEBSITE_CONFIG', _config)
      }
      const contantsConfigs = uni.getStorageSync('config')
      if (contantsConfigs && contantsConfigs instanceof Array) {
        commit('SET_CONSTANTS_CONFIG', contantsConfigs)
      }
      return new Promise(async (resolve) => {
        let res = config.getStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG_RESPONSE
        )
        if (!res || res.code != 200 || !res.version) res = await configs()
        const {
          constants,
          webSiteConfig,
          lotteryTypeIncludeIdsMap,
          lotteryLiveConfigList
        } = res?.result || {}
        uni.setStorageSync('config', constants)
        config.setStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG_RESPONSE,
          res
        )
        // @mrz 给home index页面发送config加载完成通知
        uni.$emit('on-homepage-freshbyconfig')

        commit('SET_WEBSITE_CONFIG', webSiteConfig)
        commit('SET_CONSTANTS_CONFIG', constants)
        commit('SET_OPENLIVELOTTERYMSG', lotteryLiveConfigList)
        config.setStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_WEBSITECONFIG,
          webSiteConfig
        )
        config.setStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERY_LIVE,
          lotteryLiveConfigList
        )
        language.setDefalutLocalLanguage()
        config.configLotties.freshLotteryTypeIncludeIdsMapAfterConfig(
          lotteryTypeIncludeIdsMap
        )
        config.configVersionMgr.doCheckReloadStationContrastVersion(
          constants,
          config.version_dev
        )
        coreUtils.updateDomAfterConfigFresh()
        resolve(res)
      })
    },

    /**
     * 更新用户信息 后续可以新增检测本地存储userInfo Token是否失效
     * 避免用户调用功能接口才提示token失效 20230602
     * @param commit
     * @param userInfo
     */
    updateUserInfo({ commit, dispatch }, userInfo) {
      if (!userInfo) {
        console.warn('appinfo store updateUserInfo input is null')
      }

      commit(
        'SET_USERINFO',
        Object.assign(userInfo, {
          userBalance: 0
        })
      )
      dispatch('initThemeConfig')
    },
    /**
     * 使用INFO 接口从服务端获取拉取用户新并且更新到localstore中
     * @param commit
     * @param dispatch
     * @returns {Promise<any> | Promise|void}
     */
    updateUserInfoFromServer({ commit, dispatch }) {
      if (this.userInfoInSync) return console.warn('userinfo is do freshing')
      this.userInfoInSync = true
      const that = this
      return new Promise((resolve) => {
        const prams = {}
        info(prams)
          .then((res) => {
            that.userInfoInSync = false
            const userInfo = defaultTemplate(
              {
                createType: '',
                id: '',
                userName: '',
                status: 1,
                phone: '',
                nickname: '',
                coin: 0,
                flowers: 0,
                score: 0,
                userLevel: 1,
                userLevelName: '',
                headImgUrl: '',
                izAuth: 0,
                expert: 0,
                commentStatus: 1,
                isRoom: 1,
                roomSpeak: 1,
                exchange: 1,
                remark: '',
                black: 0,
                userBlock: Boolean,
                vip: Boolean,
                concernCount: 0,
                fansCount: 0,
                collectCount: 0,
                publishCount: 0,
                thumbUpCount: 0,
                inviteCode: '',
                concern: 0,
                lastTime: '',
                medalList: [
                  {
                    conditions: '',
                    filePath: '',
                    hasMedal: 0,
                    id: 0,
                    name: '',
                    remark: '',
                    rewardAmount: 0,
                    rewardScore: 0,
                    status: 0
                  }
                ],
                userType: ''
              },
              res.result
            )
            if (userInfo.id == '') {
              uni.removeStorageSync(
                config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN
              )
              uni.removeStorageSync(
                config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO
              )
              uni.$emit('loginUpdate', {})
              commit('SET_USERINFO_NULL')
              return
            }
            config.setStorageSync(
              config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO,
              userInfo,
              true
            )
            dispatch('updateUserInfo', userInfo)
            dispatch('updateUserBalanceFromServer')
            resolve(userInfo)
          })
          .catch((err) => {
            that.userInfoInSync = false
            console.log(err)
          })
      })
    },

    /**
     * 更新用户结构内属性信息
     * @param commit
     * @param propertiesMap
     */
    updateUserInfoProperties({ commit }, propertiesMap) {
      if (!propertiesMap) {
        console.warn('appinfo store propertiesMap input is null')
        return
      }
      commit('SET_USERINFO_PROPERTY', propertiesMap)
    },
    /**
     * 从接口更新用户剩余额度到内存中
     * @param commit
     * @param dispatch
     * @param state
     * @returns {Promise<any> | Promise}
     */
    updateUserBalanceFromServer({ commit, dispatch, state }) {
      return new Promise(async (resolve) => {
        const balanceResult = await showUserBalance()
        if (balanceResult.code == 200) {
          const result = defaultTemplate(
            {
              id: '',
              createBy: '',
              createTime: '',
              updateBy: '',
              updateTime: '',
              uid: '',
              userBalance: 0,
              yebBalance: 0,
              yebProfit: 0,
              gameLockBalance: 0,
              yebAmount: 0
            },
            balanceResult.result
          )
          commit('SET_USERINFO_PROPERTY', {
            userBalance: result.userBalance,
            gameLockBalance: result.gameLockBalance,
            yebAmount: result.yebAmount,
            yebBalance: result.yebBalance,
            yebProfit: result.yebProfit
          })
          return resolve(result)
        }
        resolve(null)
      })
    },
    /**
     *  单独更新UserInfo 中的Balance信息
     * @param commit
     * @param moneyNum
     */
    updateUserInfoBalance({ commit }, moneyNum) {
      const formartNum = parseFloat(moneyNum)
      if (!isNaN(formartNum)) {
        return console.warn('updateUserInfoBalance userMoeny is null')
      }

      commit('SET_USERINFO_PROPERTY', {
        userBalance: moneyNum
      })
    },

    async updateUserInfoLiuheVip({ commit, dispatch, state }) {
      if (!state.userInfo)
        return console.warn('try to Update vip speed. but user dont login')
      const res = await vipSpeed()
      if (res.code == 200) {
        const vipSpeedInfo = defaultTemplate(
          {
            levelName: '',
            level: 0,
            needCodingAmount: 0,
            currentCodingAmount: 0,
            gapCodingAmount: 0,
            speed: 0,
            nextLevel: 0,
            nextLevelName: ''
          },
          res.result
        )
        commit('SET_USERINFO_PROPERTY', {
          liuheVipSpeedInfo: vipSpeedInfo
        })
      }
    },

    /**
     * 登录试玩账号
     * @param commit
     * @param dispatch
     * @returns {Promise<Promise<*> | Promise>}
     */
    async doUserLoginDemo({ commit, dispatch }) {
      const sys = uni.getSystemInfoSync()
      const prams = {
        deviceId: sys.deviceId,
        phoneType: sys.deviceType
      }
      return new Promise((resolve, reject) => {
        apiDemoLogin(prams).then((res) => {
          if (res.code == config.enumMgr.RESPONSE_CODE.SUCCESS) {
            config.setStorageSync(
              config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO,
              res.result.user
            )
            config.setStorageSync(
              config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN,
              res.result.token
            )
            dispatch('initUserInfo')
            resolve(true)
          } else {
            reject(res)
          }
        })
      })
    },

    async doBindUserDeviceToken({ commit, state }, deviceToken) {
      if (!deviceToken) return console.warn('deviceToken 为空')
      const systemInfo = uni.getSystemInfoSync()
      doBindUserDeviceToken({
        deviceToken,
        // platformType ios: 0 安卓: 1 默认 0
        platformType: systemInfo.ua.indexOf('Andorid') != -1 ? 1 : 0
      }).then((resp) => {
        console.log('绑定deviceToken结果', resp)
      })
    },

    initThemeConfig({ commit, dispatch, state }) {
      let userSaveKey = config.enumMgr.APP_LOCALSTORE_KEYS.MEM_USER_THEME_ID
      if (state.userInfo) userSaveKey = `${userSaveKey}:${state.userInfo.id}`
      const userSetId = parseInt(uni.getStorageSync(userSaveKey))
      if (!isNaN(userSetId)) state.userSetSkinId = userSetId
    },

    // 获取充值金额 如果未充值 进入游戏时显示拦截提示
    async initDetailInfo({ state }) {
      if (!isLogin()) {
        return
      }
      let openGameIntercept = uni.getStorageSync('openGameIntercept')
      if (openGameIntercept === false) {
        return
      }
      const res = await detailInfo()
      openGameIntercept = res?.result?.rechargeAmount <= 0
      uni.getStorageSync('openGameIntercept', openGameIntercept)
      state.openGameIntercept = openGameIntercept
    },

    async initOrGetChatRoomInfo({ state }) {
      return new Promise(async (resolve) => {
        const nowtimestamp = Date.now()
        // 超过60秒换成内容失效
        if (
          state.chatRoomUrl &&
          nowtimestamp - state.chatRoomLastSync <= 60 * 1000
        ) {
          resolve(state.chatRoomUrl)
          return
        }
        const ChatRoomInfo = await getChatRoomInfoByTab()
        const { cpUrl, ltUrl } = defaultTemplate(
          { cpUrl: '', ltUrl: '' },
          ChatRoomInfo.result
        )
        const urlMap = { LIUHE: cpUrl, LUNTAN: ltUrl }
        const url = urlMap[config.station]
        // // 判断是否包含https或http的url
        state.chatRoomUrl = url
        state.chatRoomLastSync = nowtimestamp
        resolve(url)
      })
    }
  }
})

export default AppInfoStore
