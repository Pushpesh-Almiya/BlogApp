import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./authSlice"
const store = configureStore ({
    reducer:{
        auth : userSlice
    }
})

export default store