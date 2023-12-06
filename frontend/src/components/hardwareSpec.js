import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const response = {
  //dummy data
  runtime: "0.3987s",
  coreCount: "2",
  cpuWatt: "15.341W",
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

const HardwareSpec = () => {
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <BoxContainer>
      {isMobile ? (
        <>
          <Item>
            <div>런타임</div>
            <div>{response.runtime}</div>
          </Item>
          <Item>
            <div>코어 개수</div>
            <div>{response.coreCount}개</div>
          </Item>
          <Item>
            <div>CPU 전력 사용 비율</div>
            <div>{response.cpuWatt}</div>
          </Item>
          <Item>
            <div>CPU 사용 비율</div>
            <div>{response.cpuPercent}</div>
          </Item>
          <Item>
            <div>가용 메모리 크기</div>
            <div>{response.memory}</div>
          </Item>
          <Item>
            <div>
              메모리 사용량에 따른 <br />
              전력 소비 비율
            </div>
            <div>{response.wattPerGB}</div>
          </Item>
          <Item>
            <div>
              데이터 센터의 에너지 <br />
              효율성
            </div>
            <div>{response.efficiency}</div>
          </Item>
        </>
      ) : (
        <>
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
        </>
      )}
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
  align-items: right;
  color: #828282;
  text-align: right;
  margin: 0;
  margin-right: 1rem;
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
  @media screen and (max-width: 1000px) {
    width: 75%;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 2rem;
  > div:first-child {
    font-weight: bold;
    margin: 0.4rem 0;
  }
  > div:last-child {
    color: #828282;
  }
`;

const BoxContainer = styled.div`
  background: white;
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3 {
    color: #0fa958;
    font-weight: bold;
    font-size: 1.25rem;
    margin: 0;
  }
  > div:last-child {
    margin-top: 0;
  }
  > div:first-child {
    margin-bottom: 1rem;
  }

  border-radius: 2rem;
  box-shadow: 1px 5px 5px 5px rgba(0, 0, 0, 0.2);
  @media screen and (min-width: 1000px) {
    flex-direction: row;
    > div:last-child {
      margin-left: 0;
      border-left: 1px solid darkgray;
      padding-left: 2.5rem;
      margin-top: 2.5rem;
    }
    > div:first-child {
      margin-bottom: 2.5rem;
    }
  }
`;
export default HardwareSpec;
