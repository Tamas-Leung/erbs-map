import ReactDom from "react-dom";
import styled from "styled-components";

const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "hsla(0, 0%, 0%, .3)",
    zIndex: 1000,
};

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: hsla(0, 0%, 0%, 0.3);
    z-index: 1000;
`;

export default function Modal({ open, children, onClose }) {
    if (!open) return null;

    return ReactDom.createPortal(
        <>
            <Overlay onClick={onClose} />
            <StyledModal>{children}</StyledModal>
        </>,
        document.getElementById("root")
    );
}
