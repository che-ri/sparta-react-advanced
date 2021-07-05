import React from "react";
import styled from "styled-components";

const Button = props => {
    const { is_fixed, width, margin, text, children, _onClick } = props;
    const styles = { margin, width };
    if (is_fixed)
        return (
            <>
                <FixedButton onClick={_onClick}>
                    {text ? text : children}
                </FixedButton>
            </>
        );
    return (
        <React.Fragment>
            {/* onChange가 되면 _onChange라는 함수를 넘겨준다. */}
            <ElButton {...styles} onClick={_onClick}>
                {text ? text : children}
            </ElButton>
        </React.Fragment>
    );
};

Button.defaultProps = {
    //props가 없을때 오류 방지
    is_fixed: false,
    width: "100%",
    margin: false,
    text: false,
    children: null,
    _onClick: () => {},
};

const ElButton = styled.button`
    width: ${props => props.width};
    background-color: #212121;
    color: #ffffff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
    ${props => (props.margin ? `margin:${props.margin};` : ``)}
`;

const FixedButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: #212121;
    color: #ffffff;
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 16px;
    text-align: center;
    vertical-align: middle;
    border: none;
    border-radius: 50px;
`;

export default Button;
