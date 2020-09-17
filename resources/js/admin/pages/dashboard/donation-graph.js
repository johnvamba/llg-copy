import React, { useState } from 'react';
import Chart from "react-apexcharts";

const DonationGraph = () => {
    const [startDate, setStartDate] = useState(new Date());

    const option = {
        series: [{
            name: 'Donations',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Fundraise',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Volunteer',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb 2020', 'Mar 2020', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val
                    }
                }
            }
        },


    };

    return (
        <div className="w-full border bg-white p-4 rounded-lg h-full">
            <div className="pt-2 pb-4 text-sm">
                <p>Needs</p>
            </div>
            <div className="flex flex-col justify-center">
                <Chart
                    options={option.options}
                    series={option.series}
                    type="bar"
                    height={350}
                    width={`100%`}
                />
            </div>
        </div>
    )
}
export default DonationGraph