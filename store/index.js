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
    smallCupPrice = 1000
    largeCupPrice = 2000
    smallCocktailPrice = 5000
    largeCocktailPrice = 10000

    // Document id in firestore
    dayId = null

    dayData = {}

    default_dayData = {
        startTime: new Date(),
        endTime: new Date(),

        date: new Date(),
        // Общий комментарий по дню
        comment: '',

        // Кол-во ст. в начале дня
        startSmallCups: 0,
        startLargeCups: 0,

        // Кол-во ст. в конце дня
        endSmallCups: 0,
        endLargeCups: 0,

        // Кол-во проданных коктейлей
        smallCocktailsSold: 0,
        largeCocktailsSold: 0,

        // Кол-во потраченных коктейлей
        smallCocktailsSpent: 0,
        largeCocktailsSpent: 0,

        // Кол-во проданных пустых ст.
        emptySmallCupsSold: 0,
        emptyLargeCupsSold: 0,

        // Общее кол-во потраченных ст. за день
        smallCupsSpend: 0,
        largeCupsSpend: 0,

        // Общее кол-во проданных ст. за день
        smallCupsSold: 0,
        largeCupsSold: 0,

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
    }

    setDayData(data) {
        this.dayData = data
    }

    async loadDays() {
        const dayInLocalStorage = Cookies.get('day');
        // const dayInLocalStorage = localStorage.getItem('day');

        if (!dayInLocalStorage) {
            const daysRef = await db.collection('days').orderBy('date', 'desc')

            daysRef.onSnapshot(snapshot => {
                this.days = []

                snapshot.forEach(day => {
                    this.days.push(new Day({id: day.id, ...day.data()}))
                })

                const currentDay = this.days.find(day => day.isCompleted === false)

                if (currentDay) {
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
        return await db.collection(this.daysCollection).doc(this.dayId).update(data).then(() => {
            const day = new Day({...this.dayData, ...data});
            this.setDayData(day)
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

            if (currentDay) {
                this.isDayStarted = true
                this.setDayId(currentDay.id)
                this.setDayData(currentDay)
                Cookies.set('day', JSON.stringify(currentDay))
            } else {
                Cookies.remove('day')
                this.setDayData(this.default_dayData)
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
            small: parseFloat(small),
            large: parseFloat(large),
            comment,
            time: new Date()
        }

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

    async addEmptySold(data) {
        const {
            small,
            large,
        } = data;

        const emptySmallCupsSold = this.dayData.emptySmallCupsSold + parseFloat(small)
        const emptyLargeCupsSold = this.dayData.emptyLargeCupsSold + parseFloat(large)

        return await this.updateDayData({
            emptySmallCupsSold,
            emptyLargeCupsSold,
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

        // Общее кол-во потраченных ст. за день
        let smallCupsSpend = startSmallCups - endSmallCups;
        let largeCupsSpend = startLargeCups - endLargeCups;

        // Кол-во потраченных коктейлей
        let smallCocktailsSpend = 0;
        let largeCocktailsSpend = 0;

        this.dayData.gifts.forEach(gift => {
            smallCocktailsSpend += gift.small
            largeCocktailsSpend += gift.large
        })

        this.dayData.returns.forEach(_return => {
            smallCocktailsSpend += _return.small
            largeCocktailsSpend += _return.large
        })

        // Общее кол-во проданных ст. за день
        let smallCupsSold = smallCupsSpend - smallCocktailsSpend
        let largeCupsSold = largeCupsSpend - largeCocktailsSpend

        // Кол-во проданных коктейлей
        const smallCocktailsSold = smallCupsSold - this.dayData.emptySmallCupsSold
        const largeCocktailsSold = largeCupsSold - this.dayData.emptyLargeCupsSold

        console.log('прод пуст s ст - ', this.dayData.emptySmallCupsSold)
        console.log('прод пуст l ст - ', this.dayData.emptyLargeCupsSold)
        console.log('пот s ст - ', smallCupsSpend)
        console.log('пот l ст - ', largeCupsSpend)
        console.log('прод s ст - ', smallCupsSold)
        console.log('прод l ст - ', largeCupsSold)
        console.log('пот s кок - ', smallCocktailsSpend)
        console.log('пот l кок - ', largeCocktailsSpend)
        console.log('прод s кок - ', smallCocktailsSold)
        console.log('прод l кок - ', largeCocktailsSold)

        // Сумма всеx потраченных коктейлей
        const spendCocktailsAmount = (smallCocktailsSpend * this.smallCocktailPrice) + (largeCocktailsSpend * this.largeCocktailPrice)

        // Сумма всеx проданных коктейлей
        const soldCocktailsAmount = (smallCocktailsSold * this.smallCocktailPrice) + (largeCocktailsSold * this.largeCocktailPrice)

        // Сумма всеx проданных пустых ст.
        const soldEmptyCupsAmount = (this.dayData.emptySmallCupsSold * this.smallCupPrice) + (this.dayData.emptyLargeCupsSold * this.largeCupPrice)

        let spent = 0;
        let need_total = spendCocktailsAmount + soldEmptyCupsAmount;
        let need_real_total = soldCocktailsAmount + soldEmptyCupsAmount;
        let real_total = need_real_total;

        this.dayData.pickUps.forEach(pickUp => {
            real_total -= pickUp.amount
        })

        this.dayData.events.forEach(event => {
            if (event.now < event.was) {
                spent = event.was - event.now

                real_total -= spent
            }
        })

        this.dayData.spents.forEach(spent => {
            real_total -= spent.amount
        })

        const salary = need_total / 100 * this.payPercent;
        const income = need_real_total - salary;

        Cookies.remove('day')

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

            smallCocktailsSpend,
            largeCocktailsSpend,

            smallCocktailsSold,
            largeCocktailsSold,

            spent,
            need_total,
            need_real_total,
            real_total,
            salary,
            income,

            endTime: new Date(),
            isCompleted: true
        })
    }

    async getDay(id) {
        const rs = (await db.collection(this.daysCollection).doc(id).get()).data()

        if (rs) return new Day(rs)

        return null;
    }

    async removeDay(id) {
        Cookies.remove('day')

        return await deleteDoc(doc(db, "days", id));
    }
}

export default new Store()