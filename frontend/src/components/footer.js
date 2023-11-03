import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      Github
      <NameContainer>
        <li>김동한</li>
        <li>안낙균</li>
        <li>유지훈</li>
      </NameContainer>
      <NameContainer>
        <li>임소리</li>
        <li>조민호</li>
        <li>조유지</li>
      </NameContainer>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background: #0fa958;
  color: white;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
`;
const NameContainer = styled.ul`
  > li {
    list-style: none;
    margin: 0.5rem 0rem;
  }
`;
export default Footer;
