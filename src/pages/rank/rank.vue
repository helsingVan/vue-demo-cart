<template>
  <transition name="slideRight">
  	<div class="rank">
	  <header class="header">
	  	<h1>{{topInfo.ListName}}</h1>
	  	<span class="iconfont icon-back back" @click="back"></span>
	  </header>
	  <div class="banner" :style="bgImage"></div>
	  <v-scroll class="rank-list">
	  	<ul>
	  		<li v-for="item,index in songs" class="clearfix">
	  		  <div class="index">{{index+1}}</div>
			  <div class="content">
			  	<p class="name">{{item.name}}</p>
			  	<p class="singer">{{item.singer}}</p>
			  </div>
	  		</li>
	  	</ul>
	  </v-scroll>
	</div>
  </transition>
  
</template>

<script>
import { getRankList } from '@/api/request';
import { createSong } from '@/common/js/song';
import vScroll from '@/components/scroll/scroll';

export default {
  data() {
  	return {
  	  topInfo: {},
  	  songs: []
  	}
  },
  computed: {
  	bgImage() {
  	  if(this.songs.length > 0) {
  	  	return `background-image: url(${this.songs[0].image})`;
  	  }
  	}
  },
  created() {
  	this.getData();
  },
  methods: {
  	getData() {
  	  
  	  getRankList(this.$route.params.id).then((data) => {
  	  	if(data.code !== 0) {
  	  		return;
  	  	}
  	  	console.log(data);
  	  	this.topInfo = data.topinfo;
  	  	this.songs = this._normalizeSongs(data.songlist);
  	  	console.log(this.songs);
  	  });
  	},
  	_normalizeSongs(list) {
	    let ret = [];
	    list.forEach((item) => {
	      const musicData = item.data;
	      if (musicData.songid && musicData.albummid) {
	        ret.push(createSong(musicData));
	      }
	    });
	    return ret;
	},
  	back() {
  	  this.$router.back();
  	}
  },
  components: { vScroll }
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
	.header {
	  position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
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
	  }
	}
	.banner {
	  background-repeat: no-repeat;
	  background-position: center center;
	  background-size: cover;
	  height: 500/@rem;
	}
	.rank-list {
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