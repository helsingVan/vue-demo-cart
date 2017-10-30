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
    },
    scrollListener: {
      type: Boolean,
      default() { return false;}
    },
    probeType: {
      type: Number,
      default() { return 0;}
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
          probeType: self.probeType,
          scrollX: self.scrollX,
  	  		click: true
  	  	});
        console.log(this.scrollListener);
        if(this.scrollListener) {
          this.scroller.on('scroll',(pos)=> {
            self.$emit('scroll',pos);
          });
        }

  	  });
  	},
    scrollToElement() {
      this.scroller && this.scroller.scrollToElement.apply(this.scroller,arguments);
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