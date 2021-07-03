import React from "react";
import styled from "styled-components";
import img from "../img_cheri.jpg";

const Image = props => {
    const { shape, src, size } = props;
    const styles = { src, size };
    if (shape === "circle") {
        return <ImageCircle {...styles}></ImageCircle>;
    }

    if (shape === "rectangle") {
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        );
    }
    return <></>;
};

Image.defaultProps = {
    shape: "circle",
    src: `"${img}"`,
    size: 36,
};

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    //3:4비율로 맞추기위하여 padding-top에 75%를 줍니다.
    padding-top: 75%;
    overflow: hidden;
    background-image: url(${props => props.src});
    background-size: cover;
`;

const ImageCircle = styled.div`
    /* style 변수를 만들기 위해 --를 사용합니다! */
    --size: ${props => props.size}px;
    /* css변수 적용했을 때와 같아요! */
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url(${props => props.src});
    background-size: cover;
    margin: 4px;
`;

export default Image;
