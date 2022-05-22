import React, {useEffect} from 'react';
import Logo from "../components/Logo";
import {List, ListItem, ListItemText, Skeleton} from "@mui/material";
import Link from "next/link";
import store from "../store";
import moment from 'moment';
import 'moment/locale/ru';
import {observer} from "mobx-react";

const History = () => {
    console.log(store.days)
    return (
        <div>
            <Logo/>

            <div className="title">История</div>

            <List dense={true}>
                {store.days.length ? (
                        store.days.map((day, i) => (
                            <ListItem key={'day-'+i}>
                                <Link href={'/report/'+day.id}>
                                    <div className="day">{moment(day.dateJs).locale('ru').format("D MMMM, dddd")}</div>
                                </Link>
                            </ListItem>
                        ))
                    )
                    : <>
                        <ListItem>
                            <Skeleton width={'100%'} height={50} />
                        </ListItem>
                        <ListItem>
                            <Skeleton width={'100%'} height={50} />
                        </ListItem>
                        <ListItem>
                            <Skeleton width={'100%'} height={50} />
                        </ListItem>
                    </>}
            </List>
        </div>
    );
};

export default observer(History);