import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import {Add, Remove, DeleteForever} from '@material-ui/icons';
import {mobile} from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from "react";
import { userRequest } from '../requestMethods';
import { useNavigate, Link } from 'react-router-dom';
import {removeFromCart, decreaseCart, addToCart, clearCart } from '../redux/cartRedux';

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div`
	
`
const Wrapper = styled.div`
	padding: 20px;
	${mobile({padding: "10px"})}
`
const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`
const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`
const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${props=>props.type==='filled' && 'none'};
	background-color: ${props=>props.type==='filled' ? 'black' : 'transparent'};
	color: ${props=>props.type==='filled' && 'white'};
`
const TopTexts = styled.div`
	${mobile({display: "none"})}
`
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`
const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({flexDirection: "column"})}
`
const Info = styled.div`
	flex: 3;
`
const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({flexDirection: "column"})}
`
const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`
const Image = styled.img`
	width: 200px;
`
const Details = styled.span`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`
const ProductName = styled.span`
	
`
const ProductID = styled.span`
	
`
const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${props=>props.color};
	border: 1px dotted black;
`
const ProductSize = styled.span`
	
`
const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`
const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`
const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({margin: "5px 15px"})}
`
const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({marginBottom: "20px"})}
`
const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;

`
const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;\
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`
const SummaryTitle = styled.h1`
	font-weight: 200;

`
const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${props=> props.type === 'total' && '500'};
	font-size: ${props=> props.type === 'total' && '24px'};
`
const SummaryItemText = styled.span`
	
`
const SummaryItemPrice = styled.span`
	
`
const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
	cursor: pointer;
`
const ClearButton = styled.button`
	background-color: teal;
	width: 100%;
	padding: 10px;
	color: white;
	border: none;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 1s ease;
	&:hover {
		background-color: white;
		color: teal;
	}
`
const Cart = () => {
	const cart = useSelector((state)=>state.cart);
	const user = useSelector((state)=>state.user.currentUser);
	const quantity = useSelector((state)=>state.cart.cartTotalQuantity);
	const [stripeToken, setStripeToken] = useState(null);
	const history = useNavigate();
	const dispatch = useDispatch();
	const onToken = (token) => {
		setStripeToken(token);
	};
	
	useEffect(()=> {
		const makeRequest = async ()=> {
			try {
				const res = await userRequest.post('/checkout/payment', {
					tokenId:stripeToken.id,
					amount:cart.cartTotalAmout+200*100,
				});
				history.push("/success", { data: res.data });
			} catch(err) {
				console.log(err);
			}
		};
		stripeToken && cart.cartTotalAmout>=1 && makeRequest();
	},[stripeToken, cart.cartTotalAmout, history]);
	const handleRemove = (product) => {
		dispatch(removeFromCart(product));
	};
	const handleDecrease = (product) => {
		dispatch(decreaseCart(product));
	};
	const handleIncrease = (product) => {
		dispatch(addToCart(product))
	};
	const handleClear = () => {
		dispatch(clearCart());
	};
	return (
		<Container>
			<Announcement/>
			<Navbar/>
			<Wrapper>
				<Title>YOUR BAG</Title>
				<Top>
					<TopButton>CONTINUE SHOPPING</TopButton>
					<TopTexts>
						{quantity === 0 
							? <TopText>SHOPPING BAG (empty)</TopText>
							: <TopText>SHOPPING BAG ({quantity})</TopText>
						}
						<TopText>WISHLIST(0)</TopText>
					</TopTexts>
					{user
						? <StripeCheckout
							name="RE-FLOW."
							image="https://images-platform.99static.com/TtM8c8zJCSYBVmNxFUXYlwXjGLs=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/72/72351/attachment_72351193"
							billingAddress
							shippingAddress
							description={`Your total is Rs.${cart.total+200}`}
							amount={cart.total+200}
							token={onToken}
							stripeKey={KEY}
						  >
						  <TopButton type='filled'>CHECKOUT NOW</TopButton>
						  </StripeCheckout>
						: <Link to='/login'>
							<TopButton type='filled'>SIGN IN & CHECKOUT</TopButton>
						  </Link>
					}
				</Top>
				<Bottom>
					<Info>
					{cart.products.length === 0 ? (
						<div>
							<Title>YOUR CART IS EMPTY</Title>
							<Link to='/'>
								<Button>START SHOPPING</Button>
							</Link>
						</div>
						) 
						: (
							<div>
								{cart.products?.map((product)=>(
									<Product>
										<ProductDetail>
											<Image src={product.img} key={product._id}/>
											<Details>
												<ProductName><b>Product: </b>{product.title}</ProductName>
												<ProductID><b>ProductID: </b>{product.id}</ProductID>
												<ProductColor key={product._id} color={product.color}/>
												<ProductSize><b>ProductSize: </b>{product.size}</ProductSize>
											</Details>
										</ProductDetail>
										<PriceDetail>
											<ProductAmountContainer>
												<Add onClick={()=>handleIncrease(product)}/>
												<ProductAmount>{product.cartQuantity}</ProductAmount>
												<Remove onClick={()=>handleDecrease(product)}/>
												<DeleteForever onClick={()=>handleRemove(product)} style={{cursor: "pointer"}}/>
											</ProductAmountContainer>
											<ProductPrice>Rs. {product.price*product.cartQuantity}</ProductPrice>
										</PriceDetail>
									</Product>
								))}
								<Hr/>
							</div>)}
					</Info>
					<Summary>
						<SummaryTitle>ORDER SUMMARY</SummaryTitle>
						<SummaryItem>
							<SummaryItemText>Subtotal</SummaryItemText>
							<SummaryItemPrice>Rs. {cart.cartTotalAmout}</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Estimated Shippping</SummaryItemText>
							<SummaryItemPrice>Rs. 200</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Discount</SummaryItemText>
							<SummaryItemPrice>Rs. 0</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem type='total'>
							<SummaryItemText>Total</SummaryItemText>
							<SummaryItemPrice>Rs. {cart.cartTotalAmout+200}</SummaryItemPrice>
						</SummaryItem>
						{user 
							? <StripeCheckout
								name="RE-FLOW."
								image="https://images-platform.99static.com/TtM8c8zJCSYBVmNxFUXYlwXjGLs=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/72/72351/attachment_72351193"
								billingAddress
								shippingAddress
								description={`Your total is Rs.${cart.cartTotalAmout+200}`}
								amount={cart.total+200}
								token={onToken}
								stripeKey={KEY}
							  >
							  <Button>CHECKOUT NOW</Button>
							  </StripeCheckout>
							: <Link to='/login'>
									<Button>SIGN IN & CHECKOUT</Button>
							  </Link>
						}
					</Summary>
				</Bottom>
				<ClearButton onClick={()=>handleClear()}>CLEAR CART</ClearButton>
			</Wrapper>
			<Newsletter/>
			<Footer/>
		</Container>
	)
}

export default Cart