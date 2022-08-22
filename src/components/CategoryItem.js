import styled from 'styled-components';
import {mobile} from '../responsive';
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 3px;
  flex: 1;
  height: 60vh;
  position: relative;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({height: "20vh"})}
`
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
`
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: whtie;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.5s ease;
  &:hover {
    background-color: teal;
    color: white;
  }
`

const CategoryItem = ({item}) => {
	return (
		<Container>
      <Link to={`/products/${item.cat}`}>
  			<Image src={item.img}></Image>
  			<Info>
  				<Title>{item.title}</Title>
  				<Button>SHOP NOW</Button>
  			</Info>
      </Link>
		</Container>
	)
}

export default CategoryItem