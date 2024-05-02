import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCustomer } from "../DummyData/SampleData";
import { Customer, CustomerIdParam } from "./Type/TypeGlobal";

const customerSlice = createSlice({
    name: "customer",
    initialState: UserCustomer,
    reducers: {
        //Create
        addCustomer: (state, action:PayloadAction<Customer>) => {
            state.push(action.payload);
        },
        //Update
        updateCustomer:(state,action:PayloadAction<Customer>)=>{
            const {id, email, name} =action.payload;
            const editCustomer = state.find(user=> user.id === id);
            if(editCustomer){
                editCustomer.name =name;
                editCustomer.email=email;
            }
        },
        //Delete
        deleteCustomer:(state,action:PayloadAction<CustomerIdParam>)=>{
            const { id } =action.payload;
            const deleteID = state.find(user=> user.id === id);
            if(deleteID){
                return state.filter(deleteCID =>deleteCID.id !==id);
            }
        }
    }
})
export const { addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;