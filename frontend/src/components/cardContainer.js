import styled from "styled-components";
import BigCard from "./bigCard";
import SmallCard from "./smallCard";

const response = {
  //dummy data
  runtime: "0.3h",
  coreCount: "2",
  cpuWatt: "15W",
  cpuPercent: "80%",
  memory: "3GB",
  wattPerGB: "0.3725W/GB",
  efficiency: "1.125",
  co2: "14.04kg",
  power: "14.04kWh",
  tv: "3h",
  car: "10km",
  elevator: "20층",
  a4: "30장",
};

const CardComponent = () => {
  return (
    <BoxWrapper>
      <BigContainer>
        <BigCard icon="fab fa-envira" name="co2" value={response.co2} />
        <BigCard icon="fas fa-bolt" name="power" value={response.power} />
      </BigContainer>
      <SmallContainer>
        <SmallCard icon="fa tv" name="TV 시청 시간" value={response.tv} />
        <SmallCard icon="fa car" name="승용차 주행 거리" value={response.car} />
        <SmallCard
          icon="fa elevator"
          name="엘리베이터 층수 이동"
          value={response.elevator}
        />
        <SmallCard icon="fa a4" name="A4 용지 사용량" value={response.a4} />
      </SmallContainer>
    </BoxWrapper>
  );
};

const BoxWrapper = styled.div`
  margin: 2rem;
  background: white;
  border-radius: 2rem;
  width: 55%;
  border-radius: 2rem;
  box-shadow: 1px 5px 5px 5px rgba(0, 0, 0, 0.2);
`;

const BigContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SmallContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default CardComponent;
