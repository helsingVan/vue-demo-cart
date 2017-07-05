<template>
  <div ref="wrapper">
  	<slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'scroll',
  props: {
  	probeType: {
  	  type: Number,
  	  default() {
  	  	return 1;
  	  }
  	},
  	click: {
  	  type: Boolean,
  	  default() { return true; }
  	},
  	data: {
  	  type: Array,
  	  default() { return null }
  	}
  },
  mounted() {
  	this.$nextTick(()=> {
  	  this._initScroll();
  	});
  },
  watch: {
  	data() {
  	  this.$nextTick(()=>{
  	  	this.refresh();
  	  })
  	}
  },
  methods: {
  	_initScroll() {
  	  const self = this;
  	  if(!this.$refs.wrapper) {
  	  	return null;
  	  }
  	  self.scroll = new BScroll(self.$refs.wrapper,{
  	  	probeType: self.probeType,
  	  	click: self.click
  	  });
  	},
  	enable() {
  	  this.scroll && this.scroll.enable();
  	},
  	disabled() {
  	  this.scroll && this.scroll.disabled();
  	},
  	refresh() {
  	  this.scroll && this.scroll.refresh();
  	}
  }
}
</script>

<style lang="stylus">
	
</style>