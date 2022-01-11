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
    Board: {b_id:null, title:null, content:null, writer:null, datetime:null, hit:null},
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
      state.Userinfo.User_auth = data.roles
      state.Userinfo.User_token = data.token

      state.login_success = true
      state.login_err = false
      console.log(state.Userinfo)
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
      //state.Userinfo.User_token = data.token

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
    GET_BOARDLIST(state, data) {
      state.BoardList = data
    },
    GET_BOARDDETAIL(state, data) {
      state.Board.b_id = data.b_id
      state.Board.title = data.title
      state.Board.content = data.content
      state.Board.writer = data.writer
      state.Board.datetime = data.datetime
      state.Board.hit = data.hit
    },
  },

  actions: {
  
    LoginUser({ commit }, payload) {
      return new Promise((resolve, reject) =>
      axios.post('http://localhost:9010/api/public/signin', payload)
      .then(Response => {
        console.log(Response.data)
        if(Response.data.username != null) {
          console.log("토큰="+Response.data.token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${Response.data.token}`
          localStorage.setItem("token", Response.data.token)
          console.log("로컬토큰="+localStorage.getItem("token"))
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
        axios.post('http://localhost:9010/api/public/signup', payload)
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
        axios.get('http://localhost:9010/api/public/unpackToken')
          .then(Response => {
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
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.Userinfo.User_token}`
        axios.get('http://localhost:9010/api/admin/adminPage')
          .then(Response => {
            commit('READ_USER_LIST', Response.data)
          })
          .catch(Error => {
            console.log('admin_error')
            alert("관리자 권한을 추가해주세요.")
            Route.push("/")
          })
      })
    },
    addRole({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        console.log("payload="+payload)
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.Userinfo.User_token}`
        axios.post('http://localhost:9010/api/auth/addRole', payload)
        .then(Response => {
            console.log(Response.data)
              commit('SET_USER_REFRESH',Response.data)
              alert("관리자 권한이 추가되었습니다.")
          })
          .catch(Error => {
            console.log('addRole_error')
            reject(Error)
          })
        })
      },

    WritePost({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.Userinfo.User_token}`
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

    getBoardList({commit, state}) {
      return new Promise((resolve, reject) => {
        //axios.defaults.headers.common['Authorization'] = `Bearer ${state.Userinfo.User_token}`
        axios.get('http://localhost:9010/api/public/boardlist')
          .then(Response => {
            commit('GET_BOARDLIST', Response.data)
          })
          .catch(Error => {
            console.log('getboardlist_error')
          })
      })
    },
    getBoardDetail({commit, state}, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        axios.get('http://localhost:9010/api/public/boardDetail',{params: {b_id: payload}})
        .then(Response => {
          console.log(Response.data)
          commit('GET_BOARDDETAIL', Response.data)
          Route.push("/BoardDetail")
        })
        .catch(Error => {
          console.log('detialView_error')
        })
      })
    },

  }
})