import styled from "styled-components";
import BigCard from "./bigCard";
import SmallCard from "./smallCard";
import { faEnvira } from "@fortawesome/free-brands-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { faAppleWhole } from "@fortawesome/free-solid-svg-icons";

// const response = {
//   //dummy data
//   runtime: "0.3h",
//   coreCount: "2",
//   cpuWatt: "15W",
//   cpuPercent: "80%",
//   memory: "3GB",
//   wattPerGB: "0.3725W/GB",
//   efficiency: "1.125",
//   co2: "14.04kg",
//   power: "14.04kWh",
//   tv: "3h",
//   car: "10km",
//   subway: "20m",
//   apple: "30g",
// };

const CardComponent = ({ response }) => {
    return (
        <BoxWrapper>
            <BigContainer>
                <BigCard
                    icon={faEnvira}
                    name="탄소 배출량"
                    value={response.carbonFootPrint}
                />
                <BigCard
                    icon={faBolt}
                    name="전력 소모량"
                    value={response.energy}
                />
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
