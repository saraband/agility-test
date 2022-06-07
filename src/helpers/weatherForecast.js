import axios from 'axios'
import { uniqBy } from 'lodash'

const BASE_URL = 'https://api.openweathermap.org'
const API_KEY = 'db988691faf182dfc3750cd1e57f3718'

// Retrieve locations to autocomplete search
export async function fetchLocationsByName (search) {
  const safeSearch = (search || "").trim().toLowerCase()
  const res = await axios.get(`${BASE_URL}/geo/1.0/direct?q=${safeSearch}&limit=5&appid=${API_KEY}`)

  return uniqBy(res.data, (result) => `${result.lat}, ${result.lon}`)
}

// Retrieve forecast data for a specific location
export async function fetchLocationData (location) {
  if (!location.lat || !location.lon) {
    return
  }

  const res = await axios.get(`${BASE_URL}/data/2.5/onecall?units=metric&lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`)
  return res.data
}