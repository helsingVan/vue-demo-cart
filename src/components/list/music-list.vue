<template>
  <div class="slide-page music-list">
  	<header class="header">
	  	<h1>{{title}}</h1>
	  	<span class="iconfont icon-back back" @click="back"></span>
	  </header>
	  <div class="banner" :style="bgImage">
	  	<span class="play" @click="emitPlay">随机播放全部</span>
	  </div>
	  <section class="list">
	  	<v-scroll :data="data">
		  	<ul @click="select">
		  		<li v-for="item,index in data" class="clearfix" :data-index="index">
		  		  <div class="index">{{index+1}}</div>
				  <div class="content">
				  	<p class="name">{{item.name}}</p>
				  	<p class="singer">{{item.singer}}</p>
				  </div>
		  		</li>
		  	</ul>
		  </v-scroll>
	  </section>
  </div>
</template>

<script>
import vScroll from '@/components/scroll/scroll';

export default {
  props: {
  	data: {},
  	title: {},
  	bgImage: {}
  },
  mounted() {
  	console.log(this.bgImage);
  },
  methods: {
  	back() {
  	  this.$router.back();
  	},
  	emitPlay() {
  	  this.$emit('emitPlay');
  	},
  	select(e) {
  	  let target = e.target;
  	  let targetName = target.nodeName.toLowerCase();
  	  while(targetName !== 'li') {
  	  	target = target.parentNode;
  	  	targetName = target.nodeName.toLowerCase();
  	  }
  	  const index = target.dataset.index;
  	  this.$emit('select',index);
  	}
  },
  components: { vScroll }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .music-list {
	.header {
	  position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
	  z-index: 10;
	  > h1 {
	  	font-size: 38/@rem;
	  	text-align: center;
	  	height: 100/@rem;
	  	line-height: 100/@rem;
	  	color: #fff;
	  }
	  .back {
	  	position: absolute;
	  	top: 0;
	  	left: 20/@rem;
	  	font-size: 40/@rem;
	  	line-height: 100/@rem;
	  	color: #fff;
	  }
	}
	.banner {
	  position: relative;
	  height: 500/@rem;
	  background-repeat: no-repeat;
	  background-position: center center;
	  background-size: cover;
	  .play {
	  	position: absolute;
	  	left: 50%;
	  	transform: translateX(-50%);
	  	bottom: 32/@rem;
	  	color: @themeColor;
	  	padding: 20/@rem 32/@rem;
	  	border: 2px solid @themeColor;
	  	border-radius: 40/@rem;
	  	font-size: 34/@rem;
	  }
	}
	.list {
	  position: fixed;
	  width: 100%;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  top: 500/@rem;
	  ul {
	  	padding: 90/@rem 60/@rem;
	  }
	  li {
	  	margin-bottom: 50/@rem;
	  	min-height: 70/@rem;
	  	.index {
	  	  float: left;
	  	  margin-right: 10/@rem;
	  	  min-width: 100/@rem;
	  	  text-align: center;
	  	  font-size: 40/@rem;
	  	}
	  	.content {
	  	  font-size: 28/@rem;
	  	  overflow: hidden;
	  	}
	  	p {
	  	  overflow: hidden;
	  	  text-overflow: ellipsis;
	  	  white-space: nowrap;
	  	}
	  }
	}
  }
</style>