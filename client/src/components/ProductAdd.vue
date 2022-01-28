<template>
   <ProductForm @onSave="onSave" @onCancel="onCancel" />
</template>

<script>
import { defineComponent, defineAsyncComponent } from 'vue'

import useProduct from 'src/modules/product'

export default defineComponent({
   name: 'ProductAdd',

   components: {
      ProductForm: defineAsyncComponent(() =>
         import('components/ProductForm.vue')
      ),
   },

   setup(_, { emit }) {
      const { addProduct } = useProduct()

      const onSave = async (product) => {
         await addProduct(product)
         emit('hideForm')
      }

      const onCancel = () => {
         emit('hideForm')
      }

      return { onSave, onCancel }
   },
})
</script>

<style lang="sass"></style>
