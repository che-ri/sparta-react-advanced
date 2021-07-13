import styled from "styled-components";
import React from "react";

//이미지

const Image = props => {
    const { shape, src, size } = props;

    const styles = {
        src: src,
        size: size,
    };

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

    return <ImageDefault {...styles}></ImageDefault>;
};

Image.defaultProps = {
    shape: "square",
    src: "http://via.placeholder.com/400x300",
    size: 36,
};

const ImageDefault = styled.div`
    --size: ${props => props.size}px;
    width: var(--size);
    height: var(--size);
    background-image: url("${props => props.src}");
    background-size: cover;
`;

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url("${props => props.src}");
    background-size: cover;
`;

const ImageCircle = styled.div`
    --size: ${props => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url("${props => props.src}");
    background-size: cover;
    margin: 4px;
`;

export default Image;
