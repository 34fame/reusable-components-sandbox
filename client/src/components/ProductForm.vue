<template>
   <div class="column q-gutter-y-md">
      <q-separator />
      <span class="text-h6">Product</span>
      <q-form class="q-gutter-md">
         <q-input label="Name" outlined stack-label v-model="product.name" />
         <q-input
            label="Description"
            outlined
            stack-label
            v-model="product.description"
         />
         <q-btn color="primary" label="Save" no-caps @click="onSave" />
         <q-btn flat label="Cancel" no-caps @click="onCancel" />
      </q-form>
   </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'

export default defineComponent({
   name: 'ProductForm',

   props: ['data'],

   setup(props, { emit }) {
      const product = reactive({
         name: '',
         description: '',
      })

      onMounted(() => {
         if (props.data) {
            product.id = props.data.id
            product.name = props.data.name
            product.description = props.data.description
         }
      })

      const onSave = () => {
         emit('onSave', product)
      }

      const onCancel = () => {
         emit('onCancel')
      }

      return { product, onSave, onCancel }
   },
})
</script>

<style lang="sass"></style>
