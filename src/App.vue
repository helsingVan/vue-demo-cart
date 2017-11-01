<template>
  <div id="app">
    <v-tab></v-tab>
    <keep-alive>
    	<router-view/>
    </keep-alive>
    
    <player></player>
  </div>
</template>

<script>
import vTab from '@/components/tab/tab';
import player from '@/pages/player/player';

export default {
  name: 'app',
  
  components: { vTab, player }
}
</script>

<style lang="less">

</style>
