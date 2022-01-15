<template>
    <v-flex xs12 style="text-align:conter">
        <h1> {{ Userinfo.User_Name }} 님 환영합니다. 
            {{Userinfo.User_auth}} </h1>
        <v-btn 
        v-if="isAdmin === true" depressed
        @click="deleteRoleAdmin">권한취소</v-btn>
        <v-btn 
        v-else depressed
        @click="addRoleAdmin">권한주기</v-btn>
    </v-flex>
</template>
<script>
import { mapActions, mapState } from "vuex"

export default {
    data() {
        return {

        }
    },
        computed: {
             ...mapState(["Userinfo"]),

             isAdmin() {
                 if(this.Userinfo.User_auth.indexOf('ROLE_ADMIN') === -1) {
                     return false
                 } else return true
             }
         },
        methods: {
            ...mapActions(["addRole","deleteRole"]),

            addRoleAdmin(){
                let User= {
                    username: this.Userinfo.User_Id,
                    name: this.Userinfo.User_Name
                }
                this.addRole(User)
            },
            deleteRoleAdmin() {
                this.deleteRole(this.Userinfo.User_Id)
            }
        }
}
</script>
