<template>
  <transition name="slideRight">
  	<div class="admin" v-show="showFlag"
  	@touchstart="touchStart"
  	@touchend="touchEnd">
  		<div class="backbox" @click="hide"></div>
	  	<div class="container">
	  	  <section class="user">
	  	  	<div class="bg" :style="bgImage"></div>
	  	  	<figure class="user-icon">
	  	  	  <img :src="icon" alt="">
	  	  	</figure>
	  	  </section>
	  	  <section class="list">
	  	  	<ul>
	  	  	  <li @click="goAbout">
	  	  	  	关于app
	  	  	  </li>
	  	  	</ul>
	  	  </section>
	  	  <section class="copyright">
	  	  	<p>Copyright©2015-2017 范广-音乐播放器</p>
	  	  	<p>京ICP备17053101号</p>
	  	  </section>
	  	</div>

	  </div>
  </transition>
  
</template>

<script>
export default {
  data() {
  	return {
      icon: '/static/image/dog.jpg',
      showFlag: false,
      touch: {}
  	}
  },
  computed: {
  	bgImage() {
  	  return `background-image: url(${this.icon})`;
  	}
  	
  },
  methods: {
  	show() {
  	  this.showFlag = true;
  	},
  	hide() {
  	  this.showFlag = false;
  	},
  	touchStart(e) {
  	  this.touch.startX = e.touches[0].clientX;
  	},
  	touchEnd(e) {
  	  let start = this.touch.startX;
  	  if(!start) {
  	  	return;
  	  }
  	  let end = this.touch.endX = e.changedTouches[0].clientX;
  	  let delta = end - start;
  	  if(delta > 200) {
  	  	this.showFlag = false;
  	  }
  	},
  	goAbout() {
  	  this.showFlag = false;
  	  this.$router.push({
  	  	path: '/about-app'
  	  });
  	}
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
  .admin {
  	position: absolute;
  	width: 100%;
  	top: 0;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	display: flex;
  	justify-content: flex-end;
  	background-color: rgba(0,0,0,.5);
  	z-index: 1000;
	&.slideRight-enter,
	&.slideRight-leave-to {
	  background-color: rgba(0,0,0,0);
	}
  	.backbox {
  	  flex: 1;
  	}
  	.container {
  	  position: relative;
  	  flex: 0 0 70%;
  	  height: 100%;
  	  background-color: #fff;
  	}
  	.user {
  	  position: relative;
  	  height: 400/@rem;
  	  .bg {
  	  	height: 100%;
  	  	background-repeat: no-repeat;
  	  	background-position: center;
  	  	background-size: cover;
  	  	filter: blur(20px);
  	  }
  	  .user-icon {
  	  	position: absolute;
  	  	left: 20/@rem;
  	  	bottom: 20/@rem;
  	  	width: 140/@rem;
  	  	height: 140/@rem;
  	  	overflow: hidden;
  	  	border-radius: 50%;
  	  	img {
  	  	  width: 100%;
  	  	  height: 100%;
  	  	}
  	  }
  	}
  	.list {
  	  font-size: 32/@rem;
  	  margin-top: 200/@rem;
  	  padding: 0 40/@rem;
  	  color: #666;
  	  li {
  	  	padding: 20/@rem 0;
  	  }
  	}
  	.copyright {
  	  position: absolute;
  	  width: 100%;
  	  left: 0;
  	  bottom: 20/@rem;
  	  font-size: 24/@rem;
  	  color: #666;
  	  text-align: center;
  	  p {
  	  	margin: 4/@rem;
  	  }
  	}
  }
</style>