<template>
  <transition name="slideRight">
  	<music-list :data="songList" :title="title" :bgImage="bgImage" @select="playStart"></music-list>
  </transition>
  
</template>

<script>
import { getSingerDetail } from '@/api/musicRequest';
import { createSong } from '@/common/js/song';
import musicList from '@/components/list/music-list';
import { mapGetters,mapActions } from 'vuex';

export default {
  data() {
  	return {
  	  songList: []
  	}
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return `background-image: url(${this.singer.avatar})`;
    },
    ...mapGetters([
        'singer'
      ])
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
	  },
    playStart(index) {
      this.playStartAction({
        list: this.songList,
        index
      });
    },
    ...mapActions([
        'playStartAction'
      ])
  },
  components: { musicList }
}
</script>

<style lang="less">
@import "../../common/less/mixin";


</style>