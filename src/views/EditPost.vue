<template>
 <div style="width:80%">
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
         ...mapActions(['EditPost']),

         submit() {
             let Board = {
                title: this.title,
                content: this.content,
                b_id:this.$route.query.b_id
             }
             this.EditPost(Board)
         }
     }
}
</script>