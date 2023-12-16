import React, { useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Modal({
    className,
    onClose,
    maskClosable,
    closable,
    visible,
    children,
}) {
    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    };

    const close = (e) => {
        if (onClose) {
            onClose(e);
        }
    };
    return (
        <>
            <ModalOverlay $visible={visible} />
            <ModalWrapper
                className={className}
                onClick={maskClosable ? onMaskClick : null}
                tabIndex="-1"
                $visible={visible}
            >
                <ModalInner tabIndex="0" className="modal-inner">
                    {closable && (
                        <FontAwesomeIcon
                            icon={faClose}
                            className="icon"
                            onClick={close}
                            size="lg"
                        />
                    )}
                    {children}
                </ModalInner>
            </ModalWrapper>
        </>
    );
}

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.$visible ? "block" : "none")};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.$visible ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`;

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 10px;
    width: 70vw;
    max-width: 480px;
    top: 50%;
    overflow-y: scroll;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;

export default Modal;
