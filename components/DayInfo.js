import React from 'react';
import {Chip, Typography} from "@mui/material";
import store from "../store";
import {observer} from "mobx-react-lite";
import moment from "moment/moment";
import {BiDownArrow, BiUpArrow} from "react-icons/bi";

const DayInfo = ({day, full=false}) => {
    return (
        <div>
            {full ? (
                <>
                    <Typography variant="body2" gutterBottom>
                        Начало раб. дня: <span className="time">{moment(day.startTime).format("HH:mm")}</span>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Конец раб. дня: <span className="time">{moment(day.endTime).format("HH:mm")}</span>
                    </Typography>

                    <br/>
                </>
            ) : null}

            <Typography variant="body2" gutterBottom>
                Мал. стаканов в начале дня: <Chip label={day.startSmallCups} size={'small'} />
            </Typography>
            <Typography variant="body2" gutterBottom>
                Бол. стаканов в начале дня: <Chip label={day.startLargeCups} size={'small'} />
            </Typography>

            <br/>

            {day.gifts.map((gift, i) => (
                <Typography variant="body2" gutterBottom key={'gift-'+i}>
                    <span className="time">{moment(gift.time).format("HH:mm")}</span>
                    Беспл. коктейль ({gift.comment}):
                    {gift.small ? <Chip label={"M " + gift.small} size={'small'}/> : null}
                    {gift.large ? <Chip label={"Б " + gift.large} size={'small'}/> : null}
                </Typography>
            ))}

            {day.returns.map((_return, i) => (
                <Typography variant="body2" gutterBottom key={'return-'+i}>
                    <span className="time">{moment(_return.time).format("HH:mm")}</span>
                    Возврат ({_return.comment}):
                    {_return.small ? <Chip label={"M " + _return.small} size={'small'}/> : null}
                    {_return.large ? <Chip label={"Б " + _return.large} size={'small'}/> : null}
                </Typography>
            ))}

            {day.pickUps.map((pickUp, i) => (
                <Typography variant="body2" gutterBottom key={'pickUp-'+i}>
                    <span className="time">{moment(pickUp.time).format("HH:mm")}</span>
                    Изъятие ({pickUp.comment}):
                    <Chip label={pickUp.amount} size={'small'} />
                </Typography>
            ))}

            {day.pushUps.map((pushUp, i) => (
                <Typography variant="body2" gutterBottom key={'pushUp-'+i}>
                    <span className="time">{moment(pushUp.time).format("HH:mm")}</span>
                    Пополнение:
                    {pushUp.small ? <Chip label={"M " + pushUp.small} size={'small'}/> : null}
                    {pushUp.large ? <Chip label={"Б " + pushUp.large} size={'small'}/> : null}
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
                    <span className="time">{moment(spent.time).format("HH:mm")}</span>
                    Доп. расходы ({spent.comment}):
                    <Chip label={spent.amount} size={'small'} />
                </Typography>
            ))}

            {full ? (
                <>
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