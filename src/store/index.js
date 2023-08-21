import { createStore } from 'vuex'
import { collection, doc, getDocs, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firabaseInit'
import { watch } from 'vue'

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
    DELETE_INVOICE (state, payload) {
      state.invoicesData = state.invoicesData.filter(invoice => {
        return invoice.docId !== payload
      })
    },
    UPDATE_STATUS_TO_PAID (state, payload) {
      state.invoicesData.forEach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true
          invoice.invoicePending = false
        }
      })
    },
    UPDATE_STATUS_TO_PENDING (state, payload) {
      state.invoicesData.forEach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = false
          invoice.invoicePending = true
          invoice.invoiceDraft = false
        }
      })
    }
  },
  actions: {
    // ACTIONS DON'T MAKE CHANGES IN THE STORE, ONLY THE MUTATIONS
    async UPDATE_STATUS_TO_PAID ({commit}, docId) {
      const docRef = doc(db, 'invoices', docId);

      try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
          await updateDoc(docRef, {
            invoicePaid: true,
            invoicePending: false,
          })
          commit('UPDATE_STATUS_TO_PAID', docId)
        } else {
            console.log('Document does not exist')
        }
      } catch(error) {
          console.log(error)
      }
    },
    async UPDATE_STATUS_TO_PENDING ({commit}, docId) {
      const docRef = doc(db, 'invoices', docId);

      try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
          await updateDoc(docRef, {
            invoicePaid: false,
            invoicePending: true,
            invoiceDraft: false,
          })
          commit('UPDATE_STATUS_TO_PENDING', docId)
        } else {
            console.log('Document does not exist')
        }
      } catch(error) {
          console.log(error)
      }
    },
    async DELETE_INVOICE ({commit}, docId) {
      const docRef = doc(db, 'invoices', docId)

      try {
        await deleteDoc(docRef)
        commit('DELETE_INVOICE', docId)
      } catch(error) {
          console.log('Error while deleting the doc: ', error)
      }
    },
    async UPDATE_INVOICE ({commit, dispatch}, {docId, routeId}) {
      commit('DELETE_INVOICE', docId)
      await dispatch('GET_INVOICES')
      commit('TOGGLE_INVOICE_FORM')
      commit('TOGGLE_EDIT_INVOICE')
      commit('SET_CURRENT_INVOICE', routeId)
    },
    async GET_INVOICES  ({commit, state}) {
      const colRef = collection(db, 'invoices')

      try {
          const docsSnap = await getDocs(colRef)
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
          console.log(error)
      }      
    },
    async GET_SINGLE_INVOICE  () {
      const docRef = doc(db, 'invoices', '8AGiXBbNm2IGQDqeUEIt')

      try {
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()) {
            console.log('The Document data is:', docSnap.data())
        } else {
            console.log('Document does not exist')
        }
      } catch(error) {
          console.log(error)
      }
    }
  },
})
