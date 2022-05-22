import {Button, Stack} from "@mui/material";
import Logo from "../components/Logo";
import Link from "next/link";
import store from "../store";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";

const Home = () => {
    const [text, setText] = useState('Начать день')

    useEffect(() => {
        if(store.isDayStarted && store.dayData.date) {
            setText(store.dayData.date)
        } else {
            setText('Начать день')
        }
    }, [store.dayData])

    return (
        <div className={'wrapper-center'}>
            <div style={{width: '100%'}}>
                <Logo/>
                <div className={'wrapper'}>
                    <div className="buttons-box">
                        <Link href={store.isDayStarted ? '/day' : '/start'}>
                            <Button className={'button'} size={'large'} variant="contained">{text}</Button>
                        </Link>
                        <Link href={'/history'}>
                            <Button className={'button'} size={'large'} variant="contained">История</Button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default observer(Home)