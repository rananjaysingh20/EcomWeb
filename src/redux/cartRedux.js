import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name:"cart",
	initialState: {
		products: [], //cartItems
		cartTotalQuantity:0,
		cartTotalAmout:0,
		isFetching:false,
		error:false,
	},
	reducers:{
		addToCart(state, action) {
			const itemIndex = state.products.findIndex(
				item=> item._id === action.payload._id
			);
			if (itemIndex >= 0) {
				state.products[itemIndex].cartQuantity += 1;
			} else {
				const tempProduct = {...action.payload, cartQuantity: 1}
				state.products.push(tempProduct);
				state.cartTotalAmout += action.payload.price*action.payload.cartQuantity;
			}
		},
		removeFromCart(state,action) {
			const nextCartItems = state.products.filter(
				cartItem => cartItem._id !== action.payload._id
			)
			state.products = nextCartItems;
		},
		decreaseCart(state,action) {
			const itemIndex = state.products.findIndex(
				cartItem => cartItem._id === action.payload._id
			)
			if (state.products[itemIndex].cartQuantity > 1) {
				state.products[itemIndex].cartQuantity -= 1;
			} else if (state.products[itemIndex].cartQuantity === 1) {
				const nextCartItems = state.products.filter(
					cartItem => cartItem._id !== action.payload._id
				)
				state.products = nextCartItems;
			}
		},
		clearCart(state,action) {
			state.products = []
		},
		getTotal(state,action) {
			let {total, quantity} = state.products.reduce((cartTotal, cartItem)=>{
				const { price ,cartQuantity } = cartItem;
				const itemTotal = price * cartQuantity;
				cartTotal.total += itemTotal;
				cartTotal.quantity += cartQuantity;
				return cartTotal;
			}, {
				total: 0,
				quantity: 0,
			});
			state.cartTotalQuantity = quantity;
			state.cartTotalAmout = total;
		},
	},
});

export const { 
	addProduct, 
	addToCart, 
	removeFromCart, 
	decreaseCart,
	clearCart,
	getTotal,
	sendStart,
	sendSuccess,
	sendFailed } = cartSlice.actions;
export default cartSlice.reducer;