import React from 'react';

const TabPastNeeds = () => {
    return (
        <>
            <section className="tab-active-needs tab-past-needs">
                <article>
                    <div className="tab-active-needs__img bg-cover bg-center" style={{backgroundImage: "url()"}}></div>
                    <div className="tab-active-needs__details">
                        <div className="content-top">
                            <h3>Title Here</h3>
                            <button>Fundraiser</button>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        <div className="content-bottom">
                            <label>2 days ago</label>
                            <button>Goal: $10,000</button>
                        </div>
                        <div className="content-bottom--progress">
                            <div className="relative">
                                <div className="w-full bg-gray-400 rounded-full">
                                    <div className={`bg-blue-400 rounded-full leading-none text-white`}></div>
                                </div>
                            </div>
                            <span>75%</span>
                        </div>
                    </div>
                </article>
                <article>
                    <div className="tab-active-needs__img"></div>
                    <div className="tab-active-needs__details">
                        <div className="content-top">
                            <h3>Title Here</h3>
                            <button>Fundraiser</button>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur...</p>
                        <div className="content-bottom">
                            <label>2 days ago</label>
                            <button>Goal: $10,000</button>
                        </div>
                        <div className="content-bottom--progress">
                            <div className="relative">
                                <div className="w-full bg-gray-400 rounded-full">
                                    <div className={`bg-blue-400 rounded-full leading-none text-white`}></div>
                                </div>
                            </div>
                            <span>75%</span>
                        </div>
                    </div>
                </article>
            </section>
        </>
    )
}
export default TabPastNeeds;