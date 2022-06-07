<template>
  <div
    class="forecast-card"
    :class="{ advanced }"
    >
    <!-- Weather icon -->
    <img
      :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`"
      :alt="data.weather[0].description"
      />
  
    <!-- Date -->
    <h3 v-if="advanced">
      {{ formatDayOfTheWeek(data.dt) }} {{ formatDayAndMonth(data.dt) }}
    </h3>
    <div
      v-else
      class="date"
      >
      <h3>{{ formatDayOfTheWeek(data.dt) }}</h3>
      <p>{{ formatDayAndMonth(data.dt) }}</p>
    </div>

    <!-- Temperature -->
    <div
      v-if="!advanced"
      class="temperature"
      >
      {{ formatTemperature(data.temp) }}
    </div>

    <!-- Detailled data for selected forecast card -->
    <div
      v-if="advanced"
      class="detailled-data"
      >
      <div>
        <h4>Jour - {{ formatTemperature(data.temp.day) }}</h4>
        <h4>Nuit - {{ formatTemperature(data.temp.night) }}</h4>
        <h4>Humidité - {{ data.humidity }}%</h4>
      </div>
      <div>
        <h4>Pression - {{ data.pressure }}hPa</h4>
        <h4>Vent - {{ data.wind_speed }}Km/h</h4>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ForecastCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
    advanced: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    // A few formatting methods to print out temperature and date
    const formatTemperature = (temp) => {
      if (typeof temp === 'object') {
        temp = (temp.min + temp.max) / 2
      }

      return `${Math.round(temp)}°C`
    }

    const formatDayOfTheWeek = (date) => {
      return moment.unix(date).locale('fr').format('dddd')
    }

    const formatDayAndMonth = (date) => {
      return moment.unix(date).locale('fr').format('Do MMMM')
    }
    return {
      formatTemperature,
      formatDayOfTheWeek,
      formatDayAndMonth,
    }
  }
}
</script>

<style lang="stylus" scoped>
.forecast-card
  display flex
  align-items center
  color white
  background-color #134601
  border-radius 20px
  transition all 0.1s linear
  &:not(.advanced)
    cursor pointer
    &:hover
      opacity 0.9
  img
    width 100px
    padding-right 10px
    flex-shrink 0
  .date
    text-transform capitalize
    display flex
    flex-direction column
    align-items center
    padding-right 25px
    flex-shrink 0
    flex-grow 1
  .temperature
    font-size 45px
    font-weight 700
    padding-right 25px
    flex-shrink 0

  &.advanced
    flex-direction column
    padding 30px 50px 50px 50px
    position relative
    img
      position absolute
      top 0
      left 30px
      @media only screen and (max-width: 1024px)
        position relative
        left 0
        padding 0
    h3
      text-transform capitalize
      font-size 30px
      text-align center
      width 100%
    .detailled-data
      width 100%
      display flex
      margin-top 40px
      @media only screen and (max-width: 768px)
        flex-direction column
      @media only screen and (min-width: 768px)
        div
          width 50%
          &:first-child
            padding-right 5px
          &:last-child
            padding-left 5px
      h4
        padding-bottom 10px
        @media only screen and (max-width: 768px)
          text-align center
</style>
