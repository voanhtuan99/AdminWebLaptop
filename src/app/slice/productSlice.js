import { createSlice, } from '@reduxjs/toolkit';


const product = createSlice({
    name:"product",
    initialState: [],
    reducers: {
        getAllProduct: (state,action) => {
            state = action.payload
            return state
        },
        addProduct: (state, action) => {
            state.push(action.payload)
            return state
        }
    }
    
})

const { reducer, actions } = product;
export const { getAllProduct, addProduct } = actions;
export default reducer;