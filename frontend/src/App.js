import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import HowItWorks from "./components/howItWorks";
import styled from "styled-components";
import HardwareSpec from "./components/hardwareSpec";
import CodeEditor from "./components/codeEditor";
import CardComponent from "./components/cardContainer";
import Status from "./constants/status";
import axios from "axios";

function App() {
  const defaultValue =
    "// Write down your code here\n// Your class name must be Main";

  const editorRef = useRef(null);

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
    setStatus(Status.PROGRESS);
    if (lineCount > 1000) {
      setStatus(Status.WAITING);
      alert("1000줄 이내로 작성해주시길 바랍니다.");
    } else {
      await fetchResult(editorRef.current.getValue());
    }
  }

  function handleRefresh() {
    editorRef.current.setValue(defaultValue);
    setStatus(Status.WAITING);
    setResponse(null);
  }

  function handleEditorDidMount(editor, _) {
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
        <CodeEditor
          defaultValue={defaultValue}
          editorRef={editorRef}
          status={status}
          handleRefresh={handleRefresh}
          handleSubmit={handleSubmit}
          handleEditorDidMount={handleEditorDidMount}
          handleOnChange={handleOnChange}
        />
        {status !== Status.SUCCESS && <HowItWorks />}
        {status === Status.SUCCESS && (
          <>
            <HardwareSpec response={response} />
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
