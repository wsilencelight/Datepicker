import Vue from 'vue'
import Router from 'vue-router'
import DatePicker from '@/components/DatePicker.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DatePicker',
      component: DatePicker
    }
  ]
})
