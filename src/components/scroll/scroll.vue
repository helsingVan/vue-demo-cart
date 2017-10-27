<template>
  <div class="scroll">
  	<slot></slot>
  </div>
</template>

<script>
import IScroll from 'better-scroll';

export default {
  props: {
    scrollX: {
      type: Boolean,
      default() { return false;}
    }
  },
  mounted() {
  	const self = this;
  	setTimeout(()=>{
  		self.init();
  	},1000);
  },
  methods: {
  	init() {
      const self = this;
  	  this.$nextTick(()=> {
  	  	this.scroller = new IScroll(this.$el,{
          scrollX: self.scrollX,
  	  		click: true
  	  	});
  	  });
  	}
  }
}
</script>

<style lang="less">

  .scroll {
    height: 100%;
    overflow: hidden;
  }
</style>