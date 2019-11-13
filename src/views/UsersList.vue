<template>
    <v-card
        max-width="500"
        class="mx-auto">    
        <v-toolbar color="light-blue" dark>
            <v-toolbar-title>List of users</v-toolbar-title>
        </v-toolbar>
        <v-text-field
            class="search"
            v-model="search"
            placeholder="Search name.."></v-text-field>
        <v-list>
            <v-list-item v-for="(user, index) in filteredList" :key="index">
            <v-list-item-icon>
                <v-icon color="gray" title="Mark as favorite" v-if="!favorites.includes(user.id)" @click="addToFavorite(user.id)">mdi-star</v-icon>
                <v-icon color="pink" title="Remove from favorites" v-else @click="removeFromFavorite(user.id)">mdi-star</v-icon> 
            </v-list-item-icon>
            <v-list-item-content>
                <router-link :to="{ name: 'user', params: { id: user.id }}">
                            {{user.first_name}} {{user.last_name}}
                </router-link>                
            </v-list-item-content>
            <v-list-item-avatar>
                <v-img :src="user.avatar"></v-img>
            </v-list-item-avatar>
            </v-list-item>
        </v-list>           
        <v-btn color="primary" class="btn-margin" :disabled="currentPage < totalPages" @click="updateCurrentPage(currentPage - 1); fetchUsers()">Prev</v-btn>    
        <v-btn color="primary" class="btn-margin" :disabled="currentPage > 1" @click="updateCurrentPage(currentPage + 1); fetchUsers()">Next</v-btn>       
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';
import { User } from '@/interfaces/interface';

@Component({
       computed: {
            ...mapState('UserModule', [
                'currentPage',
                'favorites',
            ]),
        },
        methods: {
            ...mapMutations('UserModule', [
                'updateCurrentPage',
                'removeFromFavorite',
                'addToFavorite',
            ]),
        },
})
export default class UsersList extends Vue {
    private currentPage!: number;

    private users: User[] = [];
    private totalPages = 1;
    private search = '';

    private created() {
        this.fetchUsers();
    }

    private get filteredList() {
      return this.users.filter((user) => {
        return user!.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
               user.last_name.toLowerCase().includes(this.search.toLowerCase()) ||
               user.first_name.concat(' ', user.last_name).toLowerCase().includes(this.search.toLowerCase()) ||
               user.last_name.concat(' ', user.first_name).toLowerCase().includes(this.search.toLowerCase());
      });
    }

    private async fetchUsers() {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${this.currentPage}`);
            this.users = response.data.data;
            this.totalPages = response.data.total_pages;
        } catch (error) {
            throw error;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .btn-margin{
        margin: 20px;
    }
    .search{
        width: 80%;
        margin: auto;
    }
</style>
