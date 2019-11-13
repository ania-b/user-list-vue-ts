import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class UserModule extends VuexModule {
    private currentPage: number = 1;
    private favorites: number[] = [];

    @Mutation public updateCurrentPage(val: number) {
        this.currentPage = val;
    }

    @Mutation public addToFavorite(userID: number) {
        if (!this.favorites.includes(userID)) {
            this.favorites.push(userID);
        }
        localStorage.setItem('store', JSON.stringify(this.favorites));
    }

    @Mutation public removeFromFavorite(userID: number) {
        const index = this.favorites.indexOf(userID);
        if (index !== -1) {
            this.favorites.splice(index, 1);
        }
        localStorage.setItem('store', JSON.stringify(this.favorites));
    }

}
