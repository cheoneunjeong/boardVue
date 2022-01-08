import Vue from 'vue'
import Vuex from 'vuex'
import Route from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Userinfo: {User_Id:null, User_Name:null, User_auth:[] },
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
     Route.push("/user")
   },
    // Login: (state, payload) => {
    //     state.UserList.forEach(user => {
    //         if(user.UserId !== payload.Login_Id) {
    //             state.login_err=true
    //             state.login_success=false
    //         }
    //         else {
    //             if(user.UserPassword !== payload.Login_Password) {
    //               state.login_err=true
    //               state.login_success=false
    //             }
    //             else {
    //               state.login_err=false
    //               state.login_success=true
    //               state.Userinfo=state.UserList.find(c => c.UserId === payload.Login_Id)
    //               Route.push("/user")
    //             }
    //         }
    //     })
    // },
    Logout: (state) => {
      state.login_err =false
      state.login_success =false
      state.Userinfo =null
    }
  },
  actions: {
    // NewUsers: ({ commit }, payload) => {
    //   commit('NewUsers', payload)
    // },
   LoginUser({ commit }, payload) {
     console.log(payload)
     return new Promise((resolve, reject) =>
     axios.post('http://localhost:9000/api/auth/signin', payload)
     .then(Response => {
       console.log(Response.data)
       if(Response.data.username != null) {
         axios.defaults.headers.common['Authorization'] = 'Bearer ${Response.data.token}'
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
         })
       })
     },
    // Login({ commit }, payload) {
    //   commit("Login", payload)
    // },

    Logout({ commit }) {
      commit("Logout")
      Route.push("/")
    }
  },
  modules: {
  }
})
