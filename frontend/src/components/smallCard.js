import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SmallCard = ({ icon, name, value }) => {
  return (
    <CardWrapper>
      <FontAwesomeIcon icon={icon} className="icon" />
      <div>{value}</div>
      <div>{name}</div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  padding: 2rem;
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
`;

export default SmallCard;
