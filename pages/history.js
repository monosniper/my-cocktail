import React, {useEffect} from 'react';
import Logo from "../components/Logo";
import {List, ListItem, ListItemText, Skeleton} from "@mui/material";
import Link from "next/link";
import store from "../store";
import moment from 'moment';
import 'moment/locale/ru';
import {observer} from "mobx-react";
import {BiDownArrow, BiUpArrow} from "react-icons/bi";

const History = () => {
    useEffect(() => {
        !store.days.length && store.fetchDays()
    }, [])

    return (
        <div>
            <Logo/>

            <div className="title">История</div>

            <List dense={true}>
                {store.days.length ? (
                        store.days.map((day, i, days) => {
                            let effective = 0

                            if(i+1 !== days.length) {
                                effective = (day.income / days[i+1].income * 100 - 100).toFixed(0)
                            }

                            return (
                                <ListItem key={'day-' + i}>
                                    <Link href={'/report/' + day.id}>
                                        <div className="day">
                                            <span>{moment(day.dateJs).locale('ru').format("D MMMM, dddd")}</span>
                                            {effective !== 0 ? effective > 0 ? <span className="effective up"><BiUpArrow/> {effective}% </span> : <span className="effective down"><BiDownArrow/> {effective}% </span> : null}
                                        </div>
                                    </Link>
                                </ListItem>
                            )
                        })
                    )
                    : <>
                        <ListItem>
                            <Skeleton width={'100%'} height={50}/>
                        </ListItem>
                        <ListItem>
                            <Skeleton width={'100%'} height={50}/>
                        </ListItem>
                        <ListItem>
                            <Skeleton width={'100%'} height={50}/>
                        </ListItem>
                    </>}
            </List>
        </div>
    );
};

export default observer(History);