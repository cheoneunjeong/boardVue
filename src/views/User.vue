<template>
    <v-flex xs12 style="text-align:conter">
        <h1> {{ Userinfo.User_Name }} 님 환영합니다. </h1>
        <v-btn 
        v-if="Userinfo.User_auth.indexOf('ROLE_ADMIN') === -1"
        @click="addRoleAdmin">권한주기</v-btn>
        <v-btn
         v-else
         @click="deleteRoleAdmin"
        >관리자권한 취소</v-btn>
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
             ...mapState(["Userinfo"])
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
