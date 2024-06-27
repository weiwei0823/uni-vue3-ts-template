<template>
    <view :style="sheetAnimatioStyles" :data-framecount="frameCount" :data-frameindex="inFrameIndex">
        <image  ref="img" :style="sheetImageStyles" v-if="sheetImage" :src="themeImage" @load="onImageLoaded" ></image>
    </view>
</template>

<script>
import {mapGetters} from 'pinia';

export default {
        name: "SheetAnimation",
        desc: "动画",


        mounted(){
            this.inFrameIndex = this.defaultFrameIndex;
        },

        destroyed(){
        },
        beforeDestroy(){
            clearInterval(this.animationTimer);
        },

        computed:{
            ...mapState(AppInfoStore, ['themeColor']),

            sheetAnimatioStyles(){
                let styles={
                    "position":"relative",
                    "overflow":"hidden"
                };
                let widthPx=this.widthPx;
                let heightPx=this.heightPx;
                if(!widthPx) widthPx=this.caculationRpxToPx(this.widthRpx);
                if(!heightPx) heightPx=this.caculationRpxToPx(this.heightRpx);
                styles['width']=`${widthPx}px`;
                styles['height']=`${heightPx}px`;
                this.frameWidthPx=widthPx;
                this.frameHeightPx=heightPx;
                for (let key in this.styles){
                    styles[key]=this.styles[ke];
                }
                return styles;
            },

            sheetImageStyles(){
                let styles={};
                styles['height']=`${this.frameHeightPx}px`;
                styles['width']= `${this.sheetImageWidthPx}px`;
                styles['position']="absolute";
                styles['left']=`-${this.frameWidthPx*this._inframe}px`
                return styles;
            },

            _inframe(){
                return this.correctIndex(this.inFrameIndex);
            },

            themeImage(){
                let name=this.themeColor.name;
                let url = this.sheetImage;
                if(name&&url.indexOf('{#theme}')!=-1){
                    url = url.replaceAll("{#theme}",name);
                }
                return  url;
            }
        },
        props:{
            widthRpx:{
                type:Number,
                default:0,
            },
            heightRpx:{
                type:Number,
                default:0,
            },
            widthPx:{
                type:Number,
                default:0
            },
            heightPx:{
                type:Number,
                default:0
            },

            styles:{
                type:Object,
                default:()=>{
                    return {};
                }
            },

            sheetImage:{
                type:String,
                default:null,
            },

            defaultFrameIndex:{
                type:Number,
                default:0
            },

            id:{
                type:String|Number,
                default:null
            },

            frameRate:{
                type:Number,
                default:41.6// 24帧 41.6毫秒一帧
            },
        },

        data(){
          this.animationTimer=-1;
          this.systemInfo = uni.getSystemInfoSync();
          return {
            frameWidthPx:-1,
            frameHeightPx:-1,
            inFrameIndex:0,
            sheetImageWidthPx:0,
            frameCount:0
          }
        },

        watch:{
            inFrameIndex(v){
            }
        },

        methods:{
            caculationRpxToPx(rpxsize){
                let caculationScreenWidth=this.systemInfo.screenWidth>=480?480:this.systemInfo.screenWidth;
                let px=rpxsize*caculationScreenWidth/750;
                return px;
            },

            //序列帧图片加载完成
            onImageLoaded(e){
                let that=this;
                this.$nextTick(function () {
                    let imgRealWidth=e.detail.width;
                    let imgRealHeight=e.detail.height;
                    /**
                     * 计算收缩比例
                     * @type {number}
                     */
                    let scale=this.frameHeightPx/imgRealHeight;
                    this.sheetImageWidthPx=imgRealWidth*scale;
                    that.frameCount=Math.round(that.sheetImageWidthPx/that.frameWidthPx);
                    if(that.frameCount<0) that.frameCount=0;
                    this.$emit("onReady",that.id);
                })
            },

            stopAnimation(frameIndex=-1){
                clearInterval(this.animationTimer);
                if(frameIndex!=null){
                    this.inFrameIndex=frameIndex;
                }
                this.$emit("onAnimatioStop");
            },

            startWholeAnimationOnce(stayIndex=0){
               this.stopAnimation();
               this.startAnimationBetween(0,this.frameCount-1,false,stayIndex);
            },
            /**
             *
             * @param starIndex 起始帧
             * @param endIndex 结束帧
             * @param isLoop 是否循环播放
             * @param stayIndex 播放完成停留帧
             */
            startAnimationBetween(starIndex,endIndex,isLoop=true,stayIndex=0){
                starIndex=this.correctIndex(starIndex);
                endIndex=this.correctIndex(endIndex);
                stayIndex=this.correctIndex(stayIndex);
                let that=this;
                that.inFrameIndex=starIndex;
                let loopIndex=1;
                this.runTimer(function () {
                    let nextFrame = that.inFrameIndex+1;
                    if(nextFrame>endIndex){
                        if(isLoop){
                          loopIndex++;
                          that.$emit("onAnimationFinish",{id:that.id,loop:loopIndex});
                          that.inFrameIndex=starIndex;
                        }else {
                          that.$emit("onAnimationFinish",{id:that.id,loop:loopIndex});
                          return that.stopAnimation(stayIndex);
                        }
                    }else {
                        that.inFrameIndex=nextFrame;
                    }
                },this);
            },
            /**
             * 矫正帧索引
             * @param index
             * @returns {number|*}
             */
            correctIndex(index){
                if(index===0) return 0;
                if(index>0) return index<this.frameCount?index:this.frameCount-1;
                if(index<0){
                    let _bIndex=this.frameCount+index;
                    if(_bIndex>=0) return  _bIndex;
                    return 0;
                }
            },


            runTimer(cb,region){
                clearInterval(this.animationTimer);
                this.animationTimer=setInterval(()=>{
                    cb.call(region,Date.now());
                },this.frameRate)
            }

        }
    }
</script>

<style scoped>

</style>
