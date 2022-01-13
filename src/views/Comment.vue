<template>
  <div>
    <br>
    <v-toolbar
    flat
    >
    <v-toolbar-title>
        Comment  
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
        ></v-textarea>
      </v-col>
      <template v-slot:actions="{ dismiss }">
        <v-btn
          text
          @click="dismiss"
        >
          post
        </v-btn>
      </template>
    </v-banner>
    <br>
 <v-card
    class="mx-auto"
    max-width="100%"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Single-line item</v-list-item-title>
      </v-list-item-content>
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
        <v-btn
        icon
      >
        <v-icon>mdi-minus-circle</v-icon>
      </v-btn>
    </v-list-item>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </div>
</template>

<script>
  export default {
    name: 'Comment',

     data: () => ({

        v0: true,
        show: false,
    }),

  }
</script>
