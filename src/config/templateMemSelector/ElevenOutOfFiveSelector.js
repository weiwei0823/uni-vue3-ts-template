// 选用单模板形式再处理
import lottery_all from '@/static/lotteryTemplate/11Out5/11Out5_all.json'

export default {
  lotteryTypeId: 19,

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
