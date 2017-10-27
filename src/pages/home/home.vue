<template>
  <div class="main home">
    <v-scroll>
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
        <section class="rank-container">
          <ul class="home-rank">
            <li v-for="item in topList" @click="toRank(item.id)">
              <v-figure :data="item"></v-figure>
            </li>
          </ul>
        </section>
      </div>
      
    </v-scroll>
    <router-view/>
  </div>
  
</template>

<script>
import { getSlider, getRankList } from '@/api/musicRequest';
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
    // 页面初始化数据
  	getData() {
  	  getSlider().then((data)=>{
  	    if(data.code !== 0) {
  	      return;
  	    }
  	    this.slider = data.data.slider;
  	  });
      getRankList().then((data) => {
     
        if(data.code !== 0) {
          return;
        }
        this.topList = data.data.topList;
      })
  	},
    // 跳转对应排行详情
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
  
  .home {
    top: 100/@rem;
  }
  .rank-container {
    padding: 0 30/@rem;


  }
  .home-rank {
    margin-top: 30/@rem;
    li {
      margin-bottom: 30/@rem;
    }
  }
</style>