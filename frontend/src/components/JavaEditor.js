import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";

const JavaEditor = () => {
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        // set editorRef.current to editor
        editorRef.current = editor;
    }

    function handleClick() {
        alert(editorRef.current.getValue());
    }

    return (
        <>
            <EditorContainer>
                <Editor
                    width="60vw"
                    height="50vh"
                    defaultLanguage="java"
                    defaultValue="// write down your code here"
                    options={{
                        theme: "vs-light",
                        minimap: {
                            enabled: false,
                        },
                        fontSize: 14,
                    }}
                    onMount={handleEditorDidMount}
                />
            </EditorContainer>
            <BtnContainer>
                <SubmitBtn onClick={handleClick}>Submit</SubmitBtn>
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
    background: #38c972;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #f8f8f8;
    font-family: Inter;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
`;

export default JavaEditor;
