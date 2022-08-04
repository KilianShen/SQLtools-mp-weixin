import { createStore } from "vuex";
import systemInfo from "./modules/systemInfo";

const state: IObject = {
    test: 'TESTVAL'
};
const actions = {};
const mutations = {};
const modules = { systemInfo };
const store = createStore({
    state, actions, mutations, modules
})

export default store;