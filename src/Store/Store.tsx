import { configureStore } from "@reduxjs/toolkit";
import CustomerReducer from "./CustomerReducer";
import LoginReducer from "./LoginReducer";

//Redux Store
const storage = configureStore({
    reducer: {
        customer: CustomerReducer,
        login:LoginReducer
    }
})
export { storage };
export type RootState = ReturnType<typeof storage.getState>;