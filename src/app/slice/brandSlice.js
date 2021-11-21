import { createSlice, } from '@reduxjs/toolkit';

const brand = createSlice({
    name: 'brand',
    initialState: [],
    reducers: {
        getAllBrand: (state, action) => {
            state = action.payload
            return state
        },
        addBrand: (state, action) => {
            state.push(action.payload)
            return state
        },
        deleteBrand: (state, action) => {
            const cateId = action.payload
            state.filter(item => {
                console.log(item.id, JSON.parse(cateId))
                if (item.id !== JSON.parse(cateId)) {
                    console.log('aaaa')
                }
            })
            return state.filter(item => item.id !== JSON.parse(cateId))
        },
        editBrand: (state, action) => {
            console.log(action.payload)
            const newCate = action.payload
            const cateIndex = state.findIndex(item => item.id === newCate.id)
            if (cateIndex >= 0) {
                state[cateIndex] = newCate
            }
            return state
        }
    }
})

const { reducer, actions } = brand;
export const { getAllBrand, addBrand, deleteBrand, editBrand } = actions;
export default reducer;