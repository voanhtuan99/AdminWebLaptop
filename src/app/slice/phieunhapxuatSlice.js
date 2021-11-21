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
        delPNXL: (state, action) => {
            const cateId = action.payload
            state.filter(item => {
                console.log(item.id, JSON.parse(cateId))
                if (item.id !== JSON.parse(cateId)) {
                    console.log('aaaa')
                }
            })
            return state.filter(item => item.id !== JSON.parse(cateId))
        }
    }
})

const { reducer, actions } = Phieunhapxuat;
export const { getAllPNX, AddPNX, delPNXL } = actions;
export default reducer;