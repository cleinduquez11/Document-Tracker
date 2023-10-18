import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    refetch: false,
}

export const refetchSlice = createSlice({
    name: 'refetch',
    initialState,
    reducers: {
        refetch:(state)=>{
            state.refetch = !state.refetch;
        }
    }
});


export const {refetch} = refetchSlice.actions;
export default refetchSlice.reducer;