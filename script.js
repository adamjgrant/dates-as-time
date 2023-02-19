const get_current_local_date_time = () => {
    var current_local_date_time = new Date().toLocaleString();
    return get_date_time_in_milliseconds_past_midnight(current_local_date_time);
}

const get_date_time_in_milliseconds_past_midnight = (current_local_datetime) => {
    const date = new Date(current_local_datetime);
    const datetime_in_milliseconds = date.getHours() * 3600000 + date.getMinutes() * 60000 + date.getSeconds() * 1000 + date.getMilliseconds();
    return get_monthiness_for_milliseconds_past_midnight(datetime_in_milliseconds);
}

const get_monthiness_for_milliseconds_past_midnight = (datetime_in_milliseconds) => {
    let full_datetime = ["Jan", 1, 0, 0, 0];
    const milliseconds_in_a_day = 86400000;
    const progress_in_day = datetime_in_milliseconds / milliseconds_in_a_day;
    const month_index = Math.floor(progress_in_day * 12) - 1
    full_datetime[0] = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sept,Oct,Nov,Dec".split(",")[month_index];
    return get_dayiness_for_milliseconds_past_midnight(full_datetime, progress_in_day);
}

const get_dayiness_for_milliseconds_past_midnight = (full_datetime, progress_in_day) => {
    return get_houriness_for_milliseconds_past_midnight(full_datetime);
}

const get_houriness_for_milliseconds_past_midnight = (full_datetime, progress_in_day) => {
    return get_minutiness_for_milliseconds_past_midnight(full_datetime);
}

const get_minutiness_for_milliseconds_past_midnight = (full_datetime, progress_in_day) => {
    return full_datetime;
}

const pad = (n) => (n < 10) ? ("0" + n) : n;

function getOrdinal(n) {
    let s = ["th","st","nd","rd"];
    let v = n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
}

setTimeout(() => {
    const [month, day, hour, minute, second] = get_current_local_date_time();
    const [month_element, day_element, hour_element, minute_element, second_element] = [
        document.getElementById("month"),
        document.getElementById("day"),
        document.getElementById("hour"),
        document.getElementById("minute"),
        document.getElementById("second")
    ];

    month_element.innerHTML = month;
    day_element.innerHTML   = getOrdinal(day);
    hour_element.innerHTML  = pad(hour);
    minute_element.innerHTML= pad(minute);
    second_element.innerHTML= pad(second);
}, 100);