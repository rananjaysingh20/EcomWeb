import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import {mobile} from '../responsive';
import { useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { publicRequest } from '../requestMethods';
import { addToCart,getTotal } from '../redux/cartRedux';
import { useDispatch,useSelector } from 'react-redux';

const Container = styled.div`
	
`
const Wrapper = styled.div`
	padding: 100px;
	display: flex;
	${mobile({padding: "10px", flexDirection:"column"})}
`
const ImgContainer = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	background-color: #f5f5f5;
	border-radius: 10%;
	${mobile({padding: "0px 0px"})}
`
const Image = styled.img`
	width: 50%;
	width: 50vh;
	${mobile({width: "100%"})}
`
const InfoContainer = styled.div`
	flex: 1;
	padding: 0px 50px;
	${mobile({padding: "10px"})}
`
const Title = styled.h1`
	font-weight: 200;
	${mobile({fontSize: "30px"})}

`
const Description = styled.p`
	margin: 20px 0px;
`
const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
	${mobile({fontSize: "30px"})}
`
const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 50%;
	margin: 30px 0px;
	${mobile({width: "100%"})}
`
const Filter = styled.div`
	display: flex;
	align-items: center;
`
const FilterTitle = styled.div`
	font-size: 20px;
	font-weight: 200;
`
const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${props=>props.colors};
	border: 1px solid black;
	margin: 0px 5px;
	cursor: pointer;
	transition: all 0.3s ease;
	&:hover {
		border: 3px solid teal;
	}
`
const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px;
	transition: all 0.5s ease;
	&:hover {
		background-color: teal;
		color: white;
	}
`
const FilterSizeOption = styled.option`
	
`
const AddContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 60%;
	${mobile({width: "100%"})}
`
const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	text-transform: uppercase;
`
const Amount = styled.span`
	width: 100px;
	height: 60px;
	border-radius: 5px;
	border: 1px solid teal;
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;

`
const Button = styled.button`
	border-radius: 5px;
	width: 100px;
	height: 60px;
	border: 1px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	transition: all 0.5s ease;
	&:hover {
		background-color: teal;
		color: white;
	}
`
const Error = styled.span`
	color: red;
	padding-left: 20px;
	text-align: center;
	font-weight: 450;
`
const Product = () => {
	const location = useLocation();
	const id = (location.pathname.split("/")[2]);
	const [product, setProduct] = useState({});
	const cart = useSelector((state)=>state.cart);
	const quantity = useSelector((state)=>state.cart.cartTotalQuantity);
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const dispatch = useDispatch();
	useEffect(()=> {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get('/products/find/'+id)
				setProduct(res.data);
			} catch(err) {

			}
		}
		getProduct()
	},[id]);
	useEffect(()=> {
		dispatch(getTotal());
	},[cart,dispatch]);
	const handleClick = () => {
		dispatch(addToCart({...product, quantity, color, size }));
	};
	return (
		<Container>
			<Announcement/>
			<Navbar/>
			<Wrapper>
				<ImgContainer>
					<Image src={product.img}/>
				</ImgContainer>
				<InfoContainer>
					<Title>{product.title}</Title>
					<Description>{product.desc}</Description>
					<Price>Rs. {product.price}</Price>
					<FilterContainer>
						<Filter>
							<FilterTitle>Color</FilterTitle>
							{product.color?.map((c, i) => (
								<FilterColor colors={c} key={i} onClick={()=>setColor(c)}/>
							))}
						</Filter>
						<Filter>
							<FilterTitle>Size</FilterTitle>
							<FilterSize onChange={(event)=>setSize(event.target.value)}>
								{product.size?.map((s, i)=>(
									<FilterSizeOption key={i}>{s}</FilterSizeOption>
								))}
							</FilterSize>
						</Filter>
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Amount>1 {color} {size}</Amount>
						</AmountContainer>
						{size && color
							? <Button onClick={size && color && handleClick}>ADD TO CART</Button> 
							: <Error>Select Size & Color</Error>
						}
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Newsletter/>
			<Footer/>
		</Container>
	)
}

export default Product