<template>
  <div id="app">
    <v-tab></v-tab>
    <router-view/>
  </div>
</template>

<script>
import vTab from '@/components/tab/tab';

export default {
  name: 'app',
  
  components: { vTab }
}
</script>

<style lang="less">
@import "./common/less/mixin";
</style>
