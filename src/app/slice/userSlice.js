import { createSlice, } from '@reduxjs/toolkit';


const users = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        getAllUser: (state, action) => {
            state = action.payload
            return state
        },
        addUser: (state, action) => {
            state.push(action.payload)
            return state
        }
    }

})

const { reducer, actions } = users;
export const { getAllUser, addUser } = actions;
export default reducer;