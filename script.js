let calenderElement = document.querySelector("#calender");
let fragment = document.createDocumentFragment();
let weeksName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthOptionListElement = document.querySelector("#month-options");



// Calendar/Date --> variable declarations
const currentDateElement = new Date();      // current date object
let currentYear = currentDateElement.getFullYear();
let currentMonthIndex = currentDateElement.getMonth()-1 ;
let currentMonthName = monthsName[currentDateElement.getMonth()];



let getMonthIndex = (month) => {
    let monthsName = {
        "January" : 0,
        "February" : 1,
        "March" : 2,
        "April" : 3,
        "May" : 4,
        "June" : 5,
        "July" : 6,
        "August" : 7,
        "September" : 8,
        "October" : 9,
        "November" : 10,
        "December" : 11,
    }
    return monthsName[month] ?? -1; //return -1 if not found
}

/**
 * @param {userSelectedYear} userSelectedYear -> Integer value of Year
 * @param {userSelectedMonth} userSelectedMonth -> String value of Month
 */
let getCalendarChanged = (userSelectedYear, userSelectedMonth) => {
    currentYear = userSelectedYear;
    currentMonthIndex = getMonthIndex(userSelectedMonth);
    spawnCalendar();
}


/// change the calendar according to the user input







/**
 * 
 * @param {number} year -> year  
 * @param {*} month -> month index from 0
 * @returns length of the Month
 */
let getMonthsLength = (year, month) => new Date(year, month+1, 0).getDate();     // this is a function


/**
 * Returns a String Value for the Date index
 * @param {dateIndex} dateIndex Starting from sunday for 0 index
 */
let getDayUsingIndex = (dateIndex) => {
    switch(dateIndex) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "Invalid Day";
    }
}


/**
 * Add dynamic date to the calendar
 */
let addDateInCalender = () => {
    const firstDay_CurrentMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
    const currentMonthLength = getMonthsLength(currentYear, currentMonthIndex);
    const prevMonthLength = getMonthsLength(currentYear, currentMonthIndex-1);
    let copyFirstDay_CurrentMonth = firstDay_CurrentMonth;      // change this variable name
    let oldDays = (prevMonthLength - firstDay_CurrentMonth) + 1;      // variable holding the days of the previous months that are to be appeared in the current calendar
    let nextMonthDay = 1;


    let temp = 1;
    let prevDaysIn_currentCalendar = 0;
    let totalBlockInCalender = 42;

    for(let i = 0; i<totalBlockInCalender; i++) {
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("calenderDate");
        dateDiv.dataset.index = i;
    

        let calenderDateElement = document.querySelector(".calendarDate");
        // adding the previous month dates
        if((Number)(dateDiv.dataset.index) < firstDay_CurrentMonth) {
            dateDiv.innerHTML = oldDays++;
            dateDiv.classList.add("fade-effect");
            prevDaysIn_currentCalendar++;
        }


        // adding the current month dates
        if(dateDiv.dataset.index == `${copyFirstDay_CurrentMonth}` && (Number)(dateDiv.dataset.index) < currentMonthLength+prevDaysIn_currentCalendar) {
            copyFirstDay_CurrentMonth++;
            dateDiv.innerHTML = temp++;
            dateDiv.classList.add("clickable-dates");
        }


        // adding the next month dates
        if((Number)(dateDiv.dataset.index) >= currentMonthLength+prevDaysIn_currentCalendar) {
            dateDiv.innerHTML = nextMonthDay++;
            dateDiv.classList.add("fade-effect");
        }
        
        calenderElement.appendChild(dateDiv)
    }

}







let addDateInalenderOld = () => {       // this is supposed to be remove it's a dummy


    for(let i=1; i<=42; i++) {
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("calenderDate");
        dateDiv.innerHTML = i;

        calenderElement.appendChild(dateDiv);
    }
}

let addDaysInCalender = () => {
    weeksName.forEach((element) => {
        let days = document.createElement("div");
        days.classList.add("week-days-name");
        days.innerHTML = element;
        fragment.appendChild(days);
    })
    calenderElement.append(fragment);
}


let showDateEvent = () => {
    // this is be showing the to-do's of that particular date
}



// adds eventListener on current month of the calendar
calenderElement.addEventListener("click", function (event) {
    if (event.target.classList.contains("clickable-dates")) {
        showDateEvent();
        console.log("Date Clicked:", event.target.textContent);
        event.target.style.backgroundColor = "#4CAF50";  // Highlight selected date
        event.target.style.color = "white";
    }
});





// this segement is creating the year options for the user

let nearByYears = [currentYear-2, currentYear-1, currentYear, currentYear+1, currentYear+2];
let userSelectedYear = null;
let yearOptionListElement = document.querySelector("#year-options");
let yearInputElement = document.querySelector("#inputField-year");

let createYearOptions = () => {
    yearOptionListElement.innerHTML = ""; // Clear existing options

    nearByYears.forEach((year) => {
        let option = document.createElement("option");
        option.value = year;
        option.textContent = year; 

        if(year === currentYear) {
            option.selected =  true;
        }
        
        yearOptionListElement.appendChild(option);
    });
};

// adding event listener on the year selector 
(() => {
    yearInputElement.addEventListener("input", function () {
        userSelectedYear = parseInt(this.value);
        
        console.log("Selected Year:", userSelectedYear);
        console.log(typeof(userSelectedYear));
        getCalendarChanged(userSelectedYear, currentMonthIndex);
    })
})();


// this is spawning the list of the months 
let userSelectedMonth = null;

let createMonthOptions = () => {
    monthsName.forEach((element) => {
        if(currentMonthName === element) {
            monthOptionListElement.innerHTML += `<option value="${element}" selected> ${element} </option>`;    // make the month selected which is current
        }else {
            monthOptionListElement.innerHTML += `<option value="${element}"> ${element} </option>`;
        }
        
    })

    // adding event listener to the calander for the user to selece the dates     
    monthOptionListElement.addEventListener("change", function() {
        userSelectedMonth = monthOptionListElement.value;
        
        getCalendarChanged(userSelectedMonth);
    })



}






let spawnCalendar = () => {
    calenderElement.innerHTML = "";     // clearing the calendar for the repaint of new month
    addDaysInCalender();
    addDateInCalender();
}


// this is all the function calls
let initializeApp = () => {
    createYearOptions();
    createMonthOptions();
    spawnCalendar();
}
initializeApp();


