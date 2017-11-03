<template>
  <div class="main-bg">
    <div class="bg" v-for="(item,index) in bgArr" :key="index" :style="bgImage(item)"
    :class="{active:loopActive==index}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgArr: [],
      loopTime: 1000,
      loopNum: 0,
      loopActive: 0
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
      for(let i = 1;i< 21;i++) {
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
      if(this.loopNum > 19) {
        this.loopNum = 0;
      }
      this.loopActive = this.loopNum;
      setTimeout(this.autoPlay.bind(this),this.loopTime);
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
        opacity: 1;
      }
    }
  }
</style>

