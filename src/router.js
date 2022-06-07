import { createRouter, createWebHistory } from 'vue-router'
import ForecastView from './views/ForecastView/ForecastView'
import LocationSearchView from './views/LocationSearchView/LocationSearchView'

const routeInfos = [
  {
    path : "/",
    component : LocationSearchView,
  },
  {
    path : "/forecast",
    component : ForecastView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: LocationSearchView
  },
]

const router = createRouter({
  history : createWebHistory(),
  routes : routeInfos
})

export default router;