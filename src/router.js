import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/course',
          name: 'course',
          component: () => import('./views/Course.vue')
        },
        {
          path: '/transcript',
          name: 'transcript',
          component: () => import('./views/Transcript.vue')
        },
        {
          path: '/tcourse',
          name: 'tcourse',
          component: () => import('./views/TCourse.vue')
        },
        {
          path: '/grade',
          name: 'grade',
          component: () => import('./views/Grade.vue')
        },
        {
          path: '/fastinput',
          name: 'fastinput',
          component: () => import('./views/FastInput.vue')
        },
        {
          path: '/fastdelete',
          name: 'fastdelete',
          component: () => import('./views/FastDelete.vue')
        },
        {
          path: '/smanage',
          name: 'smanage',
          component: () => import('./views/Smanage.vue')
        },
        {
          path: '/tmanage',
          name: 'tmanage',
          component: () => import('./views/Tmanage.vue')
        },
        {
          path: '/allcourse',
          name: 'allcourse',
          component: () => import('./views/Allcourse.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    }
  ]
})
