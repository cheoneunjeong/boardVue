<template>
    <v-flex xs12 style="text-align:conter">
        <h1> {{ Userinfo.UserName }} 님 환영합니다. </h1>
    </v-flex>
</template>
<script>
import { mapState } from "vuex"

export default {
    
        computed: {
            ...mapState(["Userinfo"])
        }
}
</script>
