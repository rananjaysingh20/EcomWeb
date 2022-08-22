import styled from 'styled-components';
import React, { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { slideritems } from '../data';
import {mobile} from '../responsive';
import { Link } from "react-scroll";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({display: "none"})}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;\
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props=> props.direction === 'left' && '10px'};
  right: ${props=> props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  transition: all 0.5s ease;
  &:hover {
    background-color: teal;
    color: white;
  }
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${props=>props.sliderIndex * -100}vw);

`
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${props=>props.bg};
`
const ImageContainer = styled.div`
  height: 100%;
  flex: 1;
`
const Image = styled.img`
  height: 80%;
  flex: 1;
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;

`
const Title = styled.h1`
    font-size: 70px;
`
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20p;
  font-weight: 500;
  letter-spacong: 3px;
`
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: teal;
    color: white;
  }

`
const Category = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 500;
  padding-top: 100px;
  ${mobile({fontSize: "18px", color:"teal"})}
`
const ImgCont = styled.span`
  display: none;
  ${mobile({display:'block'})}
`
const Hr = styled.hr`
  background-color: teal;
  border: none;
  height: 2px;
  opacity: 0.5;
`
const Slider = () => {
  const [sliderIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if(direction==='left') {
      setSlideIndex(sliderIndex > 0 ? sliderIndex-1 : 2)
    } else {
      setSlideIndex(sliderIndex < 2 ? sliderIndex+1 : 0)
    }
  }
  return (
    <div>
      <Container>
        <Arrow direction='left' onClick={()=>handleClick('left')}>
          <ArrowLeftOutlined />
        </Arrow>
        <Wrapper sliderIndex={sliderIndex}>
          {slideritems.map(item => {
            return (<Slide bg={item.bg} key={item.id}>
              <ImageContainer>
                <Image src={item.img}></Image>
              </ImageContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Description>{item.desc}</Description>
                <Link activeClass="active" to="shop" smooth={true}>
                  <Button>SHOP NOW</Button>
                </Link>
              </InfoContainer>
            </Slide>)
          })}
        </Wrapper>
        <Arrow direction='right' onClick={()=>handleClick('right')}>
          <ArrowRightOutlined />
        </Arrow>
      </Container>
      <Hr/>
      <Category id="shop">
        SHOP CATEGORIES
        <ImgCont/>
      </Category>
      <Hr/>
    </div>
  )
}

export default Slider