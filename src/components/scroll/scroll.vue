<template>
  <div class="scroll">
  	<slot></slot>
  </div>
</template>

<script>
import IScroll from 'better-scroll';

export default {
  mounted() {
  	const self = this;
  	setTimeout(()=>{
  		self.init();
  	},1000);
  },
  methods: {
  	init() {
  	  this.$nextTick(()=> {
  	  	this.scroller = new IScroll(this.$el,{
  	  		click: true
  	  	});
  	  });
  	}
  }
}
</script>

<style lang="less">

  .scroll {
    overflow: hidden;
  }
</style>