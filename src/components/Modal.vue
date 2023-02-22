<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exit? your changes will be lost</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Return</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'modal',
    methods: {
      ...mapMutations(['TOGGLE_INVOICE_FORM', 'TOGGLE_MODAL_CONFIRM', 'TOGGLE_EDIT_INVOICE']),
      closeModal () {
        this.TOGGLE_MODAL_CONFIRM()
      },
      closeInvoice () {
        this.TOGGLE_MODAL_CONFIRM()
        this.TOGGLE_INVOICE_FORM()
        if (this.editInvoice) {
          this.TOGGLE_EDIT_INVOICE()
        }
      }
    },
    computed: {
      ...mapState(['editInvoice'])
    },
}
</script>

<style lang="scss" scoped>
.modal {
  z-index: 12;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;
    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>