import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialStateCustomer = {
   fullName: '',
   nationalId: '',
   createdAt: '',
   isLoading: false,
};

export const isCustomer = createAsyncThunk('customer/fetchCustomer', async () => {
   const res = await fetch('https://dummyjson.com/users/1');
   const data = await res.json();

   return {
      fullName: `${data.firstName} ${data.lastName}`,
      nationalId: data.id,
      createdAt: new Date().toISOString(),
   };
});

export const createCustomer = createAsyncThunk('customer/createCustomer', async ({ fullName, nationalId }) => {
   return {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
   };
});

const customerSlice = createSlice({
   name: 'customer',
   initialState: initialStateCustomer,
   reducers: {
      updateName: (state, action) => {
         state.fullName = action.payload.fullName;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(isCustomer.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(isCustomer.fulfilled, (state, action) => {
            state.fullName = action.payload.fullName;
            state.nationalId = action.payload.nationalId;
            state.createdAt = action.payload.createdAt;
            state.isLoading = false;
         })
         .addCase(createCustomer.fulfilled, (state, action) => {
            state.fullName = action.payload.fullName;
            state.nationalId = action.payload.nationalId;
            state.createdAt = action.payload.createdAt;
            state.isLoading = false;
         });
   },
});

export const { updateName } = customerSlice.actions;

export default customerSlice.reducer;
