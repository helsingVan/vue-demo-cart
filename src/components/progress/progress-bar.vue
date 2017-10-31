<template>
  <div class="progress-bar">
  	<span class="line"></span>
  	<span class="active-line" ref="activeLine"></span>
  	<span class="point" ref="activePoint"></span>
  </div>
</template>

<script>
export default {
  props: {
  	precent: {}
  },
  mounted() {
  },
  watch: {
  	precent(newValue) {
  	  let barWidth = this.$el.clientWidth;
  	  let offsetWidth = this.precent * barWidth;
  	  this.$refs.activeLine.style.width = `${this.precent*100}%`;
  	  this.$refs.activePoint.style.transform = `translateX(${offsetWidth}px)`
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