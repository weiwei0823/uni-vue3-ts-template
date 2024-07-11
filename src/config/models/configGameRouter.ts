// 游戏路径配置 避免在其它逻辑点一直去计算而且不好管理
import $store from '@/store'
import { config } from '../config'
import { enter } from '@/utils/lottery/mine'
// TODO 替换其它页面中出现的零散逻辑
export default {
  routeConfigs: {
    4: { route: '/pages/liuhe/liuhePlaying' },
    19: { route: '/pages/liuhe/elevenOutOfFive' },
    28: { route: '/pages/liuhe/kuaisan' },
    29: { route: '/pages/liuhe/airship' },
    30: { route: '/pages/liuhe/shishicai' },
    26: { route: '/pages/liuhe/pcEgg' },
    31: { route: '/pages/liuhe/luckyTwenty' },
    32: { route: '/pages/liuhe/luckyFarm' },
    20: { route: '/pages/liuhe/arrangementThree' }
  },
  /**
   * 通过游戏类型获取游戏路由地址
   * @param lotteryType
   * @param isLive
   * @returns {string}
   */
  getJumpRouteByType(lotteryType, lotteryId, isLive) {
    const isLiveFlag = !!isLive && isLive != 'false' ? 1 : 0
    const gameInfo = this.routeConfigs[lotteryType]
    if (!gameInfo)
      throw new Error(
        `lotteryType = ${lotteryType} is undefind in routeConfigs dictionary`
      )
    const url = `${gameInfo.route}?id=${lotteryId}&isLive=${isLiveFlag}`
    return url
  },
  /**
   * 获取当前所有游戏的path
   */
  getAllGamePaths() {
    const ar = []
    for (const k in this.routeConfigs) {
      ar.push(this.routeConfigs[k].route)
    }
    return ar
  },
  /**
   * 封装彩券类型跳转逻辑 简化其它区域逻辑
   * 可以按照此方式看能否将所有类型按钮点击的事件进行封装
   * @param gameInfo
   * @param emitArgEvent
   */
  doJumpLotteryGameAndUpdateGameTitle(gameInfo, emitArgEvent = false) {
    $store.commit('SET_LOTTERY_STORE_LOTTERY_GAME_NAME', gameInfo.name)
    const url = this.getJumpRouteByType(
      gameInfo.lotteryTypeId,
      gameInfo.lotteryId,
      gameInfo.isLive
    )
    /**
     * @MR 20240113 修改
     * 跳转游戏销毁之前的页面 不需要保留返回记录 游戏内菜单按钮返回非返回上一页 避免内存释放不及时
     */
    uni.redirectTo({
      url,
      success(res) {
        emitArgEvent &&
          res.eventChannel &&
          res.eventChannel.emit('argParams', {
            id: gameInfo.lotteryTypeId
          })
      }
    })
  },
  /**
   * 游戏大厅点击彩票
   * @param gameDateItem 后端返回数据结构
   * @param pageInstance 页面实例
   * @param filterRecharge 是否过滤未充值点击第三方游戏
   * @param filterLogin 是否过滤登录（暂未使用）
   * @returns {*|boolean|*|void}
   */
  doOpenGameDetails(
    gameDateItem,
    pageInstance,
    filterRecharge = true,
    filterLogin = true
  ) {
    const { openGameIntercept, userInfo } =
      pageInstance.$store.state.appInfoStore
    const jumpType = (gameDateItem.jumpType || gameDateItem.type) ?? 2
    /**
     * 如果为1类型自带彩票 调用此方式打开
     */
    if (jumpType == 1) {
      const useGameData = gameDateItem.lotteryId
        ? gameDateItem
        : gameDateItem.data
      return this.doJumpLotteryGameAndUpdateGameTitle(useGameData, true)
    }
    if (jumpType == 2) {
      if (!isLogin()) {
        return uni.$emit('showPop', {
          refName: 'AlertMessage'
        })
      }
      if (['sign', 'demo'].includes(userInfo.userType)) {
        return uni.$emit('showPop', {
          refName: 'AlertMessage',
          data: 'demo'
        })
      }

      const configInfo =
        $store.state.appInfoStore.contantsConfigTypeMap[
          config.enumMgr.CONTANTS_CONFIGS_ID.ENTER_GAME_CONDITION
        ]
      if (configInfo && configInfo.url == 0) {
        filterLogin = false
      }

      /**
       * TODO @MR
       * 此处INIT接口返回游戏结构和 游戏列表获取不一致
       * 前端暂时兼容 由后端后续版本优化
       */
      const code = gameDateItem.code || gameDateItem.gameCode
      const gamePlatformId =
        gameDateItem.platformId || gameDateItem.gamePlatformId
      const platformCateId =
        gameDateItem.platformCateId || gameDateItem.gamePlatformCateId
      this.doEnterWebviewGame(
        pageInstance,
        code,
        gamePlatformId,
        platformCateId,
        gameDateItem.name,
        gameDateItem
      )
    } else if (gameDateItem.customJumpType == 1) {
      uni.switchTab({
        url: gameDateItem.jumpUrl
      })
      uni.navigateTo({
        url: gameDateItem.jumpUrl,
        success(res) {
          res.eventChannel.emit('argParams', gameDateItem)
        }
      })
    } else if (gameDateItem.jumpStatus == 1) {
      pageInstance.$nativeBridge.openUrl(gameDateItem.jumpUrl)
    } else {
      uni.navigateTo({
        url: gameDateItem.jumpUrl,
        success(res) {
          res.eventChannel.emit('argParams', gameDateItem)
        }
      })
    }
  },

  doWebviewLastClickTime: 0,
  doWebviewLockTime: 5000,
  doEnterWebviewGame(
    pageInstance,
    gameCode,
    platformId,
    platformCateId,
    gameName,
    gameDateItem
  ) {
    /**
     * 在锁定时间内不允许重复点击
     */
    if (Date.now() - this.doWebviewLastClickTime < this.doWebviewLockTime) {
      console.warn('锁定周期内无法重复点击')
      return
    }
    const that = this
    const prams = {
      gameCode,
      platformId,
      platformCateId
    }
    this.doWebviewLastClickTime = Date.now()
    uni.showLoading({
      mask: true,
      title: '加载中'
    })
    enter(prams)
      .then((res) => {
        if (res.code == 200) {
          $store.dispatch('bindEnterGameDetaildMesssage', res)
          const u = ''
          // console.log(res.result.includes('c.iabc3000.com'))
          // if (res.result.includes('c.iabc3000.com')) {
          //     u = res.result;
          // } else {
          //     u = encodeURIComponent(res.result)
          // }
          const h5url = `/pages/liuhe/webview/game?platformId=${platformId}&url=${encodeURIComponent(
            res.result
          )}&backPath=${pageInstance.$route.path}&gameName=${gameName}`
          // AG BG游戏会出现加载成pc样式，导致在安卓上会出现异常样式，所以这改为原生跳转
          if (
            browserPlatform() == browserPlatform.FLUTTER_App &&
            [5, 6, 10].includes(gameDateItem.platformId)
          ) {
            const url = encodeURIComponent(res.result)
            let u = ''
            if (this.isUrlEncoded(url)) {
              u = decodeURIComponent(decodeURIComponent(url))
            } else {
              u = url
            }
            window.flutter_inappwebview?.callHandler(
              'openInnerExtraUrl',
              u,
              gameName
            )
            // pageInstance.$nativeBridge.openUrl(u);
            return
          }
          uni.navigateTo({
            url: h5url,
            success(res) {
              res.eventChannel.emit('argParams', {})
              // alert(u)
            }
          })

          // uni.navigateTo({
          //     url: h5url,
          //     success: function (res) {
          //         res.eventChannel.emit('argParams', {})
          //         // alert(u)
          //     }
          // })
        } else if (res.code == 10001) {
          uni.$emit('showPop', {
            refName: 'AlertMsg',
            data: {
              title: '温馨提示',
              content: '请先充值，再进行游戏',
              confirmText: '充值',
              closeText: '取消',
              closeTextStyle: 'color: var(--theme-font-default-shallow-color)',
              confirmTextStyle: 'color: var(--theme-color)'
            },
            confirm: () => {
              uni.navigateTo({
                url: '/pages/common/pay/index'
              })
            }
          })
        } else if (res.code == 701) {
          uni.$emit('showPop', {
            // 维护弹窗
            refName: 'Maintain',
            data: res.result
          })
        } else {
          pop(res.message, 2000)
        }

        uni.hideLoading()
        that.doWebviewLastClickTime = 0
      })
      .catch((err) => {
        console.log(err)
      })
  },
  isUrlEncoded(url) {
    return /%[0-9A-Fa-f]{2}/g.test(url)
  }
}
