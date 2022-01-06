import Vue from 'vue'
import Vuex from 'vuex'
import Route from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Userinfo:null,
    UserList: [
      {UserId:'aaa', UserPassword:'aaa', UserName:'aaa', UserPhone:'123456789'}
   ],
   login_err:false,
   login_success:false
  },

  mutations: {
    NewUsers: (state, payload) => {
      state.UserList.push(payload)
      Route.push("/login")
    },
   
    Login: (state, payload) => {
        state.UserList.forEach(user => {
            if(user.UserId !== payload.Login_Id) {
                state.login_err=true
                state.login_success=false
            }
            else {
                if(user.UserPassword !== payload.Login_Password) {
                  state.login_err=true
                  state.login_success=false
                }
                else {
                  state.login_err=false
                  state.login_success=true
                  state.Userinfo=state.UserList.find(c => c.UserId === payload.Login_Id)
                  Route.push("/user")
                }
            }
        })
    },
    Logout: (state) => {
      state.login_err =false
      state.login_success =false
      state.Userinfo =null
    }
  },
  actions: {
    NewUsers: ({ commit }, payload) => {
      commit('NewUsers', payload)
    },
   
    Login({ commit }, payload) {
      commit("Login", payload)
    },

    Logout({ commit }) {
      commit("Logout")
      Route.push("/")
    }


  },
  modules: {
  }
})
