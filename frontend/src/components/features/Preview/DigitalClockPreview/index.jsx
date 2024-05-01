import React, { useState, useEffect } from 'react';

const DigitalClockPreview = ({ startTime }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (startTime) { // Only start the timer if startTime has been set
            const timerId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [startTime]); // Dependency on startTime to reset the interval when it changes

    const formatElapsedTime = (milliseconds) => {
        let totalSeconds = Math.floor(milliseconds / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="digital-clock-preview">
            {formatElapsedTime(elapsedTime)}
        </div>
    );
};

export default DigitalClockPreview;
