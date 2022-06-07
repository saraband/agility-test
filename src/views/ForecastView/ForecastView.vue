<template>
  <div
    class="container"
    :style="{
      backgroundImage: `url(${dynamicCityBackgroundImage})`
    }"
    >
    <!-- Detailled forecast data (usually on the left) -->
    <div class="left-container">
      <div
        class="arrow-back"
        @click="backToSearch"
        />
      <div
        v-if="selectedForecastData || todayForecastData"
        class="selected-forecast-container"
        >
        <ForecastCard
          class="selected-forecast-card"
          :data="selectedForecastData || todayForecastData"
          advanced
          />
      </div>
    </div>

    <!-- List of daily forecast data for the week to come (Usually on the right) -->
    <div
      v-if="dailyForecastData"
      class="daily-forecast-container"
      >
      <ForecastCard
        v-for="forecast in dailyForecastData"
        :key="forecast.dt"
        :data="forecast"
        @click="toggleSelectedForecastData(forecast)"
        class="daily-forecast-card"
        />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
import { fetchLocationData } from './../../helpers/weatherForecast'
import { findCityImage } from './../../helpers/findCityImage'
import ForecastCard from './ForecastCard.vue'

export default {
  name: 'ForecastView',
  components: {
    ForecastCard,
  },
  setup () {
    const forecastData = ref(null)
    const selectedForecastData = ref(null)
    const todayForecastData =  computed(() => forecastData.value?.daily[0]) // Forecast for today
    const dailyForecastData = computed(() => forecastData.value?.daily.slice(1)) // Forecast for the next 7 days

    // Whenever the user clicks on one of the forecast card, show detailled data on the left
    const toggleSelectedForecastData = (data) => {
      if (!selectedForecastData.value) {
        selectedForecastData.value = data
        return
      }

      // Toggle when user clicks two times on card
      selectedForecastData.value = selectedForecastData.value.dt === data.dt
        ? null
        : data
    }

    // Load forecast data for current location
    const route = useRoute()
    fetchLocationData(route.query).then((data) => {
      forecastData.value = data
    })

    // Load dynamic city background image
    const dynamicCityBackgroundImage = ref(null)
    findCityImage(route.query.name).then((data) => {
      dynamicCityBackgroundImage.value = data
    })

    // Go back to main view
    const router = useRouter()
    const backToSearch = () => {
      router.push({ path: '/' })
    }

    const formatDate = (date) => {
      return moment(date).format('L')
    }

    return {
      forecastData,
      backToSearch,
      dailyForecastData,
      todayForecastData,
      selectedForecastData,
      toggleSelectedForecastData,
      formatDate,
      dynamicCityBackgroundImage,
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  background-color #c5c5c5
  display flex
  min-height 100vh
  background-size cover
  @media only screen and (max-width: 1024px)
    flex-direction column

.left-container
  padding 50px
  min-height 100%
  flex-grow 1
  flex-shrink 0
  display flex
  flex-direction column

  .selected-forecast-container
    flex-grow 1
    display flex
    flex-direction column
    justify-content flex-end

    .selected-forecast-card
      width 500px
      @media only screen and (max-width: 1024px)
        width 100%

  .arrow-back
    flex-shrink 0
    cursor pointer
    width 80px
    height 80px
    background url("@/assets/right-arrow.png") no-repeat scroll center center
    background-size 40%
    background-color #134601
    border-radius 100%
    transition all 0.1s linear
    &:hover
      opacity 0.9
    @media only screen and (max-width: 1024px)
      margin-bottom 50px

.daily-forecast-container
  padding 30px
  @media only screen and (min-width: 1024px)
    max-height 100vh
    overflow-y auto

  .daily-forecast-card
    margin-bottom 30px
</style>
