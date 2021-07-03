import React from "react";
import styled from "styled-components";

const Text = ({ bold, color, size, children }) => {
    const styles = { bold, color, size };
    return (
        <>
            <P {...styles}>{children}</P>
        </>
    );
};

Text.defaultProps = {
    children: null,
    bold: false,
    color: "#222831",
    size: "14px",
};

const P = styled.p`
    color: ${props => props.color};
    font-size: ${props => props.size};
    //bold로 넘어온값이 true면 600 false면 400입니다.
    font-weight: ${props => (props.bold ? "600" : "400")};
`;

export default Text;
