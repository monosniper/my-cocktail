import React, {useState} from 'react';
import {Button, CircularProgress, Stack, TextField} from "@mui/material";
import store from "../store";
import {useRouter} from "next/router";
import Logo from "../components/Logo";

const Start = () => {
    const router = useRouter()
    const [startSmallCups, setStartSmallCups] = useState(0)
    const [startLargeCups, setStartLargeCups] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const handleNext = () => {
        setIsLoading(true)

        store.startDay({
            startSmallCups,
            startLargeCups
        }).then(() => {
            router.push('/day')
        }).finally(() => setIsLoading(false))
    }

    return (
        <div>
            <Logo />
            
            <div className={'title'}>Начало дня</div>
            <div className={'wrapper'}>
                <Stack spacing={2}>
                    <TextField
                        label="Кол-во маленьких стаканчиков"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startSmallCups}
                        onChange={(e) => setStartSmallCups(e.target.value)}
                    />
                    <TextField
                        label="Кол-во больших стаканчиков"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startLargeCups}
                        onChange={(e) => setStartLargeCups(e.target.value)}
                    />
                    <div className={'center'}>
                        <Button disabled={isLoading} onClick={handleNext} variant={'contained'}>{isLoading ? <CircularProgress /> : 'Далее'}</Button>
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default Start;