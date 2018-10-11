import * as types from './mutations-types';

export default {
    [types.SHOW_LOADING](state, flag) {
        state.showLoading = flag;
    }
};
