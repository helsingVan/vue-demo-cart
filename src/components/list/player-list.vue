<template>
  <transition name="slideUp">
    <section class="player-list" v-show="showFlag">
      <header class="header">
        <div class="title">
          <span>播放队列</span>
          <span>{{sequenceList.length}}</span>
        </div>
        <!-- <div class="icon iconfont" :class="playModeIcon"></div>
        <div class="icon iconfont icon-shanchu"></div> -->
      </header>
      <div class="content">
        <v-scroll :data="sequenceList" ref="playerList">
          <ul>
            <li v-for="(item,index) in sequenceList" :key="index"
            @click="selectSong(index)" ref="listGroup">
              <span class="name" :class="activeSongClass(item)">{{item.name}}</span>
              <span class="icon iconfont icon-shanchu" @click="deleteSong(item)"></span>
            </li>
          </ul>
        </v-scroll>
      </div>
      <div class="close" @click="hide">关闭</div>
    </section>
  </transition>
</template>

<script>
import { mapGetters,mapMutations,mapActions } from 'vuex';
import vScroll from '@/components/scroll/scroll';
export default {
  data() {
    return {
      showFlag: false
    }
  },
  computed: {
    playModeIcon() {
      let playMode = parseInt(this.playMode);
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
          return null;
          break;
      }
    },
    ...mapGetters([
      'playMode',
      'sequenceList',
      'currentSong'
    ])
  },
  mounted() {

  },
  watch: {
    currentSong(newSong,oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      setTimeout(()=> {
        this.scrollToCurrent(newSong);
      },50);
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(()=> {
        this.$refs.playerList.refresh();
      },100);
      
    },
    hide() {
      this.showFlag = false;
    },
    activeSongClass(item) {
      return item.id === this.currentSong.id? 'active': '';
    },
    selectSong(index) {
      this.setCurrentIndex(index);
    },
    scrollToCurrent(current) {
      let index = this.sequenceList.findIndex((song)=> {
        return song.id === current.id;
      });
      this.$refs.playerList.scrollToElement(this.$refs.listGroup[index],300);
    },
    ...mapMutations({
      'setCurrentIndex': 'SET_CURRENTINDEX'
    }),
    ...mapActions([
      'deleteSong'
    ])
  },
  components: { vScroll }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

.slideUp-enter-active,
.slideUp-leave-active {
  transition: all .5s;
  opacity: 1; 
}
.slideUp-enter,
.slideUp-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

  .player-list {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #999;
    z-index: 1500;
    padding-bottom: 84/@rem;
    .header {
      display: flex;
      padding: 40/@rem;
      .title {
        flex: 1;
        font-size: 32/@rem;
      }
      .icon {
        flex: 0 0 60/@rem;
        font-size: 40/@rem;
      }
    }
    .content {
      height: 400/@rem;
      overflow: hidden;
      font-size: 32/@rem;
      padding: 0 40/@rem;
      li {
        height: 80/@rem;
        line-height: 80/@rem;
        display: flex;
        .name {
          flex: 1;
          &.active {
            color: @themeColor;
          }
        }
        .icon {
          flex: 0 0 40/@rem;
          font-size: 32/@rem;
        }
      }
    }
    .close {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 84/@rem;
      line-height: 84/@rem;
      color: #fff;
      text-align: center;
      font-size: 32/@rem;
      background-color: #999;
      z-index: 10;
    }
  }
</style>

