<template>
  <nav class="tab">
  	<a href="javasript:;" v-for="item,index in tabData"
    @click="goTo(index,item.url)" :class="{active:activeIndex===index}">{{item.text}}</a>
    <!-- <router-link v-for="item,index in tabData" :to="item.url">{{item.text}}</router-link> -->
    <!-- <span class="active-bar" ref="activeBar"></span> -->
    <i class="iconfont icon-me"></i>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      tabData: [
        {text: '推荐',url: '/home'},
        {text: '歌手',url: '/singer'},
        {text: '留言板',url: '/board'}
      ],
      activeIndex: 0
    }
  },
  methods: {
    // 点击tab特效及跳转路由
    goTo(index,url) {
      // const bar = this.$refs.activeBar;
      // let translate = index * 100 + '%';
      // bar.style.transform = `translateX(${translate})`;
      this.activeIndex = index;
      this.$router.push({path: url});
    }
  },
  beforeRouteUpdate(to,from,next) {
    console.log('to',to);
    console.log('from',from);
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .tab {
  	display: flex;
  	/*justify-content: center;*/
  	align-items: center;
    position: relative;
  	a {
      flex: 0 0 20%;
  	  height: 80/@rem;
  	  line-height: 80/@rem;
  	  font-size: 32/@rem;
  	  color: @textColor;
  	  text-align: center;
  	  &.active {
  	  	color: @themeColor;
  	  }
  	}
    .iconfont {
      position: absolute;
      top: 50%;
      right: 20/@rem;
      transform: translateY(-50%);
      font-size: 50/@rem;
      color: @themeColor;
    }
    .active-bar {
      position: absolute;
      width: 33.3%;
      height: 4px;
      background-color: @themeColor;
      bottom: 0;
      left: 0;
      transition: all .3s;
    }
  }
</style>