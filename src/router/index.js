import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import BoardList from '../views/BoardList.vue'
import SignUp from '../views/SignUp.vue'
import MemberList from '../views/MemberList.vue'
import User from '../views/User.vue'
import Write from '../views/Write.vue'
import BoardDetail from '../views/BoardDetail'
import EditPost from '../views/EditPost'
import store from '../store'

Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if(store.state.login_success === true) {
    alert("이미 로그인을 하였습니다.")
    next("/")
  } else {
    next()
  }
}

const onlyAuthUser = (to, from, next) => {
  if(store.state.login_success === true) {
    next()
  } else {
    alert("로그인이 필요합니다.")
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: rejectAuthUser,
    component: Login
  },
  {
    path: '/boardlist',
    name: 'BoardList',
    component: BoardList
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/memberlist',
    name: 'MemberList',
    component: MemberList
  },
  {
    path: '/user',
    name: 'User',
    beforeEnter: onlyAuthUser,
    component: User
  },
  {
    path: '/write',
    name: 'Write',
    beforeEnter: onlyAuthUser,
    component: Write
  },
  {
    path: '/boardDetail',
    name: 'BoardDetail',
    component: BoardDetail
  }
  ,
  {
    path: '/editPost',
    name: 'EditPost',
    component: EditPost
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
