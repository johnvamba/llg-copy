import React from 'react';

const TabActiveNeeds = ({ needs = [], loading = false }) => {
    if(loading)
        return <section className="tab-active-needs">
            <div>Loading...</div>
        </section>
    return (
        <section className="tab-active-needs">
            {
                needs.length > 0 && needs.map((i, k)=> <NeedCard key={k} {...i}/>) 
            }
        </section>
    )
}

const NeedCard = ({ title, type, date, goal, ratio = 0, description = '' }) => {
    return ( <article>
            <div className="tab-active-needs__img"></div>
            <div className="tab-active-needs__details">
                <div className="content-top">
                    <h3>{title}</h3>
                    <button>{type}</button>
                </div>
                <p>{description}</p>
                <div className="content-bottom">
                    <label>{date || 'missing-date'}</label>
                    {
                        (type == 'Volunteer' || type == 'volunteer') ?
                        <button>Goal: {goal} PAX</button> : <button>Goal: $ {goal}</button>
                    }
                </div>
                <div className="content-bottom--progress">
                    <div className="relative">
                        <div className="w-full bg-gray-400 rounded-full">
                            <div className={`bg-blue-400 rounded-full leading-none text-white`}></div>
                        </div>
                    </div>
                    <span>{ratio}%</span>
                </div>
            </div>
        </article>
    )
}

export default TabActiveNeeds;