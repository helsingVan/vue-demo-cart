<template>
  <div class="slider">
  	<slot></slot>
  	<div class="pagination clearfix">
  	  <span v-for="i in pagation"></span>
  	</div>
  </div>
</template>

<script>
import Slider from '@/common/js/slider';

export default {
  data() {
  	return {
  	  loopTimer: null,
  	  loopNum: 1,
  	  pagation: 0,
  	  sliderWidth: null,
  	  sliderItemWidth: null,
  	  sliderCount: 0,
  	  sliderUl: null
  	}
  },
  mounted() {
  	// this.init();
  	// this.autoPlay();
  	this.$nextTick(()=> {
  	  this.slider = new Slider(this.$el);
  	})
  },
  methods: {
  	
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
	 
  	}
  	li {
  	  float: left;
  	  img {
	  	display: block;
	  	width: 100%;
	  }
  	}
  	.pagination {
	  position: absolute;
	  left: 50%;
	  bottom: 20/@rem;
	  left: 50%;
	  transform: translateX(-50%);
	  span {
	  	float: left;
	  	width: 14/@rem;
	  	height: 14/@rem;
	  	border-radius: 50%;
	  	background-color: rgba(255,255,255,.5);
	  	margin-right: 10/@rem;
	  	transition: all .3s;
	  	&:last-child {
	  	  margin-right: 0;
	  	}
	  	&.active {
	  	  background-color: rgba(255,255,255,1);
	  	}
	  }
  	}
  }
</style>