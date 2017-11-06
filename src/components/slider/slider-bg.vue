<template>
  <div class="main-bg">
    <div class="bg" v-for="(item,index) in bgArr" :key="index" :data-url="item"
    :class="{active:loopActive==index}" ref="bgGroup"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgArr: [],
      loopTime: 4000,
      loopNum: -1,
      loopActive: 0,
      loopOneComplete: false
    }
  },
  created() {
    this.initBg();
    console.log(this.bgArr);
  },
  mounted() {
    this.autoPlay();
  },
  methods: {
    initBg() {
      let bgArr = [];
      let bgstr = 'http://www.fanguangcn.xin/static/image/bg_';
      for(let i = 1;i< 19;i++) {
        i = i < 10? '0' + i:i;
        let bgString = bgstr + i + '.jpg';
        bgArr.push(bgString);
      }
      this.bgArr = bgArr;
    },
    bgImage(image) {
      return `background-image:url(${image})`;
    },
    autoPlay() { 
      this.loopNum++;
      if(this.loopNum > this.$refs.bgGroup.length - 1) {
        this.loopNum = 0;
        this.loopOneComplete = true;
      }
      this.loopActive = this.loopNum;
      this.loadBgImage();
      setTimeout(this.autoPlay.bind(this),this.loopTime);
    },
    loadBgImage() {
      const bgImages = this.$refs.bgGroup;
      let loopActive = this.loopActive;
      let nextLoopActive = loopActive + 1;
      if(!this.loopOneComplete) {
        bgImages[loopActive].style.backgroundImage = `url(${bgImages[loopActive].dataset.url})`;
        if(nextLoopActive <= bgImages.length-1) {
          bgImages[nextLoopActive].style.backgroundImage = `url(${bgImages[nextLoopActive].dataset.url})`;
        }
      }
    }
  }
}
</script>

<style lang="less">

  .main-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    &::before {
      position: absolute;
      display: block;
      content: '';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 1;
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transition: all .5s;
      opacity: 0;
      &.active {
        opacity: .7;
      }
    }
  }
</style>

