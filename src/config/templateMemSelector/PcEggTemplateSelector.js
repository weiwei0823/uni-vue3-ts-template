// import lottery_48 from  "@/static/lotteryTemplate/liuhe/lottery_48.json";
// import lottery_50 from  "@/static/lotteryTemplate/liuhe/lottery_50.json";
// import lottery_55 from  "@/static/lotteryTemplate/liuhe/lottery_55.json";
// import lottery_56 from  "@/static/lotteryTemplate/liuhe/lottery_56.json";
// import lottery_57 from  "@/static/lotteryTemplate/liuhe/lottery_57.json";
// import lottery_64 from  "@/static/lotteryTemplate/liuhe/lottery_64.json";
// import lottery_66 from  "@/static/lotteryTemplate/liuhe/lottery_66.json";
// import lottery_69 from  "@/static/lotteryTemplate/liuhe/lottery_69.json";
// import lottery_72 from  "@/static/lotteryTemplate/liuhe/lottery_72.json";
// import lottery_75 from  "@/static/lotteryTemplate/liuhe/lottery_75.json";

// 选用单模板形式再处理
import lottery_all from '@/static/lotteryTemplate/pcEgg/pcEgg_all.json'

export default {
  lotteryTypeId: 26,

  getMemeLotteryByLotteryId(id) {
    const template = { ...lottery_all }.data
    // TODO 再度优化预留 看当前游戏 用同一个模板
    const removed = []
    for (const index in template) {
      const parentInfo = template[index]
      parentInfo.isDefault = 0
      const ids = parentInfo.close ? parentInfo.close.split(',') : []
      if (ids.indexOf(id.toString()) != -1) {
        removed.push(parentInfo)
        continue
      }
      parentInfo.children &&
        parentInfo.children.forEach((playSecond) => {
          playSecond.children &&
            playSecond.children.forEach((playThree) => {
              playThree.children &&
                playThree.children.forEach((ball) => {
                  ball.maxOdds = '0.00'
                  ball.odds = '0.00'
                  ball.miss = '0'
                  ball.match = '0'
                })
            })
        })
    }
    while (removed.length > 0) {
      const rm = removed.pop()
      const index = template.indexOf(rm)
      if (index != -1) {
        template.splice(index, 1)
      }
    }
    template && template.length > 0
      ? (template[0].isDefault = 1)
      : console.log('all info is closed')
    return template
  }
}
