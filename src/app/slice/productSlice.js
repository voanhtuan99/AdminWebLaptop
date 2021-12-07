import { createSlice, } from '@reduxjs/toolkit';


const product = createSlice({
    name: "product",
    initialState: [],
    reducers: {
        getAllProduct: (state, action) => {
            state = action.payload
            return state
        },
        addProduct: (state, action) => {
            state.push(action.payload)
            return state
        },
        updateProduct: (state, action) => {
            console.log(action.payload)
            const newProduct = action.payload
            const productIndex = state.findIndex(item => JSON.stringify(item.id) === JSON.stringify(newProduct.id))
            console.log(newProduct.id)
            if (productIndex >= 0) {
                state[productIndex] = newProduct
                // state[productIndex].id = newProduct.id
                // state[productIndex].product_name = newProduct.product_name
                // state[productIndex].product_qty = newProduct.product_qty
                // state[productIndex].product_price = newProduct.product_price
                // state[productIndex].product_discount = newProduct.product_discount
                // state[productIndex].product_description = newProduct.product_description
                // state[productIndex].category_id = newProduct.category_id
                // state[productIndex].brand_id = newProduct.brand_id
            }
            return state
        }
    }

})

const { reducer, actions } = product;
export const { getAllProduct, addProduct, updateProduct } = actions;
export default reducer;