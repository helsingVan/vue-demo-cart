<template>
  <div class="main singer">
  	<section class="singer-hot">
  	  <h2 class="title">{{singerHot.title}}</h2>
	  <v-scroll :scrollX="true">
	  	<ul class="clearfix">
	  		<li v-for="item in singerHot.items" class="item" @click="toSingerDetail(item)">
	  		  <figure>
	  		  	<img :src="item.avatar" alt="">
	  		  	<figcaption class="name">{{item.name}}</figcaption>
	  		  </figure>
	  		</li>
	  	</ul>
	  </v-scroll>
  	</section>
  	<section class="singer-classify">
  	  <h2 class="title">分类</h2>
  	  <aside class="sidebar">
  	  	<ul @touchstart="classifySelect" @touchmove="classifyMove">
  	  		<li v-for="item,index in singerListSub" :data-index="index" :class="{active:selectActiveIndex == index}" ref="sideBarList">{{item.title}}</li>
  	  	</ul>
  	  </aside>
  	  <div class="scroll-box">
        <header class="fix-title classify-title" v-show="fixTitle" ref="fixTitleEl">
          <h3>{{fixTitle}}</h3>
        </header>
  	  	<v-scroll :data="singerListSub" :scrollListener="true" @scroll="scroll" :probeType="3" ref="classifyScroller">
  	  	  <ul ref="singerListEl">
  	  	  	<li v-for="list in singerListSub" ref="listGroup">
  	  	  	  <h3 class="classify-title">{{list.title}}</h3>
  	  	  	  <ul class="singer">
  	  	  	  	<li v-for="item in list.items" @click="toSingerDetail(item)">
  	  	  	  		<img :src="item.avatar" alt="" class="avatar">
  	  	  	  		<span class="name">{{item.name}}</span>
  	  	  	  	</li>
  	  	  	  </ul>
  	  	  	</li>
  	  	  </ul>
  	  	</v-scroll>
  	  </div>
  	</section>
  	<router-view/>
  </div>
</template>

<script>
import { getSingerList } from '@/api/musicRequest';
import vScroll from '@/components/scroll/scroll';
import { mapMutations } from 'vuex';

const HOT_SINGER_LEN = 10;
const HOT_NAME = '热门';
class Singer {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`;
  }
}
export default {
  data() {
  	return {
  	  singerList: [],
      selectActiveIndex: 0,
      sideBarIntervalHeight: 0,
      touch: {},
      listGroupHeightList: [0],
      scrollY: 0,
      fixDelta: 0,
      fixTitleHeight: 119
  	}
  },
  computed: {
  	singerHot() {
  	  return this.singerList.length > 0? this.singerList[0]: {};
  	},
  	singerListSub() {
  	  return this.singerList.slice(1);
  	},
    fixTitle() {
      if(this.scrollY >= 0) {
        return '';
      }
      return this.singerListSub?this.singerListSub[this.selectActiveIndex].title:'';
    }
  },
  created() {
  	this.getData();
  },
  mounted() {
    this.$nextTick(()=> {
      this.caculateHeight();
    })
    
  },
  watch: {
    scrollY(newY) {
      if(newY > 0) {
        this.selectActiveIndex = 0;
        return;
      }
      const heightList = this.listGroupHeightList;
      for(let i = 0;i < heightList.length - 1; i++) {
        if(-newY >= heightList[i] && -newY < heightList[i+1]) {
          this.selectActiveIndex = i;
          break;
        }
      }
    }
  },
  methods: {
  	getData() {
  	  getSingerList().then((data) => {
  	  	if(data.code !== 0) {
  	  		return;
  	  	}
  	  	this.singerList = this._normalizeSinger(data.data.list);
  	  });
  	},
  	_normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }));
          }
          const key = item.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }));
        });
        // 为了得到有序列表，我们需要处理 map
        let ret = [];
        let hot = [];
        for (let key in map) {
          let val = map[key];
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          } else if (val.title === HOT_NAME) {
            hot.push(val);
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        return hot.concat(ret);
    },
    toSingerDetail(item) {
      this.$router.push({
      	path: `/singer/${item.id}`
      });
      this.setSinger(item);
    },
    caculateHeight() {
      setTimeout(()=>{
        this.sideBarIntervalHeight = this.$refs.sideBarList[0].offsetHeight;
        const listGroup = this.$refs.listGroup;
        let height = 0;
        listGroup.forEach((v)=> {
          height += v.offsetHeight;
          this.listGroupHeightList.push(height);
        });
      },50);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    classifySelect(e) {
      const selectIndex = e.target.dataset.index;
      this.selectActiveIndex = selectIndex;
      this.touch.startY = e.touches[0].pageY;
      this.touch.startIndex = selectIndex;
      this._scrollTo(selectIndex);
    },
    classifyMove(e) {
      let startY = this.touch.startY;
      let endY = this.touch.endY = e.touches[0].pageY;
      let delta = (endY - startY)/this.sideBarIntervalHeight | 0;
      let selectIndex = parseInt(this.touch.startIndex,10) + delta;
      this.selectActiveIndex = selectIndex;
      this._scrollTo(selectIndex);
    },
    _scrollTo(selectIndex) {
      this.scrollY = -this.listGroupHeightList[selectIndex];
      const classifyScroller = this.$refs.classifyScroller;
      const listGroup = this.$refs.listGroup;
      classifyScroller.scrollToElement(listGroup[selectIndex],0);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: { vScroll }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .singer {
  	.title {
  	  font-size: 32/@rem;
  	  padding: 0 40/@rem;
  	  height: 80/@rem;
  	  line-height: 80/@rem;
  	  color: @textColor;
  	}
  }
  .singer-hot {
  	padding: 0 5/@rem;
  	overflow: hidden;
  	ul {
  		min-width: 2000/@rem;
  	}
  	.item {
	    float: left;
      width: 200/@rem;
      text-align: center;
  	  img {
  	  	width: 140/@rem;
  	  	border-radius: 50%;
  	  }
  	  .name {
  	  	width: 100%;
  	  	color: @textColor;
  	  	font-size: 26/@rem;
  	  	text-align: center;
  	  	padding: 10/@rem 0;
  	  	overflow: hidden;
  	  	text-overflow: ellipsis;
  	  	white-space: nowrap;
  	  }
  	}
  }
  .singer-classify {
	  position: absolute;
	  width: 100%;
	  top: 300/@rem;
	  bottom: 0;
  	.sidebar {
  	  position: absolute;
  	  right: 0;
  	  top: 80/@rem;
  	  color: @textColor;
  	  font-size: 26/@rem;
  	  background-color: rgba(0,0,0,.1);
  	  padding: 10/@rem 0;
  	  border-radius: 20/@rem;
  	  z-index: 10;
  	  li {
  	  	width: 40/@rem;
  	  	text-align: center;
  	  	height: 30/@rem;
        line-height: 30/@rem;
        &.active {
          color: @themeColor;
        }
  	  }
  	}
  	.scroll-box {
  	  position: absolute;
  	  width: 100%;
  	  top: 80/@rem;
  	  bottom: 0;
      overflow: hidden;
      .fix-title {
        position: absolute;
        width: 100%;
        top: -1px;
        left: 0;
        z-index: 5;
        background-color: #2C2B2B;
      }
  	}
  	.classify-title {
  	  font-size: 32/@rem;
  	  color: @textColor;
  	  padding: 20/@rem 40/@rem;
  	  background-color: rgba(0,0,0,.3);	
  	}
  	.singer {
  		padding: 20/@rem 0;
  		li {
  		  padding: 10/@rem 40/@rem;
        min-height: 100/@rem;
  		}
		.avatar {
		  display: inline-block;
		  width: 100/@rem;
		  border-radius: 50%;
		  vertical-align: middle;
		  margin-right: 10/@rem;
		}
		.name {
		  font-size: 26/@rem;
		  color: @textColor;
		 }
  	}
  	
  }
</style>