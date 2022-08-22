import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Title = styled.span`
	font-size: 24px;
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
`

const Home = () => {
	return (
		<div>
			<Announcement/>
			<Navbar/>
			<Slider/>
			<Categories/>
			<Title>POPULAR PRODUCTS</Title>
			<Products/>
			<Newsletter/>
			<Footer/>
		</div>
	)
}

export default Home