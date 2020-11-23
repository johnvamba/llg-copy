import React, {useState, useEffect} from 'react';
import './css/loading-screen.css';

const LoadingScreen = ({title, speed = 800}) => {
    const [counter, setCounter] = useState(2);

    useEffect(()=>{
        var timer = () => { setCounter(counter == 3 ? 0 : counter++) };
        // var setTime = setInterval(timer, speed);
        // return {
        //     if(setTime){
        //         clearInterval(setTime)
        //     }
        // }
    }, [speed])

    return <div className="loading-container">
        <div className="loading-screen">
            <div className="loading-bar">
                <div className={`bar bar1`}></div>
                <div className={`bar bar2`}></div>
                <div className={`bar bar3`}></div>
            </div>
            <h3 className="loading-title">
                {
                    title || 'Loading...'
                }
            </h3>
        </div>
    </div>
}

export default LoadingScreen;