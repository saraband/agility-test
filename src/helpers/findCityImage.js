import axios from 'axios'

const ENGINE_ID = "0e4bd950d3082b678"
const API_KEY = "AIzaSyDmOQF6tsFd3ReB8IM7D2GyMi4yUjLtd1Y"

// Retrieve Images for a specific location and try to find the best-suited one for a background
export async function findCityImage (city) {
  const safeSearch = (city || "").trim().toLowerCase()
  const res = await axios.get(
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${ENGINE_ID}&q=${safeSearch}&searchType=image&imgSize=HUGE`
  )

  // Try to find an image not too big/small that would be suited for a background
  let bestImageItem = null

  for (const item of res.data.items || []) {
    if (item.image.width < 4000) { // Check if not too big
      // Find best quality image within those dimensions
      if (item.image.width > (bestImageItem?.image.width || 0)) {
        bestImageItem = item
      }
    }
  }

  return bestImageItem?.link
}