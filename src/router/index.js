import Vue from 'vue'
import Router from 'vue-router'
import HPHome from '@/components/home/HPHome'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import MyProfile from '@/components/contents/MyProfile'
import MyPet from '@/components/contents/MyPet'
import EditProfile from '@/components/contents/EditProfile'
import EditPet from '@/components/contents/EditPet'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/Home',
      name: 'HPHome',
      component: HPHome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/myprofile/:id',
      name: 'MyProfile',
      component: MyProfile
    },
    {
      path: '/mypet/:id',
      name: 'MyPet',
      component: MyPet
    },
    {
      path: '/editprofile/:id',
      name: 'EditProfile',
      component: EditProfile
    },
    {
      path: '/editpet/:id',
      name: 'EditPet',
      component: EditPet
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.requiresAuth)) {
     let user = firebase.auth().currentUser
     if(user) {
       //if user signed in
       next()
     } else {
       //not signed in, redirect
       next({name: 'Login'})
     }
  } else {
    next()
  }
})

export default router