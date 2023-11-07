import styled from "styled-components";

const HowItWorks = () => {
  return (
    <HowItWorksContainer>
      <h1>How It Works?</h1>
      <BoxContainer>
        <div>CODEMETER란?</div>
        <p>
          CODEMETER는 Java 코드 탄소배출량 측정 시스템입니다. 사용자로부터 Java
          코드를 입력받고, 해당 코드의 실행시간과 메모리 사용량을 계산하여 특정
          컴퓨팅 환경에서 코드가 배출하는 탄소배출량을 계산하고 사용자에게
          출력해주는 웹 서비스입니다.
        </p>
        <div>어떻게 사용하나요?</div>
        <p>
          탄소배출량을 측정하고 싶은 JAVA 코드를 상단의 코드 입력란에
          붙여넣습니다. RUN 버튼을 누르면 입력한 코드가 서버에 전송되며, 컴파일
          성공 여부가 입력란 하단에 표시됩니다. 컴파일에 성공했다면, 현재의
          설명란에 서버의 스펙 정보와 탄소배출량이 표시됩니다. 코드를 실행하기
          전, 에러나 무한 루프 등의 요소가 없는지 확인해주세요.
        </p>

        <div>무엇을 보여주나요?</div>
        <p>
          탄소배출량을 kg단위로, 전력 소모량을 kWh 단위로 계산하여 표시합니다.
          이때, 에너지는 E = t x (n_c x P_c x u_c + n_m x P_m) x PUE x 0.001의
          식을 통해 계산됩니다. t는 런타임, n_c는 코어 개수, P_c는 CPU 전력 사용
          비율, u_c는 CPU 사용 비율, n_m은 가용 메모리 크기, P_m은 메모리
          사용량에 따른 전력 소비 비율이며 PUE는 데이터 센터의 에너지
          효율성으로, 모두 하드웨어 스펙 표시란에 기재되어 있습니다. 이외에도,
          탄소 배출량의 실감을 위해 탄소 배출량을 TV 시청 시간, A4 용지 사용량
          등 일상에서 친숙하게 접할 수 있는 값으로 환산하여 나타냅니다.
        </p>
      </BoxContainer>
    </HowItWorksContainer>
  );
};

const HowItWorksContainer = styled.div`
  background: white
  color: white;
  padding: 2.5rem;
  width: 80%;
  border: 1px solid pink; //temporary border
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
  }
`;
const BoxContainer = styled.ul`
  background: #f8f8f8;
  border: 1px solid black;
  > li {
    list-style: none;
    margin: 0.5rem 0rem;
  }
`;
export default HowItWorks;
