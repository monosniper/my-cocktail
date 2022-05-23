import {Timestamp} from "@firebase/firestore";

export class Day {
    date = new Date()
    // Общий комментарий по дню
    comment = ''

    // Кол-во ст. в начале дня
    startSmallCups = 0
    startLargeCups = 0
    // Кол-во ст. в конце дня
    endSmallCups = 0
    endLargeCups = 0

    // Кол-во проданных ст.
    smallCupsSold = 0
    largeCupsSold = 0

    // Общее кол-во потраченных ст. за день
    smallCupsSpend = 0
    largeCupsSpend = 0

    // Ст. отданные бесплатно
    gifts = [
        // {small: 1, large: 1, comment: 'Абдураззок', time: Timestamp.fromDate(new Date())}
    ]

    // Возвраты ст.
    returns = [
        // {small: 1, large: 1, comment: 'Слишком жидкий', time: Timestamp.fromDate(new Date())}
    ]

    // Изъятие денег из кассы
    pickUps = [
        // {amount: 100000, was: 200000, comment: 'Ислом окя', time: Timestamp.fromDate(new Date())}
    ]

    // Пополнение ст.
    pushUps = [
        // {small: 50, large: 100, time: Timestamp.fromDate(new Date())}
    ]

    // Непредвиденные события
    events = [
        // {now: 90000, was: 100000, comment: 'Не уследил, 1 стакан забрали бесплатно', time: Timestamp.fromDate(new Date())}
    ]

    // Сумма, взятая с кассы и потраченная на какие-либо расходы
    spents = [
        // {amount: 50000, comment: 'Сахар', time: Timestamp.fromDate(new Date())}
    ]
    spent = 0

    // Сколько должно быть на кассе
    need_total = 0
    // Сколько должно быть на кассе по факту
    need_real_total = 0
    // Сколько на кассе по факту
    real_total = 0
    // Зарплата работника
    salary = 0
    // Чистая прибыль за день
    income = 0

    // День закончен
    isCompleted = false

    constructor(data) {

        if(typeof data.date === 'string') {
            this.dateJs = new Date(data.date)
            this.date = new Date(data.date)
        } else if (data.date instanceof Timestamp) {
            this.dateJs = data.date.toDate()
            this.date = data.date.toDate()
        } else {
            this.dateJs = data.date
            this.date = data.date
        }

        if(typeof data.startTime === 'string') {
            this.startTime = new Date(data.startTime)
            this.endTime = new Date(data.endTime)
        } else if (data.startTime instanceof Timestamp) {
            this.startTime = data.startTime.toDate()
            this.endTime = data.endTime.toDate()
        } else {
            this.startTime = data.startTime
            this.endTime = data.endTime
        }

        this.id = data.id
        this.comment = data.comment
        this.startSmallCups = data.startSmallCups
        this.startLargeCups = data.startLargeCups
        this.endSmallCups = data.endSmallCups
        this.endLargeCups = data.endLargeCups
        this.smallCupsSold = data.smallCupsSold
        this.largeCupsSold = data.largeCupsSold
        this.smallCupsSpend = data.smallCupsSpend
        this.largeCupsSpend = data.largeCupsSpend
        this.spent = data.spent
        this.need_total = data.need_total
        this.need_real_total = data.need_real_total
        this.real_total = data.real_total
        this.salary = data.salary
        this.income = data.income
        this.isCompleted = data.isCompleted

        this.gifts = data.gifts.map(gift => {
            if(typeof gift.time === 'string') {
                gift.time = new Date(gift.time)
            } else if (gift.time instanceof Timestamp) {
                gift.time = gift.time.toDate()
            }

            return gift
        })
        this.returns = data.returns.map(_return => {
            if(typeof _return.time === 'string') {
                _return.time = new Date(_return.time)
            } else if (_return.time instanceof Timestamp) {
                _return.time = _return.time.toDate()
            }

            return _return
        })
        this.pickUps = data.pickUps.map(pickUp => {
            if(typeof pickUp.time === 'string') {
                pickUp.time = new Date(pickUp.time)
            } else if (pickUp.time instanceof Timestamp) {
                pickUp.time = pickUp.time.toDate()
            }

            return pickUp
        })
        this.pushUps = data.pushUps.map(pushUp => {
            if(typeof pushUp.time === 'string') {
                pushUp.time = new Date(pushUp.time)
            } else if (pushUp.time instanceof Timestamp) {
                pushUp.time = pushUp.time.toDate()
            }

            return pushUp
        })
        this.events = data.events.map(event => {
            if(typeof event.time === 'string') {
                event.time = new Date(event.time)
            } else if (event.time instanceof Timestamp) {
                event.time = event.time.toDate()
            }

            return event
        })
        this.spents = data.spents.map(spent => {
            if(typeof spent.time === 'string') {
                spent.time = new Date(spent.time)
            } else if (spent.time instanceof Timestamp) {
                spent.time = spent.time.toDate()
            }

            return spent
        })
    }
}