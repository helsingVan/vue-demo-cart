<template>
  <figure class="clearfix figure-rank">
  	<img :src="data.picUrl" alt="">
  	<figcaption>
  	  <ul>
  	  	<li v-for="item,index in data.songList">
  	  	  <span>{{index+1}}</span>
  	  	  <span>{{item.songname}}</span>
  	  	  -
  	  	  <span>{{item.singername}}</span>
  	  	</li>
  	  </ul>
  	</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
  	data: {}
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .figure-rank {
		overflow: hidden;
		background-color: @rankColor;
  	img {
  	  float: left;
  	  margin-right: 30/@rem;
  	  width: 220/@rem;
  	}
  	figcaption {
  	  color: @textColor;
  	  font-size: 28/@rem;
  	  overflow: hidden;
  	  margin-top: 48/@rem;
  	  li {
  	  	margin-bottom: 14/@rem;
  	  	overflow: hidden;
  	  	text-overflow: ellipsis;
  	  	white-space: nowrap;
  	  }
  	}
  }
</style>