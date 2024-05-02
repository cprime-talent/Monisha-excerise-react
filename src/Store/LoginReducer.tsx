import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  LoginUser, UserDetails } from "./Type/TypeGlobal";
import { UserLoginStore } from "../DummyData/SampleData";

const loginUserSlice = createSlice({
    name: "login",
    initialState: UserLoginStore,
    reducers: {
        //Create
        createUser: (state, action:PayloadAction<LoginUser>) => {
            state.push(action.payload);
        },
        //Present User
        presentUserLogin:(state, action:PayloadAction<UserDetails>) => {
            state.push(action.payload);
        }
    }
})

export const { createUser, presentUserLogin } = loginUserSlice.actions;
export default loginUserSlice.reducer;