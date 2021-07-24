import React, { useEffect, useCallback } from "react";
import _ from "lodash";

const InfinityScroll = ({ children, callNext, is_next, loading }) => {
    const _handleScroll = _.throttle(() => {
        if (loading) return;

        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const scrollTop =
            //만약에 documentElement가 있으면 documentElement의 scrollTop을 가져오고, 없으면 body의 scrollTop을 가져온다. => 크로스브라우징 이유로 이렇게 사용한다.
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;

        if (scrollHeight - innerHeight - scrollTop < 200) callNext();

        callNext();
    }, 1000);

    const handleScroll = useCallback(_handleScroll, [loading]); //1. loading이 true일때 _handleScroll이 작동됩니다! => 똑같은 이벤트가 계속 발생될때, 또 함수가 실행되지 않도록(문서를 가져오지 않도록) 막아줍니다.

    useEffect(() => {
        if (loading) return; //똑같은 이벤트가 계속 발생될때, 또 함수가 실행되지 않도록(문서를 가져오지 않도록) 막아줍니다.

        //is_next값이 있다면?(더 불러올 리스트가 있다면) 이벤트를 구독하고, 아니면 이벤트리스너를 구독해제합시다 (리소스 잡아먹잖아요~)
        if (is_next) window.addEventListener("scroll", handleScroll);
        else window.removeEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll); //클린업 : 함수형 컴포넌트에서 언마운트와 비슷한 역할을 한다. 화면에서 사라질 때 return구문이 실행이 된다.
    }, [is_next, loading]); //is_next나 loading이 바뀌면 실행하면 되겠죠!

    return <>{children}</>;
};

InfinityScroll.defaultProps = {
    children: null, //  list가 들어가겠죠!
    callNext: () => {}, //다음 것을 불러올 함수
    is_next: false, //다음으로 불러올 목록이 있는지 확인해야 callNext를 부를지 말지를 결정할 수 있어요!
    loading: false, //같은 이벤트로 인해, 똑같은 것을 불러오는 것을 방지하기 위해 loading이라는 데이터를 사용한다.
};

export default InfinityScroll;
