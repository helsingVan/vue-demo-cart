<template>
  <div class="scroll">
  	<slot></slot>
  </div>
</template>

<script>
import IScroll from 'better-scroll';

export default {
  props: {
    data: {},
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
  computed: {
    momentum() {
      return this.scrollX?false:true;
    }
  },
  mounted() {
  	const self = this;
  	this.$nextTick(()=> {
      this.init();
    })
  },
  watch: {
    data() {
      this.$nextTick(()=> {
        this.refresh();
      });
    }
  },
  methods: {
  	init() {
      const self = this;
  	  setTimeout(()=> {
        this.scroller = new IScroll(this.$el,{
          probeType: self.probeType,
          scrollX: self.scrollX,
          // momentum: this.momentum,
          click: true
        });
        if(this.scrollListener) {
          this.scroller.on('scroll',(pos)=> {
            self.$emit('scroll',pos);
          });
        }
      },500);
  	},
    refresh() {
        this.scroller && this.scroller.refresh()
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