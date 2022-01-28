import { inject, reactive, toRefs } from 'vue'
import {
   collection,
   doc,
   addDoc,
   deleteDoc,
   getDoc,
   getDocs,
   updateDoc,
   query,
   orderBy,
   where,
} from 'firebase/firestore'

const state = reactive({
   products: [],
   product: {},
})

export default function useProduct() {
   const db = inject('db')

   const collectionRef = collection(db, 'products')

   const loadProduct = async (id) => {
      try {
         const docRef = doc(db, 'products', id)
         const snapshot = await getDoc(docRef)
         const result = {
            id: snapshot.id,
            ...snapshot.data(),
         }
         state.product = result
      } catch (error) {
         console.error('Product', 'loadProduct', error.message)
      }
   }

   const loadProducts = async () => {
      try {
         const q = query(collectionRef, orderBy('name'))
         const snapshot = await getDocs(q)

         if (snapshot.empty) {
            state.products = []
            return null
         }

         let result = []
         snapshot.forEach((doc) => {
            result.push({
               id: doc.id,
               ...doc.data(),
            })
         })
         state.products = result
      } catch (error) {
         console.error('Products', 'loadProducts', error.message)
      }
   }

   const addProduct = async (product) => {
      try {
         await addDoc(collectionRef, product)
         loadProducts()
      } catch (error) {
         console.error('Product', 'addProduct', error.message)
      }
   }

   const updateProduct = async (product) => {
      try {
         const { id, ...rest } = product
         await updateDoc(doc(db, 'products', id), rest)
         loadProducts()
      } catch (error) {
         console.error('Product', 'updateProduct', error.message)
      }
   }

   const deleteProduct = async (id) => {
      try {
         await deleteDoc(doc(db, 'products', id))
         loadProducts()
      } catch (error) {
         console.error('Product', 'deleteProduct', error.message)
      }
   }

   return {
      ...toRefs(state),
      loadProduct,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct,
   }
}
