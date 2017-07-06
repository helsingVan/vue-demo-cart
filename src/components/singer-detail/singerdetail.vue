<template>
  <transition name="slide">
    <div class="singer-detail">
  	  sdfsfd
    </div>
  </transition>

</template>

<script>
import { mapGetters } from 'vuex';
import { getSingerDetail } from 'api/singer';
import { ERR_OK } from 'api/config';
import { createSong } from 'common/js/song';

export default {
  name: 'singerdetail',
  computed: {
  	...mapGetters([
  		'singer'
  		])
  },
  created() {
  	this._getSingerDetail();
  },
  data() {
  	return {
  	  songs: []
  	}
  },
  methods: {
  	_getSingerDetail() {
  	  const self = this;
  	  let singerId = this.singer.id;
  	  if(!singerId) {
  	  	this.$router.push({
  	  	  path: '/singer'
  	  	})
  	  }
  	  getSingerDetail(singerId).then((res)=> {
  	  	if(res.code === ERR_OK) {
  	  	  this.songs = this._normalizeSongs(res.data.list);
  	  	  console.log(this.songs);
  	  	}
  	  })
  	},
  	_normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
    }
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .singer-detail
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
    z-index: 100
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>