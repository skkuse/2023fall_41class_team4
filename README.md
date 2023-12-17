# CODEMETER 프로젝트

## 프로젝트 소개

CODEMETER(코드미터)는 사용자로부터 JAVA 코드를 입력받아 이를 컴파일 및 실행하고, 이 과정에서 컴파일된 프로그램의 실행 시간과 메모리 사용량을 측정한 뒤, 측정값을 바탕으로 서버의 컴퓨팅 환경에서 코드가 탄소를 얼마나 배출하는지를 계산하여 사용자에게 출력하는 웹 서비스입니다.

## 프로젝트 목표

본 프로젝트는 JAVA 코드 실행 시 발생되는 탄소 배출량을 측정하는 도구를 구현하는 것을 목표로 합니다. 해당 측정 도구를 통해 개발자들이 본인의 코드가 환경에 미치는 영향을 손쉽게 파악할 수 있도록 하고, 이를 통해 환경 친화적인 코드를 작성하도록 유도하며, 궁극적으로는 컴퓨터 분야의 지속가능한 발전에 기여하고자 합니다.

## 주요 기능

1. **코드 컴파일 및 실행**: 사용자는 CODEMETER 웹 페이지를 통해 JAVA 코드를 입력하고, 해당 코드가 서버에서 컴파일 및 실행됩니다.

2. **실행 시간 및 메모리 측정**: 코드 실행 과정에서 프로그램의 실행 시간과 메모리 사용량이 측정되어 기록됩니다.

3. **탄소 배출 계산**: 측정된 실행 시간 및 메모리 사용량을 기반으로 코드가 실행될 때 서버의 컴퓨팅 환경에서 발생하는 탄소 배출량이 계산되어 사용자에게 제공됩니다.

4. **안정적인 서비스 제공**: 안정성이 필요한 경우 실행 시간 제한 및 리소스 격리 작업을 수행하여 부적절한 사용을 방지합니다.

## 사용법

1. **코드 입력**: [CODEMETER 웹 페이지](<(https://not-yet.com)>)에서 JAVA 코드를 입력합니다.

2. **컴파일 및 실행**: 입력한 코드는 서버에서 컴파일되고 실행됩니다.

3. **측정 결과 확인**: 코드 실행이 완료되면 실행 시간과 메모리 사용량이 측정된 결과를 확인할 수 있습니다.

4. **탄소 배출량 확인**: 측정된 결과를 기반으로 코드 실행 시 서버에서 발생한 탄소 배출량을 확인합니다.

## 사용한 프레임워크

### Frontend

|    언어    | 라이브러리/프레임워크 |    스타일링 툴    |
| :--------: | :-------------------: | :---------------: |
| JavaScript |         React         | Styled-components |

### Backend

| 프레임워크 | 데이터베이스 |
| :--------: | :----------: |
|  Next.js   |    MySQL     |

## 주의사항

- 입력 가능한 코드는 JAVA로 제한되어 있습니다.
- 코드 실행 결과 및 탄소 배출량은 참고용으로 제공되며, 정확성을 보장하지 않습니다.
- 사용자의 입력 및 코드를 실행하고 결과를 저장하는 시간은 최대 30초로 제한되어 있습니다.
- JAVA 코드는 1000줄 이상 입력할 수 없고, 코드의 최대 크기는 4KB 입니다.
- JAVA 코드의 main 함수가 포함된 클래스의 이름은 Main이어야 합니다.
- CODEMETER는 Window 10 이상, Google Chrome 버전 96 이상을 타겟으로 하고 있으며, 이보다 낮은 버전으로 실행하거나 V8 Engine이 아닌 브라우저를 사용할 시 정상 동작 하지 않을 수 있습니다.

## 개발자 정보

- 프로젝트 팀 이름: 4조
- 프로젝트 팀원
  - 프론트엔드
    - 김동한: dwchoi95@gmail.com
    - 조유지: youjicho@g.skku.edu
  - 백엔드
    - 안낙균: rbszzang@g.skku.edu
    - 유지훈: qwernmbv@g.skku.edu
    - 임소리: drwho@g.skku.edu
    - 조민호: chominho96@g.skku.edu

---

더 많은 정보 및 업데이트는 [CODEMETER 웹사이트](https://not-yet.com)에서 확인하실 수 있습니다.