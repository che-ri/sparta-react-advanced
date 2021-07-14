import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = ({ label, placeholder, _onChange, type, multiLine, value }) => {
    if (multiLine)
        return (
            <Grid>
                {label && <Text margin="0px">{label}</Text>}
                <ElTextarea
                    type={type}
                    placeholder={placeholder}
                    onChange={_onChange}
                    value={value}
                    //rows는 textarea의 기본 속성입니다. n줄만큼의 높이를 늘립니다.
                    rows="10"
                />
            </Grid>
        );
    return (
        <React.Fragment>
            <Grid>
                {label && <Text margin="0px">{label}</Text>}
                {/* onChange가 되면 _onChange라는 함수를 넘겨준다. */}
                <ElInput
                    type={type}
                    placeholder={placeholder}
                    onChange={_onChange}
                />
            </Grid>
        </React.Fragment>
    );
};

Input.defaultProps = {
    //props가 없을때 오류 방지
    label: false,
    placeholder: "텍스트를 입력해주세요.",
    _onChange: () => {},
    type: "text",
    multiLine: false,
    value: "",
};

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

const ElTextarea = styled.textarea`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;
