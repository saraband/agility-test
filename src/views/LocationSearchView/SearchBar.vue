<template>
  <div class="search-bar-container">
    <input
      type="text"
      placeholder="Search"
      v-model="search"
      @keydown="onKeyDown"
      />

    <!-- Lists of autocomplete results -->
    <div
      class="results"
      v-if="results?.length"
      >
      <div
        v-for="(result, index) in results"
        :key="`${result.lat},${result.lon}`"
        class="result"
        :class="{ selected: index === selectedResultIndex }"
        @click="submitLocation(result)"
        @mouseover="selectResult(index)"
        >
        {{ result.name }}, {{ result.state || result.country }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { debounce, pick } from 'lodash';
import { useRouter } from "vue-router";
import { fetchLocationsByName } from './../../helpers/weatherForecast'

export default {
  name: 'SearchBar',
  setup () {
    let search = ref("")
    let results = ref([])
    let selectedResult = ref(null)
    let selectedResultIndex = ref(-1)

    // When hovering or navigating the results autocomplete list
    const selectResult = (indexResult) => {
      selectedResult.value = indexResult === -1 ? null : results.value[indexResult]
      selectedResultIndex.value = indexResult
    }

    // Whenever the user starts typing, fetch a list of corresponding locations to autocomplete
    watch(search, debounce(async newSearch => {
      // Search is empty or too short, no results
      if (newSearch.length < 3) {
        results.value = []
        selectResult(-1)
        return
      }

      const locationsList = await fetchLocationsByName(newSearch)
      results.value = locationsList

      // Automatically pre-select first result in the list
      if (locationsList.length) {
        selectResult(0)
      }
    }, 500))

    // User clicked or entered a location, go to forecast view for that location
    const router = useRouter()
    const submitLocation = (location) => {
      router.push({
        path: '/forecast',
        query: pick(location, ['name', 'lat', 'lon']),
      })
    }

    // Interactions with autocomplete results
    const onKeyDown = ({ key }) => {
      // Submitting
      if (selectedResult.value && key === 'Enter') {
        submitLocation(selectedResult.value)
      }

      // Navigating autocomplete results
      if (!results.value || selectedResultIndex.value === -1) {
        return
      }
      if (key === 'ArrowDown') {
        selectResult(
          selectedResultIndex.value + 1 >= results.value.length
            ? 0
            : selectedResultIndex.value + 1
        )
      } else if (key === 'ArrowUp') {
        selectResult(
          selectedResultIndex.value - 1 < 0
            ? results.value.length - 1
            : selectedResultIndex.value - 1
        )
      }
    }

    return {
      search,
      results,
      selectResult,
      selectedResult,
      selectedResultIndex,
      onKeyDown,
      submitLocation,
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-bar-container
  position relative
  .results
    position absolute
    top 100%
    left 0
    margin-top 10px

input
  width 100%
  border none
  border-radius 15px
  font-size 20px
  font-weight 600
  padding 15px 25px
  padding-right 50px
  color #144602
  background url("@/assets/search-interface-symbol.png") no-repeat scroll center right 15px
  background-size 25px
  background-color white
  &::placeholder
    color #144602

.results
  color #144602
  background-color white
  border-radius 15px
  font-size 20px
  width 100%
  padding 15px 0

  .result
    cursor pointer
    padding 10px 25px
    &.selected
      background-color #BCCE85
</style>
