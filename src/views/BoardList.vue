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
                    :single-select="singleSelect"
                    item-key="name"
                    show-select
                    class="elevation-1" 
                    @click:row="boardDetail"
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
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  export default {
    data () {
      return {
        search: '',
        singleSelect: true,
        selected: [],
        headers: [
          {
            text: 'NUM',
            align: 'start',
            sortable: true,
            value: 'b_id',
          },
          { text: 'TITLE', value: 'title' },
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
      ...mapActions(["getBoardDetail"]),

      boardDetail(row) {
        this.getBoardDetail(row.b_id)
      }

    },
    created() {
      this.$store.dispatch('getBoardList')
    }
  }
</script>