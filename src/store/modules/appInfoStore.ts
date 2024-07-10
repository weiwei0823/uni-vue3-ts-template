import useLotteryStore from './LotteryStore'
import useSystemInfoStore from './systemInfoStore'
import {config} from '@/config/config'
import {getChatRoomInfoByTab, showUserBalance} from '@/utils/lottery/betting'
import defaultTemplate from '@/utils/defaultTemplate'
import {configsFun, demoLogin as apiDemoLogin} from '@/utils/common/index.js'
import {info} from '@/utils/user/index.js'
import configLanguage from '@/config/models/configLanguage.js'
import {vipSpeed} from '@/utils/user/vip.js'
import {formatterColor} from '@/utils/common/theme.js'
import coreUtils from '@/utils/core/index.js'
import {detailInfo} from '@/utils/lottery/mine.js'
import global from 'global'

export const useAppInfoStore = defineStore('appInfo', () => {
  const configs = ref(null)
  const chatRoomUrl = ref('')
  const chatRoomLastSync = ref(0)
  const userInfo = ref(null)
    // 用户信息是否正在同步
  const userInfoInSync = ref(false)
  const webSiteConfig = ref({
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
  })
  const userSetSkinId = ref(-1)
  const contantsConfigs = ref([])
  const contantsConfigTypeMap = ref({})
  const userDefaultLanguageValue = ref(-1)
  const openAlert = ref({
    AlertChangePassword: false
  })
  const openLottery = ref({})
  const openLiveLotteryMsg = ref({})
  const openGameIntercept = ref(true)

  const userHeadImageUrl = computed(() => {
    return userInfo.value ? userInfo.value?.userInfo?.headImgUrl : '@/static/img/user/Frame21.png'
  })
  const themeColor = computed(() => {
    const defaultSkinId = webSiteConfig?.skin_setting
    let userSetId: number | null = userSetSkinId.value
    if (userSetId === -1) {
      // 不同站点 域名不同 不需要按站点分开存储信息
      let userSaveKey = config.enumMgr.APP_LOCALSTORE_KEYS.MEM_USER_THEME_ID
      // 如果区分用户存储 则添加ID 区分存储键
      if (config.saveThemeColorByUserId && userInfo.value) {
        userSaveKey = `${userSaveKey}:${userInfo.value?.id}`
      }

      userSetId = uni.getStorageSync(userSaveKey)
      if ((!!userSetId || userSetId === 0) && !isNaN(userSetId)) {
        userSetId = +userSetId
      } else {
        userSetId = null
      }
    }
    return formatterColor(!config.isForceServerTheme ? userSetId === null ? defaultSkinId : userSetId : defaultSkinId)
  })
  const language = computed(() => {
    return uni.getLocale()
  })
  const SET_OPEN_LOTTERY = (lotteryInfo: any) => {
    const lotteryMsg = openLottery.value
    openLottery.value = {}
    const keyName = 'type'
    lotteryMsg[`${keyName + lotteryInfo.lotteryType}`] = lotteryInfo
    openLottery.value = lotteryMsg
  };
  const SET_WEBSITE_CONFIG = (config: any) => {
    webSiteConfig.value = config
  };
  const SET_OPENLIVELOTTERYMSG = (livemsgs: any) => {
    const mapOfLotteryType = {}
    if (!(livemsgs instanceof Array)) return
    livemsgs.forEach((lotteryMsg) => {
      mapOfLotteryType[lotteryMsg.lotteryType] = lotteryMsg
    })
    openLiveLotteryMsg.value = mapOfLotteryType
  };
  const SET_CONFIGS = (obj: any) => {
    configs.value = obj
  };
  const SET_CHAT_ROOM_URL = (url: any) => {
    chatRoomUrl.value = url
  };
  const SET_USERINFO = (tempUserInfo: any) => {
    userInfo.value = tempUserInfo
  };
  const SET_USERINFO_NULL = () => {
    userInfo.value = null
  };
    // 更新用户某个属性
  const SET_USERINFO_PROPERTY = (properties: any) => {
    if (userInfo.value) {
      const userInfoCopy = {...userInfo.value}
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
      userInfo.value = userInfoCopy
      }
  };
  const SET_CONSTANTS_CONFIG = (constantsList: any) => {
    contantsConfigs.value = constantsList
      const map = {}
      for (const index in constantsList) {
        const constantItem = constantsList[index]
        map[constantItem.type] = constantItem
      }
    contantsConfigTypeMap.value = map
  };
  /**
     * 设置用户当前皮肤配置id
     * @param id
     * @constructor
     */
  const SET_USER_THEME_ID = (id: any) => {
    console.log(id)
    const numId = parseInt(id)
    if (isNaN(numId))
      return console.error('SET_USER_THEME_ID id is Not Number')
    let userSaveKey = config.enumMgr.APP_LOCALSTORE_KEYS.MEM_USER_THEME_ID
    if (config.saveThemeColorByUserId && userInfo.value) {
      userSaveKey = `${userSaveKey}:${userInfo.value?.id}`
    }
    uni.setStorageSync(userSaveKey, numId)
    userSetSkinId.value = numId
  };
  const SET_OPEN_ALERT = (config: any) => {
    openAlert.value = config
  };
    // 调配到单个函数 在APP onLaunch 生命周期行数中调用 。
  const appInfoStoreInit = async () => {
    initConfig()
    initUserInfo()
    initWebSiteConfig()
      const lotteryStore = useLotteryStore()
      lotteryStore.initLotteryStore()
      const systemInfoStore = useSystemInfoStore()
      systemInfoStore.initUniSystemInfo()
  }
  const initConfig = () => {
    SET_CONFIGS(config)
  };

  /**
   * 用户退出登录调用
   */
  const userLoginOut = () => {
    // MR 20231218 按照需求 暂时移除掉登出调用logout接口逻辑 。暂时不删除怕以后有新的需求逻辑点
    // doLogout({});
    setTimeout(() => {
      uni.removeStorageSync('token')
      uni.removeStorageSync('userInfo')
      uni.$emit('loginUpdate', {})
      SET_USERINFO_NULL()
    })
  };

  const initUserInfo = () => {
      const localStoreUserInfo = config.getStorageSync(
        config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO
      )
      // 本地检测到用户信息
      return new Promise(async (resolve) => {
        // 使用阻塞形式 后续可以扩展检测token是否已经失效问题
        if (localStoreUserInfo) {
          await updateUserInfo(localStoreUserInfo)
          await updateUserBalanceFromServer()
          return resolve(true)
        }
        resolve(false)
      })
  };

  const initWebSiteConfig = () => {
      const _config = config.getStorageSync(
        config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_WEBSITECONFIG
      )
      if (_config) {
        SET_WEBSITE_CONFIG(_config)
      }
      const contantsConfigs = uni.getStorageSync('config')
      if (contantsConfigs && contantsConfigs instanceof Array) {
        SET_CONSTANTS_CONFIG(contantsConfigs)
      }
      return new Promise(async (resolve) => {
        let res = config.getStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG_RESPONSE
        )
        if (!res || res.code != 200 || !res.version) {
          res = await configsFun();
        }
        const {
          constants,
          webSiteConfig,
          lotteryTypeIncludeIdsMap,
          lotteryLiveConfigList
        } = res?.result || {};
        uni.setStorageSync('config', constants)
        config.setStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_CONFIG_RESPONSE,
          res
        )
        // @mrz 给home index页面发送config加载完成通知
        uni.$emit('on-homepage-freshbyconfig')
        SET_WEBSITE_CONFIG(webSiteConfig)
        SET_CONSTANTS_CONFIG(constants)
        SET_OPENLIVELOTTERYMSG(lotteryLiveConfigList)
        config.setStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_WEBSITECONFIG,
          webSiteConfig
        )
        config.setStorageSync(
          config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERY_LIVE,
          lotteryLiveConfigList
        )
        configLanguage.setDefalutLocalLanguage()
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
  };

  /**
   * 更新用户信息 后续可以新增检测本地存储userInfo Token是否失效
   * 避免用户调用功能接口才提示token失效 20230602
   * @param userInfo
   */
  const updateUserInfo = (userInfo: any) => {
    if (!userInfo) {
      console.warn('appinfo store updateUserInfo input is null')
    }

    SET_USERINFO(Object.assign(userInfo, {
      userBalance: 0
    }))
    initThemeConfig()
  };

  /**
   * 使用INFO 接口从服务端获取拉取用户新并且更新到localstore中
   * @returns {Promise<any> | Promise|void}
   */
  const updateUserInfoFromServer = () => {
      if (userInfoInSync.value) return console.warn('userinfo is do freshing')
      userInfoInSync.value = true
      return new Promise((resolve) => {
        const prams = {}
        info(prams).then((res) => {
          userInfoInSync.value = false
          const tempUserInfo = defaultTemplate(
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
          if (tempUserInfo.id == '') {
            uni.removeStorageSync(
              config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_TOKEN
            )
            uni.removeStorageSync(
              config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO
            )
            uni.$emit('loginUpdate', {})
            SET_USERINFO_NULL()
            return
          }
          config.setStorageSync(
            config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_USERINFO,
            userInfo,
            true
          )
          updateUserInfo(userInfo)
          updateUserBalanceFromServer()
          resolve(userInfo)
          })
          .catch((err: any) => {
            userInfoInSync.value = false
            console.log(err)
          })
      })
    };

  /**
   * 更新用户结构内属性信息
   * @param propertiesMap
   */
  const updateUserInfoProperties = (propertiesMap: any) => {
    if (!propertiesMap) {
      console.warn('appinfo store propertiesMap input is null')
      return
    }
    SET_USERINFO_PROPERTY(propertiesMap)
  };
    /**
     * 从接口更新用户剩余额度到内存中
     * @returns {Promise<any> | Promise}
     */
  const updateUserBalanceFromServer = () => {
      return new Promise(async (resolve) => {
        const balanceResult = await showUserBalance()
        if (balanceResult.code == 200) {
          const tempResult = defaultTemplate(
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
          SET_USERINFO_PROPERTY({
            userBalance: tempResult.userBalance,
            gameLockBalance: tempResult.gameLockBalance,
            yebAmount: tempResult.yebAmount,
            yebBalance: tempResult.yebBalance,
            yebProfit: tempResult.yebProfit
          })
          return resolve(tempResult)
        }
        resolve(null)
      })
  };

  /**
   *  单独更新UserInfo 中的Balance信息
   * @param moneyNum
   */
  const updateUserInfoBalance = (moneyNum: any) => {
    const formartNum = parseFloat(moneyNum)
    if (!isNaN(formartNum)) {
      return console.warn('updateUserInfoBalance userMoeny is null')
    }
    SET_USERINFO_PROPERTY({
      userBalance: moneyNum
    })
  };

  const updateUserInfoLiuheVip = async () => {
    if (!userInfo.value) {
      return console.warn('try to Update vip speed. but user dont login')
    }
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
        SET_USERINFO_PROPERTY({
          liuheVipSpeedInfo: vipSpeedInfo
        })
      }
  };

    /**
     * 登录试玩账号
     * @returns {Promise<Promise<*> | Promise>}
     */
  const doUserLoginDemo = async () => {
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
            initUserInfo()
            resolve(true)
          } else {
            reject(res)
          }
        })
      })
    };

  const doBindUserDeviceToken = async (deviceToken: any) => {
      if (!deviceToken) return console.warn('deviceToken 为空')
      const systemInfo = uni.getSystemInfoSync()
      doBindUserDeviceToken({
        deviceToken,
        // platformType ios: 0 安卓: 1 默认 0
        platformType: systemInfo.ua.indexOf('Andorid') != -1 ? 1 : 0
      }).then((resp) => {
        console.log('绑定deviceToken结果', resp)
      })
  };

  const initThemeConfig = () => {
      let userSaveKey = config.enumMgr.APP_LOCALSTORE_KEYS.MEM_USER_THEME_ID
    if (userInfo.value) userSaveKey = `${userSaveKey}:${userInfo.value?.id}`
      const userSetId = parseInt(uni.getStorageSync(userSaveKey))
    if (!isNaN(userSetId)) {
      userSetSkinId.value = userSetId
    }
  };

    // 获取充值金额 如果未充值 进入游戏时显示拦截提示
  const initDetailInfo = async () => {
      if (!global.isLogin()) {
        return
      }
      let openGameIntercept = uni.getStorageSync('openGameIntercept')
      if (openGameIntercept === false) {
        return
      }
      const res = await detailInfo()
      openGameIntercept = res?.result?.rechargeAmount <= 0
      uni.getStorageSync('openGameIntercept', openGameIntercept)
    openGameIntercept.value = openGameIntercept
  };

  const initOrGetChatRoomInfo = async () => {
      return new Promise(async (resolve) => {
        const nowtimestamp = Date.now()
        // 超过60秒换成内容失效
        if (chatRoomUrl.value && nowtimestamp - chatRoomLastSync.value <= 60 * 1000) {
          resolve(chatRoomUrl.value)
          return
        }
        const ChatRoomInfo = await getChatRoomInfoByTab()
        const { cpUrl, ltUrl } = defaultTemplate(
          {cpUrl: '', ltUrl: ''},
          ChatRoomInfo.result
        )
        const urlMap = { LIUHE: cpUrl, LUNTAN: ltUrl }
        const url = urlMap[config.station]
        // // 判断是否包含https或http的url
        chatRoomUrl.value = url
        chatRoomLastSync.value = nowtimestamp
        resolve(url)
      })
    };

  return {
    configs,
    chatRoomUrl,
    chatRoomLastSync,
    userInfo,
    userInfoInSync,
    webSiteConfig,
    userSetSkinId,
    contantsConfigs,
    contantsConfigTypeMap,
    userDefaultLanguageValue,
    openAlert,
    openLottery,
    openLiveLotteryMsg,
    openGameIntercept,
    userHeadImageUrl,
    themeColor,
    language,
    SET_OPEN_LOTTERY,
    SET_WEBSITE_CONFIG,
    SET_OPENLIVELOTTERYMSG,
    SET_CONFIGS,
    SET_CHAT_ROOM_URL,
    SET_USERINFO,
    SET_USERINFO_NULL,
    SET_USERINFO_PROPERTY,
    SET_CONSTANTS_CONFIG,
    SET_USER_THEME_ID,
    SET_OPEN_ALERT,
    appInfoStoreInit,
    initConfig,
    userLoginOut,
    initUserInfo,
    initWebSiteConfig,
    updateUserInfo,
    updateUserInfoFromServer,
    updateUserInfoProperties,
    updateUserBalanceFromServer,
    updateUserInfoBalance,
    updateUserInfoLiuheVip,
    doUserLoginDemo,
    doBindUserDeviceToken,
    initThemeConfig,
    initDetailInfo,
    initOrGetChatRoomInfo
  }
})
export default useAppInfoStore
