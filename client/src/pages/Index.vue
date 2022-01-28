<template>
   <q-page padding>
      <div class="column q-gutter-y-lg">
         <div>
            <q-btn
               color="primary"
               icon="add"
               label="New Product"
               no-caps
               @click="onAdd"
            />
         </div>

         <q-list separator>
            <q-item v-for="p in products" :key="p.id">
               <q-item-section>
                  <q-item-label>{{ p.name }}</q-item-label>
               </q-item-section>
               <q-item-section>
                  <q-item-label caption>{{ p.description }}</q-item-label>
               </q-item-section>
               <q-item-section>
                  <div class="row q-gutter-x-xs">
                     <q-btn icon="edit" @click="onUpdate(p.id)" />
                     <q-btn icon="delete" @click="onDelete(p.id)" />
                  </div>
               </q-item-section>
            </q-item>
         </q-list>

         <ProductAdd v-if="showAddForm" @hideForm="showAddForm = false" />

         <ProductEdit v-if="showEditForm" @hideForm="showEditForm = false" />
      </div>
   </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, onMounted, ref } from 'vue'

import useProduct from 'src/modules/product'

export default defineComponent({
   name: 'Index',

   components: {
      ProductAdd: defineAsyncComponent(() =>
         import('components/ProductAdd.vue')
      ),
      ProductEdit: defineAsyncComponent(() =>
         import('components/ProductEdit.vue')
      ),
   },

   setup() {
      const { products, loadProduct, loadProducts, deleteProduct } =
         useProduct()
      const showAddForm = ref(false)
      const showEditForm = ref(false)

      onMounted(async () => {
         await loadProducts()
      })

      const onAdd = () => {
         showAddForm.value = true
      }

      const onUpdate = async (id) => {
         await loadProduct(id)
         showEditForm.value = true
      }

      const onDelete = async (id) => {
         await deleteProduct(id)
      }

      return {
         products,
         showAddForm,
         showEditForm,
         onAdd,
         onUpdate,
         onDelete,
      }
   },
})
</script>
