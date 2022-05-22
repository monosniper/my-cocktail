import React, {useState} from 'react';
import store from "../store";
import {Box, Button, CircularProgress, Grid, Modal, Skeleton, Stack, TextField} from "@mui/material";
import Noty from 'noty'
import Logo from "../components/Logo";
import {useRouter} from "next/router";
import DayInfo from "../components/DayInfo";
import {observer} from "mobx-react";

const Day = () => {
    const router = useRouter()

    const [freeModalOpen, setFreeModalOpen] = useState(false)
    const [returnModalOpen, setReturnModalOpen] = useState(false)
    const [pushModalOpen, setPushModalOpen] = useState(false)
    const [pickUpModalOpen, setPickUpModalOpen] = useState(false)
    const [spentModalOpen, setSpentModalOpen] = useState(false)
    const [finishModalOpen, setFinishModalOpen] = useState(false)

    const [isFreeLoading, setIsFreeLoading] = useState(false)
    const [isReturnLoading, setIsReturnLoading] = useState(false)
    const [isPushLoading, setIsPushLoading] = useState(false)
    const [isPickUpLoading, setIsPickUpLoading] = useState(false)
    const [isSpentLoading, setIsSpentLoading] = useState(false)
    const [isFinishLoading, setIsFinishLoading] = useState(false)

    const [freeSmallCups, setFreeSmallCups] = useState(0)
    const [freeLargeCups, setFreeLargeCups] = useState(0)
    const [freeComment, setFreeComment] = useState('')

    const [returnSmallCups, setReturnSmallCups] = useState(0)
    const [returnLargeCups, setReturnLargeCups] = useState(0)
    const [returnComment, setReturnComment] = useState('')

    const [pushSmallCups, setPushSmallCups] = useState(0)
    const [pushLargeCups, setPushLargeCups] = useState(0)

    const [pickUpWas, setPickUpWas] = useState(0)
    const [pickUpAmount, setPickUpAmount] = useState(0)
    const [pickUpComment, setPickUpComment] = useState('')

    const [spentAmount, setSpentAmount] = useState(0)
    const [spentComment, setSpentComment] = useState('')

    const [finishSmallCups, setFinishSmallCups] = useState(0)
    const [finishLargeCups, setFinishLargeCups] = useState(0)

    const handleFree = () => {
        setIsFreeLoading(true)

        store.addGift({
            small: freeSmallCups,
            large: freeLargeCups,
            comment: freeComment,
        }).then(() => {
            setFreeModalOpen(false)
            setIsFreeLoading(false)

            setFreeSmallCups(0)
            setFreeLargeCups(0)
            setFreeComment('')

            new Noty({
                text: 'Готово',
                type: 'success'
            }).show()
        })
    }

    const handleReturn = () => {
        setIsReturnLoading(true)

        store.addReturn({
            small: returnSmallCups,
            large: returnLargeCups,
            comment: returnComment,
        }).then(() => {
            setReturnModalOpen(false)
            setIsReturnLoading(false)

            setReturnSmallCups(0)
            setReturnLargeCups(0)
            setReturnComment('')

            new Noty({
                text: 'Готово',
                type: 'success'
            }).show()
        })
    }

    const handlePush = () => {
        setIsPushLoading(true)

        store.addPushUp({
            small: pushSmallCups,
            large: pushLargeCups,
        }).then(() => {
            setPushModalOpen(false)
            setIsPushLoading(false)

            setPushSmallCups(0)
            setPushLargeCups(0)

            new Noty({
                text: 'Готово',
                type: 'success'
            }).show()
        })
    }

    const handlePickUp = () => {
        setIsPickUpLoading(true)

        store.addPickUp({
            was: pickUpWas,
            amount: pickUpAmount,
            comment: pickUpComment,
        }).then(() => {
            setPickUpModalOpen(false)
            setIsPickUpLoading(false)

            setPickUpWas(0)
            setPickUpAmount(0)
            setPickUpComment('')

            new Noty({
                text: 'Готово',
                type: 'success'
            }).show()
        })
    }

    const handleSpent = () => {
        setIsSpentLoading(true)

        store.addSpent({
            amount: spentAmount,
            comment: spentComment,
        }).then(() => {
            setSpentModalOpen(false)
            setIsSpentLoading(false)

            setSpentAmount(0)
            setSpentComment('')

            new Noty({
                text: 'Готово',
                type: 'success'
            }).show()
        })
    }

    const handleFinish = () => {
        setIsFinishLoading(true)

        store.endDay({
            endSmallCups: finishSmallCups,
            endLargeCups: finishLargeCups,
        }).then((id) => {
            setFinishModalOpen(false)
            setIsFinishLoading(false)

            setFinishSmallCups(0)
            setFinishLargeCups(0)

            new Noty({
                text: 'День успешно закончен',
                type: 'success'
            }).show()

            router.push('/report/'+store.dayId)
        })
    }

    const handleOpenFree = () => {setFreeModalOpen(true)}
    const handleOpenReturn = () => {setReturnModalOpen(true)}
    const handleOpenPush = () => {setPushModalOpen(true)}
    const handleOpenPickUp = () => {setPickUpModalOpen(true)}
    const handleOpenSpent = () => {setSpentModalOpen(true)}
    const handleOpenFinish = () => {setFinishModalOpen(true)}

    const handleCloseFreeModal = () => {setFreeModalOpen(false)}
    const handleCloseReturnModal = () => {setReturnModalOpen(false)}
    const handleClosePushModal = () => {setPushModalOpen(false)}
    const handleClosePickUpModal = () => {setPickUpModalOpen(false)}
    const handleCloseSpentModal = () => {setSpentModalOpen(false)}
    const handleCloseFinishModal = () => {setFinishModalOpen(false)}

    return (
        <div className="wrapper">
            <Logo />

            {store.dayId ? (
                <>
                    <div className={'title'}>{store.dayData.date}</div>

                    <Stack spacing={3}>
                        <div className="buttons-box">
                            <Button className={'button'} size={'large'} onClick={handleOpenFree} variant={'contained'}>Бесплатный коктейль</Button>
                            <Button className={'button'} size={'large'} onClick={handleOpenReturn} variant={'contained'}>Возврат</Button>
                            <Button className={'button'} size={'large'} onClick={handleOpenPush} variant={'contained'}>Пополнение</Button>
                            <Button className={'button'} size={'large'} onClick={handleOpenPickUp} variant={'contained'}>Изъятие из кассы</Button>
                            <Button className={'button'} size={'large'} onClick={handleOpenSpent} variant={'contained'}>Доп. затраты</Button>
                        </div>

                        <DayInfo day={store.dayData} />

                        <Button color={'error'} className={'button'} size={'large'} onClick={handleOpenFinish} variant={'outlined'}>Закончить день</Button>
                    </Stack>

                    <Modal
                        open={freeModalOpen}
                        onClose={handleCloseFreeModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={'modal-box'}>
                            <div className="sub-title">Бесплатный коктейль</div>
                            <Stack spacing={2}>
                                <TextField
                                    label="Кол-во мал. стаканчиков"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={freeSmallCups}
                                    onChange={(e) => setFreeSmallCups(e.target.value)}
                                />
                                <TextField
                                    label="Кол-во бол. стаканчиков"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={freeLargeCups}
                                    onChange={(e) => setFreeLargeCups(e.target.value)}
                                />
                                <TextField
                                    label="Комментарий"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={freeComment}
                                    onChange={(e) => setFreeComment(e.target.value)}
                                />
                                <div className="center">
                                    <Button disabled={isFreeLoading} onClick={handleFree} variant={'contained'}>{isFreeLoading ? <CircularProgress /> : 'Готово'}</Button>
                                </div>
                            </Stack>
                        </Box>
                    </Modal>

                    <Modal
                        open={returnModalOpen}
                        onClose={handleCloseReturnModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={'modal-box'}>
                            <div className="sub-title">Возврат</div>
                            <Stack spacing={2}>
                                <TextField
                                    label="Кол-во мал. стаканчиков"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={returnSmallCups}
                                    onChange={(e) => setReturnSmallCups(e.target.value)}
                                />
                                <TextField
                                    label="Кол-во бол. стаканчиков"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={returnLargeCups}
                                    onChange={(e) => setReturnLargeCups(e.target.value)}
                                />
                                <TextField
                                    label="Комментарий"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={returnComment}
                                    onChange={(e) => setReturnComment(e.target.value)}
                                />
                                <div className="center">
                                    <Button disabled={isReturnLoading} onClick={handleReturn} variant={'contained'}>{isReturnLoading ? <CircularProgress /> : 'Готово'}</Button>
                                </div>
                            </Stack>
                        </Box>
                    </Modal>

                    <Modal
                        open={pushModalOpen}
                        onClose={handleClosePushModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={'modal-box'}>
                            <div className="sub-title">Пополнение</div>
                            <Stack spacing={2}>
                                <TextField
                                    label="Кол-во мал. стаканчиков"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={pushSmallCups}
                                    onChange={(e) => setPushSmallCups(e.target.value)}
                                />
                                <TextField
                                    label="Кол-во бол. стаканчиков"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={pushLargeCups}
                                    onChange={(e) => setPushLargeCups(e.target.value)}
                                />
                                <div className="center">
                                    <Button disabled={isPushLoading} onClick={handlePush} variant={'contained'}>{isPushLoading ? <CircularProgress /> : 'Готово'}</Button>
                                </div>
                            </Stack>
                        </Box>
                    </Modal>

                    <Modal
                        open={pickUpModalOpen}
                        onClose={handleClosePickUpModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={'modal-box'}>
                            <div className="sub-title">Изъятие денег</div>
                            <Stack spacing={2}>
                                <TextField
                                    label="Изначальная сумма на кассе"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={pickUpWas}
                                    onChange={(e) => setPickUpWas(e.target.value)}
                                />
                                <TextField
                                    label="Изъятая сумма"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={pickUpAmount}
                                    onChange={(e) => setPickUpAmount(e.target.value)}
                                />
                                <TextField
                                    label="Комментарий"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={pickUpComment}
                                    onChange={(e) => setPickUpComment(e.target.value)}
                                />
                                <div className="center">
                                    <Button disabled={isPickUpLoading} onClick={handlePickUp} variant={'contained'}>{isPickUpLoading ? <CircularProgress /> : 'Готово'}</Button>
                                </div>
                            </Stack>
                        </Box>
                    </Modal>

                    <Modal
                        open={spentModalOpen}
                        onClose={handleCloseSpentModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={'modal-box'}>
                            <div className="sub-title">Доп. затраты</div>
                            <Stack spacing={2}>
                                <TextField
                                    label="Сумма"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={spentAmount}
                                    onChange={(e) => setSpentAmount(e.target.value)}
                                />
                                <TextField
                                    label="Комментарий"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={spentComment}
                                    onChange={(e) => setSpentComment(e.target.value)}
                                />
                                <div className="center">
                                    <Button disabled={isSpentLoading} onClick={handleSpent} variant={'contained'}>{isSpentLoading ? <CircularProgress /> : 'Готово'}</Button>
                                </div>
                            </Stack>
                        </Box>
                    </Modal>

                    <Modal
                        open={finishModalOpen}
                        onClose={handleCloseFinishModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className={'modal-box'}>
                            <div className="sub-title">Закончить день</div>
                            <Stack spacing={2}>
                                <TextField
                                    label="Кол-во мал. стаканчиков"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={finishSmallCups}
                                    onChange={(e) => setFinishSmallCups(e.target.value)}
                                />
                                <TextField
                                    label="Кол-во бол. стаканчиков"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={finishLargeCups}
                                    onChange={(e) => setFinishLargeCups(e.target.value)}
                                />
                                <div className="center">
                                    <Button disabled={isFinishLoading} onClick={handleFinish} variant={'contained'}>{isFinishLoading ? <CircularProgress /> : 'Готово'}</Button>
                                </div>
                            </Stack>
                        </Box>
                    </Modal>
                </>
            ) : <Skeleton variant="rectangular" width={'100%'} height={300} />}
        </div>
    );
};

export default observer(Day);