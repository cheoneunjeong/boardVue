<template>
    <v-flex xs12 style="text-align:conter">
        <h1> {{ user.User_Name }} 님 환영합니다. </h1>
        <v-btn @click="addRoleAdmin">권한주기</v-btn>
    </v-flex>
</template>
<script>
import { mapActions, mapState } from "vuex"

export default {
    data() {
        return {
            user:this.$store.state.Userinfo

        }
    },
        // computed: {
        //     ...mapState(["Userinfo"])
        // },
        methods: {
            ...mapActions(["addRole"]),

             addRoleAdmin() {

                this.addRole(this.$store.state.Userinfo.User_Name)
                console.log("pram="+this.$store.state.Userinfo.User_Name)
            }
        }
}
</script>
