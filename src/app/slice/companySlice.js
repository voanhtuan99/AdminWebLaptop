import { createSlice, } from '@reduxjs/toolkit';

const company = createSlice({
    name: 'company',
    initialState: [],
    reducers: {
        getAllCompany: (state, action) => {
            state = action.payload
            return state
        },
        addCompany: (state, action) => {
            state.push(action.payload)
            return state
        },
        deleteCompany: (state, action) => {
            const cateId = action.payload
            state.filter(item => {
                console.log(item.id, JSON.parse(cateId))
                if (item.id !== JSON.parse(cateId)) {
                    console.log('aaaa')
                }
            })
            return state.filter(item => item.id !== JSON.parse(cateId))
        },
        editCompany: (state, action) => {
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

const { reducer, actions } = company;
export const { getAllCompany, addCompany, deleteCompany, editCompany } = actions;
export default reducer;