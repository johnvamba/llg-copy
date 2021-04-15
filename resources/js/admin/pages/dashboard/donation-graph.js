import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";

const DonationGraph = () => {
    const [data, setData] = useState({
        donation: [],
        fundraise: [],
        volunteer: [],
        categories: [],
    });

    useEffect(() => {
        async function fetchData() {
            let {data} = await axios.get('/api/web/needs/graph');
            setData(data)
        }

        fetchData();
    }, []);

    const option = {
        series: [{
            name: 'Donations',
            data: data.donation
        }, {
            name: 'Fundraise',
            data: data.fundraise
        }, {
            name: 'Volunteer',
            data: data.volunteer
        }],
        options: {
            title: {
                text: 'Needs',
                align: 'left',
                offsetY: 20,
                style: {
                    fontWeight: 'thin'
                }
            },
            theme: {
                mode: 'light', 
                monochrome: {
                    enabled: true,
                    color: '#008FFB',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
            },
            chart: {
                type: 'bar',
                height: '500px',
                toolbar: {
                    show: false
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -10,
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
                categories: data.categories
                // categories: ['Jan '+data.year, 'Feb '+data.year, 'Mar '+data.year, 'Apr '+data.year, 'May '+data.year, 'Jun '+data.year, 'Jul '+data.year, 'Aug '+data.year, 'Setp '+data.year, 'Oct '+data.year, 'Nov '+data.year, 'Dec '+data.year],
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
            },
            grid: {
                show: true,
                strokeDashArray: 3
            }
        }
    };

    return (
        <div className="w-full border bg-white px-2 rounded-lg h-full">
            <div className="flex flex-col justify-center w-full">
                <Chart
                    options={option.options}
                    series={option.series}
                    type="bar"
                    height={400}
                />
            </div>
        </div>
    )
}
export default DonationGraph