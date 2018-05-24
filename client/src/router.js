import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import addBook from './views/addBook.vue'
import detailBook from './views/detailBook.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detailbook/:id',
      name: 'detailbook',
      component: detailBook
    },
    {
      path: '/addbook',
      name: 'addbook',
      component: addBook
    }
  ]
})
