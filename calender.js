// const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const date_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_btn = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_btn = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('#date');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year; 

selected_date_element.textContent = formatDate(date); 

// Event Listeners
window.addEventListener('click', toggleDatePicker);
next_mth_btn.addEventListener('click', goToNextMonth);
prev_mth_btn.addEventListener('click', goToPrevMonth);
populateDate();

// Funtions 
function toggleDatePicker(event) {
    if (!checkEventPathForClass(event.path, 'dates')) {
        date_element.classList.toggle('active');
    } else {
        selectedYear = (event.target.getAttribute('year'));
        selectedMonth = (event.target.getAttribute('month'));
        selectedDay = (event.target.getAttribute('day'));
        const selected = document.querySelector('.selected');
        if (selectedYear && selectedMonth && selectedDay) {
            if ( selected && selected.classList) {
                selected.classList.remove('selected');
            }
            event.target.classList.add('selected');
            selectedDate = new Date(selectedYear + '-' + selectedMonth + '-' + selectedDay);
            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.setAttribute('dataset', selectedYear + '-' + selectedMonth + '-' + selectedDay);
        }
    }
}

function goToNextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    selectedMonth = month;
    selectedYear = year;
    populateDate();
    mth_element.textContent = months[month] + ' ' + year;
}

function goToPrevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    selectedMonth = month;
    selectedYear = year;
    populateDate();
    mth_element.textContent = months[month] + ' ' + year;
}

function populateDate() {
    days_element.innerHTML = '';
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    let firstDay = (new Date(selectedYear, selectedMonth)).getDay();
    let date = 1;
    for (let week = 0; week < 6; week++) {
        let dateRow = document.createElement('div');
        dateRow.classList.add('days');
        for (let day = 0; day < 7; day++) {
            if (week === 0 && day < firstDay) {
                const day_elm = document.createElement('div');
                day_elm.classList.add('day');
                const text = document.createTextNode('');
                day_elm.appendChild(text);
                dateRow.appendChild(day_elm);
            } else if (date > daysInMonth) {
                break;
            } else {
                const todayDate = new Date();
                const day_elm = document.createElement('div');
                day_elm.classList.add('day');
                if (date === todayDate.getDate() && month === todayDate.getMonth() && year === todayDate.getFullYear()) {
                    day_elm.classList.add('selected');
                }
                const text = document.createTextNode(date);
                day_elm.appendChild(text);
                day_elm.setAttribute('year', year);
                day_elm.setAttribute('month', month + 1);
                day_elm.setAttribute('day', date);
                dateRow.appendChild(day_elm);
                date++;
            }
        }
        if (dateRow.hasChildNodes()) {
            days_element.appendChild(dateRow);
        }
    }

}

// helper function

function checkEventPathForClass(path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

function formatDate(date) {
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = date.getFullYear();
    return day + '/' + month +  '/' + year;
}

function getDaysInMonth(month, year) {
    return 32 - new Date(year, month, 32).getDate();
}