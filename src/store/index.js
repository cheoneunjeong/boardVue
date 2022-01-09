import Vue from 'vue'
import Vuex from 'vuex'
import Route from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Userinfo: {User_Id:null, User_Name:null, User_auth:[], User_token:null },
    UserList: [],
   login_err:false,
   login_success:false
  },

  mutations: {
    NewUsers: (state, payload) => {
      state.UserList.push(payload)
      Route.push("/login")
    },
   LoginUser(state, data) {
     state.Userinfo.User_Id = data.username
     state.Userinfo.User_Name = data.name
     state.Userinfo.User_auth = data.authorities
     state.Userinfo.User_token = data.token

     state.login_success = true
     state.login_err = false
     Route.push("/user")
   },
   INSERT_TOKEN(state) {
     state.Userinfo.User_token = localStorage.getItem("token")
   },
   SET_USER_REFRESH(state,data) {
    state.Userinfo.User_Id = data.username
    state.Userinfo.User_Name = data.name
    state.Userinfo.User_auth = data.authorities
    state.Userinfo.User_token = data.token

    state.login_success = true
    state.login_err = false
   },
   Logout: (state) => {
      state.login_err =false
      state.login_success =false
      state.Userinfo =null
      localStorage.removeItem("token")
      console.log(state.Userinfo)
      console.log("로그아웃됐니?"+localStorage.getItem("token"))
      Route.push("/")
    }
  },
  actions: {
   LoginUser({ commit }, payload) {
     console.log(payload)
     return new Promise((resolve, reject) =>
     axios.post('http://localhost:9000/api/auth/signin', payload)
     .then(Response => {
       console.log(Response.data)
       if(Response.data.username != null) {
         axios.defaults.headers.common['Authorization'] = 'Bearer ${Response.data.token}'
         localStorage.setItem("token", Response.data.token)
         commit('LoginUser', Response.data)
        }
     })
     .catch(Error => {
       console.log('error')
       reject(Error)
     })
     
     )
   },
   NewUsers({commit}, payload) {
     console.log(payload)
     return new Promise((resolve, reject) => {
       axios.post('http://localhost:9000/api/auth/signup', payload)
       .then(Response => {
           console.log(Response.data)
           if(Response.data === "success"){
             Route.push("/login")
           }
         })
         .catch(Error => {
           console.log('error')
           reject(Error)
           alert("아이디가 중복")
           Route.push("/signup")
         })
       })
     },
     UnpackToken({commit}) {
       return new Promise((resolve, reject) => {
         axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`    
         axios.get('http://localhost:9000/api/auth/unpackToken')
          .then(Response => {
            console.log(Response.data)
            commit('SET_USER_REFRESH', Response.data)
          })
          .catch(Error => {
            reject(Error)
            console.log('unpackToken_error')
          })
       })
     }
    }
})
