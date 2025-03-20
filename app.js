document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const isCorrectYear = (year) => {
        return /^\d+$/.test(year) && parseInt(year, 10) >= today.getFullYear();
    }
    const isCorrectMonth = (month, year) => {
        const parsedMonth = parseInt(month, 10);
        return /^\d+$/.test(month) && month.length === 2 &&
        (parsedMonth >= (today.getMonth() + 1) || year > today.getFullYear()) && parsedMonth <= 12;
    }
    const isDaySmaller = (day, month, year) => {
        switch(month){
            case 2:
                return day <= (((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28);
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return day <= 31;
            default:
                return day <= 30;
        }
    }
    const isCorrectDay = (day, month, year) => {
        const parsedDay = parseInt(day, 10);
        return /^\d+$/.test(day) && day.length === 2 &&
        (parsedDay >= today.getDate() || (month > today.getMonth() + 1) || year > today.getFullYear()) &&
        isDaySmaller(parsedDay, month, year);
    }
    const isCorrectHours = (hour) => {
        const parsedHours = parseInt(hour, 10);
        return /^\d+$/.test(hour) && hour.length === 2 && parsedHours >= today.getHours() && parsedHours < 24;
    }
    const isCorrectMinutes = (min, hour) => {
        const parsedMinutes = parseInt(min, 10);
        return /^\d+$/.test(min) && min.length === 2 && 
        (parsedMinutes >= today.getMinutes() || hour > today.getHours()) && parsedMinutes < 60;
    }


    let date;
    let dateParts;
    do {
        date = prompt("Введіть Дату у Форматі: YYYY-MM-DD: ");
        dateParts = date.split("-");
    } while (
        dateParts.length !== 3 ||
        !isCorrectYear(dateParts[0]) ||
        !isCorrectMonth(dateParts[1], parseInt(dateParts[0])) ||
        !isCorrectDay(dateParts[2], parseInt(dateParts[1], 0), parseInt(dateParts[0], 0))
    );

    let units;
    let unitsParts;
    do {
        units = prompt("Введіть Час У Форматі: HH:MM ");
        unitsParts = units.split(":");
    } while (
        unitsParts.length !== 2 || 
        !isCorrectHours(unitsParts[0]) || !isCorrectMinutes(unitsParts[1], parseInt(unitsParts[0], 10))
    );
    const neededDay = new Date(date + "T" + units);
   
    const countdownElement = document.querySelector(".date__countdown");
    const timeElement = document.querySelector(".date__countdown time");
    const subscribeElement = document.querySelector(".date__subscribe");

    const clickFunction = () => {
        countdownElement.innerText = "Вітаю ви Встигли !";
        clearInterval(intervalId);
        subscribeElement.removeEventListener("click", clickFunction)
    };
    subscribeElement.addEventListener("click", clickFunction);

    timeElement.dateTime = date;
    const intervalId = setInterval(() => {
        const diff = neededDay - new Date();
        if(diff < 0){
            timeElement.innerHTML = "Час Закінчився !";
            subscribeElement.disabled = true;
            clearInterval(intervalId);
            return;
        }


        const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        let remainingDiff = diff - diffYears * (1000 * 60 * 60 * 24 * 365);


        const diffMonths = Math.floor(remainingDiff / (1000 * 60 * 60 * 24 * 30));
        remainingDiff -= diffMonths * 1000 * 60 * 60 * 24 * 30;


        const diffDays = Math.floor(remainingDiff / (1000 * 60 * 60 * 24));
        remainingDiff -= diffDays * 1000 * 60 * 60 * 24;


        const diffHours = Math.floor(remainingDiff / (1000 * 60 * 60));
        remainingDiff -= diffHours * 1000 * 60 * 60;


        const diffMinutes = Math.floor(remainingDiff / (1000 * 60));
        remainingDiff -= diffMinutes  * 1000 * 60;


        const diffSeconds = Math.floor(remainingDiff / 1000);


        let diffParts = [];
        for(const diffPart of [
            {value: diffYears, description: "р."},
            {value: diffMonths, description: "м."},
            {value: diffDays, description: "д."},
            {value: diffHours, description: "год."},
            {value: diffMinutes, description: "хв."},
            {value: diffSeconds, description: "сек."}
        ]){
            if(diffPart.value !== 0){
                diffParts.push(diffPart.value + diffPart.description);
            }
        }
       
        timeElement.innerText = diffParts.join(" ");
    }, 1000);
});