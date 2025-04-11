let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document
    .querySelector(".calendar-current-date");

const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


// Attach a click event listener to each icon
prenexIcons.forEach(icon => {

    // When an icon is clicked
    icon.addEventListener("click", () => {

        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        // Check if the month is out of range
        if (month < 0 || month > 11) {

            // Set the date to the first day of the 
            // month with the new year
            date = new Date(year, month, new Date().getDate());

            // Set the year to the new year
            year = date.getFullYear();

            // Set the month to the new month
            month = date.getMonth();
        }

        else {

            // Set the date to the current date
            date = new Date();
        }
        manipulate();
    });
});

const events = {}; // Store events, using dates as keys (like '2025-04-10')


const eventList = document.querySelector("#event-list");

// Modify the date rendering to include data-date attribute
const manipulate = () => {
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let monthlastdate = new Date(year, month, 0).getDate();

    let lit = "";

    // Add last days of the previous month
    for (let i = dayone; i > 0; i--) {
        lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    // Add current month dates with data-date attribute
    for (let i = 1; i <= lastdate; i++) {
        let isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
        const formattedDate = `${year}-${month + 1}-${i < 10 ? '0' + i : i}`;
        lit += `<li class="${isToday}" data-date="${formattedDate}">${i}</li>`;
    }

    // Add first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`;
    }

    currdate.innerText = `${months[month]} ${year}`;
    day.innerHTML = lit;

    addEventListenersToDates(); // Add event listeners after the calendar is rendered
}

// Event handling for adding events to a date
const addEventListenersToDates = () => {
    const dateElements = document.querySelectorAll(".calendar-dates li");

    dateElements.forEach(dateElement => {
        dateElement.addEventListener("click", (e) => {
            if (!e.target.classList.contains('inactive')) {
                const dateClicked = e.target.getAttribute("data-date");
                const eventTitle = prompt("Enter an event for this day:");

                if (eventTitle) {
                    if (!events[dateClicked]) {
                        events[dateClicked] = [];
                    }
                    events[dateClicked].push(eventTitle);
                    displayEvents(); // Update the event display
                }
            }
        });
    });
};

const displayEvents = () => {
    const eventList = document.querySelector("#event-list");
    eventList.innerHTML = "";

    for (const [date, eventArray] of Object.entries(events)) {
        const dateDisplay = new Date(date);
        const formattedDate = `${months[dateDisplay.getMonth()]} ${dateDisplay.getDate()}, ${dateDisplay.getFullYear()}`;

        eventArray.forEach(event => {
            const eventItem = document.createElement("li");
            eventItem.innerHTML = `<strong>${event}</strong><span>${formattedDate}</span>`;
            eventList.appendChild(eventItem);
        });
    }
};

manipulate();