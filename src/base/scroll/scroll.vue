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
  	},
  	listenScroll: {
  	  type: Boolean,
  	  default: false
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

  	  if(self.listenScroll) {
  	  	self.scroll.on('scroll',(pos)=> {
  	  	  self.$emit('scroll',pos);
  	  	})
  	  }
  	},
  	enable() {
  	  this.scroll && this.scroll.enable();
  	},
  	disabled() {
  	  this.scroll && this.scroll.disabled();
  	},
  	refresh() {
  	  this.scroll && this.scroll.refresh();
  	},
  	scrollTo() {
  	  this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);
  	},
  	scrollToElement() {
  	  this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
  	}
  }
}
</script>

<style lang="stylus">
	
</style>