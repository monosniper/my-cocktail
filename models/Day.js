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
        console.log(data)

        if(typeof data.date === 'string') {
            this.dateJs = new Date(data.date)
            this.date = new Date(data.date)
        } else if (data.date instanceof Date) {
            this.dateJs = data.date
            this.date = data.date
        } else {
            this.dateJs = data.date.toDate()
            this.date = data.date.toDate()
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
            if(typeof data.date === 'string') {
                gift.time = new Date(data.date)
            } else if (data.date instanceof Date) {
                gift.time = data.date
            } else {
                gift.time = data.date.toDate()
            }
            return gift
        })
        this.returns = data.returns.map(_return => {
            if(typeof data.date === 'string') {
                _return.time = new Date(data.date)
            } else if (data.date instanceof Date) {
                _return.time = data.date
            } else {
                _return.time = data.date.toDate()
            }

            return _return
        })
        this.pickUps = data.pickUps.map(pickUp => {
            if(typeof data.date === 'string') {
                pickUp.time = new Date(data.date)
            } else if (data.date instanceof Date) {
                pickUp.time = data.date
            } else {
                pickUp.time = data.date.toDate()
            }

            return pickUp
        })
        this.pushUps = data.pushUps.map(pushUp => {
            if(typeof data.date === 'string') {
                pushUp.time = new Date(data.date)
            } else if (data.date instanceof Date) {
                pushUp.time = data.date
            } else {
                pushUp.time = data.date.toDate()
            }

            return pushUp
        })
        this.events = data.events.map(event => {
            if(typeof data.date === 'string') {
                event.time = new Date(data.date)
            } else if (data.date instanceof Date) {
                event.time = data.date
            } else {
                event.time = data.date.toDate()
            }

            return event
        })
        this.spents = data.spents.map(spent => {
            if(typeof data.date === 'string') {
                spent.time = new Date(data.date)
            } else if (data.date instanceof Date) {
                spent.time = data.date
            } else {
                spent.time = data.date.toDate()
            }

            return spent
        })
    }
}