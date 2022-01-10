<template>
    <v-flex xs12 style="text-align:conter">
        <h1> {{ Userinfo.User_Name }} 님 환영합니다. </h1>
        <v-btn @click="addRole(Userinfo)">권한주기</v-btn>
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
            ...mapActions(["addRole"]),

        }    
}
</script>
