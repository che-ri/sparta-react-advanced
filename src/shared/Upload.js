import React, { useRef } from "react";
import { Button } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = props => {
    const fileInput = useRef();
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);

    const selectFile = e => {
        const file = fileInput.current.files[0];

        //fileReader 객체 문서 https://developer.mozilla.org/ko/docs/Web/API/FileReader
        const reader = new FileReader(); //파일리더라는 녀석을 불러오자!
        reader.readAsDataURL(file); //readAsDataUrl이라는 메서드는 file 객체를 보내주면 파일을 읽고, 파일의 데이터를 나타내는 url을 result에 담습니다.

        reader.onloadend = () => {
            //onloadend라는 이벤트 핸들러는 파일 읽기 동작이 끝났을 때마다 발생합니다. (읽기의 성공이나 실패 여부는 상관 않습니다.)
            dispatch(imageActions.setPreview(reader.result));
        };
    };

    const uploadFB = () => {
        if (!fileInput.current || fileInput.current.files.length === 0) {
            window.alert("파일을 선택해주세요!");
            return;
        }
        let image = fileInput.current.files[0];
        dispatch(imageActions.uploadImageFB(image));
    };
    return (
        <>
            <input
                type="file"
                ref={fileInput}
                onChange={selectFile}
                disabled={is_uploading} //disabled가 true이면 파일을 올릴 수 없어요!
            />
            <Button _onClick={uploadFB}>업로드하기</Button>
        </>
    );
};

export default Upload;
