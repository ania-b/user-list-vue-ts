import Vue from 'vue';
import Vuex from 'vuex';
import UserModule from '@/store/user-module';

Vue.use(Vuex);

let storeFromStorage: object | any = null;
const storage: string | null = localStorage.getItem('favorites');
// Check if the store exists in localStorage
if (storage) {
    storeFromStorage = JSON.parse(storage);
}
export const store = new Vuex.Store({
    state: {
    },
    modules: {
        UserModule,
    },
    mutations: {
        initialiseStoreFromStorage(state) {
            if (storeFromStorage) {
                state.UserModule.favorites = storeFromStorage;
            }
        },
    },
});

store.subscribe((mutation, state) => {
    localStorage.setItem('favorites', JSON.stringify(state.UserModule.favorites));
});

export default store;
