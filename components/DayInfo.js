import React from 'react';
import {Chip, Typography} from "@mui/material";
import store from "../store";
import {observer} from "mobx-react-lite";

const DayInfo = ({day, full=false}) => {
    return (
        <div>
            <Typography variant="body2" gutterBottom>
                Мал. стаканов в начале дня: <Chip label={day.startSmallCups} size={'small'} />
            </Typography>
            <Typography variant="body2" gutterBottom>
                Бол. стаканов в начале дня: <Chip label={day.startLargeCups} size={'small'} />
            </Typography>

            <br/>

            {day.gifts.map((gift, i) => (
                <Typography variant="body2" gutterBottom key={'gift-'+i}>
                    <Chip size={'small'} label={gift.time} variant="outlined" />
                    Беспл. коктейль ({gift.comment}):
                    <Chip label={"M "+gift.small} size={'small'} />
                    <Chip label={"Б "+gift.large} size={'small'} />
                </Typography>
            ))}

            {day.returns.map((_return, i) => (
                <Typography variant="body2" gutterBottom key={'return-'+i}>
                    <Chip size={'small'} label={_return.time} variant="outlined" />
                    Возврат ({_return.comment}):
                    <Chip label={"M "+_return.small} size={'small'} />
                    <Chip label={"Б "+_return.large} size={'small'} />
                </Typography>
            ))}

            {day.pickUps.map((pickUp, i) => (
                <Typography variant="body2" gutterBottom key={'pickUp-'+i}>
                    <Chip size={'small'} label={pickUp.time} variant="outlined" />
                    Изъятие ({pickUp.comment}):
                    <Chip label={pickUp.amount} size={'small'} />
                </Typography>
            ))}

            {/*{day.events.map((event, i) => (*/}
            {/*    <Typography variant="body2" gutterBottom key={'event-'+i}>*/}
            {/*        <Chip label={event.time} variant="outlined" />*/}
            {/*        Событие ({event.comment}):*/}
            {/*        <Chip label={"M "+gift.small} size={'small'} />*/}
            {/*        <Chip label={"Б "+gift.large} size={'small'} />*/}
            {/*    </Typography>*/}
            {/*))}*/}

            {day.spents.map((spent, i) => (
                <Typography variant="body2" gutterBottom key={'spent-'+i}>
                    <Chip size={'small'} label={spent.time} variant="outlined" />
                    Доп. расходы ({spent.comment}):
                    <Chip label={spent.amount} size={'small'} />
                </Typography>
            ))}

            {full ? (
                <>
                    <br/>

                    <Typography variant="body2" gutterBottom>
                        Мал. стаканов в конце дня: <Chip label={day.endSmallCups} size={'small'} />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Бол. стаканов в конце дня: <Chip label={day.endLargeCups} size={'small'} />
                    </Typography>

                    <br/>

                    <Typography variant="body2" gutterBottom>
                        Мал. стаканов продано: <Chip label={day.smallCupsSold} size={'small'} />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Бол. стаканов продано: <Chip label={day.largeCupsSold} size={'small'} />
                    </Typography>

                    <br/>

                    <Typography variant="body2" gutterBottom>
                        Мал. стаканов потрачено: <Chip label={day.smallCupsSpend} size={'small'} />
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Бол. стаканов потрачено: <Chip label={day.largeCupsSpend} size={'small'} />
                    </Typography>

                    <br/>

                    <Typography variant="body2" gutterBottom>
                        Доп. расходы: <Chip label={day.spent} size={'small'} />
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Общая касса: <Chip label={day.need_total} size={'small'} />
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Касса на месте: <Chip label={day.real_total} size={'small'} />
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Касса на месте (должна быть): <Chip label={day.need_real_total} size={'small'} />
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Плата работнику: <Chip label={day.salary} size={'small'} />
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Прибыль: <Chip label={day.income} size={'small'} />
                    </Typography>

                    <br/>
                </>
            ) : null}
        </div>
    );
};

export default observer(DayInfo);