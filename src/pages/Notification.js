import React from "react";
import Card from "../components/Card";
import { Grid, Text, Image } from "../elements";

const Notification = props => {
    let noti = [
        {
            user_name: "aaaa",
            post_id: "post1",
            image_url: "",
        },
        {
            user_name: "aaaa",
            post_id: "post2",
            image_url: "",
        },
        {
            user_name: "aaaa",
            post_id: "post3",
            image_url: "",
        },
    ];
    return (
        <>
            <Grid padding="16px" bg="#efefef">
                {noti.map(n => {
                    return <Card key={n.post_id} {...n} />;
                })}
            </Grid>
        </>
    );
};

export default Notification;
