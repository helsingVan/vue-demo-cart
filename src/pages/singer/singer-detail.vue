<template>
  <transition name="slideRight">
  	<div class="slide-page"></div>
  </transition>
  
</template>

<script>
import { getSingerDetail } from '@/api/musicRequest';

export default {
  data() {
  	return {
  	  songList: []
  	}
  },
  mounted() {
  	this.getData();
  },
  methods: {
  	getData() {
  	  getSingerDetail(this.$route.params.id).then((data) => {
  	  	if(data.code !== 0) {
  	  	  return;
  	  	}
  	  	this.songList = this._normalizeSongs(data.data.list);
  	  	console.log(this.songList);
  	  });
  	},
  	_normalizeSongs(list) {
	    let ret = [];
	    list.forEach((item) => {
	      let {musicData} = item;
	      if (musicData.songid && musicData.albummid) {
	        ret.push(createSong(musicData));
	      }
	    });
	    return ret;
	}
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";


</style>