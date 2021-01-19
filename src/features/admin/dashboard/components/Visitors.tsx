import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';

import { AppDispatch } from '../../../../app/store';
import {
    displayVisitorsData,
    selectDisplayVisitors,
    selectDuration,
    selectVisitors,
} from '../dashboardSlice';
import { hourMapObj } from '../../../../app/constant';
import { VISITORS } from '../../../types';
import customStyles from '../Dashboard.module.css';
import { durationCategory } from '../../../../app/constant';


const Visitors: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const visitors = useSelector(selectVisitors);
    const duration = useSelector(selectDuration);
    const displayVisitors = useSelector(selectDisplayVisitors);

    useEffect( () => {
        switch (duration) {
            case 1:
                dispatch(displayVisitorsData(getLastHour()));
                break;
            case 2:
                dispatch(displayVisitorsData(getLastDate(7)));
                break;
            case 3:
                dispatch(displayVisitorsData(getLastDate(31)));
                break;
            case 4:
                dispatch(displayVisitorsData(getLastDate(365)));
                break;
            default:
                dispatch(displayVisitorsData(getLastDate(7)));
                break;
        }
    }, [duration])

    const getFormattedDate = (date: Date) => {
        const month = ("0" + (date.getMonth() + 1)).slice(-2)
        const day = ("0" + (date.getDate())).slice(-2)
        const formattedDate = date.getFullYear() + "-" + month + "-" + day
        return String(formattedDate)
    }

    const getLastDate = (duration: number) => {
        let lastDateObj: {[key: string]: number} = {}
        for (let i = 0; i < duration + 1; i++) {
            let date = new Date();
            date.setDate(date.getDate() - duration + i);
            const formattedDate = getFormattedDate(date);
            if (visitors[formattedDate]) {
                lastDateObj[formattedDate] = visitors[formattedDate];
            } else {
                lastDateObj[formattedDate] = 0;
            }
        }
        return lastDateObj
    }

    const getLastHour = () => {
        let lastHourObj: {[key: string]: number} = {}
        for (let i = 0; i < 24; i++) {
            if (visitors[String(i)]) {
                lastHourObj[hourMapObj[String(i)]] = visitors[String(i)];
            } else {
                lastHourObj[hourMapObj[String(i)]] = 0;
            }
        }
        return lastHourObj
    }

    const getMaxValue = (visitors: VISITORS) => {
        let array = Object.values(visitors);
        return Math.max(...array)
    }

    const dailyChart = visitors && (
        <Bar
            data={{
                labels: Object.keys(displayVisitors),
                datasets: [
                    {
                        data: Object.keys(displayVisitors).map( (index) => displayVisitors[index]),
                        backgroundColor: '#f57c00',
                        label: 'ラベル',
                    },
                ],
            }}
            options={{
                legend: { display: false},
                title: {
                    display: true,
                    fontSize: 18,
                    fontStyle: 'bold',
                    padding: 10,
                    textColor: 'rgba(0, 0, 0, 0.54)',
                    text: `来場者数 ${durationCategory[duration]}`
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                            },
                        }
                    ],
                    yAxes: [
                        {
                            display: true,
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                min: 0,
                                max: getMaxValue(displayVisitors) + 2,
                            },
                        }
                    ]
                }
            }}
        />
    );

    return (
        <div className={customStyles.visitor_chart_wrapper}>
            {dailyChart}
        </div>
    )
}

export default Visitors
