import styled from "styled-components";

const SmallCard = ({ icon, name, value }) => {
  return (
    <CardWrapper>
      <div>{icon}</div>
      <div>{value}</div>
      <div>{name}</div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  border: 1px solid red;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 1rem;
`;

export default SmallCard;
