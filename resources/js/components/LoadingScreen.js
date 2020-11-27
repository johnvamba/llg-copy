import React, {useState, useEffect} from 'react';
import './css/loading-screen.css';

const LoadingScreen = ({title = 'Loading...'}) => {
    return <div className="loading-container">
        <div className="loading-screen">
            <div className="loading-bar">
                <div className={`bar bar1`}></div>
                <div className={`bar bar2`}></div>
                <div className={`bar bar3`}></div>
            </div>
            <h3 className="loading-title">{ title }</h3>
        </div>
    </div>
}
export default LoadingScreen;