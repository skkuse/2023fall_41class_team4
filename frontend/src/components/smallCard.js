import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SmallCard = ({ icon, name, value }) => {
  return (
    <CardWrapper>
      <FontAwesomeIcon icon={icon} className="icon" />
      <ValueBox>{value}</ValueBox>
      <UnitBox>{name}</UnitBox>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 100%;
  margin: 0 1.5rem 2rem 1.5rem;
  padding: 2rem 0;
  background: #f8f8f8;
  border-radius: 1rem;
  box-shadow: inset 0.2rem 0.6rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon {
    color: #0fa958;
    font-size: 2.5rem;
    margin: 0.5rem;
  }
  &:hover {
    background: rgb(56, 201, 114, 0.2);
  }
`;
const ValueBox = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
const UnitBox = styled.div`
  color: #828282;
  font-size: 1rem;
  margin-left: 0.4rem;
`;
export default SmallCard;
