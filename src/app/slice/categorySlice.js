import { createSlice, } from '@reduxjs/toolkit';

const category = createSlice({
    name: 'category',
    initialState: [],
    reducers: {
        getAllCategory: (state, action) => {
            state = action.payload
            return state
        },
        addCategory: (state, action) => {
            state.push(action.payload)
            return state
        },
        deleteCategory: (state, action) => {
            const cateId = action.payload
            state.filter(item => {
                console.log(item.id, JSON.parse(cateId))
                if (item.id !== JSON.parse(cateId)) {
                    console.log('aaaa')
                }
            })
            return state.filter(item => item.id !== JSON.parse(cateId))
        },
        editCategory: (state, action) => {
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

const { reducer, actions } = category;
export const { getAllCategory, addCategory, deleteCategory, editCategory } = actions;
export default reducer;