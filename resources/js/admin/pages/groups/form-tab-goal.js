import React, { useState } from 'react';
import PlusRounded from '../../../svg/plus-rounded';
import MinusRounded from '../../../svg/minus-rounded';

const FormTabGoal = () => {

    const [activePerMonth, setActivePerMonth] = useState(false);
    const [activePerYear, setActivePerYear] = useState(true);
    const [goalVal, setGoalVal] = useState(8);

    const toggleType = () => {
        if(activePerMonth){
            setActivePerMonth(false)
            setActivePerYear(true);
        }else if(activePerYear){
            setActivePerMonth(true)
            setActivePerYear(false);
        }
    }

	return(
		<>
            <h3>Set your Group Goal</h3>
            <section className="tab__content">
                <p>Choose how many people you’d like to help this year/month.</p>
                <div className="tab__content-body">
                    <label>Goals to meet</label>
                    <div className="actions">
                        <button onClick={() => setGoalVal(goalVal - 1)}>
                            <MinusRounded />
                        </button>
                        <span>{goalVal}</span>
                        <button onClick={() => setGoalVal(goalVal + 1)}>
                            <PlusRounded />
                        </button>
                    </div>
                    <div className="type">
                        <span className={activePerMonth ? 'active' : null} onClick={toggleType}>Per Month</span>
                        <span></span>
                        <span className={activePerYear ? 'active' : null} onClick={toggleType}>Per year</span>
                    </div>
                </div>
            </section>
		</>
	)
}

export default FormTabGoal;