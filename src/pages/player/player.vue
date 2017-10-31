<template>
  <section class="player" v-show="playList.length>0">
  	<div class="normal-player">normal-player</div>
  	<div class="mini-player"></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
  	...mapGetters([
  	  'playing',
  	  'fullScreen',
  	  'playList',
  	  'sequenceList',
  	  'playMode',
  	  'currentIndex'
  	])
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
  .player {

  }
  .normal-player {
  	position: fixed;
  	width: 100%;
  	top: 0;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	background-color: #fff;
  	z-index: 1000;
  }
</style>