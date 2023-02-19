// CONSTANTS
const MONTH_ARRAY = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sept,Oct,Nov,Dec".split(",");
const DAYS_IN_EACH_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MILLISECONDS_IN_A_DAY = 86400000;
const [month_element, day_element, hour_element, minute_element, second_element] = [
    document.getElementById("month"),
    document.getElementById("day"),
    document.getElementById("hour"),
    document.getElementById("minute"),
    document.getElementById("second")
];

// FORMATTING AND UTILITY FUNCTIONS
const pad = (n) => (n < 10) ? ("0" + n) : n;

const getOrdinal = (n) => {
    let s = ["th","st","nd","rd"];
    let v = n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
}

const day_of_month_for_day_of_year = (day_of_year) => {
    var month = 0;
    var day = 0;
    while (day_of_year > 0) {
        if (day_of_year > DAYS_IN_EACH_MONTH[month]) {
        day_of_year -= DAYS_IN_EACH_MONTH[month];
        month++;
        } else {
        day = day_of_year;
        day_of_year = 0;
        }
    }
    return day;
}

const date_to_ms = (date) => {
    return date.getHours() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
}

// FUNCTIONAL FLOW
const get_current_local_date_time = () => {
    var now = new Date(new Date().toLocaleString());
    var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    let extra_ms = new Date().getMilliseconds();
    const datetime_in_milliseconds = date_to_ms(now) - date_to_ms(midnight) + extra_ms;
    return get_monthiness_for_milliseconds_past_midnight(datetime_in_milliseconds);
}

const get_monthiness_for_milliseconds_past_midnight = (datetime_in_milliseconds) => {
    let full_datetime = ["Jan", 1, 0, 0, 0];
    const progress_in_day = parseFloat(datetime_in_milliseconds / MILLISECONDS_IN_A_DAY);
    const month_index = Math.floor(progress_in_day * 12.0);
    full_datetime[0] = MONTH_ARRAY[month_index];
    return get_dayiness_for_milliseconds_past_midnight(full_datetime, progress_in_day);
}

const get_dayiness_for_milliseconds_past_midnight = (full_datetime, progress_in_day) => {
    const progress_in_day_as_day = parseFloat(progress_in_day * 365.0);
    const day_of_year_index = Math.floor(progress_in_day_as_day);
    full_datetime[1] = day_of_month_for_day_of_year(day_of_year_index + 1);

    const remainder_of_day = progress_in_day_as_day - day_of_year_index; 
    return get_houriness_for_milliseconds_past_midnight(full_datetime, remainder_of_day);
}

const get_houriness_for_milliseconds_past_midnight = (full_datetime, remainder_of_day) => {
    
    const hour = Math.floor(remainder_of_day * 24.0);
    full_datetime[2] = hour;

    const remainder_of_hour = parseFloat(remainder_of_day * 24.0 - hour);
    return get_minutiness_for_milliseconds_past_midnight(full_datetime, remainder_of_hour);
}

const get_minutiness_for_milliseconds_past_midnight = (full_datetime, remainder_of_hour) => {
    const minute = Math.floor(remainder_of_hour * 60.0);
    full_datetime[3] = minute;

    const remainder_of_minute = remainder_of_hour * 60.0 - minute;
    return get_secondiness_for_milliseconds_past_midnight(full_datetime, remainder_of_minute);
}

const get_secondiness_for_milliseconds_past_midnight = (full_datetime, remainder_of_minute) => {
    const second = Math.floor(remainder_of_minute * 60.0);
    full_datetime[4] = second;

    return full_datetime;
}

// FINAL OUTPUT
setInterval(() => {
    const [month, day, hour, minute, second] = get_current_local_date_time();

    month_element.innerHTML = month;
    day_element.innerHTML   = getOrdinal(day);
    hour_element.innerHTML  = pad(hour);
    minute_element.innerHTML= pad(minute);
    second_element.innerHTML= pad(second);
}, 100);