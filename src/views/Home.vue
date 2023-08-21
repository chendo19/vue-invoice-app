<template>
  <div class="home container">
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Invoices</h1>
        <span>There are {{ filteredData.length }} total invoices</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span>Filter by status <span v-if="filteredInvoice">: {{ filteredInvoice }}</span></span>
          <img src="@/assets/icon-arrow-down.svg" alt="">
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filterInvoices('draft')">Draft</li>
            <li @click="filterInvoices('pending')">Pending</li>
            <li @click="filterInvoices('paid')">Paid</li>
            <li @click="filterInvoices('clear')">Clear Filter</li>
          </ul>
        </div>
        <div @click="newInvoice" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="icon">
          </div>
          <span>New invoice</span>
        </div>
      </div>
    </div>
    <div v-if="filteredData.length > 0">
      <invoice v-for="(invoice, index) in filteredData"
        :invoice="invoice"
        :key="index"
      />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="empty img"> 
    </div>
  </div>
</template>

<script>
import Invoice from '@/components/Invoice.vue'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  name: "Home",
  components: {
    Invoice
  },
  setup() {
    const store = useStore()
    const filterMenu = ref(null)
    const filteredInvoice = ref(null)

    const toggleInvoiceForm = () => store.commit('TOGGLE_INVOICE_FORM')
    const filteredData = computed(() => {
      return store.state.invoicesData.filter(invoice => {
        if (filteredInvoice.value === 'draft') {
          return invoice.invoiceDraft === true
        }
        if (filteredInvoice.value === 'pending') {
          return invoice.invoicePending === true
        }
        if (filteredInvoice.value === 'paid') {
          return invoice.invoicePaid === true
        }

        return invoice
      })
    })

    const filterInvoices = (type) =>  {
      if (type === 'clear') {
        filteredInvoice.value = null
        return
      }

      filteredInvoice.value = type
    }

    const newInvoice = () =>  {
      toggleInvoiceForm()
    }

    const toggleFilterMenu = () => {
      filterMenu.value = !filterMenu.value 
    }

    return {
      filteredInvoice,
      filterInvoices,
      newInvoice,
      toggleFilterMenu,
      filterMenu,
      filteredData
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    color: #fff;

    .header {
      margin-bottom: 65px;

      .left,
      .right {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
        align-items: center;

        .button,
        .filter {
          align-items: center;

          span {
            font-size: 12px;
          }
        }

        .filter {
          position: relative;
          cursor: pointer;
          margin-right: 40px;

          img {
            margin-left: 12px;
            width: 9px;
            height: 5px;
          }

          .filter-menu {
            width: 120px;
            position: absolute;
            top: 25px;
            list-style: none;
            background-color: #1e2139;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

            li {
              cursor: pointer;
              font-size: 12px;
              padding: 10px 20px;

              &:hover {
                color: #1e2139;
                background-color: #fff;
              }
            }
          }
        }

        .button {
           padding: 8px 10px;
           background-color: #7c5dfa;
           border-radius: 40px;

           .inner-button {
             margin-right: 8px;
             border-radius: 50%;
             padding: 8px;
             align-items: center;
             background-color: #fff;

             img {
               width: 10px;
               height: 10px;
             }
           }
        }
      }
    }

    .empty {
      margin-top: 160px;
      align-items: center;
      img {
        width: 214px;
        height: 200px;
      }
      h3 {
        font-size: 20px;
        margin-top: 40px;
      }
      p {
        text-align: center;
        max-width: 224px;
        font-size: 12px;
        font-weight: 300;
        margin-top: 16px;
      }
    }
  }
</style>