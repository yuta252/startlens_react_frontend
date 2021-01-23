import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Doughnut } from 'react-chartjs-2';

import { AppDispatch } from '../../../../app/store';
import customStyles from '../Dashboard.module.css';
import {
    displayGenerationData,
    selectDisplayGeneration,
    selectBirth,
} from '../dashboardSlice';
import { BIRTH } from '../../../types';


const Birth: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const birth = useSelector(selectBirth);
    const displayGeneration = useSelector(selectDisplayGeneration);

    useEffect( () => {
        dispatch(displayGenerationData(getGenerationObj(birth)));
    }, [birth, dispatch])

    const getGenerationObj = (birth: BIRTH) => {
        const currentYear = 2021;
        let generationObj = {
            "0": 0, "10": 0, "20": 0, "30": 0, "40": 0, "50": 0,
            "60": 0, "70": 0, "80": 0, "90": 0
        }
        Object.keys(birth).map( (birthYear) => {
            const age = currentYear - Number(birthYear);
            if (0 < age && age <= 10) {
                generationObj["0"] += birth[birthYear];
            } else if (10 < age && age <= 20) {
                generationObj["10"] += birth[birthYear];
            } else if (20 < age && age <= 30) {
                generationObj["20"] += birth[birthYear];
            } else if (30 < age && age <= 40) {
                generationObj["30"] += birth[birthYear];
            } else if (40 < age && age <= 50) {
                generationObj["40"] += birth[birthYear];
            } else if (50 < age && age <= 60) {
                generationObj["50"] += birth[birthYear];
            } else if (60 < age && age <= 70) {
                generationObj["60"] += birth[birthYear];
            } else if (70 < age && age <= 80) {
                generationObj["70"] += birth[birthYear];
            } else if (80 < age && age <= 90) {
                generationObj["80"] += birth[birthYear];
            } else if (90 < age && age <= 100) {
                generationObj["90"] += birth[birthYear];
            }
        });
        return generationObj
    }

    const doughnutChart = birth && displayGeneration && (
        <Doughnut
            data={{
                labels: [
                    "10歳未満", "10代", "20代", "30代", "40代", "50代",
                    "60代", "70代", "80代", "90歳以上"
                ],
                datasets: [
                    {
                        data: Object.keys(displayGeneration).map( (index) => displayGeneration[index]),
                        backgroundColor: [
                            "#303f9f",
                            "#d32f2f",
                            "#fbc02d",
                            "#0288d1",
                            "#388e3c",
                            "#e64a19",
                            "#512da8",
                            "#455a64",
                            "#afb42b",
                            "#1976d2"
                        ],
                        hoverBackgroundColor: [
                            "#5c6bc0",
                            "#ef5350",
                            "#ffee58",
                            "#29b6f6",
                            "#66bb6a",
                            "#ff7043",
                            "#7e57c2",
                            "#78909c",
                            "#d4e157",
                            "#42a5f5"
                        ],
                        borderColor: [
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent",
                            "transparent"
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
            <strong className={customStyles.generation_doughnut_title}>年代割合</strong>
        </div>
    )
}

export default Birth