import { getPlayMiniList } from '@/utils/lottery/betting'

export default {
  lotteryTypeIncludeIdsMap: {
    4: [48, 50, 55, 56, 57, 64, 66, 69, 72, 73, 75],
    19: [79, 77, 36],
    26: [80, 83],
    28: [54, 68, 37],
    29: [62, 63, 65, 71, 76, 53],
    30: [61, 70, 74],
    31: [78],
    32: [81, 82],
    20: [32, 33]
  },
  memLotteryIdToType: {},

  /*
   * 手动从config接口刷新改数据
   */
  freshLotteryTypeIncludeIdsMapAfterConfig(lotteryTypeIncludeIdsMap) {
    if (lotteryTypeIncludeIdsMap) {
      for (const lotteryTypeId in lotteryTypeIncludeIdsMap) {
        const lotteryIds = lotteryTypeIncludeIdsMap[lotteryTypeId]
        if (lotteryIds && lotteryIds instanceof Array) {
          lotteryIds.forEach((id) => {
            if (
              this.lotteryTypeIncludeIdsMap[lotteryTypeId] &&
              this.lotteryTypeIncludeIdsMap[lotteryTypeId].indexOf(id) == -1
            ) {
              this.lotteryTypeIncludeIdsMap[lotteryTypeId].push(id)
            }
          })
        }
      }
    }
    console.warn('lotteryIdMapFresh', new Date().getTime())
    uni.$emit('lotteryIdMapFresh', {})
  },

  // 预留初始化内容信息
  init() {
    this.initAsync()
  },

  // 阻塞式初始化预留
  initAsync() {
    return new Promise((resolve) => {
      resolve()
    })
  },
  /**
   * 通过lotteryId 获取lotteryTypeId
   * @param lotteryId
   * @returns {string|*}
   */
  getLotteryTypeByLotteryId(lotteryId) {
    if (this.memLotteryIdToType[lotteryId])
      return this.memLotteryIdToType[lotteryId]
    for (const lotteryType in this.lotteryTypeIncludeIdsMap) {
      const ids = this.lotteryTypeIncludeIdsMap[lotteryType]
      if (ids.indexOf(lotteryId) != -1) {
        this.memLotteryIdToType[lotteryId] = lotteryType
        return lotteryType
      }
    }
  },
  /**
   * 打印所有日志信息
   */
  printAllMiniPlaylist() {
    // #ifdef H5
    const printOne = function (id, type = 1) {
      getPlayMiniList({
        lotteryId: id
      }).then((res) => {
        if (res.code === 200) {
          console.group(type)
          console.groupEnd()
        }
      })
    }
    // printOne(32, 33)
    // #endif
  },

  /**
   * 获取彩种类型名称 1.澳门 2.香港 3.新加坡 4.台湾 等地区相关信息
   * @param lotteryName
   */
  getLotteryTypePlantNameByLotteryTypeId(lotteyType) {
    const app = getApp()
    let name = '-'

    if (lotteyType == 1) {
      name = app.$t('pages.common.informationCount.zmls.text8')
    } else if (lotteyType == 2) {
      name = app.$t('pages.common.informationCount.zmls.text9')
    } else if (lotteyType == 3) {
      name = app.$t('pages.common.informationCount.zmls.text10')
    } else if (lotteyType == 5) {
      name = '快乐8'
    } else if (lotteyType == 10) {
      name = app.$t('pages.luntan.historyLottery.text15-1')
    } else {
      name = app.$t('pages.common.informationCount.zmls.text11')
    }
    return name
  },

  getLotteryTypeTimeNameByLotteryTypeId(typeId) {
    const app = getApp()
    switch (typeId) {
      case 1:
        return app.$t(
          'pages.common.userCenter.index.collection.liuheGalleryHongKong'
        )
      case 2:
        return app.$t(
          'pages.common.userCenter.index.collection.liuheGalleryMacao'
        )
      case 3:
        return app.$t(
          'pages.common.userCenter.index.collection.liuheGalleryTaiwan'
        )
      case 4:
        return app.$t(
          'pages.common.userCenter.index.collection.liuheGallerySingapore'
        )
      case 5:
        return app.$t('pages.common.userCenter.index.collection.happy8')
    }
  }
}
