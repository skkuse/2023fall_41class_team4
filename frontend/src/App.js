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
import axios from "axios";
import API from "./constants/api";

function App() {
    //response 여기서 받아서 삼항연산자로 <howitworks/> : <hardwareSpce/><탄소배출량 />로 하여 props로 response 내려보내주기

    const defaultValue = "// write down your code here";

    const editorRef = useRef(null);

    // response state
    const [response, setResponse] = useState(null);

    const [status, setStatus] = useState(Status.WAITING);

    const [lineCount, setLineCount] = useState();

    async function fetchResult(value) {
        try {
            const response = await axios.post("/carbon-emission", {
                code: value,
            });
            setStatus(Status.SUCCESS);
            setResponse(response.data);
        } catch (e) {
            setStatus(Status.COMPILEERROR);
            setResponse(e.response.data);
        }
    }

    async function handleSubmit() {
        // send code to backend
        setStatus(Status.PROGRESS);
        // console.log(editorRef.current.getValue());
        if (lineCount > 1000) {
            setStatus(Status.WAITING);
            alert("1000줄 이내로 작성해주시길 바랍니다.");
        } else {
            //axios
            await fetchResult(editorRef.current.getValue());
        }
    }

    function handleRefresh() {
        editorRef.current.setValue(defaultValue);
        setStatus(Status.WAITING);
        setResponse(null);
    }

    function handleEditorDidMount(editor, _) {
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
                {status !== Status.SUCCESS && <HowItWorks />}
                {/* Component에 각각 response 넘겨주기 */}
                {status === Status.SUCCESS && (
                    <>
                        <HardwareSpec />
                        <CardComponent response={response} />
                    </>
                )}
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
