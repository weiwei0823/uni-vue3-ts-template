<template>
  <scroll-view scroll-y="true" class="zheng-ma-one-six">
    <view v-if="playData.code === 'sscbbdw'">
      <view class="tab">
        <view :class="currentType == item.id ? 'tab-item active' : 'tab-item'" v-for="item in playData.children"
          @click="onSelectedType(item)" :key="item.id">
          {{ item.name }}
        </view>
      </view>
      <view class="type-name">
        {{ currentName }}
        <image src="@/static/img/liuhe/desc.png" @click="showTabRule" />
      </view>
      <view class="balls" v-if="ballList.length">
        <ball ref="ball" :ball="ball" :ballChildren="ballList" @changeData="changeChildren" />
      </view>
    </view>

    <view class="content-list" v-else>
      <view class="tab-item" v-for="data in playData.children" :key="data.id">
        <view class="balls">
          <view v-for="(item, index) in data.children" :key="item.id">
            <view v-if="item.showType == 1">
              <view class="type-name">
                {{ item.name }}
                <image src="@/static/img/liuhe/desc.png" @click="showRule(item)" />
              </view>
              <ball ref="ball" :missOrMatch="missOrMatch" :ball="item" :ball-children="item.children"
                @changeData="changeChildren" />
            </view>
            <view v-if="item.showType == 2">
              <view class="type-name">
                {{ item.name }}
                <image src="@/static/img/liuhe/desc.png" @click="showRule(item)" />
              </view>
              <text-ball :missOrMatch="missOrMatch" :ballChildren="item.children" :ball="item" :dataIndex="index"
                @changeData="changeChildren"></text-ball>
            </view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import Ball from "./ball";
import TextBall from "./text-ball";
import {mapGetters, mapState} from 'pinia';
import Playing from "@/utils/common/playing";
import usePlayingStore from "@/store/modules/playIngStore";
export default {
  name: "index",
  props: {
    playData: {
      default: {},
      type: Object
    },
    missOrMatch: {
      type: String,
      default: "miss"
    }
  },
  computed: {
    ...mapState(usePlayingStore, ["orderList"]),
  },
  components: {
    Ball,
    TextBall
  },
  data() {
    return {
      currentType: 2,
      currentName: "",
      zodiac: null,
      colorList: this.$config.getStorageSync(this.$config.enumMgr.APP_LOCALSTORE_KEYS.LOCAL_STORE_LOTTERYSTATUS).colorList,
      types: [],
      playing: new Playing(),
      ballList: [],
      helpStr: "",
      tipsStr: "",
      exampleStr: "",
      ball: {},
      currentDFBallItems: [],//两面的已选球集合（玩法相同的都用此集合）
    }
  },
  watch: {
    playData(oldV, newV) {
      if (this.playData.code === 'sscbbdw') {
        this.onSelectedType(this.playData.children[0])
      }
      // this.onSelectedType(newV.children[0])
    },
    orderList() {
      if (this.orderList.length === 0) {
        this.reset()
      }
    }
  },
  mounted() {
    // if(this.playData.code === 'sscbbdw'){
    //   this.onSelectedType(this.playData.children[0])
    // }
  },
  methods: {
    onSelectedType(item) {
      this.currentType = item.id;
      this.currentName = item.name;
      this.helpStr = item.children[0].helpStr;
      this.tipsStr = item.children[0].tipsStr;
      this.exampleStr = item.children[0].exampleStr;
      this.ball = item.children[0];
      this.ballList = item.children[0].children;
      this.currentDFBallItems=[];
      this.$store.dispatch('setOrderList', [])
        this.$emit('onSelectedType')
    },

    reset() {
      this.currentDFBallItems=[];
    },

    setColorToNum(list, colorList) {
      let newList = list.filter(item =>
        colorList.some(i => item.name == i.number)
      )
    },

    selectZodiacList(item) {
      this.zodiac = item.name;
    },

    showTabRule() {
      this.$emit('open', {
        exampleStr: this.exampleStr,
        helpStr: this.helpStr,
        tipsStr: this.tipsStr,
      })
    },

    showRule(item) {
      this.$emit('open', item)
    },

    onSeletedOne(num) {
      this.$refs.ball[num].onClickItem(num)
    },

    //从子组件传来的选择事件
    changeChildren(dataObj) {
      if (this.playData.code === 'sscbbdw') {//判断时时彩不定位
        let { ballChildren, dataIndex, selectedIds, ball } = dataObj;
        let orderList = this.playing.setOrders(this.ball, selectedIds);
        this.$store.dispatch('setOrderList', orderList).then(() => {
        })
      } else if (this.playData.code === 'sscblm') {
        this.setDoubelFace(dataObj)//用于测试写逻辑用的方法，可供别的玩法使用。
      } else {
        this.setDoubelFace(dataObj)//其他玩法逻辑类似，所以可调用两面同样的玩法
      }
      this.$emit("selectedBall", dataObj)
    },
    //处理两面的选择方法，也可作为别的玩法使用（只要选择逻辑相同）
    setDoubelFace(dataObj) {
      /**
       * ball是2级，是ballItem的上一级
       * ballItem是3级，就是每个球的Item。
       */
      let { ballChildren, dataIndex, selectedIds, ball, ballItem } = dataObj;
      ballItem.parentsName = ball.name;
      this.currentDFBallItems = this.pushObjectToArray(this.currentDFBallItems, ballItem);
      let orderList = [];
      this.currentDFBallItems.forEach(item => {
        let obj = {
          "content": "",
          "methodName": item.parentsName,
          "name": item.name,
          "mode": 1,
          "chaseNum": 3,
          "chaseStop": 0,
          "playId": item.id,
          "rebatePoint": 0,
          "stakeCount": 1,
          "totalPrice": 0,
          "unitPrice": 0,
          "code": item.code,
        }
        orderList.push(obj)
      })
      this.$store.dispatch('setOrderList', orderList).then(() => {
      })
    },
    //讲对象push到数组
    pushObjectToArray(array, object) {
      if (array.length === 0) {
        array.push(object);
      } else {
        // 检查是否存在相同 id 的对象
        const existingObjectIndex = array.findIndex((item) => item.id === object.id);

        if (existingObjectIndex !== -1) {
          // 如果存在相同 id 的对象，从数组中删除它
          array.splice(existingObjectIndex, 1);
        } else {
          // 将新对象添加到数组
          array.push(object);
        }
      }
      return array;
    },
  },
}
</script>

<style lang="scss" scoped>
.zheng-ma-one-six {
  height: 100%;

  .tab {
    display: flex;
    white-space: nowrap;
    width: 100%;

    .tab-item {
      width: 33.3%;
      text-align: center;
      height: 56rpx;
      display: inline-block;
      line-height: 56rpx;
      background: #CCDBEE;
      border-width: 0px 1rpx 2rpx 1rpx;
      border-style: solid;
      border-color: #B5D4E6;
      /*box-shadow: inset 0px 4rpx 4rpx #FFFFFF;*/
      color: #458198;
      font-size: 30rpx;
    }

    .tab-item.active {
      background: linear-gradient(180deg, #4E60AE 0%, #318EB9 100%);
      color: #BAE8FA;
      border-width: 0 0 2rpx 2rpx;
      border-style: solid;
      border-color: #B5D4E6;
      box-shadow: inset 0 3rpx 2rpx rgba(0, 0, 0, 0.5);
    }
  }

  .type-name {
    height: 70rpx;
    line-height: 70rpx;
    color: #8CB2C9;
    font-size: 34rpx;
    text-align: center;
    background: #CCDBEE;
    border: 1rpx solid #B5D4E6;
    box-shadow: inset 0px 2rpx 2rpx #CCCCCC;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 34rpx;
      height: 34rpx;
      margin-left: 22rpx;
    }
  }

  .content-list {
    .tab-item {
      .balls {
        .type-name {
          height: 70rpx;
          line-height: 70rpx;
          color: #8CB2C9;
          font-size: 34rpx;
          text-align: center;
          background: #CCDBEE;
          border: 1rpx solid #B5D4E6;
          box-shadow: inset 0px 2rpx 2rpx #CCCCCC;
          display: flex;
          align-items: center;
          justify-content: center;

          image {
            width: 34rpx;
            height: 34rpx;
            margin-left: 22rpx;
          }
        }
      }
    }
  }



}
</style>
