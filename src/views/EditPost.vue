<template>
 <div style="width:80%">
  <v-form>
    <h3>NUM:{{this.$route.query.b_id}} - Edit Page</h3>
          <div>
 <v-file-input v-model="file" @change="onImageChange"></v-file-input>
 <div> 첨부파일 : 
 <v-btn @click="cancel(item)" depressed small v-for="item in this.files" :key="item.name">{{item.name}} X</v-btn>
 </div>            
  </div>
<br>
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
import { mapActions, mapState } from 'vuex'
export default {

     data () {
        return {
            title: '',
            content: '',
            files:[],
            file:null
        }
     },
    methods: {
         ...mapActions(['EditPost','EditPostfile']),

         submit() {

            if(this.files.length !== 0) {
            let formData = new FormData();
            for(let i=0; i<this.files.length; i++) {
                formData.append('file', this.files[i])
            }
            formData.append('title',this.title)
            formData.append('content', this.content)
            formData.append('b_id', this.$route.query.b_id)
            
            this.EditPostfile(formData) 
          }else {
            let Board = {
              title: this.title,
              content: this.content,
              b_id:this.$route.query.b_id
            }
            this.EditPost(Board)
          }
          this.file =null
          this.files = null
         },
       
       onImageChange() {
          if(this.files.indexOf(this.file) === -1) {
          this.files.push(this.file)
          this.file=null
          }
        },
        cancel(item) {
          const p = this.files.indexOf(item)
          this.files.splice(p,1);
        }
     },

}
</script>