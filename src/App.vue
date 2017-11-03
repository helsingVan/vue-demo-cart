<template>
  <div id="app">
    <v-tab></v-tab>
    <keep-alive>
    	<router-view/>
    </keep-alive>
    <player></player>
    <main-bg></main-bg>
  </div>
</template>

<script>
import vTab from '@/components/tab/tab';
import player from '@/pages/player/player';
import mainBg from '@/components/slider/slider-bg';

export default {
  name: 'app',
  
  components: { vTab, player, mainBg }
}
</script>

<style lang="less">

</style>
