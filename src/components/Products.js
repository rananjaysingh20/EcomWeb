import styled from 'styled-components';

import Product from './Product';
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`

const Products = ({cat, filter, sort}) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					cat ? `http://localhost:5000/api/products?category=${cat}` 
					: "http://localhost:5000/api/products/"
				);
				setProducts(res.data);
			} catch(err) {

			}
		};
		getProducts()
	},[cat]);

	useEffect(() => {
		cat && setFilteredProducts(
			products.filter(item => Object.entries(filter).every(([key, value])=>
				item[key].includes(value)
			))
		);
	},[products, cat, filter]);

	useEffect(() => {
		if(sort==="newest") {
			setFilteredProducts(prev=>
				[...prev].sort((a,b)=>a.createdAt - b.createdAt)
			);
		} else if(sort==="asc") {
			setFilteredProducts(prev=>
				[...prev].sort((a,b)=>a.price - b.price)
			);
		} else {
			setFilteredProducts(prev=>
				[...prev].sort((a,b)=>b.price - a.price)
			);
		}
	},[sort]);

	return (
		<Container>
			{cat ? filteredProducts.map((item,i) => {
				return (<Product item={item} key={i}/>)
			}): products.slice(0,8).map((item,i) => {
				return (<Product item={item} key={i}/>)
			})}
		</Container>
	)
}

export default Products