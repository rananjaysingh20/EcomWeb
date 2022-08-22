import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
	name:"newUser",
	initialState: {
		newUser:null,
		isFetching:false,
		error:false,
		registered:false,
	},
	reducers:{
		registerStart:(state)=> {
			state.isFetching = true;
		},
		registerSuccess:(state,action)=> {
			state.isFetching = false;
			state.newUser = action.payload;
			state.registered = true;
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