<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
  	<div class="bar-inner">
  	  <div class="progress" ref="progress"></div>
  	  <div class="progress-btn-wrapper">
  	  	<div class="progress-btn" ref="progressBtn"
  	  	     @touchstart.prevent="progressTouchStart"
  	  	     @touchmove.prevent="progressTouchMove"
  	  	     @touchend.prevent="progressTouchEnd"
  	  	></div>
  	  </div>
  	</div>
  </div>
</template>

<script>
import { prefixStyle } from 'common/js/dom';

const progressBtnWidth = 16;
const transform = prefixStyle('transform');
export default {
  name: 'progressbar',
  props: {
  	persent: {
  	  type: Number,
  	  default: 0
  	}
  },
  created() {
  	this.touch = {};
  },
  methods: {
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      this._triggerPrecent();
    },
  	progressTouchStart(e) {
  	  this.touch.init = true;
  	  this.touch.startX = e.touches[0].pageX;
  	  this.touch.left = this.$refs.progress.clientWidth;
  	},
  	progressTouchMove(e) {
  	  if(!this.touch.init) {
  	  	return null;
  	  }
  	  const deltaX = e.touches[0].pageX - this.touch.startX;
  	  const offsetWidth = Math.min(this.$refs.progressBar.clientWidth,this.touch.left+deltaX);
  	  this._offset(offsetWidth);
  	},
  	progressTouchEnd(e) {
  	  this.touch.init =  false;
  	  this._triggerPrecent();
  	},
  	_offset(offsetWidth) {
  	  this.$refs.progress.style.width = `${offsetWidth}px`;
  	  this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
  	},
  	_triggerPrecent() {
  	  const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
  	  const precent = this.$refs.progress.clientWidth/barWidth;
  	  this.$emit('precentChange',precent);
  	}
  },
  watch: {
  	persent(newPersent) {
  	  if(newPersent <= 0 || this.touch.init) {
  	  	return null;
  	  }
  	  const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
  	  const offsetWidth = newPersent * barWidth;
  	  this._offset(offsetWidth);
  	}
  }
}
</script>

<style lang="stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>