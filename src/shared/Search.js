import React from "react";
import _ from "lodash";

const Search = () => {
    const [text, setText] = React.useState("");
    //useCallback(함수,함수를 초기화할 조건)

    const debounce = _.debounce(e => {
        console.log("debounce:::", e.target.value);
    }, 1000);

    const keyPress = React.useCallback(debounce, []);
    const onChange = e => {
        setText(e.target.value);
        keyPress(e);
    };

    return (
        <div>
            <input type="text" onChange={onChange} />
        </div>
    );
};

export default Search;
