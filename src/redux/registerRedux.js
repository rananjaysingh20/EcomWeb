import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
	name:"newUser",
	initialState: {
		newUser:null,
		error:false,
		registered:false,
	},
	reducers:{
		registerSuccess:(state,action)=> {
			state.newUser = action.payload;
			state.registered = true;
		},
		registerFailure:(state)=> {
			state.error = true;
		},
	},
});

export const { 
	registerSuccess,
	registerFailure
} = registerSlice.actions;
export default registerSlice.reducer;