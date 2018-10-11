import * as types from './mutations-types';

export default {
    showLoading({ commit }, loadingFlag) {
        commit(types.SHOW_LOADING, loadingFlag);
    }
};
