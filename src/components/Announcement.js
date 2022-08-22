import styled from 'styled-components';


const Container = styled.div`
  position: sticky;
  top: 0px;
  opacity: 0.8;
  z-index: 100000;
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`

const Announcement = () => {
  return (
    <Container>
      100% Off on Shopping of 2 Rs. and above!
    </Container>
  )
}

export default Announcement