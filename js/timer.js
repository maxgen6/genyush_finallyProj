
window.addEventListener('DOMContentLoaded', () => {
    'use strict';


    const timer = deadline => {
        let timeHours = document.querySelector('.hours');
        let timeMinutes = document.querySelector('.minutes');
        let timeSeconds = document.querySelector('.seconds');
        let timeDay = document.querySelector('.day')

        function getTime() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600) % 24,
                day =  Math.floor(timeRemaining / 60 / 60 / 24);
                
            return {timeRemaining, seconds, minutes,hours, day}
        }

        const interval = setInterval(() => {
            let timer = getTime()
            timer.day > 9 ? timeDay.textContent = timer.day : timeDay.textContent = `0${timer.day}`;
            timer.hours > 9 ? timeHours.textContent = timer.hours : timeHours.textContent = `0${timer.hours}`;
            timer.minutes > 9 ? timeMinutes.textContent = timer.minutes : timeMinutes.textContent = `0${timer.minutes}`;
            timer.seconds > 9 ? timeSeconds.textContent = timer.seconds : timeSeconds.textContent = `0${timer.seconds}`;

            if(timer.timeRemaining < 0) {
                clearInterval(interval);
                timeHours.textContent = '0';
                timeMinutes.textContent = '0';
                timeSeconds.textContent = '0';
            }
        }, 1000) 

    }
    timer('11 april 2021')
})