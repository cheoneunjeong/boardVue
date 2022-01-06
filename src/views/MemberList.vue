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
                    :items="contents"
                    :items-per-page="5"
                    :search="search"
            ></v-data-table>
          </v-container>
        </template>
       </v-simple-table>
    </v-flex>
  </v-layout>
</v-container>



</template>

<script>
   export default {
    name: 'App',
    data: () => ({
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Food', value: 'food' },
      ],
      contents: [
        { id: 1, name: 'ABC', food: 'pizza' },
        { id: 2, name: 'DEF', food: 'chicken' },
        { id: 3, name: 'GHI', food: 'hamburger' },
      ]
    })
  };
</script>