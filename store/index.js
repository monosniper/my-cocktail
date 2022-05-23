import {makeAutoObservable, toJS} from "mobx";
import {db} from '../db'
import Cookies from 'js-cookie'
import {
    deleteDoc, doc,
    Timestamp,
} from "@firebase/firestore";
import {Day} from "../models/Day";

class Store {
    isDayStarted = false

    daysCollection = 'days'

    payPercent = 10
    smallCupPrice = 5000
    largeCupPrice = 10000

    // Document id in firestore
    dayId = null

    dayData = {}

    default_dayData = {
        date: new Date(),
        // Общий комментарий по дню
        comment: '',

        // Кол-во ст. в начале дня
        startSmallCups: 0,
        startLargeCups: 0,
        // Кол-во ст. в конце дня
        endSmallCups: 0,
        endLargeCups: 0,

        // Кол-во проданных ст.
        smallCupsSold: 0,
        largeCupsSold: 0,

        // Общее кол-во потраченных ст. за день
        smallCupsSpend: 0,
        largeCupsSpend: 0,

        // Ст. отданные бесплатно
        gifts: [
            // {small: 1, large: 1, comment: 'Абдураззок', time: Timestamp.fromDate(new Date())}
        ],

        // Возвраты ст.
        returns: [
            // {small: 1, large: 1, comment: 'Слишком жидкий', time: Timestamp.fromDate(new Date())}
        ],

        // Изъятие денег из кассы
        pickUps: [
            // {amount: 100000, was: 200000, comment: 'Ислом окя', time: Timestamp.fromDate(new Date())}
        ],

        // Пополнение ст.
        pushUps: [
            // {small: 50, large: 100, time: Timestamp.fromDate(new Date())}
        ],

        // Непредвиденные события
        events: [
            // {now: 90000, was: 100000, comment: 'Не уследил, 1 стакан забрали бесплатно', time: Timestamp.fromDate(new Date())}
        ],

        // Сумма, взятая с кассы и потраченная на какие-либо расходы
        spents: [
            // {amount: 50000, comment: 'Сахар', time: Timestamp.fromDate(new Date())}
        ],
        spent: 0,

        // Сколько должно быть на кассе
        need_total: 0,
        // Сколько должно быть на кассе по факту
        need_real_total: 0,
        // Сколько на кассе по факту
        real_total: 0,
        // Зарплата работника
        salary: 0,
        // Чистая прибыль за день
        income: 0,

        // День закончен
        isCompleted: false,
    }
    days = []

    constructor() {
        makeAutoObservable(this)

        this.loadDays()
        // disableNetwork(db);

        // this.setDayData({...this.default_dayData})
    }

    setDayData(data) {
        this.dayData = data
    }

    async loadDays() {
        const dayInLocalStorage = Cookies.get('day');
        // const dayInLocalStorage = localStorage.getItem('day');

        if(!dayInLocalStorage) {
            const daysRef = await db.collection('days').orderBy('date', 'desc')

            daysRef.onSnapshot(snapshot => {
                this.days = []

                snapshot.forEach(day => {
                    this.days.push(new Day({id: day.id, ...day.data()}))
                })

                const currentDay = this.days.find(day => day.isCompleted === false)

                if(currentDay) {
                    this.isDayStarted = true
                    this.setDayId(currentDay.id)
                    this.setDayData(toJS(currentDay))
                    Cookies.set('day', JSON.stringify(currentDay))
                    // localStorage.setItem('day', JSON.stringify(currentDay))
                }
            })
        } else {
            this.isDayStarted = true
            this.setDayId(JSON.parse(dayInLocalStorage).id)
            this.setDayData(new Day(JSON.parse(dayInLocalStorage)))
        }
    }

    async fetchDays() {
        const daysRef = await db.collection('days').orderBy('date', 'desc')

        daysRef.onSnapshot(snapshot => {
            this.days = []

            snapshot.forEach(day => {
                this.days.push(new Day({id: day.id, ...day.data()}))
            })
        })
    }

    async updateDayData(data) {
        console.log(data)
        return await db.collection(this.daysCollection).doc(this.dayId).update(data).then(() => {
            const day = new Day({...this.dayData, ...data});
            this.dayData = day
            Cookies.set('day', JSON.stringify(day))
        })
    }

    async refresh() {
        const daysRef = await db.collection('days').orderBy('date', 'desc')

        daysRef.onSnapshot(snapshot => {
            this.days = []

            snapshot.forEach(day => {
                this.days.push(new Day({id: day.id, ...day.data()}))
            })

            const currentDay = this.days.find(day => day.isCompleted === false)

            if(currentDay) {
                this.isDayStarted = true
                this.setDayId(currentDay.id)
                this.setDayData(toJS(currentDay))
                Cookies.set('day', JSON.stringify(currentDay))
                // localStorage.setItem('day', JSON.stringify(currentDay))
            }
        })
    }

    setDayId(id) {
        this.dayId = id;
    }

    async startDay(data) {
        const {
            startSmallCups, startLargeCups
        } = data

        this.isDayStarted = true;
        
        const day = await db.collection(this.daysCollection)
            .add({
                ...this.default_dayData,
                date: Timestamp.fromDate(new Date()),
                startSmallCups: parseFloat(startSmallCups),
                startLargeCups: parseFloat(startLargeCups),
            })

        this.setDayId(day.id)

        return day;
    }

    async addGift(data) {
        const {
            small, large, comment
        } = data;



        const gift = {
            small: parseFloat(small), large: parseFloat(large), comment, time: new Date()
        }

        console.log(gift)

        return await this.updateDayData({
            gifts: [
                ...this.dayData.gifts, gift
            ]
        })
    }

    async addReturn(data) {
        const {
            small, large, comment
        } = data;

        return await this.updateDayData({
            returns: [
                ...this.dayData.returns, {
                    small: parseFloat(small), large: parseFloat(large), comment, time: new Date()
                }
            ]
        })
    }

    async addPushUp(data) {
        const {
            small, large
        } = data;

        return await this.updateDayData({
            pushUps: [
                ...this.dayData.pushUps, {
                    small: parseFloat(small), large: parseFloat(large), time: new Date()
                }
            ]
        })
    }

    async addPickUp(data) {
        const {
            was, amount, comment
        } = data;

        return await this.updateDayData({
            pickUps: [
                ...this.dayData.pickUps, {
                    was: parseFloat(was), amount: parseFloat(amount), comment, time: new Date()
                }
            ]
        })
    }

    async addSpent(data) {
        const {
            amount, comment
        } = data;

        return await this.updateDayData({
            spents: [
                ...this.dayData.spents, {
                    amount: parseFloat(amount), comment, time: new Date()
                }
            ]
        })
    }

    async endDay(data) {
        const {
            endSmallCups, endLargeCups
        } = data

        this.isDayStarted = false;

        let startSmallCups = this.dayData.startSmallCups
        let startLargeCups = this.dayData.startLargeCups

        this.dayData.pushUps.forEach(pushUp => {
            startSmallCups += pushUp.small
            startLargeCups += pushUp.large
        })

        const smallCupsSpend = startSmallCups - endSmallCups;
        const largeCupsSpend = startLargeCups - endLargeCups;

        let smallCupsSold = smallCupsSpend
        let largeCupsSold = largeCupsSpend

        this.dayData.gifts.forEach(gift => {
            smallCupsSold -= gift.small
            largeCupsSold -= gift.large
        })

        this.dayData.returns.forEach(_return => {
            smallCupsSold -= _return.small
            largeCupsSold -= _return.large
        })

        let spent = 0;
        let need_total = (smallCupsSpend * this.smallCupPrice) + (largeCupsSpend * this.largeCupPrice);
        let need_real_total = (smallCupsSold * this.smallCupPrice) + (largeCupsSold * this.largeCupPrice);
        let real_total = need_real_total;

        this.dayData.pickUps.forEach(pickUp => {
            real_total -= pickUp.amount
        })

        this.dayData.events.forEach(event => {
            if(event.now < event.was) {
                spent = event.was - event.now

                real_total -= spent
            }
        })

        this.dayData.spents.forEach(spent => {
            real_total -= spent.amount
        })

        const salary = need_total / 100 * this.payPercent;
        const income = need_real_total - salary;

        // localStorage.removeItem('day')
        Cookies.remove('day')
        // console.log(localStorage.getItem('day'))

        this.setDayData({...this.default_dayData})

        return await this.updateDayData({
            startSmallCups: parseFloat(startSmallCups),
            startLargeCups: parseFloat(startLargeCups),
            endSmallCups: parseFloat(endSmallCups),
            endLargeCups: parseFloat(endLargeCups),

            smallCupsSpend,
            largeCupsSpend,
            smallCupsSold,
            largeCupsSold,

            spent,
            need_total,
            need_real_total,
            real_total,
            salary,
            income,

            isCompleted: true
        })
    }

    async getDay(id) {
        const rs = (await db.collection(this.daysCollection).doc(id).get()).data()

        if(rs) return new Day(rs)

        return null;
    }

    async removeDay(id) {
        return await deleteDoc(doc(db, "days", id));
    }
}

export default new Store()