import styled from "styled-components";

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
  a4: 30,
};

const HardwareSpec = () => {
  return (
    <BoxContainer>
      <TwoPart>
        <Black>
          <div>런타임</div>
          <div>코어 개수</div>
          <div>CPU 전력 사용 비율</div>
          <div>CPU 사용 비율</div>
        </Black>
        <Gray>
          <div>{response.runtime}</div>
          <div>{response.coreCount}개</div>
          <div>{response.cpuWatt}</div>
          <div>{response.cpuPercent}</div>
        </Gray>
      </TwoPart>
      <TwoPart>
        <Black>
          <div>가용 메모리 크기</div>
          <div>
            메모리 사용량에 따른
            <br />
            전력 소비 비율
          </div>
          <div>
            데이터 센터의
            <br />
            에너지 효율성
          </div>
        </Black>
        <Gray>
          <div className="wider">{response.memory}</div>
          <div className="wider">{response.wattPerGB}</div>
          <div className="wider">{response.efficiency}</div>
        </Gray>
      </TwoPart>
    </BoxContainer>
  );
};

const Black = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  > div {
    margin: 0.4rem 0;
  }
`;
const Gray = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #828282;
  text-align: right;
  margin: 0;
  > div {
    margin: 0.4rem 0;
  }
  .wider {
    margin: 0.7rem 0;
  }
`;
const TwoPart = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 2.5rem 4rem;
`;

const BoxContainer = styled.div`
  background: white;
  width: 70vw;
  display: flex;
  justify-content: center;
  h3 {
    color: #0fa958;
    font-weight: bold;
    font-size: 1.25rem;
    margin: 0;
  }
  > div:last-child {
    margin-left: 0;
    border-left: 1px solid darkgray;
    padding-left: 2.5rem;
  }
  border-radius: 2rem;
  box-shadow: 1px 5px 5px 5px rgba(0, 0, 0, 0.2);
`;
export default HardwareSpec;
