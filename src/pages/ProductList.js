import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import {mobile} from '../responsive';
import { useLocation } from 'react-router-dom';
import { useState } from "react";

const Container = styled.div`
	
`
const Title = styled.h1`
	margin: 20px;
`
const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;

`
const Filter = styled.div`
	margin: 20px;
	${mobile({width: "0px 20px", display: "flex", flexDirection: "column"})}
`
const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${mobile({marginRight: "0px"})}
`
const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
	${mobile({margin: "10px 0px", fontSize:"10px"})}
`
const Option = styled.option`

`


const ProductList = () => {
	const location = useLocation();
	const cat = (location.pathname.split("/")[2]);
	const [filter,setFilter] = useState({});
	const [sort,setSort] = useState("newest");
	const handleFilters = (event) => {
		const value = event.target.value;
		setFilter({
			...filter,
			[event.target.name]: value,
		});
	};
	return (
		<Container>
			<Announcement/>
			<Navbar/>
			<Title>{cat}</Title>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select name="color" onChange={handleFilters}>
						<Option disabled>
							Color
						</Option>
						<Option>White</Option>
						<Option>Black</Option>
						<Option>Red</Option>
						<Option>Blue</Option>
						<Option>Pink</Option>
						<Option>Gray</Option>
					</Select>
					<Select name="size" onChange={handleFilters}>
						<Option disabled>
							Size
						</Option>
						<Option>XS</Option>
						<Option>S</Option>
						<Option>M</Option>
						<Option>L</Option>
						<Option>XL</Option>
					</Select>
				</Filter>
				<Filter>
					<FilterText>Sort Products:</FilterText>
					<Select onChange={(event)=>setSort(event.target.value)}>
						<Option value="newest">
							Newest
						</Option>
						<Option value="asc">Price low to high</Option>
						<Option value="desc">Price high to low</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<Products cat={cat} filter={filter} sort={sort} key={cat}/>
			<Newsletter/>
			<Footer/>
		</Container>
	)
}

export default ProductList