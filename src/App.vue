<template>
  <div id="app">
    <v-tab @emitClick="showAdmin"></v-tab>
    <keep-alive>
    	<router-view/>
    </keep-alive>
    <player></player>
    <main-bg></main-bg>
    <admin ref="admin"></admin>
  </div>
</template>

<script>
import vTab from '@/components/tab/tab';
import player from '@/pages/player/player';
import mainBg from '@/components/slider/slider-bg';
import admin from '@/pages/admin/admin';

export default {
  name: 'app',
  methods: {
    showAdmin() {
      this.$refs.admin.show();
    }
  },
  components: { vTab,player,mainBg,admin }
}
</script>

<style lang="less">
#app {
  height:100%;
}
</style>
