<template>
    <v-app>   
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>  
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '@/store/index';

@Component
export default class App extends Vue {
    private mounted() {
        store.commit('initialiseStoreFromStorage');
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}
</style>
