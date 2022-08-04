const systemInfo = {
    namespaced: true,
    state: {
        systemInfoVal: {}
    },
    mutations: {
        SET_VALUE: (state: IObject, val: IObject): void => {
            state.systemInfoVal = val;
        },
    },
    actions: {},
    getters: {},
};

export default systemInfo;