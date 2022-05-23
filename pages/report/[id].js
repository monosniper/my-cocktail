import React, {useEffect, useState} from 'react';
import Logo from "../../components/Logo";
import store from "../../store";
import {useRouter} from "next/router";
import {Box, Button, CircularProgress, Modal, Skeleton, Stack, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useDocument, useDocumentDataOnce} from "react-firebase-hooks/firestore";
import {db} from "../../db";
import {doc} from "@firebase/firestore";
import DayInfo from "../../components/DayInfo";
import Noty from "noty";

const Report = () => {
    const router = useRouter()
    const [day, setDay] = useState(null)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)

    useEffect(() => {
        if(router.query.id) {
            store.getDay(router.query.id).then((rs) => {
                setDay(rs)
            })

        }
    }, [router.query])

    const handleOpenDelete = () => setDeleteModalOpen(true)
    const handleCloseDelete = () => setDeleteModalOpen(false)

    const handleDelete = () => {
        setIsDeleteLoading(true)

        store.removeDay(router.query.id).then(() => {
            setDeleteModalOpen(false)
            setIsDeleteLoading(false)

            new Noty({
                text: 'Готово',
                type: 'success'
            }).show()

            router.push('/history')
        })
    }

    return (
        <div>
            <Logo />

            <div className="wrapper">
                {day ?
                    (
                        <>
                            <div className={'title'}>{day.date.toLocaleDateString()}</div>

                            <DayInfo day={day} full />

                            <br/>

                            <div className="center">
                                <Button color={'error'} size={'small'} onClick={handleOpenDelete} variant={'outlined'}>Удалить день</Button>
                            </div>

                            <br/>

                            <Modal
                                open={deleteModalOpen}
                                onClose={setDeleteModalOpen}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className={'modal-box'}>
                                    <div className="sub-title">Вы действительно хотите удалить день?</div>
                                    <Stack direction="row" justifyContent="center" spacing={2}>
                                        <Button onClick={handleCloseDelete} variant={'contained'}>Нет</Button>
                                        <Button disabled={isDeleteLoading} onClick={handleDelete} variant={'contained'}>{isDeleteLoading ? <CircularProgress /> : 'Да'}</Button>
                                    </Stack>
                                </Box>
                            </Modal>
                        </>
                    )
                    : <Skeleton variant="rectangular" width={'100%'} height={300} />
                }
            </div>
        </div>
    );
};

export default observer(Report);