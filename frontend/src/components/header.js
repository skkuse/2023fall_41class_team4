import styled from "styled-components";

const HeaderDiv = styled.div`
  padding: 4rem;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: white;
  background-image: url(${require(`../assets/grass.jpg`)});
  background-position: center;
  background-size: cover;
  @media screen and (max-width: 320px) {
    font-size: 2rem;
  }
`;

const Header = () => {
  return <HeaderDiv>CODEMETER</HeaderDiv>;
};

export default Header;
