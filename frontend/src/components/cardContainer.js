import styled from "styled-components";
import BigCard from "./bigCard";
import SmallCard from "./smallCard";
import { faEnvira } from "@fortawesome/free-brands-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const response = {
  //dummy data
  runtime: "0.3h",
  coreCount: "2",
  cpuWatt: "15W",
  cpuPercent: "80%",
  memory: "3GB",
  wattPerGB: "0.3725W/GB",
  efficiency: "1.125",
  co2: "3.01µgCO2e",
  power: "6.91µWh",
  tv: "34.32μs",
  car: "17.21µm",
  elevator: "15.71mm",
  a4: "26.43µg",
};

const CardComponent = () => {
  const isTablet = useMediaQuery({ query: "(max-width:1000px)" });
  const isMobile = useMediaQuery({ query: "(max-width:500px)" });

  return (
    <BoxWrapper>
      {isTablet ? (
        <>
          <MobileContainer>
            <BigCard icon={faEnvira} name="탄소 배출량" value={response.co2} />
            <BigCard icon={faBolt} name="전력 소모량" value={response.power} />
            {!isMobile ? (
              <>
                <BigContainer className="not">
                  <SmallCard
                    className="margin"
                    icon={faTv}
                    name="TV 시청 시간"
                    value={response.tv}
                  />
                  <SmallCard
                    className="margin"
                    icon={faCarSide}
                    name="승용차 주행 거리"
                    value={response.car}
                  />
                </BigContainer>
                <BigContainer className="not">
                  <SmallCard
                    className="margin"
                    icon={faTrainSubway}
                    name="지하철 이동 거리"
                    value={response.subway}
                  />
                  <SmallCard
                    className="margin"
                    icon={faAppleWhole}
                    name="사과 생산량"
                    value={response.apple}
                  />
                </BigContainer>
              </>
            ) : (
              <>
                <BigCard icon={faTv} name="TV 시청 시간" value={response.tv} />
                <BigCard
                  icon={faCarSide}
                  name="승용차 주행 거리"
                  value={response.car}
                />
                <BigCard
                  icon={faTrainSubway}
                  name="지하철 이동 거리"
                  value={response.subway}
                />
                <BigCard
                  icon={faAppleWhole}
                  name="사과 생산량"
                  value={response.apple}
                />
              </>
            )}
          </MobileContainer>
        </>
      ) : (
        <>
          <BigContainer>
            <BigCard icon={faEnvira} name="탄소 배출량" value={response.co2} />
            <BigCard icon={faBolt} name="전력 소모량" value={response.power} />
          </BigContainer>
          <SmallContainer>
            <SmallCard icon={faTv} name="TV 시청 시간" value={response.tv} />
            <SmallCard
              icon={faCarSide}
              name="승용차 주행 거리"
              value={response.car}
            />
            <SmallCard
              icon={faTrainSubway}
              name="지하철 이동 거리"
              value={response.subway}
            />
            <SmallCard
              icon={faAppleWhole}
              name="사과 생산량"
              value={response.apple}
            />
          </SmallContainer>
        </>
      )}
    </BoxWrapper>
  );
};

const BoxWrapper = styled.div`
  margin: 2rem;
  background: white;
  border-radius: 2rem;
  width: 70vw;
  border-radius: 2rem;
  box-shadow: 1px 5px 5px 5px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 400px) {
    width: 95%;
  }
`;

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin: 1.5rem;
    padding: 1rem;
  }
  .not {
    padding: 0;
    > div:first-child {
      margin-right: 1rem;
    }
    > div:last-child {
      margin-left: 1rem;
    }
  }
`;

const BigContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div {
    margin: 2rem 1rem 0 1rem;
  }
  .margin {
    border: 1px solid purple;
  }
  @media screen and (max-width: 1000px) {
    padding: 0;
    > div {
      margin: 0;
    }
  }
`;

const SmallContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > div {
    margin: 0 1rem 2rem 1rem;
  }
`;

export default CardComponent;
