<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header';
import Tab from 'components/tab/tab';
import player from 'components/player/player'
export default {
  name: 'app',
  components: { mHeader,Tab,player }
}
</script>

<style lang="stylus">

</style>
