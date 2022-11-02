import { configureStore } from "@reduxjs/toolkit"
import UserSlice from "./Redux/UserSlice"

export const store = configureStore({
    reducer: {
        UserSlice: UserSlice
    }
})