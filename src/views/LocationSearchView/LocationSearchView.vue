<template>
  <div class="container">
    <div class="search-container">
      <h1>The Forecast</h1>
      <h1>Weather App</h1>
      <SearchBar class="search-bar"/>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar'

export default {
  name: 'LocationSearchView',
  components: {
    SearchBar
  },
}
</script>

<style lang="stylus" scoped>
.container
  background-color #134601
  width 100vw
  min-height 100vh
  display flex
  justify-content center
  align-items center

.search-container
  width 500px
  padding 0 25px

.search-bar
  width 100%
  margin-top 70px
  margin-bottom 70px

h1
  text-align center
  font-weight 900
  font-size 48px
  line-height 56px
  background #64AC5B
  background linear-gradient(to bottom, #64AC5B 0%, #BCCE85 100%)
  -webkit-background-clip text
  -webkit-text-fill-color transparent;
  &:first-child
    background #1FA949
    background linear-gradient(to bottom, #1FA949 0%, rgb(94,209,118) 100%)
    -webkit-background-clip text
    -webkit-text-fill-color transparent
</style>
