import { createStore } from 'vuex'

export default createStore({
  state: {
    invoiceModalStatus: null,
  },
  mutations: {
    TOGGLE_INVOICE (state) {
      state.invoiceModalStatus = !state.invoiceModalStatus
    }
  },
  actions: {
  },
  modules: {
  }
})
