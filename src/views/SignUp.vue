<template>
    <v-container style="max-width:500px">
        <v-layout>
            <v-flex xs12>
                <v-card class="elevation-12">
                    <v-toolbar
                        color="primary"
                        dark
                        flat
                    >
                    <v-toolbar-title>
                        Sign Up
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                            label="Id"
                            name="UserId"
                            prepend-icon="mdi-account"
                            v-model="UserId"
                            type="text"
                            ></v-text-field>

                            <v-text-field
                            id="UserPassword"
                            label="Password"
                            name="UserPassword"
                            prepend-icon="mdi-lock"
                            v-model="UserPassword"
                            type="password"
                            ></v-text-field>

                            <v-text-field
                            id="UserName"
                            label="Name"
                            name="UserName"
                            prepend-icon="mdi-card-account-details"
                            v-model="UserName"
                            type="text"
                            ></v-text-field>

                            <v-text-field
                            id="UserPhone"
                            label="Phone"
                            name="UserPhone"
                            prepend-icon="mdi-phone"
                            v-model="UserPhone"
                            type="number"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="SignUp">Sign Up</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            UserId:null,
            UserPassword:null,
            UserName:null,
            UserPhone:null
        }
    },
    methods : {
        ...mapActions(['NewUsers']),

        SignUp() {
            let Users = {
                username: this.UserId,
                password: this.UserPassword,
                name: this.UserName,
                phone: this.UserPhone
            }
             this.NewUsers(Users)
            
        }
    }
}
</script>