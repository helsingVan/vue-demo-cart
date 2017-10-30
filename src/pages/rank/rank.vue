<template>
  <transition name="slideRight">
	<music-list :data="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
  
</template>

<script>
import { getRankDetail } from '@/api/musicRequest';
import { createSong } from '@/common/js/song';
import musicList from '@/components/list/music-list';

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
	}
  },
  components: { musicList }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
</style>