<template>
  <div class="single-page about">
  	<header class="header">
  	  <h1>关于app</h1>
  	  <i class="iconfont icon-back back" @click="goHome"></i>
  	</header>
  	<section class="content main">
  	  <ul>
  	  	<li v-for="list in appInfo">
  	  	  <strong>{{list.title}}：</strong>
  	  	  <p v-for="item in list.content">{{item}}</p>
  	  	</li>
  	  </ul>
  	  <ul>
  	  	<li v-for="list in data_2">
  	  	  <strong>{{list.title}}：</strong>
  	  	  <p v-for="item in list.content">{{item}}</p>
  	  	</li>
  	  </ul>
  	  <ul>
  	  	<li v-for="list in data_1">
  	  	  <strong>{{list.title}}：</strong>
  	  	  <p v-for="item in list.content">{{item}}</p>
  	  	</li>
  	  </ul>
  	</section>
  </div>
</template>

<script>
export default {
  data() {
  	return {
  	  data_2: [
	  	    {
	  	    	title: '版本',
	  	    	content: ['1.1.0']
	  	    },
	  	    {
	  	    	title: '时间',
	  	    	content: ['2017-08-08']
	  	    },
	  	    {
	  	    	title: '内容',
	  	    	content: ['1.留言板','2.播放器播放模式','3.底部全局播放器','4.用户页及关于页']
	  	    }
  	  ],
  	  data_1: [
	  	  	{
	  	  		title: '版本',
	  	  		content: ['1.0.0']
	  	  	},
	  	  	{
	  	  		title: '时间',
	  	  		content: ['2017-02-14']
	  	  	},
	  	  	{
	  	  		title: '内容',
	  	  		content: ['1.推荐首页','2.歌手页','3.歌曲详情页','4.播放器核心']
	  	  	}
  	  ],
  	  appInfo: [
  	      {
  	      	title: '名称',
  	      	content: ['网页播放器spa']
  	      },
  	      {
  	      	title: '技术栈',
  	      	content: ['1.vue、vuex、vue-router','2.better-scroll','3.jsonp','4.less']
  	      }
  	  ]
  	}
  },
  methods: {
  	goHome() {
  	  this.$router.back();
  	}
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .about {
  	.header {
  	  position: relative;
  	  padding: 20/@rem;
  	  border-bottom: 1px solid #ddd;
  	  h1 {
  	  	font-size: 32/@rem;
  	  	text-align: center;
  	  }
  	  .back {
  	  	color: #000;
  	  	font-size: 40/@rem;
  	  	position: absolute;
  	  	top: 50%;
  	  	left: 20/@rem;
  	  	transform: translateY(-50%);
  	  }
  	}
  	.content {
  	  margin-top: 80/@rem;
  	  padding: 0 80/@rem;
  	  font-size: 32/@rem;
  	  box-sizing: border-box;
  	  ul {
  	  	margin-bottom: 40/@rem;
  	  }
  	  li {
  	  	position: relative;
  	  	padding: 0 0 5/@rem 120/@rem;
  	  	strong {
  	  	  position: absolute;
  	  	  top: 0;
  	  	  left: 0;
  	  	}
  	  	p {
  	  	  margin-top: 10/@rem;
  	  	}
  	  }
  	}
  }
</style>