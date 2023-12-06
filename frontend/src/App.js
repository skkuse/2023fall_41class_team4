import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import HowItWorks from "./components/howItWorks";
import styled from "styled-components";
import HardwareSpec from "./components/hardwareSpec";
import JavaEditor from "./components/javaEditor";
import CardComponent from "./components/cardContainer";
import Status from "./constants/status";

function App() {
    //response 여기서 받아서 삼항연산자로 <howitworks/> : <hardwareSpce/><탄소배출량 />로 하여 props로 response 내려보내주기

    const defaultValue = "// write down your code here";

    const editorRef = useRef(null);

    const [status, setStatus] = useState(Status.WAITING);

    const [lineCount, setLineCount] = useState();

    function handleSubmit() {
        // send code to backend
        setStatus(Status.PROGRESS);
        setTimeout(() => {
            if (true) {
                setStatus(Status.SUCCESS);
            }
        }, 2000);
        // console.log(editorRef.current.getValue());
        if (lineCount > 1000) {
            alert("1000줄 이내로 작성해주시길 바랍니다.");
        } else {
            // alert(editorRef.current.getValue());
            //axios
        }
    }
    function handleRefresh() {
        editorRef.current.setValue(defaultValue);
    }

    function handleEditorDidMount(editor, monaco) {
        // set editorRef.current to editor
        setLineCount(editor.getModel().getLineCount());
        editorRef.current = editor;
    }

    function handleOnChange() {
        setLineCount(editorRef.current.getModel().getLineCount());
    }
    return (
        <>
            <Header />
            <Wrapper>
                <JavaEditor
                    defaultValue={defaultValue}
                    editorRef={editorRef}
                    status={status}
                    handleRefresh={handleRefresh}
                    handleSubmit={handleSubmit}
                    handleEditorDidMount={handleEditorDidMount}
                    handleOnChange={handleOnChange}
                />
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
