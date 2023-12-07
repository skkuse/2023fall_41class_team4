import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const BigCard = ({ icon, name, value }) => {
  const regExp = /[0-9]/g;
  // console.log(value);
  // console.log(regExp.test(value[4]));
  // console.log(value.charAt(value.length - 3));
  return (
    <CardContainer>
      <div>
        <FontAwesomeIcon icon={icon} className="icon" />
        <span>{name}</span>
      </div>
      <div>
        {!regExp.test(value.slice(4, 5)) ? (
          <ValueBox>{value.slice(0, 4)}</ValueBox>
        ) : (
          <ValueBox>{value.slice(0, 5)}</ValueBox>
        )}
        {!regExp.test(value.slice(-3, -2)) ? (
          <UnitBox>/{value.slice(4)}</UnitBox>
        ) : (
          <UnitBox>/{value.slice(-2)}</UnitBox>
        )}
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  padding: 3rem 0;
  background: #f8f8f8;
  border-radius: 1.5rem;
  box-shadow: inset 0.2rem 0.6rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div:first-child {
    font-size: 1.5rem;
    .icon {
      color: #0fa958;
      margin-right: 0.6rem;
    }
  }
  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  &:hover {
    background: rgb(56, 201, 114, 0.2);
  }
  @media screen and (min-width: 1000px) {
    width: 100%;
  }
`;
const ValueBox = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-left: 1.8rem;
  @media screen and (max-width: 1000px) {
    font-weight: normal;
  }
`;
const UnitBox = styled.div`
  color: #828282;
  font-size: 1rem;
  margin-left: 0.4rem;
`;
export default BigCard;
