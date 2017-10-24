<template>
  <nav class="tab">
  	<router-link to="/home">HOME</router-link>
  	<router-link to="/singer">SINGER</router-link>
  	<router-link to="/search">SERACH</router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="less">
@import "../../common/less/mixin";

  .tab {
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	a {
  	  height: 80/@rem;
  	  line-height: 80/@rem;
  	  font-size: 32/@rem;
  	  color: @textColor;
  	  width: 33.3%;
  	  text-align: center;
  	  &.active {
  	  	border-bottom: 4px solid @themeColor;
  	  	color: @themeColor;
  	  }
  	}
  }
</style>