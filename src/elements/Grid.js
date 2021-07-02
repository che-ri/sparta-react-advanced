import React from "react";
import styled from "styled-components";

const Grid = props => {
    const { children, is_flex, width, margin, padding, bg } = props;
    const styles = { is_flex, width, margin, padding, bg };
    return (
        <>
            {/* styles이라는 이름으로 지정한 속성들을 GridBox에 넘겨준다. */}
            <GridBox {...styles}>{children}</GridBox>
        </>
    );
};

Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
};

const GridBox = styled.div`
    width: ${props => props.width};
    height: 100%;
    box-sizing: border-box;
    /* 아래의 props가 있다면 props 안에 스타일 값을 할당하고, 없으면 값을 지운다. */
    ${props =>
        props.is_flex
            ? `display:flex; align-items:center; justify-content: space-between;`
            : ""}
    ${props => (props.padding ? `padding:${props.padding};` : "")}
    ${props => (props.margin ? `margin:${props.margin};` : "")}
    ${props => (props.bg ? `background-color:${props.bg};` : "")}
`;

export default Grid;
