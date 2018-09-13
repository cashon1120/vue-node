import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '@/view/GoodList'
import Title from "@/view/title"
import Image from "@/view/image"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'GoodList',
      component: GoodList,
      children:[
        {
          path:'title',
          name:'title',
          component:Title
        },
        {
          path:'image',
          name:'image',
          component:Image
        }
      ]
    }
  ]
})
