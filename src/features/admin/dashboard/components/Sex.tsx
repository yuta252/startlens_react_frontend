import React from 'react'
import { useSelector } from "react-redux";
import { Doughnut } from 'react-chartjs-2';

import customStyles from '../Dashboard.module.css';
import {
    selectSex
} from '../dashboardSlice';

const Sex: React.FC = () => {
    const sex = useSelector(selectSex);

    const doughnutChart = sex && (
        <Doughnut
            data={{
                labels: ["男性", "女性", "無回答"],
                datasets: [
                    {
                        data: [
                            sex["1"],
                            sex["2"],
                            sex["3"]
                        ],
                        backgroundColor: [
                            "#303f9f",
                            "#d32f2f",
                            "#fbc02d",
                        ],
                        hoverBackgroundColor: [
                            "#5c6bc0",
                            "#ef5350",
                            "#ffee58"
                        ],
                        borderColor: ["transparent", "transparent", "transparent"]
                    }
                ]
            }}
            options={{
                cutoutPercentage: 65,
                legend: {
                    position: "right",
                    labels: {
                        boxWidth: 10,
                    },
                },
                responsive: false,
            }}
        />
    )

    return (
        <div className={customStyles.sex_doughnut_wrapper}>
            {doughnutChart}
            <strong className={customStyles.sex_doughnut_title}>性別割合</strong>
        </div>
    )
}

export default Sex
