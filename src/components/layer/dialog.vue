<template>
  <transition name="fadeIn">
  	<div class="layer" v-show="showFlag">
  	  <p>{{data}}</p>
  	</div>
  </transition>
</template>

<script>
export default {
  props: {
  	data: {}
  },
  data() {
  	return {
  	  showFlag: false
  	}
  },
  watch: {
    showFlag(newValue) {
      if(newValue === false) {
        return;
      }
      setTimeout(()=>{
        this.showFlag = false;
      },2000);
    }
  },
  methods: {
  	show() {
  	  this.showFlag = true;
  	},
  	hide() {
  	  this.showFlag = false;
  	}
  }
}
</script>

<style lang="less">
@import "../../common/less/mixin";
  
  .layer {
  	position: absolute;
  	top: 50%;
  	left: 50%;
  	transform: translate3d(-50%,-50%,0);
  	padding: 20/@rem;
  	background-color: rgba(0,0,0,0.5);
    z-index: 1000;
    border-radius: 10px;
  	p {
  	  text-align: center;
      font-size: 32/@rem;
      color: #fff;
  	}
  }
</style>