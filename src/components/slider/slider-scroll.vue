<template>
  <div class="slider">
    <slot></slot>
    <div class="dots">
      <span v-for="(item,index) in dots" :key="index"
      :class="{active:currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import IScroll from 'better-scroll';

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 6000
    }
  },
  data() {
    return {
      slider: {},
      timer: null,
      currentPageIndex: 0,
      dots: []
    }
  },
  activated() {
    //   if (!this.slider) {
    //     return;
    //   }
    //   this.slider.enable();
    //   let pageIndex = this.slider.getCurrentPage().pageX;
    //   if (pageIndex > this.dots.length) {
    //     pageIndex = pageIndex % this.dots.length;
    //   }
    //   this.slider.goToPage(pageIndex, 0, 0);
    //   if (this.loop) {
    //     pageIndex -= 1;
    //   }
    //   this.currentPageIndex = pageIndex;
    //   if (this.autoPlay) {
    //     this.play();
    //   }
    if(this.autoPlay) {
      this.play();
    }  
  },
  deactivated() {
    //   this.slider.disable();
      clearTimeout(this.timer);
  },
  beforeDestroy() {
    //   this.slider.disable();
      clearTimeout(this.timer);
  },
  mounted() {
    setTimeout(()=> {
      this.initSliderWidth();
      this.initDots();
      this.initSlider();
      if(this.autoPlay) {
        this.play();
      }
    },20);
    
    window.addEventListener('resize', () => {
        if (!this.slider || !this.slider.enabled) {
          return;
        }
        clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          if (this.slider.isInTransition) {
            this._onScrollEnd();
          } else {
            if (this.autoPlay) {
              this.play();
            }
          }
          this.refresh();
        }, 60);
      });
    
  },
  methods: {
    initSliderWidth(isResize) {
      const slider = this.$el;
      const sliderWidth = slider.clientWidth;
      const sliderUl = slider.children[0];
      const sliderItems = Array.from(sliderUl.children);
      let allWidth = 0;
      if(this.loop && !isResize) {
        allWidth = sliderWidth * (sliderItems.length + 2);
      }else {
        allWidth = sliderWidth * sliderItems.length;
      }
      sliderUl.style.width = `${allWidth}px`;
      sliderItems.forEach((item,index,_this)=> {
        item.style.width = `${sliderWidth}px`;
      });
    },
    initSlider() {
      this.slider = new IScroll(this.$el,{
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
        },
      });
      this.slider.on('scrollEnd', this._onScrollEnd);
      this.slider.on('touchend', () => {
          if (this.autoPlay) {
            this.play();
          }
      });
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    initDots() {
        this.dots = new Array(this.$el.children[0].children.length);
    },
    _onScrollEnd() {
        let pageIndex = this.slider.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          this.play();
        }
    },
    play() {
      let pageIndex = this.slider.getCurrentPage().pageX + 1;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval);
    },
    refresh() {
      this.initSliderWidth(true)
      this.slider.refresh();
    },
    next() {
      this.slider.next();
    },
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .slider {
    position: relative;
    overflow: hidden;
    ul {
      position: relative;
      li {
        float: left;
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots {
      position: absolute;
      left: 50%;
      bottom: 30/@rem;
      transform: translateX(-50%);
      z-index: 10;
      span {
        float: left;
        width: 20/@rem;
        height: 20/@rem;
        border-radius: 50%;
        background-color: rgba(255,255,255,.3);
        margin-right: 15/@rem;
        &.active {
          background-color: #fff;
        }
      }
    }
  }

</style>

