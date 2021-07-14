import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, uploading => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, image_url => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, preview => ({ preview }));

const initialState = {
    image_url: "",
    uploading: false,
    preview: null,
};

const uploadImageFB = image => {
    return function (dispatch, getState, { history }) {
        dispatch(uploading(true)); //이렇게 true로 주면 uploading액션생성함수에서 true 값을 image_url에 담아서 리듀서에 보내겠죠!

        //파이어베이스 스토리지에에 이미지파일 업로드하기
        //https://firebase.google.com/docs/storage/web/upload-files
        const _upload = storage.ref(`images/${image.name}`).put(image);
        _upload.then(snapshot => {
            //스토리지에 이미지를 업로드 한 후 정보를 가져올 수 있는데,
            //정보.ref 안에 getDownloadURL이라는 메서드를 사용하면? url을 가져올 수 있다.
            snapshot.ref.getDownloadURL().then(url => {
                dispatch(uploadImage(url));
            });
        });
    };
};

export default handleActions(
    {
        [UPLOAD_IMAGE]: (state, action) =>
            produce(state, draft => {
                draft.image_url = action.payload.image_url;
                draft.uploading = false;
            }),
        [UPLOADING]: (state, action) =>
            produce(state, draft => {
                draft.uploading = action.payload.uploading;
            }),
        [SET_PREVIEW]: (state, action) =>
            produce(state, draft => {
                draft.preview = action.payload.preview;
            }),
    },
    initialState
);

const actionCreators = { uploadImage, uploadImageFB, setPreview };

export { actionCreators };
