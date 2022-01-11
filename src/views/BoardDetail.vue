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
  <v-card
    class="mx-auto"
    width="80%"
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
      tile
       @click="Edit"
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
  </div>
</template>

<script>
import {mapState} from "vuex"
  export default {
    data: () => ({
    
    }),

    computed: {
        ...mapState(["Board"])
    },
    methods: {
        Edit(){
            console.log(this.Board.b_id)
        },
        Delete(){
            console.log("삭제")
        }
    }
  }
</script>
