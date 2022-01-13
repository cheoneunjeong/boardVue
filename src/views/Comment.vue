<template>
  <div>
    <br>
    <v-toolbar
    flat
    >
    <v-toolbar-title>
        {{b_id}} Comment  
    </v-toolbar-title>
    <v-spacer></v-spacer>
    </v-toolbar>
    <v-banner
      v-model="v0"
      single-line
      transition="slide-y-transition"
    >
     <v-col
        cols="12"
        sm="70"
      >
        <v-textarea
          class="mx-2"
          label="prepend-icon"
          rows="1"
          prepend-icon="mdi-comment"
          v-model="content"
        ></v-textarea>
      </v-col>
      <template v-slot:actions="{}">
        <v-btn
          text
          @click="createComment"
        >
          post
        </v-btn>
      </template>
    </v-banner>
    <br>
    <div
    v-for="item in CommentList" :key="item.c_id">
      <CommentList :item='item'/>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import CommentList from '@/views/CommentList.vue'

  export default {
    name: 'Comment',

    components :{
      CommentList
    },
    props: {
      b_id: Number,
    },
     data: () => ({
        v0: true,
       subCommentCreateToggle:false,
       content:null,
    }),
    computed: {
      ...mapState(["CommentList"])
    },
    methods: {
      ...mapActions(["getCommentList", "newComment", "getBoardDetail"]),
      subCommentToggle() {
        this.subCommentCreateToggle = !this.subCommentCreateToggle
      },
      createComment() {
        let comment={
          bid:this.b_id,
          content: this.content
        }
        this.newComment(comment)
        this.content = null
      },

   },
   created() {
     this.getCommentList(this.b_id)
   }
  }
</script>
