<template>
  <div class="music-list">
  	<div class="back">
  	  <i class="icon-back" @click="goBack"></i>
  	</div>
  	<h1 class="title">{{title}}</h1>
  	<div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0">
          <i class="icon-play"></i>
          <span class="text">随机播放全部2</span>
        </div>
      </div>
  	  <div class="filter"></div>
  	</div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from 'base/scroll/scroll';
import songList from 'base/song-list/song-list';
import loading from 'base/loading/loading';
import {mapActions} from 'vuex';
export default {
  name: 'music-list',
  components: {
    scroll,
    songList,
    loading
  },
  props: {
  	bgImage: {
  	  type: String,
  	  default: ''
  	},
  	songs: {
  	  type: Array,
  	  default() {
        return [];
      }
  	},
  	title: {
  	  type: String,
  	  default: ''
  	}
  },
  mounted() {
    this.$nextTick(()=> {
      this.$refs.list['$el'].style.top = `${this.$refs.bgImage.clientHeight}px`;
      // console.log(this.$refs.list['$el']);
    })
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    },
    setScrollTop() {
        
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    selectItem(song,index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
        'selectPlay'
      ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>