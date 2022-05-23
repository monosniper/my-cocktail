import React, {useEffect, useState} from 'react';
import Logo from "../../components/Logo";
import store from "../../store";
import {useRouter} from "next/router";
import {Skeleton} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useDocument, useDocumentDataOnce} from "react-firebase-hooks/firestore";
import {db} from "../../db";
import {doc} from "@firebase/firestore";
import DayInfo from "../../components/DayInfo";

const Report = () => {
    const router = useRouter()
    const [day, setDay] = useState(null)

    useEffect(() => {
        if(router.query.id) {
            store.getDay(router.query.id).then((rs) => {
                setDay(rs)
                console.log(rs)
            })

        }
    }, [router.query])

    return (
        <div>
            <Logo />

            <div className="wrapper">
                {day ?
                    (
                        <>
                            <div className={'title'}>{day.date.toLocaleDateString()}</div>

                            <DayInfo day={day} full />
                        </>
                    )
                    : <Skeleton variant="rectangular" width={'100%'} height={300} />
                }
            </div>
        </div>
    );
};

export default observer(Report);