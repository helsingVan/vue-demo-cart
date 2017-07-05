<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(value,index) in dots" 
      :class="{active:sliderCurrentIndex===index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { addClass } from 'common/js/dom';

export default {
  name: 'slider',
  props: {
  	loop: {
  	  type: Boolean,
  	  default() {
  	  	return true;
  	  }
  	},
  	autoPlay: {
  	  type: Boolean,
  	  default() {
  	  	return true;
  	  }
  	},
  	interval: {
  	  type: Number,
  	  default() {
  	  	return 1000;
  	  }
  	}
  },
  data() {
  	return {
  	  dots: [],
  	  slider: null,
  	  sliderCurrentIndex: 0,
  	  timer: null
  	}
  },
  mounted() {
  	// 20ms 浏览器刷新代替nextTick
  	const self = this;
  	setTimeout(()=>{
  	  this._init();
  	  this._initDots();
  	  this._initSlider();
  	  if(this.autoPlay) {
  	  	this._autoPlay();
  	  }
  	},20);

  	window.addEventListener('resize',()=> {
  	  if(self.slider == null) {
  	  	return null;
  	  }
  	  self._init(true);
  	  self.slider.refresh();
  	})
  },
  methods: {
  	_init(resize) {
  	  let sliderItem = Array.from(this.$refs.sliderGroup.children);
  	  let widthAll = 0;
  	  let sliderWidth = this.$refs.slider.clientWidth;
  	  sliderItem.forEach((v)=>{
  	  	addClass(v,'slider-item');
  	  	v.style.width = sliderWidth + 'px';
  	  	widthAll += sliderWidth;
  	  });
  	  if(this.loop && !resize) {
  	  	widthAll += sliderWidth*2;
  	  }
  	  this.$refs.sliderGroup.style.width = widthAll + 'px';
  	},
  	_initDots() {
  	  let sliderItem = Array.from(this.$refs.sliderGroup.children);
  	  this.dots = new Array(sliderItem.length);
  	},
  	_initSlider() {
  	  let slider = this.$refs.slider;
  	  const self = this;
  	  this.slider = new BScroll(slider,{
  	  	scrollX: true,
  	  	scrollY: false,
  	  	momentum: false,
  	  	snap: true,
  	  	snapLoop: self.loop,
  	  	snapThreshold: 0.3,
  	  	snapSpeed: 400
  	  });
  	  // scroll end
  	  this.slider.on('scrollEnd',()=> {
  	  	let sliderIndex = self.slider.getCurrentPage().pageX;
  	  	if(self.loop) {
  	  	  sliderIndex -= 1;
  	  	}
  	  	self.sliderCurrentIndex = sliderIndex;
  	  	if(self.autoPlay) {
  	  	  clearTimeout(self.timer);
  	  	  self._autoPlay();
  	  	}
  	  });
  	},
  	_autoPlay() {
  	  let sliderIndex = this.sliderCurrentIndex + 1;
  	  if(this.loop) {
  	  	sliderIndex += 1;
  	  }
  	  this.timer = setTimeout(()=> {
  	  	this.slider.goToPage(sliderIndex,0,400);
  	  },this.interval);
  	}
  },
  destroyed() {
  	clearTimeout(this.timer);
  }
}	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>