<template>
    <v-container style="width:80%">
    <v-layout>
        <v-flex xs12>
            <v-card>
                <v-toolbar
                color="primary"
                dark
                flat
                >
                <v-toolbar-title>
                    Board list  
                </v-toolbar-title>
                <v-spacer></v-spacer>
                      <v-btn
                      class="mx-2"
                      dark
                      small
                      depressed
                      color="cyan"
                      router :to="{name:'Write'}"
                    >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card>
            <v-text-field
            label="Please enter your keyword(s) to search." 
            v-model="search" 
            single-line></v-text-field>
            <v-simple-table
            fixed-header
            :items-per-page="5"
            >
                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="BoardList"
                    :search="search"
                    item-key="b_id"
                    class="elevation-1" 
                    @click:row="boardDetail"
                  :single-select="singleSelect"
                  show-select

                >
                   <template v-slot:top>
                  <v-switch
                    v-model="singleSelect"
                    label="Single select"
                    class="pa-3"
                  ></v-switch>
                </template>
                </v-data-table>
            </v-simple-table>
        </v-flex>
    </v-layout>
    <v-col cols="12" align="right">
            <v-btn depressed @click="Delete">delete</v-btn>
          </v-col>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  export default {
    data () {
      return {
        selectedB_id: [],
        search: '',
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'NUM',
            align: 'start',
            sortable: true,
            value: 'b_id',
          },
          { text: 'TITLE', value: 'con' },
          { text: 'WRITER', value: 'writer' },
          { text: 'DATETIME', value: 'datetime' },
          { text: 'HIT', value: 'hit' },
        ],
        
      }
    },

    computed: {
      ...mapState(["BoardList"])
    },
    methods: {
      ...mapActions(["getBoardDetail", "DeleteSelectedPost"]),

      boardDetail(row) {
        this.getBoardDetail(row.b_id)
      },
      Delete() {
        //this.DeleteSelectedPost(this.selected)
        //console.log(this.selected[0].b_id)
        for(let i=0; i<this.selected.length; i++) {
         // console.log(this.selected[i].b_id)
         this.selectedB_id.push(this.selected[i].b_id)
        }
        let Board = {
          b_id:  this.selectedB_id
        }
        this.DeleteSelectedPost(Board)
      }

    },
    created() {
      this.$store.dispatch('getBoardList')
    }
  }
</script>