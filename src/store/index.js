import Vue from 'vue'
import Vuex from 'vuex'
import Route from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Userinfo: {User_Id:null, User_Name:null, User_auth:[], User_token:null },
    UserList: [],
    BoardList:[],
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
    READ_USER_LIST(state, data) {
        state.UserList= data
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
        state.Userinfo.User_Id = null
        state.Userinfo.User_Name = null
        state.Userinfo.User_auth = null
        state.Userinfo.User_token = null
        state.login_err = false
        state.login_success = false
        localStorage.removeItem("token")
        console.log(state.Userinfo)
        console.log("로그아웃됐니?"+localStorage.getItem("token"))
        Route.push("/")
    },
    WritePost(state, data) {
        state.BoardList = data
    }
  },

  actions: {
  
    LoginUser({ commit }, payload) {
      console.log(payload)
      return new Promise((resolve, reject) =>
      axios.post('http://localhost:9010/api/auth/signin', payload)
      .then(Response => {
        console.log(Response.data)
        if(Response.data.username != null) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ${Response.data.token}'
          localStorage.setItem("token", Response.data.token)
          commit('LoginUser', Response.data)
          }
      })
      .catch(Error => {
        console.log('login_error')
        reject(Error)
        alert("아이디와 비밀번호를 확인해주세요.")
      })
      
      )
    },
    NewUsers({commit}, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:9010/api/auth/signup', payload)
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
        axios.get('http://localhost:9010/api/auth/unpackToken')
          .then(Response => {
            console.log(Response.data)
            commit('SET_USER_REFRESH', Response.data)
          })
          .catch(Error => {
            reject(Error)
            console.log('unpackToken_error')
          })
      })
    },
    admin({commit, state}) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ${state.Userinfo.User_token}'
        axios.get('http://localhost:9010/api/admin/adminPage')
          .then(Response => {
            console.log(Response.data)
            commit('READ_USER_LIST', Response.data)
          })
          .catch(Error => {
            console.log('admin_error')
            Route.push("/")
          })
      })
    },
    addRole({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios.defaults.headers.common['Authorization'] = 'Bearer ${state.Userinfo.User_token}'
        axios.post('http://localhost:9010/api/test/addRole', payload)
        .then(Response => {
            console.log(Response.data)
            if(Response.data === "success"){
              alert("관리자 권한이 추가되었습니다.")
            }
          })
          .catch(Error => {
            console.log('addRole_error')
            reject(Error)
          })
        })
      },

    WritePost({commit, state}, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ${Response.data.token}'
        axios.post('http://localhost:9010/api/auth/board', payload)
        .then(Response => {
            console.log(Response.data)
            if(Response.data === "success"){
              Route.push("/boardlist")
            }
          })
          .catch(Error => {
            console.log('post_error')
            reject(Error)
          })
      })
    },

  }
})