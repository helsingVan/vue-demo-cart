<template>
  <div class="progress-bar" @click="clickBar">
  	<span class="line" ></span>
  	<span class="active-line" ref="activeLine"></span>
  	<span class="point" ref="activePoint"
  	@touchstart="touchStart"
  	@touchmove.prevent="touchMove"
  	@touchend="touchEnd"></span>
  </div>
</template>

<script>
export default {
  props: {
  	precent: {}
  },
  data() {
  	return {
  	  touch: {},
  	  hasTouchStart: false
  	}
  },
  mounted() {
  },
  watch: {
  	precent(newValue) {
  	  if(newValue && !this.hasTouchStart) {
  	  	let offsetWidth = this.precent * this.$el.clientWidth;
  	    this._offset(offsetWidth);
  	  }
  	  
  	}
  },
  methods: {
  	touchStart(e) {
  	  const touches = e.touches[0];
  	  this.hasTouchStart = true;
  	  this.touch.startX = touches.pageX;
  	  this.touch.barWidth = this.$refs.activeLine.clientWidth;
  	},
  	touchMove(e) {
  	  if(!this.hasTouchStart) {
  	  	return;
  	  }
  	  const touches = e.touches[0];
  	  let moveX = this.touch.moveX = touches.pageX;
  	  let deltaX = moveX - this.touch.startX;
  	  let offsetWidth = Math.min(this.$el.clientWidth,Math.max(0,this.touch.barWidth + deltaX));
  	  this._offset(offsetWidth);
  	},
  	touchEnd() {
  	  this.hasTouchStart = false;
  	  this.emitPrecentChange();
  	},
  	clickBar(e) {
  	  this._offset(e.offsetX);
  	  this.emitPrecentChange();
  	},
  	emitPrecentChange() {
  	  let precent = this.$refs.activeLine.clientWidth/this.$el.clientWidth;
  	  this.$emit('precentChange',precent);
  	},
  	_offset(offsetWidth) {
  	  this.$refs.activeLine.style.width = `${offsetWidth}px`;
  	  this.$refs.activePoint.style.transform = `translateX(${offsetWidth}px)`;
  	}
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
  .progress-bar {
    position: relative;
	height: 100%;
  	.line {
	  	width: 100%;
	  	height: 10/@rem;
	  	background-color: rgba(0,0,0,.5);
	  	position: absolute;
	  	top: 50%;
	  	margin-top: -5/@rem;
	  }
	  .point {
	  	position: absolute;
	  	width: 16/@rem;
	  	height: 16/@rem;
	  	border: 8/@rem solid #fff;
	  	background-color: @themeColor;
	  	border-radius: 50%;
	  	top: 50%;
	  	left: -8/@rem;
	  	margin-top: -16/@rem;
	  }
	.active-line {
	    height: 10/@rem;
	  	background-color: @themeColor;
	  	position: absolute;
	  	top: 50%;
	  	margin-top: -5/@rem;
	}
  }
  
</style>