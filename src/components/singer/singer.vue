<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" ref="list"></list-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { getSingerList } from 'api/singer';
import { ERR_OK } from 'api/config';
import { Singer } from 'common/js/singer';
import listView from 'base/listview/listview';

const hotTitle = '热门';
const hotSingerLen = 10;
export default{
  name: 'singer',
  components: {
  	listView
  },
  data() {
  	return {
  	  singers: []
  	}
  },
  created() {
  	this._getSingerList();
  },
  methods: {
  	_getSingerList() {
  	  const self = this;
  	  getSingerList().then((res)=>{
  	  	if(res.code === ERR_OK) {
  	  	  self.singers = self._normalizeSinger(res.data.list);
  	  	  console.log(self.singers);
  	  	}
  	  });
  	},
  	_normalizeSinger(list) {
  	  let map = {
  	  	hot: {
  	  	  title: hotTitle,
  	  	  item: []
  	  	}
  	  };
  	  list.forEach((v,i)=> {
  	  	if(i < 10) {
  	  	  map.hot.item.push(new Singer({
  	  	  	id: v.Fsinger_mid,
  	  	  	name: v.Fsinger_name
  	  	  }));
  	  	}
  	  	const key = v.Findex;
  	  	if(!map[key]) {
  	  	  map[key] = {
  	  	  	title: key,
  	  	  	item: []
  	  	  };
  	  	}
  	  	map[key].item.push(new Singer({
  	  		id: v.Fsinger_mid,
  	  		name: v.Fsinger_name
  	  	}));
  	  });
  	  
  	  // 为得到有序列表，处理map
  	  let hot = [];
  	  let ret = [];
  	  for(let key in map) {
  	  	let val = map[key];
  	  	if(val.title.match(/[a-zA-Z]/)) {
  	  	  ret.push(val);
  	  	}else if(val.title === hotTitle) {
  	  	  hot.push(val);
  	  	}
  	  }
  	  ret.sort((a,b)=> {
  	  	return a.title.charCodeAt(0) - b.title.charCodeAt(0);
  	  });
  	  return hot.concat(ret);
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>