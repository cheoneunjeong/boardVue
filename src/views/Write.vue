<template>
 <div style="width:80%">
  <v-form>
      <div>
<v-file-input class="input" type="file" counter show-size label="이미지 제출(여러개 가능)"
              outlined dense multiple prepend-icon="mdi-camera" style="width: 400px; margin-left: 100px;"
              @change="onImageChange"/>
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
import {mapActions} from 'vuex'

const formData = new FormData();

  export default {
    data () {
      return {
        title: '',
        content: '',
        imagecnt:0,
      }
    },

    methods: {
        ...mapActions(['WritePost','uploadfile']),
        
        submit() {
            let Board = {
                title: this.title,
                content: this.content,
            }
            this.WritePost(Board) 
            this.uploadfile(formData)
        },
        onImageChange(file){
          if(!file) {
            return;
          }
          file.forEach((item)=> {
            formData.append('files', item)
          })
        }
    }
  }
</script>