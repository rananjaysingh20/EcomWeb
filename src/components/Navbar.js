import {useEffect} from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import {mobile} from '../responsive';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userRedux';
import { getTotal } from '../redux/cartRedux';


const Container = styled.div`
	height: 60px;
	background-color: white;
	opacity: 0.8;
	${mobile({height: "50px"})}
	position: sticky;
	z-index: 100000;
	top: 30px;
`
const Wrapper = styled.div`
	padding: 0px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	${mobile({padding: "10px 0px"})}
`
const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`
const Language = styled.span`
	font-size:14px;
	cursor: pointer;
	text-transform: uppercase;
	${mobile({display: "none"})}
`
const SearchContainer = styled.div`
	border: 1px solid lightgrey;
	display: flex;
	align-items: center;
	margin-left: 25px;
	padding: 5px;
`
const Input = styled.input`
	border: none;
	${mobile({width: "50px"})}
`

const Center = styled.div`
	flex: 1;
	text-align: center;
	${mobile({padding: "0px"})}
`
const Logo = styled.h1`
	font-weight: bold;
	border-radius: 10px;
	${mobile({fontSize: "18px"})}
	transition: all 0.5s ease;
	&:hover {
		background-color: teal;
		color: white;
	}
`
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({justifyContent: "center", flex:1})}
`
const MenuItem = styled.div`
	font-size:14px;
	cursor: pointer;
	margin-left: 25px;
	${mobile({fontSize: "10px", marginLeft: "5px",padding:"0px"})}
`
const Name = styled.span`
	font-size: 16px;
	font-weight: 700;
	text-transform: uppercase;
	${mobile({fontSize: "8px", color:"teal",padding:"0px"})}
`
const Navbar = () => {
	const quantity = useSelector(state=>state.cart.cartTotalQuantity);
	const user = useSelector(state=>state.user.currentUser);
	const cart = useSelector((state)=>state.cart);
	const dispatch = useDispatch();
	const handleLogout = (event) => {
		dispatch(logout());
	};
	useEffect(()=> {
		dispatch(getTotal());
	},[cart,dispatch]);
	return (
		<Container>
			<Wrapper>
				<Left>
					<Language>EN</Language>
					<SearchContainer>
						<Input placeholder='Search'/>
						<Search style={{color:'gray', fontSize:16,}}/>
					</SearchContainer>
				</Left>
				<Center>
					<Link to='/' style={{textDecoration: "none", color: "inherit"}}>
						<Logo>RE-FLOW.</Logo>
					</Link>
				</Center>
				<Right>
					{user 
						? <Name>Welcome, {user.username}</Name>
						: <Link to='/register' style={{textDecoration: "none", color: "inherit"}}>
							<MenuItem>REGISTER</MenuItem>
						</Link>
					}
					{user 
						? <MenuItem onClick={(event)=>handleLogout(event)}>SIGN OUT</MenuItem> 
						: <Link to='/login' style={{textDecoration: "none", color: "inherit"}}>
							<MenuItem>SIGN IN</MenuItem>
						</Link>
					}
					<Link to='/cart'>
						<MenuItem>
							<Badge overlap="rectangular" badgeContent={quantity} color='primary'>
								<ShoppingCartOutlined />
							</Badge>
						</MenuItem>
					</Link>
				</Right>
			</Wrapper>
		</Container>
	)
}

export default Navbar