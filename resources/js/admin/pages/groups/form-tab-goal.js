import React, { useState } from 'react';
import PlusRounded from '../../../svg/plus-rounded';
import MinusRounded from '../../../svg/minus-rounded';

const FormTabGoal = ({goal = 0, setGoal, goalType = 'month', setGoalType}) => {

    const setNewGoal = (newGoal = 0) => {
        setGoal(newGoal < 0 ? 0 : newGoal)
    }

	return(
		<>
            <h3>Set your Group Goal</h3>
            <section className="tab__content">
                <p>Choose how many people you’d like to help this year/month.</p>
                <div className="tab__content-body">
                    <label>Goals to meet</label>
                    <div className="actions">
                        <button className="left" onClick={() => setNewGoal(goal - 1)}>
                            <MinusRounded />
                        </button>
                        <span>{goal}</span>
                        <button className="right" onClick={() => setNewGoal(goal + 1)}>
                            <PlusRounded />
                        </button>
                    </div>
                    <div className="type">
                        <span className={goalType == 'month' ? 'active' : null} onClick={() => setGoalType('month')}>Per Month</span>
                        <span></span>
                        <span className={goalType != 'month' ? 'active' : null} onClick={() => setGoalType('year')}>Per year</span>
                    </div>
                </div>
            </section>
		</>
	)
}

export default FormTabGoal;