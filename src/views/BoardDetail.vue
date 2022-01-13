<template>
<div style="width:100%">
    <v-btn 
    router :to="{name:'BoardList'}">
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>
         Back
    </v-btn>
    <v-spacer></v-spacer>
    <br>
  <v-card
    class="mx-auto"
    width="100%"
    height="400"
  >
    <v-card-text>
      <p style="text-align:right">hit: {{Board.hit}}</p>
      <p>{{Board.datetime}}</p>
      <p class="text-h4 text--primary">
        {{Board.title}}
      </p>
      <p>writer: {{Board.writer}} </p>
      <div class="text--primary">
        {{Board.content}}<br>
       
      </div>
    </v-card-text>
  </v-card>
  <br>
      <v-btn
      class="mr-4"
      router :to="{name:'Reply', query: {b_id: Board.b_id, groups: Board.groups, orders: Board.orders, depth: Board.depth}}"
    >
        <v-icon
          dark
          left
        >
          mdi-email
        </v-icon>
      Reply
    </v-btn>
     <v-btn
      tile
      router :to="{name:'EditPost', query: {b_id: Board.b_id}}"
    >
      <v-icon left>
        mdi-pencil
      </v-icon>
      Edit
    </v-btn>
    <v-btn
      class="mr-4"
      @click="Delete"
    >
        <v-icon
          dark
          left
        >
          mdi-delete
        </v-icon>
      delete
    </v-btn>
    <br>
    <div>
      <Comment :b_id='Board.b_id' />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
import Comment from './Comment.vue'

  export default {
    data: () => ({
      
    }),

    components: {
      Comment
    },

    computed: {
        ...mapState(["Board", "Userinfo"])
    },
    methods: {
      ...mapActions(['EditPost', 'DeletePost']),

        Delete(){
          this.DeletePost(this.Board.b_id)
        }
    }
  }
</script>
