// import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Status from "../constants/status";

const JavaEditor = ({
    defaultValue,
    status,
    handleSubmit,
    handleRefresh,
    handleEditorDidMount,
    handleOnChange,
}) => {
    function getStatusText(status) {
        switch (status) {
            case Status.WAITING:
                return "코드를 입력해주세요.";

            case Status.PROGRESS:
                return "코드를 실행중입니다.";

            case Status.SUCCESS:
                return "코드가 성공적으로 컴파일 되었습니다!";

            default:
                return "코드를 입력해주세요.";
        }
    }

    return (
        <>
            <EditorContainer>
                <Editor
                    width="60vw"
                    height="50vh"
                    defaultLanguage="java"
                    defaultValue={defaultValue}
                    options={{
                        theme: "vs-light",
                        minimap: {
                            enabled: false,
                        },
                        fontSize: 14,
                        readOnly: status === Status.PROGRESS ? true : false,
                        readOnlyMessage: { value: "코드를 실행중입니다." },
                        wordWrap: true,
                    }}
                    onChange={handleOnChange}
                    onMount={handleEditorDidMount}
                />
            </EditorContainer>
            <BtnContainer>
                <SubmitBtn
                    onClick={handleSubmit}
                    $onProgress={status === Status.PROGRESS}
                >
                    Submit
                </SubmitBtn>
                <RefreshBtn onClick={handleRefresh}>
                    <FontAwesomeIcon icon={faRefresh} className="icon" />
                </RefreshBtn>
                <StatusText $status={status}>
                    {getStatusText(status)}
                </StatusText>
            </BtnContainer>
        </>
    );
};

const EditorContainer = styled.div`
    width: 67vw;
    background: white;
    margin: 4rem auto 1rem auto;
    padding: 1rem;
    box-shadow: 1px 3px 3px 3px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
`;

const BtnContainer = styled.div`
    width: 70vw;
    display: flex;
    justify-content: flex-start;
`;

const SubmitBtn = styled.button`
    width: 10rem;
    height: 3rem;
    margin-bottom: 4rem;
    border-radius: 15px;
    border: none;
    background: ${(props) => (props.$onProgress ? "gray" : "#38C972")};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #f8f8f8;
    font-family: Inter;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    &:hover {
        cursor: ${(props) => (props.$onProgress ? "wait" : "pointer")};
    }
`;

const RefreshBtn = styled.button`
    width: 5rem;
    height: 3rem;
    margin-bottom: 4rem;
    margin-left: 1rem;
    margin-right: 1rem;
    border-radius: 15px;
    border: none;
    background: #ffffff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    font-family: Inter;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

const StatusText = styled.p`
    font-size: 1rem;
    font-weight: bold;
    font-family: Inter;
    color: ${(props) =>
        props.$status === Status.BUILDERROR || Status.COMPILEERROR
            ? "#38C972"
            : "#C94138"};
`;

export default JavaEditor;
