import { createSlice, } from '@reduxjs/toolkit';


const order = createSlice({
    name: "order",
    initialState: [],
    reducers: {
        getAllOrder: (state, action) => {
            state = action.payload
            return state
        },
        addNewOrder: (state, action) => {
            state.push(action.payload)
            return state
        },
        deleteOrder: (state, action) => {
            const cateId = action.payload
            state.filter(item => {
                console.log(item.id, JSON.parse(cateId))
                if (item.id !== JSON.parse(cateId)) {
                    console.log('aaaa')
                }
            })
            return state.filter(item => item.id !== JSON.parse(cateId))
        },
        editOrder: (state, action) => {
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
const { reducer, actions } = order;
export const { getAllOrder, addNewOrder, deleteOrder, editOrder } = actions;
export default reducer;