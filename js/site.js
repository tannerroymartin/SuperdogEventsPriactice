let eventArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    },
];

//the default display is all events

let filteredEvents = eventArray;

function buildDropDown() {
    let eventDropDown = document.getElementById("eventDropDown");

    let distinctEvents = [...new Set(eventArray.map((event) => event.city))];

    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultsHTML = "";

    for (let i = 0; i < distinctEvents.length; i++) {
        resultsHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }

    resultsHTML += linkHTMLEnd;
    eventDropDown.innerHTML = resultsHTML;
    displayStats();

}

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

    }

    average = total / filteredEvents.length;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );



}

//get the events for the selected city
function getEvents(element) {
    let city = element.getAttribute("data-string");
    let curEvents = JSON.parse(localStorage.getItem("eventArray")) || eventArray;
    filteredEvents = curEvents;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if (city != "All") {
        filteredEvents = curEvents.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        });

    }
    displayStats();
}

loadBottomTable();

function loadBottomTable() {
    let bottomTable = [];
    bottomTable = getData();
    displayData(bottomTable);
}

function getData() {
    let bottomTable = JSON.parse(sessionStorage.getItem("eventArray")) || [];

    if (bottomTable.length == 0) {
        bottomTable = eventArray;
        localStorage.setItem("eventArray", JSON.stringify(bottomTable));
    }
    return bottomTable;
}

function saveAdd() {
    //grab events out of local storage
    let bottomTable = JSON.parse(sessionStorage.getItem("eventArray")) || eventArray;

    let obj = {}; 
    obj["event"] = document.getElementById("newEventName").value;
    obj["city"] = document.getElementById("newCity").value;
    obj["state"] = document.getElementById("newState").value;
    obj["attendance"] = +document.getElementById("newAttandance").value;
    obj["date"] = document.getElementById("newEventDate").value;

    bottomTable.push(obj);

    localStorage.setItem("eventArray", JSON.stringify(bottomTable));

    //Access the values from the form by ID and add an object to the array
    buildDropDown();
    displayData(bottomTable);
}

function displayData(bottomTable) {

    const template = document.getElementById("dataTemplate");
    const resultsBody = document.getElementById("resultsBody");
    //clear table first
    resultsBody.innerHTML = "";

    for (let i = 0; i < bottomTable.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("eventName").textContent = bottomTable[i].event;
        dataRow.getElementById("city").textContent = bottomTable[i].city;
        dataRow.getElementById("state").textContent = bottomTable[i].state;
        dataRow.getElementById("attendance").textContent = bottomTable[i].attendance.toLocaleString();
        dataRow.getElementById("eventDate").textContent = bottomTable[i].date;


        resultsBody.appendChild(dataRow);
    }
}