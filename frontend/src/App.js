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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./components/modal";

function App() {
  const defaultValue =
    "// Write down your code here\n// Your class name must be Main\npublic class Main {\n   public static void main(String[] args) {\n\n   }\n}";

  const editorRef = useRef(null);

  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(Status.WAITING);
  const [lineCount, setLineCount] = useState();

  const showToastMessage = () => {
    toast.error("코드는 1000줄 이내로 작성해주시길 바랍니다.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  async function fetchResult(value) {
    try {
      const timeout = 30000;
      const response = await axios.post("/carbon-emission", {
        timeout,
        code: value,
      });
      setStatus(Status.SUCCESS);
      setResponse(response.data);
    } catch (e) {
      if (e.response.data.error === "RuntimeError") {
        setStatus(Status.RUNTIMEERROR);
      } else {
        setStatus(Status.COMPILEERROR);
      }
      setResponse(e.response.data);
      setModalVisible(true);
    }
  }

  async function handleSubmit() {
    if (lineCount > 1000) {
      showToastMessage();
    } else {
      setStatus(Status.PROGRESS);
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

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
      >
        {status === (Status.COMPILEERROR || Status.RUNTIMEERROR) && (
          <ModalMessage>{response.message}</ModalMessage>
        )}
      </Modal>
      <Header />
      <Wrapper>
        <ToastContainer />
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

const ModalMessage = styled.div`
  font-size: 1rem;
  font-weight: medium;
  overflow: auto;
  word-break: break-all;
  margin-top: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
`;

export default App;
