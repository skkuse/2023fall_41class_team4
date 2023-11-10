import styled from "styled-components";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <FooterContainer>
      <a
        href="https://github.com/skkuse/2023fall_41class_team4"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} className="icon" />
      </a>
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
  .icon {
    font-size: 2.5rem;
    color: white;
  }
`;
const NameContainer = styled.ul`
  > li {
    list-style: none;
    margin: 0.5rem 0rem;
  }
`;
export default Footer;
