import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");

function formSubmit(event) {
    event.preventDefault();
    const delayValue = formEl.elements.delay.value;
    const inputValue = formEl.elements.state.value;
    formEl.reset();
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (inputValue === "fulfilled") {
                resolve(delayValue);
            } else {
                reject(delayValue);
            }
        }, delayValue);
    });
    promise
        .then(delayValue => {
            iziToast.success({
                backgroundColor: "#59A10D",
                progressBarColor: "#B5EA7C",
                position: "topCenter",
                messageColor: "#FFFFFF",
                icon: false,
                message: `✅ Fulfilled promise in ${delayValue}ms`,
            });
        })
        .catch(delayValue => {
            iziToast.error({
                backgroundColor: "#803232",
                progressBarColor: "#FFBEBE",
                position: "topCenter",
                messageColor: "#FFFFFF",
                icon: false,
                message: `❌ Rejected promise in ${delayValue}ms`,
            });
        })
};

formEl.addEventListener("submit", () => formSubmit(event))