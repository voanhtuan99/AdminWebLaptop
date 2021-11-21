import { configureStore } from '@reduxjs/toolkit'
import reducer from './slice/accountSlice'
import productReducer from './slice/productSlice'
import cateReducer from './slice/categorySlice'
import brandReducer from './slice/brandSlice'
import companyReducer from './slice/companySlice'
import orderReducer from './slice/orderSlice'
import phieunxSlice from './slice/phieunhapxuatSlice'
import userSlice from './slice/userSlice'
const rootReducer = {
  account: reducer,
  product: productReducer,
  category: cateReducer,
  brand: brandReducer,
  company: companyReducer,
  order: orderReducer,
  phieunx: phieunxSlice,
  user: userSlice
}
export const store = configureStore({
  reducer: rootReducer,
})