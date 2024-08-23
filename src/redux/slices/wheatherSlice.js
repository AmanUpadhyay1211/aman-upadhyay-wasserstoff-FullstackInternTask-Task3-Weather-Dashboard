import { createSlice } from "@reduxjs/toolkit";


const initialState = null;
  
  export const wheatherSlice = createSlice({
    name: "wheather",
    initialState,
    reducers: {
        addWheather: (state, action) => {
            state = action.payload;
        }
     }
})

  export const {addWheather} = wheatherSlice.actions;
  
export default wheatherSlice.reducer;