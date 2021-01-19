import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Doughnut } from 'react-chartjs-2';

import { AppDispatch } from '../../../../app/store';
import customStyles from '../Dashboard.module.css';
import {
    displayCountryData,
    selectDisplayCountry,
    selectCountry,
} from '../dashboardSlice';
import { COUNTRY } from '../../../types';


const Country: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const country = useSelector(selectCountry);
    const displayCountry = useSelector(selectDisplayCountry);

    useEffect( () => {
        dispatch(displayCountryData(getCountryObj(country)));
    }, [country])

    const getCountryObj = (country: COUNTRY) => {
        let countryObj = {
            "日本": 0, "韓国": 0, "台湾": 0, "中国": 0, "アメリカ": 0, "イギリス": 0,
            "その他": 0
        }
        Object.keys(country).map( (countryCode) => {
            if (countryCode === "JP") {
                countryObj["日本"] += country[countryCode];
            } else if (countryCode === "KR") {
                countryObj["韓国"] += country[countryCode];
            } else if (countryCode === "TW") {
                countryObj["台湾"] += country[countryCode];
            } else if (countryCode === "CN") {
                countryObj["中国"] += country[countryCode];
            } else if (countryCode === "US") {
                countryObj["アメリカ"] += country[countryCode];
            } else if (countryCode === "GB") {
                countryObj["イギリス"] += country[countryCode];
            } else {
                countryObj["その他"] += country[countryCode];
            }
        });
        return countryObj
    }

    const doughnutChart = country && displayCountry && (
        <Doughnut
            data={{
                labels: Object.keys(displayCountry),
                datasets: [
                    {
                        data: Object.keys(displayCountry).map( (index) => displayCountry[index]),
                        backgroundColor: [
                            "#303f9f",
                            "#d32f2f",
                            "#fbc02d",
                            "#0288d1",
                            "#388e3c",
                            "#e64a19",
                            "#512da8",
                        ],
                        hoverBackgroundColor: [
                            "#5c6bc0",
                            "#ef5350",
                            "#ffee58",
                            "#29b6f6",
                            "#66bb6a",
                            "#ff7043",
                            "#7e57c2",
                        ],
                        borderColor: [
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                        ]
                    }
                ]
            }}
            options={{
                cutoutPercentage: 65,
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 8,
                    },
                },
                responsive: false,
            }}
        />
    )

    return (
        <div className={customStyles.sex_doughnut_wrapper}>
            {doughnutChart}
            <strong className={customStyles.country_doughnut_title}>国割合</strong>
        </div>
    )
}

export default Country