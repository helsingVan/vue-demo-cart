<template>
  <div class="board">
  	<div id="SOHUCS" sid="cyth36aoH" ></div>
	<!-- <script id="changyan_mobile_js" charset="utf-8" type="text/javascript" 
	src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=cyth36aoH&conf=prod_52453e9b1b5e4b841644d3d96a471c4b">
	</script> -->
  </div>
</template>

<script>
export default {
  data() {
  	return {
  	  script: null,
  	  scriptUrl: 'https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=cyth36aoH&conf=prod_52453e9b1b5e4b841644d3d96a471c4b',
  	  scriptId: 'changyan_mobile_js'
  	}
  },
  mounted() {
  	this.initScript()
  },
  methods: {
  	initScript() {
  	  let script = this.script;
  	  if(script) {
  	  	return;
  	  }
  	  this.script = document.createElement('script');
  	  this.script.id = this.scriptId;  
  	  this.script.src = this.scriptUrl;
  	  document.body.appendChild(this.script);
  	}
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .board {
  	padding-top: 20/@rem;
  }
</style>