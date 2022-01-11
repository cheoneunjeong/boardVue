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
            MEMBER list
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-card>
        <v-simple-table
           fixed-header
           height="400px"
         >
         <template>  
          <v-container>
            <v-text-field 
            v-model="search" 
            label="Please enter your keyword(s) to search."
            single-line></v-text-field>
            <v-data-table
                    :headers="headers"
                    :items="UserList"
                    :items-per-page="5"
                    :search="search"
            >
            </v-data-table>
          </v-container>
        </template>
       </v-simple-table>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import {mapState} from "vuex"

   export default {
    name: 'App',
    data: () => ({
      search: '',
      headers: [
        { text: 'ID', value: 'username' },
        { text: 'Name', value: 'name' },
        { text: 'Phone', value: 'phone' },
      ]
    }),

     computed: {
       ...mapState(["UserList"])
     },
    created() {
      this.$store.dispatch('admin')
    }
  };
</script>