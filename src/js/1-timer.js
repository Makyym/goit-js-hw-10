import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate = 0;
const inputEl = document.querySelector("#datetime-picker");
const btnEl = document.querySelector("[data-start]");
btnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();
        if (selectedDate > currentDate) {
            btnEl.disabled = false;
            userSelectedDate = selectedDate;
        } else {
            btnEl.disabled = true;
            iziToast.warning({
                message: 'Please choose a date in the future',
                backgroundColor: "red",
                messageColor: "white",
                position: "topCenter",
            });
        }
    },
};

const timerEl = flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return `${value}`.padStart(2, "0");
};

btnEl.addEventListener("click", () => timerStart(userSelectedDate));

function timerStart(selectedDate) {
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = selectedDate - currentTime;
        if (deltaTime <= 0) {
            clearInterval(intervalId);
            return;
        } else {
            const time = convertMs(deltaTime);
            document.querySelector("[data-days]").textContent = addLeadingZero(time.days);
            document.querySelector("[data-hours]").textContent = addLeadingZero(time.hours);
            document.querySelector("[data-minutes]").textContent = addLeadingZero(time.minutes);
            document.querySelector("[data-seconds]").textContent = addLeadingZero(time.seconds);
            btnEl.disabled = true;
            inputEl.disabled = true;
        }
    }, 1000);
}
