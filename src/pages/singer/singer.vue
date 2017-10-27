<template>
  <div class="main singer">
  	<section class="singer-hot">
  	  <h2 class="title">{{singerHot.title}}</h2>
	  <v-scroll :scrollX="true">
	  	<ul class="clearfix">
	  		<li v-for="item in singerHot.items" class="item">
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
  	  <aside class="sidebar" @touchmove="prevent">
  	  	<ul>
  	  		<li v-for="item in singerListSub">{{item.title}}</li>
  	  	</ul>
  	  </aside>
  	  <div class="scroll-box">
  	  	<v-scroll>
  	  	  <ul>
  	  	  	<li v-for="list in singerListSub">
  	  	  	  <h3 class="classify-title">{{list.title}}</h3>
  	  	  	  <ul class="singer">
  	  	  	  	<li v-for="item in list.items">
  	  	  	  		<img :src="item.avatar" alt="" class="avatar">
  	  	  	  		<span class="name">{{item.name}}</span>
  	  	  	  	</li>
  	  	  	  </ul>
  	  	  	</li>
  	  	  </ul>
  	  	</v-scroll>
  	  </div>
  	</section>
  </div>
</template>

<script>
import { getSingerList } from '@/api/musicRequest';
import vScroll from '@/components/scroll/scroll';


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
  	  singerList: []
  	}
  },
  computed: {
  	singerHot() {
  	  return this.singerList.length > 0? this.singerList[0]: {};
  	},
  	singerListSub() {
  	  return this.singerList.slice(1);
  	}
  },
  created() {
  	this.getData();
  },
  methods: {
  	getData() {
  	  getSingerList().then((data) => {
  	  	if(data.code !== 0) {
  	  		return;
  	  	}
  	  	this.singerList = this._normalizeSinger(data.data.list);
  	  	console.log(this.singerList);
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
    prevent() {
    	// return false;
    }
  },
  components: { vScroll }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .singer {
  	.title {
  	  font-size: 40/@rem;
  	  padding: 0 40/@rem;
  	  height: 80/@rem;
  	  line-height: 80/@rem;
  	  color: @textColor;
  	}
  }
  .singer-hot {
  	padding: 0 5/@rem;
  	overflow: hidden;
  	height: 340/@rem;
  	ul {
  		min-width: 2000/@rem;
  	}
  	.item {
	  float: left;
	  width: 200/@rem;
  	  img {
  	  	width: 160/@rem;
  	  	border-radius: 50%;
  	  }
  	  .name {
  	  	width: 160/@rem;
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
	top: 340/@rem;
	bottom: 0;
  	.sidebar {
  	  position: absolute;
  	  right: 0;
  	  top: 80/@rem;
  	  color: @textColor;
  	  font-size: 28/@rem;
  	  background-color: rgba(0,0,0,.1);
  	  padding: 10/@rem 0;
  	  border-radius: 20/@rem;
  	  z-index: 10;
  	  li {
  	  	width: 40/@rem;
  	  	text-align: center;
  	  	padding: 2/@rem;
  	  }
  	}
  	.scroll-box {
  	  position: absolute;
  	  width: 100%;
  	  top: 80/@rem;
  	  bottom: 0;
  	}
  	.classify-title {
  	  font-size: 32/@rem;
  	  color: @textColor;
  	  padding: 20/@rem 40/@rem;
  	  background-color: rgba(0,0,0,.1);	
  	}
  	.singer {
  		padding: 20/@rem 0;
  		li {
  		  padding: 10/@rem 40/@rem;

  		}
		.avatar {
		  display: inline-block;
		  width: 100/@rem;
		  border-radius: 50%;
		  vertical-align: middle;
		  margin-right: 10/@rem;
		}
		.name {
		  font-size: 28/@rem;
		  color: @textColor;
		}
  	}
  	
  }
</style>