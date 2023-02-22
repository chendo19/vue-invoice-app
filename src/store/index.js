import { createStore } from 'vuex'
import { collection, doc, getDocs, getDoc, getFirestore } from 'firebase/firestore'

export default createStore({
  state: {
    invoiceModalFormStatus: false,
    modalConfirmStatus: false,
    invoicesData: [],
    invoicesLoaded: null,
    currentInvoiceArray: null,
    editInvoice: null,
  },
  mutations: {
    TOGGLE_INVOICE_FORM (state) {
      state.invoiceModalFormStatus = !state.invoiceModalFormStatus
    },
    TOGGLE_MODAL_CONFIRM (state) {
      state.modalConfirmStatus = !state.modalConfirmStatus
    },
    SET_INVOICES_DATA (state, payload) {
      state.invoicesData.push(payload)
    },
    INVOICES_LOADED (state) {
      state.invoicesLoaded = true
    },
    SET_CURRENT_INVOICE (state, payload) {
      state.currentInvoiceArray = state.invoicesData.filter(invoice => {
        return invoice.invoiceId === payload
      })
    },
    TOGGLE_EDIT_INVOICE (state) {
      state.editInvoice = !state.editInvoice
    },
  },
  actions: {
    async GET_INVOICES  ({commit, state}) {
      const db = getFirestore()
      const colRef = collection(db, 'invoices')

      try {
          const docsSnap = await getDocs(colRef);
          if(docsSnap.docs.length > 0) {
            docsSnap.forEach(doc => {
              if (!state.invoicesData.some(invoce => invoce.docId === doc.id)) {
                const data = {
                  docId: doc.id,
                  invoiceId: doc.data().invoiceId,
                  billerStreetAddress: doc.data().billerStreetAddress,
                  billerCity: doc.data().billerCity,
                  billerZipCode: doc.data().billerZipCode,
                  billerCountry: doc.data().billerCountry,
                  clientName: doc.data().clientName,
                  clientEmail: doc.data().clientEmail,
                  clientStreetAddress: doc.data().clientStreetAddress,
                  clientCity: doc.data().clientCity,
                  clientZipCode: doc.data().clientZipCode,
                  clientCountry: doc.data().clientCountry,
                  invoiceDateUnix: doc.data().invoiceDateUnix,
                  invoiceDate: doc.data().invoiceDate,
                  paymentTerms: doc.data().paymentTerms,
                  paymentDueDateUnix: doc.data().paymentDueDateUnix,
                  paymentDueDate: doc.data().paymentDueDate,
                  productDescription: doc.data().productDescription,
                  invoiceItemList: doc.data().invoiceItemList,
                  invoiceTotal: doc.data().invoiceTotal,
                  invoicePending: doc.data().invoicePending,
                  invoiceDraft: doc.data().invoiceDraft,
                  invoicePaid: doc.data().invoicePaid,
                }

                commit('SET_INVOICES_DATA', data)
              }
            })
            commit('INVOICES_LOADED')
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
