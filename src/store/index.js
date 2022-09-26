import { createStore } from 'vuex'
import { collection, doc, getDocs, getDoc, getFirestore } from 'firebase/firestore'

export default createStore({
  state: {
    invoiceModalStatus: false,
    modalActive: false,
    invoicesData: []
  },
  mutations: {
    TOGGLE_INVOICE (state) {
      state.invoiceModalStatus = !state.invoiceModalStatus
    },
    TOGGLE_MODAL (state) {
      state.modalActive = !state.modalActive
    }
  },
  actions: {
    async GET_INVOICES  () {
      const db = getFirestore()
      const colRef = collection(db, 'invoices')

      try {
          const docsSnap = await getDocs(colRef);
          if(docsSnap.docs.length > 0) {
            docsSnap.forEach(doc => {
              console.log(doc.id)
              console.log(doc.data())
            })
          }
      } catch (error) {
          console.log(error);
      }      
    },
    async GET_SINGLE_INVOICE  () {
      const db = getFirestore()
      const docRef = doc(db, 'invoices', '8AGiXBbNm2IGQDqeUEIt');

      try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            console.log('The Document data is:', docSnap.data());
        } else {
            console.log('Document does not exist')
        }
      } catch(error) {
          console.log(error)
      }
    }
  },
  modules: {
  }
})
