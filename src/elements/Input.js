import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = props => {
    const { label, placeholder, _onChange } = props;
    return (
        <React.Fragment>
            <Grid>
                <Text margin="0px">{label}</Text>
                {/* onChange가 되면 _onChange라는 함수를 넘겨준다. */}
                <ElInput placeholder={placeholder} onChange={_onChange} />
            </Grid>
        </React.Fragment>
    );
};

Input.defaultProps = {
    //props가 없을때 오류 방지
    label: "텍스트",
    placeholder: "텍스트를 입력해주세요.",
    _onChange: () => {},
};

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;
