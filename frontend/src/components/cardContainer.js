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

const CardComponent = ({ response }) => {
  const isTablet = useMediaQuery({ query: "(max-width:1000px)" });
  const isMobile = useMediaQuery({ query: "(max-width:500px)" });
  console.log("res is", response);

  return (
    <BoxWrapper>
      {isTablet ? (
        <>
          <MobileContainer>
            <BigCard
              icon={faEnvira}
              name="탄소 배출량"
              value={response.carbonFootPrint}
            />
            <BigCard icon={faBolt} name="전력 소모량" value={response.energy} />
            {!isMobile ? (
              <>
                <BigContainer className="not">
                  <SmallCard
                    className="margin"
                    icon={faTv}
                    name="TV 시청 시간"
                    value={response.tvWatchingTime}
                  />
                  <SmallCard
                    className="margin"
                    icon={faCarSide}
                    name="승용차 주행 거리"
                    value={response.passengerCarMileage}
                  />
                </BigContainer>
                <BigContainer className="not">
                  <SmallCard
                    className="margin"
                    icon={faTrainSubway}
                    name="지하철 이동 거리"
                    value={response.subwayTravelDistance}
                  />
                  <SmallCard
                    className="margin"
                    icon={faAppleWhole}
                    name="사과 생산량"
                    value={response.appleProduction}
                  />
                </BigContainer>
              </>
            ) : (
              <>
                <BigCard
                  icon={faTv}
                  name="TV 시청 시간"
                  value={response.tvWatchingTime}
                />
                <BigCard
                  icon={faCarSide}
                  name="승용차 주행 거리"
                  value={response.passengerCarMileage}
                />
                <BigCard
                  icon={faTrainSubway}
                  name="지하철 이동 거리"
                  value={response.subwayTravelDistance}
                />
                <BigCard
                  icon={faAppleWhole}
                  name="사과 생산량"
                  value={response.appleProduction}
                />
              </>
            )}
          </MobileContainer>
        </>
      ) : (
        <>
          <BigContainer>
            <BigCard
              icon={faEnvira}
              name="탄소 배출량"
              value={response.carbonFootPrint}
            />
            <BigCard icon={faBolt} name="전력 소모량" value={response.energy} />
          </BigContainer>
          <SmallContainer>
            <SmallCard
              icon={faTv}
              name="TV 시청 시간"
              value={response.tvWatchingTime}
            />
            <SmallCard
              icon={faCarSide}
              name="승용차 주행 거리"
              value={response.passengerCarMileage}
            />
            <SmallCard
              icon={faTrainSubway}
              name="지하철 이동 거리"
              value={response.subwayTravelDistance}
            />
            <SmallCard
              icon={faAppleWhole}
              name="사과 생산량"
              value={response.appleProduction}
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
