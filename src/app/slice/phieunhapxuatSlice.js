import { createSlice, } from '@reduxjs/toolkit';

const Phieunhapxuat = createSlice({
    name: 'phieunhapxuat',
    initialState: [],
    reducers: {
        getAllPNX: (state, action) => {
            state = action.payload
            return state
        },
        AddPNX: (state, action) => {
            state.push(action.payload)
            return state
        },
        cancelPNX: (state, action) => {
            console.log(action.payload)
            const newPhieunx = action.payload
            const pnxIndex = state.findIndex(item => JSON.stringify(item.nhapId) === JSON.stringify(newPhieunx.id))
            if (pnxIndex >= 0) {
                state[pnxIndex] = newPhieunx
            }
            return state
        }
    }
})

const { reducer, actions } = Phieunhapxuat;
export const { getAllPNX, AddPNX, cancelPNX } = actions;
export default reducer;