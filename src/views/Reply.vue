<template>
 <div style="width:80%">
     <h2>{{this.$route.query.b_id}}번 답글</h2>
  <v-form>
    <v-text-field
      label="Title"
      v-model="title"
      single-line
      full-width
      hide-details
    ></v-text-field>
    <v-divider></v-divider>
    <v-textarea
      v-model="content"
      label="content"
      counter
      maxlength="300"
      full-width
      single-line
    ></v-textarea>
    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn router :to="{name:'BoardList'}">
      Back
    </v-btn>
  </v-form>
 </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {

     data () {
        return {
            title: '',
            content: ''
        }
     },

     methods: {
         ...mapActions(['writeReply']),

         submit() {
             let Board = {
                title: this.title,
                content: this.content,
                groups:this.$route.query.groups,
                orders:this.$route.query.orders,
                depth:this.$route.query.depth
             }
             this.writeReply(Board)
         }
     }
}
</script>