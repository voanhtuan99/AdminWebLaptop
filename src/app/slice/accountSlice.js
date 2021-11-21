import { createSlice } from '@reduxjs/toolkit';

const initialAccount = {}

const account = createSlice({
    name:"account",
    initialState: initialAccount,
    reducers: {
        updateAccount: (state, action) => {
            state = action.payload;
            return state
        }
    }
})

const { reducer, actions } = account;
export const { updateAccount } = actions;
export default reducer;