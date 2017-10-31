<template>
  <div id="app">
    <v-tab></v-tab>
    <router-view/>
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
