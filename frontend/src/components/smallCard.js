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
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 1rem;
  box-shadow: inset 0.2rem 0.6rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
`;

export default SmallCard;
