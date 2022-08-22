import styled from 'styled-components';
import {mobile} from '../responsive';
import { Link } from "react-router-dom";
import {useState} from 'react';
import {register} from '../redux/apiCalls';
import {useDispatch} from 'react-redux';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url('https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/230579483/original/53dc88b26384f6c05efb726cfa8af9cf5b933e01/created-anime-streetwear-tshirt-design.jpg') center;
	display: flex;
	background-size: cover;
	align-items: center;
	justify-content: center;
`
const Wrapper = styled.div`
	padding: 20px;
	width: 40%;
	background-color: white;
	opacity: 0.9;
	${mobile({width: "75%"})}
`
const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
	text-align: center;
`
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`
const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
`
const Agreement = styled.p`
	font-size: 12px;
	margin: 20px 0px;
`
const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`
const Error = styled.span`
	color: red;
`

const Register = () => {
	const [username,setUsername] = useState('');
	const [email,setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
	const dispatch = useDispatch();
	const handleClick = (event) => {
		register(dispatch,{username,password,email});
	};
	return (
		<div>
			<Announcement/>
			<Navbar/>
			<Container>
				<Wrapper>
					<Title>CREATE AN ACCOUNT</Title>
					<Form>
						<Input 
							placeholder='first name'
						/>
						<Input 
							placeholder='last name'
						/>
						<Input 
							placeholder='username'
							onChange={(event)=>setUsername(event.target.value)}
						/>
						<Input 
							placeholder='email'
							onChange={(event)=>setEmail(event.target.value)}
						/>
						<Input 
							placeholder='password'
							onChange={(event)=>setPassword(event.target.value)}
						/>
						<Input 
							placeholder='confirm password'
							onChange={(event)=>setCPassword(event.target.value)}
						/>
						<Agreement>
						By creating an account, I consent to the processing of my personal data on accordance with the <b>PRIVACY POLICY</b>
						</Agreement>
						<Button onClick={()=>handleClick()}>CREATE ACCOUNT</Button>
					</Form>
					{password!==cPassword ? <Error>Passwords do not match!</Error>: ''}
					<Link to='/login' style={{textDecoration: "none", fontSize: "24px", fontWeight: "700", color: "teal", float: "right"}}>SIGN IN</Link>
				</Wrapper>
			</Container>
		</div>
	)
}

export default Register