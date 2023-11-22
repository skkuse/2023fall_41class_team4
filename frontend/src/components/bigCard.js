// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const BigCard = ({ icon, name, value }) => {
  return (
    <CardContainer>
      <div>
        <i className={icon}></i>
        <span>{name}</span>
      </div>
      <div>{value}</div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 1.5rem;
  box-shadow: inset 0.2rem 0.6rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
`;

export default BigCard;
