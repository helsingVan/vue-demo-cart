<template>
  <v-scroll class="scroll-container">
    <div class="content">
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
      <section class="home-container">
        <ul class="home-rank">
          <li v-for="item in topList" @click="toRank(item.id)">
            <v-figure :figureData="item"></v-figure>
          </li>
        </ul>
      </section>
    </div>
    <router-view/>
  </v-scroll>
</template>

<script>
import { getSlider, getRank } from '@/api/request';
import vSlider from '@/components/slider/slider';
import vFigure from '@/components/figure/figure-rank';
import vScroll from '@/components/scroll/scroll';
export default {
  data() {
  	return {
  	  slider: [],
      topList: []
  	}
  },
  mounted() {
  	this.getData();
  },
  methods: {
  	getData() {
  	  getSlider().then((data)=>{
  	  	// console.log(data);
  	    if(data.code !== 0) {
  	      return;
  	    }
  	    this.slider = data.data.slider;
  	  });
      getRank().then((data) => {
     
        if(data.code !== 0) {
          return;
        }
        this.topList = data.data.topList;
      })
  	},
    toRank(id) {
      console.log(id);
      this.$router.push({
        path: `/home/rank/${id}`
      });
    }
  },
  components: { vSlider, vFigure, vScroll }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
  .scroll-container {
    position: fixed;
    width:100%;
    top: 80/@rem;
    bottom: 0;
  }
  .home-container {
    padding: 0 30/@rem;


  }
  .home-rank {
    margin-top: 30/@rem;
    li {
      margin-bottom: 30/@rem;
    }
  }
</style>