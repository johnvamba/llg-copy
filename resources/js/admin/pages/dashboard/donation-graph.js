import React, { useState } from 'react';
import moment from 'moment'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import CanvasJSReact from '../../../../assets/canvasjs.react';
import DateCustomInput from './dateCustomInput';

const DonationGraph = () => {
    const [startDate, setStartDate] = useState(new Date());

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {},
        legend: {
            fontFamily: "calibri",
            fontSize: 14,
            itemTextFormatter: function (e) {
                return e.dataPoint.name + ": " + e.dataPoint.y + "%";
            }
        },
        data: [{
            cursor: "pointer",
            type: "doughnut",
            showInLegend: true,
            dataPoints: [
                { name: "Apple", y: 10 },
                { name: "Orange", y: 30 },
                { name: "Banana", y: 25 },
                { name: "Mango", y: 30 },
                { name: "Grape", y: 28 }
            ]
        }]
    }

    return (
        <div className="w-full shadow-lg bg-white p-4 rounded-lg">
            <div className="flex flex-row px-2 pt-2 pb-4">
                <div className="flex flex-1">
                    <p>Donations by type</p>
                </div>
                
                <div className="flex flex-1 justify-end">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        customInput={<DateCustomInput />}
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                    />  
                </div>
            </div>
            <CanvasJSChart options={options} />
        </div>
    )
}

export default DonationGraph