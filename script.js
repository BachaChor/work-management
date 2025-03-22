let calenderElement = document.querySelector("#calender");

let weeksName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let fragment = document.createDocumentFragment();

let addDaysIncalender = () => {
    weeksName.forEach((element) => {
        let days = document.createElement("div");
        days.innerHTML = element;
        fragment.appendChild(days);
    })
    calenderElement.append(fragment);
}

let addDateIncalender = () => {
    for(let i=1; i<31; i++) {
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("calenderDate");
        dateDiv.innerHTML = i;
        calenderElement.appendChild(dateDiv);
    }
}

// fuctional clickers on the dates
let selectedDate = document.querySelector("#calender").addEventListener("click", function(event) {
    console.log(event.target.textContext);
});


addDaysIncalender();
addDateIncalender();

