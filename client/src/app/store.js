import {configureStore} from "@reduxjs/toolkit"
import refetchReducer from '../Provider/Refetch/refetchSlice'



export const store = configureStore({

    reducer: {
        refetch: refetchReducer,

    }
})