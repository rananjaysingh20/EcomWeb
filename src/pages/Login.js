import styled from 'styled-components';
import {mobile} from '../responsive';
import {useState} from 'react';
import {login} from '../redux/apiCalls';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url('https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/04/Jujutsu-Kaisen-Dolce-and-Gabbana-1.jpg') center;
	display: flex;
	background-size: cover;
	align-items: center;
	justify-content: center;
`
const Wrapper = styled.div`
	padding: 20px;
	width: 25%;
	background-color: white;
	opacity: 0.9;
	${mobile({width: "70%"})}
`
const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
	text-align: center;
`
const Form = styled.form`
	display: flex;
	flex-direction: column;
`
const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0px;
	padding: 10px;
`

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin-bottom: 10px;
	&:disabled{
		color: green;
		cursor: not-allowed;
	}
`
const Linked = styled.a`
	margin: 5px 0px;
	font-size: 12px;
	text-decoration: underline;
	cursor: pointer;
`

const Error = styled.span`
	color: red;
`

const Login = () => {
	const [username,setUsername] = useState('');
	const [password,setPassword] = useState('');
	const dispatch = useDispatch();
	const {isFetching, error} = useSelector(state=>state.user);
	const handleClick = (event) => {
		login(dispatch,{username,password});
	};
	return (
		<div>
			<Announcement/>
			<Navbar/>
			<Container>
				<Wrapper>
					<Title>SIGN IN</Title>
					<Form>
						<Input 
							placeholder='username' 
							onChange={(event)=>setUsername(event.target.value)}
						/>
						<Input 
							placeholder='password' 
							onChange={(event)=>setPassword(event.target.value)}
							type="password"
						/>
						<Button onClick={()=>handleClick()} disabled={isFetching}>LOGIN</Button>
						{error && <Error>Something went wrong.</Error>}
						<Linked>Forgot Password</Linked>
						<Linked>CREATE A NEW ACCOUNT</Linked>
					</Form>
					<Link to='/register' style={{textDecoration: "none", fontSize: "24px", fontWeight: "700", color: "teal", float: "right"}}>REGISTER</Link>
				</Wrapper>
			</Container>
		</div>
	)
}

export default Login