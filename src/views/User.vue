<template>
    <v-card
        class="mx-auto"
        max-width="434"
        tile>
        <v-toolbar color="light-blue" dark>
            <v-toolbar-title>User Details</v-toolbar-title>
        </v-toolbar>
        <v-row
            align="end"
            class="fill-height">
            <v-col
                align-self="start"
                class="pa-0"
                cols="12">
                <v-avatar
                    class="profile"
                    color="grey"
                    size="164"
                    tile>
                    <v-img :src="user.avatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col class="py-0">
                <v-list-item
                    color="rgba(0, 0, 0, .4)"
                    light>
                    <v-list-item-content color="grey">
                        <v-list-item-icon class="icon-position">
                            <v-icon color="gray" title="Mark as favorite" v-if="!favorites.includes(user.id)" @click="addToFavorite(user.id)">mdi-star</v-icon>
                            <v-icon color="pink" title="Remove from favorites" v-else @click="removeFromFavorite(user.id)">mdi-star</v-icon> 
                        </v-list-item-icon>
                        <v-list-item-title class="title">{{user.first_name}}</v-list-item-title>
                        <v-list-item-subtitle>{{user.last_name}}</v-list-item-subtitle>
                        <v-list-item-subtitle> <a :href="'mailto:' + user.email">{{user.email}}</a></v-list-item-subtitle>                        
                    </v-list-item-content>
                </v-list-item>
                <v-btn color="primary" class="btn-margin" @click="$router.push({path: '/'})">Back</v-btn>   
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';

@Component({
       computed: {
            ...mapState('UserModule', [
                'favorites',
            ]),
        },
        methods: {
            ...mapMutations('UserModule', [
                'removeFromFavorite',
                'addToFavorite',
            ]),
        },
})
export default class User extends Vue {
    private user = {};

    private created() {
        this.fetchUser();
    }

    private async fetchUser() {
        try {
            const response = await axios.get(`https://reqres.in/api/users/${this.$route.params.id}`);
            this.user = response.data.data;
        } catch (error) {
            throw error;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .icon-position{
        display: inline-block;
    }
    .btn-margin{
        margin: 30px;
    }
    .profile{
        margin: 20px 0;
    }
</style>
