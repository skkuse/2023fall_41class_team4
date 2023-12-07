import styled from "styled-components";
import MathJax from "react-mathjax";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";

const HowItWorks = () => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:830px)" });
  const inlineFormula = ` E = t * (n_c * P_c * u_c + n_m * P_m) * PUE * 0.001`;
  return (
    <HowItWorksContainer>
      <h1>How It Works?</h1>
      <BoxContainer>
        <div>
          <h3>
            <FontAwesomeIcon icon={faLeaf} className="icon" />
            CODEMETER란?
          </h3>
          <p>
            CODEMETER는 Java 코드 탄소배출량 측정 시스템입니다. 사용자로부터
            Java 코드를 입력받고, 해당 코드의 실행시간과 메모리 사용량을
            계산하여 특정 컴퓨팅 환경에서 코드가 배출하는 탄소배출량을 계산하고
            사용자에게 출력해주는 웹 서비스입니다.
          </p>
        </div>
        <div>
          <h3>
            <FontAwesomeIcon icon={faLeaf} className="icon" />
            어떻게 사용하나요?
          </h3>
          <p>
            탄소배출량을 측정하고 싶은 JAVA 코드를 상단의 코드 입력란에
            붙여넣습니다. RUN 버튼을 누르면 입력한 코드가 서버에 전송되며,
            컴파일 성공 여부가 입력란 하단에 표시됩니다. 컴파일에 성공했다면,
            현재의 설명란에 서버의 스펙 정보와 탄소배출량이 표시됩니다. 코드를
            실행하기 전, 에러나 무한 루프 등의 요소가 없는지 확인해주세요.
          </p>
        </div>
        <div>
          <h3>
            <FontAwesomeIcon icon={faLeaf} className="icon" />
            무엇을 보여주나요?
          </h3>
          <p>
            탄소배출량을 kg단위로, 전력 소모량을 kWh 단위로 계산하여 표시합니다.
            이때, 에너지는{" "}
          </p>
          {isDesktopOrMobile ? (
            <span>{inlineFormula}</span>
          ) : (
            <MathJax.Provider>
              <MathJax.Node inline formula={inlineFormula} />
            </MathJax.Provider>
          )}
          <p>
            의 식을 통해 계산됩니다. t는 런타임, n_c는 코어 개수, P_c는 CPU 전력
            사용 비율, u_c는 CPU 사용 비율, n_m은 가용 메모리 크기, P_m은 메모리
            사용량에 따른 전력 소비 비율이며 PUE는 데이터 센터의 에너지
            효율성으로, 모두 하드웨어 스펙 표시란에 기재되어 있습니다. 이외에도,
            탄소 배출량의 실감을 위해 탄소 배출량을 TV 시청 시간, A4 용지 사용량
            등 일상에서 친숙하게 접할 수 있는 값으로 환산하여 나타냅니다.
          </p>
        </div>
      </BoxContainer>
    </HowItWorksContainer>
  );
};

const HowItWorksContainer = styled.div`
  background: white
  color: white;
  padding: 2rem;
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.25rem;

  .icon {
    font-size: 2.5rem;
    color: white;
  }
  h1 {
    font-weight: bold;
    font-size: 3rem;
  }
  @media screen and (max-width: 700px) {
    width: 80%;
  }
  @media screen and (max-width: 400px) {
    > h1 {
      font-size: 2.2rem;
    }
  }

`;
const BoxContainer = styled.div`
  background: #f8f8f8;
  h3 {
    color: #0fa958;
    font-weight: bold;
    font-size: 1.25rem;
    margin: 0;
  }
  > div {
    margin: 3rem;
    text-align: left;
  }
  p {
    margin: 10px 0;
    white-space: pre-wrap;
  }
  .icon {
    color: #0fa958;
    font-size: 1.25rem;
    margin: 0 0.5rem 0 0;
  }
  border-radius: 2rem;
  /* padding: 3rem; */
  width: 70vw;
  box-shadow: 1px 5px 5px 5px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 700px) {
    width: 90%;
    padding: 1rem;
    > div {
      margin: 1rem;
    }
  }
  @media screen and (max-width: 400px) {
    padding: 1rem;
    width: 95%;
  }
`;
export default HowItWorks;
