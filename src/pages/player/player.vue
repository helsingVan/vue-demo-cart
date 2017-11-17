<template>
  <section class="player" v-show="playList.length>0">
    <transition name="fadeIn">
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
            <div class="lyric"></div>
          </div>
          <div class="middle-r"></div>
        </section>
        
        <section class="bottom">
          <div class="progress">
              <span class="time">{{currentTime|formatTime}}</span>
              <div class="bar">
                <progress-bar :precent="precent" @precentChange="precentChange"></progress-bar>
              </div>
              <span class="time">{{currentSong.duration|formatTime}}</span>
          </div>
            <div class="control">
              <div class="play-mode" @click="playModeChange">
                <i class="iconfont" :class="playModeIcon"></i>
              </div>
              <div class="play-previous" @click="playPre" >
                <i class="iconfont icon-playpre" :class="disabledClass"></i>
              </div>
              <div class="play-start" @click="togglePlay">
                <i class="iconfont" :class="playingIcon"></i>
              </div>
              <div class="play-next" @click="playNext">
                <i class="iconfont icon-playnext" :class="disabledClass"></i>
              </div>
              <div class="play-list" @click="xiai">
                <i class="iconfont icon-xiai"></i>
              </div>
            </div>
          
        </section>
      </div>
    </transition>
  	
  	<div class="mini-player" v-show="!fullScreen">
  	  <div class="figure" @click="setFullScreen(true)">
  	  	<img :src="currentSong.image" alt="" :class="playAnimate">
  	  </div>
  	  <div class="text">
  	  	<h2>{{currentSong.name}}</h2>
  	  	<p>{{currentSong.singer}}</p>
  	  </div>
  	  <div class="play-start" @click="togglePlay">
  	  	<i class="iconfont" :class="playingIcon"></i>
  	  </div>
  	  <div class="play-menu" @click="showPlayerList">
  	  	<i class="iconfont icon-musicmenu"></i>
  	  </div>
  	</div>
		<player-list ref="playList"></player-list>
  	<audio :src="currentSong.url" ref="audio" @canplay="audioReady" @timeupdate="audioUpdate" @ended="audioEnd" preload
     @canplaythrough="audioReady" @error="error" @webkitcanplay="audioReady"></audio>
    <v-dialog ref="dialog" data="暂时收藏不了哦"></v-dialog>
  </section>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex';
import progressBar from '@/components/progress/progress-bar';
import playerList from '@/components/list/player-list';
import { randomArr } from '@/common/js/tool';
import vDialog from '@/components/layer/dialog';

export default {
  data() {
  	return {
  	  songReady: false,
  	  currentTime: 0,
      playModeNum: 0
  	}
  },
  computed: {
  	disabledClass() {
  	  return this.songReady?'': 'disabled';
  	},
  	playingIcon() {
  	  return this.playing?'icon-pause':'icon-play';
  	},
  	playAnimate() {
  	  return this.playing?'animate': 'animate paused';
  	},
    playModeIcon() {
      let playMode = parseInt(this.playMode,10);
      switch(playMode) {
        case 0:
          return 'icon-shunxu';
          break;
        case 1:
          return 'icon-xunhuan';
          break;
        case 2:
          return 'icon-suiji';
          break;
        default:
          return '';
          break;
      }
    },
  	precent() {
  	  return this.currentTime/this.currentSong.duration;
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
  	  // this.$nextTick(()=> {
  	  // 	this.$refs.audio.play();
  	  // });
      setTimeout(()=>{
        this.$refs.audio.play();
        alert(this.$refs.audio.networkState);
      },500);
  	  if(!this.playing) {
  	  	this.togglePlay();
  	  }
  	},
  	playing(newPlaying) {
  	  const audio = this.$refs.audio;
  	  this.$nextTick(()=> {
  	  	newPlaying?audio.play(): audio.pause();
  	  });
  	}
  },
  filters: {
  	formatTime(time) {
  	  let minutes = Math.floor(time/60); 
  	  let seconds = Math.floor(time%60);
  	  if(minutes < 10) {
  	  	minutes = '0' + minutes;
  	  }
  	  if(seconds < 10) {
  	  	seconds = '0' + seconds;
  	  }
  	  return `${minutes}:${seconds}`;
  	}
  },
  methods: {
  	audioReady() {
      alert('canplay');
  	  this.songReady = true;
  	},
  	audioUpdate(e) {
  	  this.currentTime = e.target.currentTime;
  	},
    audioEnd(e) {
      if(this.playMode === 1) {
        e.target.currentTime = 0;
        e.target.play();
      }else {
        this.playNext();
      }
    },
  	togglePlay() {
  	  this.setPlaying(!this.playing);
  	},
  	playPre() {
  	  if(!this.songReady) {
  	  	return;
  	  }
  	  let currentIndex = this.currentIndex - 1;
  	  if(currentIndex < 0) {
  	  	currentIndex = this.playList.length - 1;
  	  }
  	  this.setCurrentIndex(currentIndex);
  	  this.songReady = false;
  	},
  	playNext() {
  	  if(!this.songReady) {
  	  	return
  	  }
  	  let currentIndex = parseInt(this.currentIndex,10) + 1;
  	  if(currentIndex >= this.playList.length) {
  	  	currentIndex = 0;
  	  }
  	  this.setCurrentIndex(currentIndex);
  	  this.songReady = false;
  	},
    playModeChange() {
      this.playModeNum++;
      if(this.playModeNum > 2) {
        this.playModeNum = 0;
      }
      this.setPlayMode(this.playModeNum);

      let list = null;
      switch(this.playMode){
        case 0:
          list = this.sequenceList;
          break;
        case 2:
          list = randomArr(this.sequenceList);
          break;
        default:
          return;
          break;
      }
      this._keepCurrentSong(list);
      this.setPlayList(list);
    },
    _keepCurrentSong(list) {
      let currentIndex = list.findIndex((v)=> {
        return v.id === this.currentSong.id;
      });
      this.setCurrentIndex(currentIndex);
    },
    precentChange(precent) {
      let currentTime = this.currentSong.duration * precent;
      this.$refs.audio.currentTime = currentTime;
      if(!this.playing) {
        this.togglePlay();
      }
		},
		showPlayerList() {
			this.$refs.playList.show();
		},
    xiai() {
      console.log(this.$refs.dialog);
      this.$refs.dialog.show();
    },
    error() {
      alert('error');
    },
  	...mapMutations({
  	  setFullScreen: 'SET_FULLSCREEN',
  	  setPlaying: 'SET_PLAYING',
  	  setCurrentIndex: 'SET_CURRENTINDEX',
      setPlayMode: 'SET_PLAYMODE',
      setPlayList: 'SET_PLAYLIST'
  	})
  },
  components: { progressBar,playerList,vDialog }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
  .player {
	.iconfont{
	  &.disabled {
	  	opacity: .6;
	  }
	}
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
			  width: 500/@rem;
			  height: 500/@rem;
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
			.control {
				display: flex;
			  justify-content: center;
        > div {
          margin: 0 26/@rem;
        }
        .iconfont {
          font-size: 60/@rem;
          line-height: 1rem;
        }
        .play-start {
          .iconfont {
            font-size: 120/@rem;
          }
        }

			}
			.iconfont {
				font-size: 50/@rem;
			}
			.progress {
			  display: flex;
			  margin: 40/@rem 60/@rem;
			  .time {
			  	font-size: 32/@rem;
			  	flex: 0;
			  }
			  .bar {
			  	flex: 1;
			  	margin: 0 30/@rem;
			  }
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
      padding-top: 10/@rem;
      .figure {
      	flex: 0 0 100/@rem;
      	margin: 0 30/@rem;
      	img {
      	  width: 100%;
      	  border-radius: 50%;
      	  &.animate {
	  	    animation: circle 20s linear infinite;
	      }
	      &.paused {
	  	    animation-play-state: paused;
	      }
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
      	margin-right: 30/@rem;
      	.iconfont {
      	  font-size: 50/@rem;
      	}
      }
  }

</style>