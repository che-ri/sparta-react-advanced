import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";
import { Grid, Text, Image } from "../elements";

const Notification = props => {
    const user = useSelector(state => state.user.user);
    const [noti, setNoti] = useState([]);
    useEffect(() => {
        if (!user) return;
        const notiDB = realtime.ref(`noti/${user.uid}/list`);
        const _noti = notiDB.orderByChild("insert_dt"); //firebase의 realtime datebase는 orderByChild로 정렬할 수 있으며, 역순은 지원하지 않는다.
        _noti.once("value", snapshot => {
            if (snapshot.exists()) {
                let _data = snapshot.val();
                console.log(_data);
                let _noti_list = Object.keys(_data)
                    .reverse()
                    .map(s => _data[s]);

                setNoti(_noti_list);
            }
        });
    }, [user]);
    return (
        <>
            <Grid padding="16px" bg="#efefef">
                {noti.map((n, idx) => {
                    return <Card key={idx} {...n} />;
                })}
            </Grid>
        </>
    );
};

export default Notification;
