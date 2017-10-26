<template>
  <transition name="slideRight">
  	<div class="rank">
	  	rank
	  	<span @click="back">回</span>
	</div>
  </transition>
  
</template>

<script>
export default {
  methods: {
  	back() {
  	  this.$router.back();
  	}
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
  .slideRight-enter-active,
  .slideRight-leave-active {
  	transition: all .5s ease;
  }
  .slideRight-enter,
  .slideRight-leave-to {
  	transform: translate3d(100%, 0, 0);
  }
  .rank {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #fff;
	z-index: 1000;
  }

</style>