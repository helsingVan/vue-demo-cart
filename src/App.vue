<template>
  <div id="app">
    <v-tab></v-tab>
    <router-view/>
  </div>
</template>

<script>
import { getSlider } from '@/api/home';
import vTab from '@/components/tab/tab';

export default {
  name: 'app',
  mounted() {
    getSlider().then((data) => {
      console.log(data);
    });
  },
  components: { vTab }
}
</script>

<style lang="less">
@import "./common/less/mixin";
</style>
