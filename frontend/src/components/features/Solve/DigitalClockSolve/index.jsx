import React, { useState, useEffect } from 'react';

const DigitalClockSolve = () => {
    const [startTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 1000);

        return () => clearInterval(timerId);
    }, [startTime]); // Dependency on startTime to reset the interval if it ever changes

    const formatElapsedTime = (milliseconds) => {
        let totalSeconds = Math.floor(milliseconds / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="digital-clock-solve">
            {formatElapsedTime(elapsedTime)}
        </div>
    );
};

export default DigitalClockSolve;
