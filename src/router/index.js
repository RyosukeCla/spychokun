import Vue from 'vue'
import Router from 'vue-router'
import TimerView from '@/components/TimerView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Play',
      component: TimerView
    }
  ]
})
