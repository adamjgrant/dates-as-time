const get_current_local_date_time = () => {
    return get_date_time_in_seconds_past_midnight();
}

const get_date_time_in_seconds_past_midnight = (current_local_datetime) => {
    return get_monthiness_for_seconds_past_midnight();
}

const get_monthiness_for_seconds_past_midnight = (datetime_in_seconds) => {
    return get_dayiness_for_seconds_past_midnight(["Jan", 1, 0, 0, 0]);
}

const get_dayiness_for_seconds_past_midnight = (full_datetime, seconds_past_midnight) => {
    return get_houriness_for_seconds_past_midnight(full_datetime);
}

const get_houriness_for_seconds_past_midnight = (full_datetime, seconds_past_midnight) => {
    return get_minutiness_for_seconds_past_midnight(full_datetime);
}

const get_minutiness_for_seconds_past_midnight = (full_datetime, seconds_past_midnight) => {
    return full_datetime;
}

const pad = (n) => (n < 10) ? ("0" + n) : n;

function getOrdinal(n) {
    var s=["th","st","nd","rd"],
        v=n%100;
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