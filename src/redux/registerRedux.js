import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
	name:"user",
	initialState: {
		newUser:null,
		isFetching:false,
		error:false,
	},
	reducers:{
		registerStart:(state)=> {
			state.isFetching = true;
		},
		registerSuccess:(state,action)=> {
			state.isFetching = false;
			state.newUser = action.payload;
		},
		registerFailure:(state)=> {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const { 
	registerStart,
	registerSuccess,
	registerFailure
} = registerSlice.actions;
export default registerSlice.reducer;