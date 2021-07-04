import React from "react";
import styled from "styled-components";

const Button = props => {
    const { text, _onClick } = props;

    return (
        <React.Fragment>
            {/* onChange가 되면 _onChange라는 함수를 넘겨준다. */}
            <ElButton onClick={_onClick}>{text}</ElButton>
        </React.Fragment>
    );
};

Button.defaultProps = {
    //props가 없을때 오류 방지
    text: "텍스트",
    _onClick: () => {},
};

const ElButton = styled.button`
    width: 100%;
    background-color: #212121;
    color: #ffffff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
`;

export default Button;
