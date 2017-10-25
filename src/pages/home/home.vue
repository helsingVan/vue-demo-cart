<template>
  <div>
  	<section class="slider-box" v-if="slider.length>0">
  	  <v-slider>
  	  	<ul class="clearfix">
  	  		<li v-for="item in slider">
  	  		  <a :href="item.linkUrl">
  	  		  	<img :src="item.picUrl" alt="">
  	  		  </a>
  	  		</li>
  	  	</ul>
  	  </v-slider>
  	</section>
  </div>
</template>

<script>
import { getSlider } from '@/api/home';
import vSlider from '@/components/slider/slider';
export default {
  data() {
  	return {
  	  slider: []
  	}
  },
  mounted() {
  	this.getData();
  },
  methods: {
  	getData() {
  	  getSlider().then((data)=>{
  	  	console.log(data);
  	    if(data.code !== 0) {
  	      return;
  	    }
  	    this.slider = data.data.slider;
  	  });
  	}
  },
  components: { vSlider }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
</style>