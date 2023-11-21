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
  border: 1px solid orange;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 1.5rem;
`;

export default BigCard;
