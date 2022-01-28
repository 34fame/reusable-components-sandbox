import { boot } from 'quasar/wrappers'
import axios from 'axios'

const instance = axios.create({})
instance.defaults.baseURL = process.env.API_BASEURL
instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.common['Content-Type'] = 'application/json'

export default boot(({ app }) => {
   app.provide('axios', instance)
})
