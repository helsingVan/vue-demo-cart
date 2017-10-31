<template>
  <section class="player" v-show="playList.length>0">
  	<div class="normal-player" v-show="fullScreen">
  	  <div class="bg">
  	  	<img :src="currentSong.image" alt="">
  	  </div>
  	  <header class="header">
  	  	<h1>{{currentSong.name}}</h1>
  	  	<p>{{currentSong.singer}}</p>
  	  	<i class="iconfont icon-bottom" @click="setFullScreen(false)"></i>
  	  </header>
  	  <section class="middle">
  	  	<div class="middle-l">
  	  	  <div class="circle" :class="playAnimate">
  	  	  	<img :src="currentSong.image" alt="">
  	  	  </div>
  	  	  <div class="lyric">123123</div>
  	  	</div>
  	  	<div class="middle-r"></div>
  	  </section>
  	  <section class="bottom">
  	  	<div class="play-mode">
  	  	  <i class="iconfont icon-shunxu"></i>
  	  	</div>
  	  	<div class="play-previous">
  	  	  <i class="iconfont icon-previous"></i>
  	  	</div>
  	  	<div class="play-start" @click="setPlaying(!playing)">
  	  	  <i class="iconfont" :class="playingIcon"></i>
  	  	</div>
  	  	<div class="play-next">
  	  	  <i class="iconfont icon-next"></i>
  	  	</div>
  	  	<div class="play-list">
  	  	  <i class="iconfont icon-xunhuan"></i>
  	  	</div>
  	  </section>
  	</div>
  	<div class="mini-player" v-show="!fullScreen">
  	  <div class="figure" @click="setFullScreen(true)">
  	  	<img :src="currentSong.image" alt="">
  	  </div>
  	  <div class="text">
  	  	<h2>{{currentSong.name}}</h2>
  	  	<p>{{currentSong.singer}}</p>
  	  </div>
  	  <div class="play-start" @click="setPlaying(!playing)">
  	  	<i class="iconfont" :class="playingIcon"></i>
  	  </div>
  	  <div class="play-menu">
  	  	<i class="iconfont icon-musicmenu"></i>
  	  </div>
  	</div>
  	<audio :src="currentSong.url" ref="audio"></audio>
  </section>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex';

export default {
  computed: {
  	playingIcon() {
  	  return this.playing?'icon-pause':'icon-player';
  	},
  	playAnimate() {
  	  return this.playing?'animate': 'animate paused';
  	},
  	...mapGetters([
  	  'playing',
  	  'fullScreen',
  	  'playList',
  	  'sequenceList',
  	  'playMode',
  	  'currentIndex',
  	  'currentSong'
  	])
  },
  watch: {
  	currentSong(newSong,oldSong) {
  	  if(newSong.id === oldSong.id) {
  	  	return;
  	  }
  	  this.$nextTick(()=> {
  	  	this.$refs.audio.play();
  	  });
  	},
  	playing(newPlaying) {
  	  const audio = this.$refs.audio;
  	  this.$nextTick(()=> {
  	  	newPlaying?audio.play(): audio.pause();
  	  });
  	}
  },
  methods: {
  	...mapMutations({
  	  setFullScreen: 'SET_FULLSCREEN',
  	  setPlaying: 'SET_PLAYING'
  	})
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
		.bg {
		  position: absolute;
		  width: 100%;
		  height: 100%;
		  top: 0;
		  left: 0;
		  opacity: .6;
		  z-index: -10;
		  filter: blur(10px);
		  img {
		  	width: 100%;
		  	height: 100%;
		  }
		}
		.header {
		position: relative;
		text-align: center;
		color: #fff;
		padding: 30/@rem 0;
		h1 {
			font-size: 40/@rem;
		}
		p {
			font-size: 30/@rem;
			margin-top: 20/@rem;
		}
		.iconfont {
			position: absolute;
			top: 26/@rem;
			left: 30/@rem;
		font-size: 50/@rem;
		}
		}
		.middle {

		.middle-l {
			text-align: center;
			.circle {
			  width: 70%;
			  margin: 0 auto;
			  border-radius: 50%;
			  border: 20px solid @themeColor;
			  overflow: hidden;
			  &.animate {
			  	animation: circle 20s linear infinite;
			  }
			  &.paused {
			  	animation-play-state: paused;
			  }
			  img {
			  	width: 100%;
			  	height: 100%;
			  }
			}
		}
		}
		.bottom {
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 100/@rem;
			display: flex;
			justify-content: space-around;
			.iconfont {
				font-size: 50/@rem;
			}
		}
  }
  .mini-player {
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      color: #000;
      z-index: 1000;
      display: flex;
      
      background-color: #fff;

      .figure {
      	flex: 0 0 100/@rem;
      	margin: 0 30/@rem;
      	img {
      	  width: 100%;
      	  border-radius: 50%;
      	}
      }
      .text {
      	flex: 1;
      	display: flex;
      	flex-flow: column nowrap;
      	justify-content: center;
      	h2 {
      	  font-size: 34/@rem;
      	}
      	p {
      	  font-size: 28/@rem;
      	  margin-top: 10/@rem;
      	}
      }
      .play-start {
      	flex: 0 0 60/@rem;
      	margin-right: 30/@rem;
      	.iconfont {
      	  font-size: 50/@rem;
      	}
      }
      .play-menu {
      	flex: 0 0 60/@rem;
      	margin-right: 10/@rem;
      	.iconfont {
      	  font-size: 50/@rem;
      	}
      }
  }

</style>