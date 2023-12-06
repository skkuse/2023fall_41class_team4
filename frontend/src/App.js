import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import HowItWorks from "./components/howItWorks";
import styled from "styled-components";
import HardwareSpec from "./components/hardwareSpec";
import JavaEditor from "./components/javaEditor";
import CardComponent from "./components/cardContainer";

function App() {
    //response 여기서 받아서 삼항연산자로 <howitworks/> : <hardwareSpce/><탄소배출량 />로 하여 props로 response 내려보내주기
    return (
        <>
            <Header />
            <Wrapper>
                <JavaEditor />
                <HardwareSpec />
                <HowItWorks />
                <CardComponent />
            </Wrapper>
            <Footer />
        </>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f8f8f8;
`;

export default App;
