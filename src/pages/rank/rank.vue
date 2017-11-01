<template>
  <transition name="slideRight">
	  <music-list :data="songs" :title="title" :bgImage="bgImage"
    @select="playStart" @emitPlay="playRandom"></music-list>
  </transition>
</template>

<script>
import { getRankDetail } from '@/api/musicRequest';
import { createSong } from '@/common/js/song';
import musicList from '@/components/list/music-list';
import { mapGetters,mapActions } from 'vuex';
import { randomArr } from '@/common/js/tool';

export default {
  data() {
  	return {
  	  title: '',
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
  	  getRankDetail(this.$route.params.id).then((data) => {
  	  	if(data.code !== 0) {
  	  		return;
  	  	}
  	  	this.title = data.topinfo.ListName;
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
    playStart(index) {
      console.log(index);
      this.playStartAction({
        list: this.songs,
        index
      });
    },
    playRandom() {
      this.playRandomAction({
        list: this.songs
      });
    },
    ...mapActions([
        'playStartAction',
        'playRandomAction'
      ])
  },
  components: { musicList }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
</style>