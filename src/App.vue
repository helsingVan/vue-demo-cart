<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header';
import Tab from 'components/tab/tab';
export default {
  name: 'app',
  components: { mHeader,Tab }
}
</script>

<style lang="stylus">

</style>
