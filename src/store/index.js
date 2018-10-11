import Vue from 'vue';
import vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
Vue.use(vuex);

const state = {
    showLoading: false
};

export default new vuex.Store({
    state,
    getters,
    actions,
    mutations
});
