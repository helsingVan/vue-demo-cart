<template>
  <scroll class="listview" :data="data" ref="listview"
  :listen-scroll="listenScroll" :probe-type="probeType"
  @scroll="emitScroll">
  	<ul>
  	  <li v-for="group in data" class="list-group" ref="listgroup">
  	  	<h2 class="list-group-title">{{group.title}}</h2>
  	  	<ul>
  	  	  <li v-for="item in group.item" class="list-group-item">
  	  	  	<img class="avatar" v-lazy="item.avatar">
  	  	  	<span class="name">{{item.name}}</span>
  	  	  </li>
  	  	</ul>
  	  </li>
  	</ul>
  	<div class="list-shortcut">
  	  <ul>
  	  	<li v-for="(item,index) in shortCutList" class="item" @touchstart="onShorCutTouchStart" :class="{current:currentIndex==index}"
  	  	@touchmove.stop.prevent="onShorCutTouchMove"
  	  	:data-index="index">
  	  	  {{item}}
  	  	</li>
  	  </ul>
  	</div>
  	<div class="list-fixed" v-show="fixedTitle">
  	  <h1 class="fixed-title">{{fixedTitle}}</h1>
  	</div>
  	<div class="loading-container" v-show="!data.length">
  	  <loading></loading>
  	</div>
  </scroll>
</template>

<script>
import scroll from 'base/scroll/scroll';
import { getData } from 'common/js/dom';
import loading from 'base/loading/loading';

const AnchorHeight = 18;

export default {
  name: 'listview',
  components: { scroll,loading },
  props: {
  	data: {
  	  type: Array,
  	  default: []
  	}
  },
  computed: {
  	shortCutList() {
  	  return this.data.map(v=>v.title.substring(0,1))
  	},
  	fixedTitle() {
  	  if(this.scrollY > 0) {
  	  	return false;
  	  }
  	  return this.data[this.currentIndex]?this.data[this.currentIndex].title:'';
  	}
  },
  data() {
  	return {
  	  scrollY: -1,
  	  currentIndex: 0
  	}
  },
  created() {
  	this.touch = {};
  	this.listenScroll = true;
  	this.listHeight = [0];
  	this.probeType = 3;
  },
  mounted() {
  	// this._calculateHeight();
  },
  watch: {
  	data() {
  	  this.$nextTick(()=> {
  	  	this._calculateHeight();
  	  });
  	},
  	scrollY(newY) {
  	  const self = this;
  	  const list = this.listHeight;
  	  if(newY>=0) {
  	  	this.currentIndex = 0;
  	  	return null;
  	  }

  	  for(let i=0;i<list.length;i++) {
  	  	let height1 = list[i];
  	  	let height2 = list[i+1];
  	  	if(!height2 || (-newY>height1 && -newY<height2)) {
  	  	  self.currentIndex = i;
  	  	  break;
  	  	}
  	  }
  	  // console.log(self.currentIndex);

  	}
  },
  methods: {
  	onShorCutTouchStart(e) {
  	  let touchIndex = getData(e.target,'index');
  	  
  	  this.touch.y1 = e.touches[0].pageY;
  	  this.touch.touchIndex = touchIndex;
  	  this.currentIndex = touchIndex;
  	  
  	  this._scrollTo(touchIndex);
  	  
  	},
  	onShorCutTouchMove(e) {
  	  this.touch.y2 = e.touches[0].pageY;
  	  let delta = Math.floor(Math.abs(this.touch.y2 - this.touch.y1)/AnchorHeight);
  	  let touchIndex = parseInt((this.touch.touchIndex + delta),10);
  	  // console.log(touchIndex);
  	  this._scrollTo(touchIndex);
  	},
  	emitScroll(pos) {
  	  this.scrollY = pos.y;
  	  // console.log(pos)
  	},
  	_scrollTo(index) {
  	  // this.scrollY = -this.listHeight[index];
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index],0);
  	},
  	_calculateHeight() {
  	  const self = this;
  	  const list = Array.from(this.$refs.listgroup);
  	  let height = 0;
  	  list.forEach((v)=> {	
  	  	height += v.clientHeight;
  	  	self.listHeight.push(height);
  	  });
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>