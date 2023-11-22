import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const BigCard = ({ icon, name, value }) => {
  return (
    <CardContainer>
      <div>
        <FontAwesomeIcon icon={icon} />
        <span>{name}</span>
      </div>
      <div>
        <ValueBox>{value.slice(0, 5)}</ValueBox>
        <UnitBox>/{value.slice(-2)}</UnitBox>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  padding: 3rem;
  background: #f8f8f8;
  border-radius: 1.5rem;
  box-shadow: inset 0.2rem 0.6rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  > div:first-child {
    > i {
      width: 100%;
      height: 100%;
      border: 10px solid red;
    }
  }
`;
const ValueBox = styled.div`
  font-size: 3rem;
  font-weight: bold;
`;
const UnitBox = styled.div`
  color: darkgray;
  font-size: 1rem;
`;
export default BigCard;
