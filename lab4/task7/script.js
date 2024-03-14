const btnGeneratingNumber = document.querySelector(".btn__generating_number");
const output = document.querySelector(".output");
const hintsOutput = document.querySelector(".hints");

document.addEventListener("DOMContentLoaded", renderLayout);
btnGeneratingNumber.addEventListener("click", generatingNumber);

function generatingNumber() {
    const number = getRandomNumber(1, 1000);
    btnGeneratingNumber.disabled = true;
    JSON.stringify(localStorage.setItem("randomNumber", number));
    renderLayout();
}

function renderLayout() {
    const randomNumber = Number(JSON.parse(localStorage.getItem("randomNumber")));
    output.innerHTML = "";
    if (!randomNumber) {
        btnGeneratingNumber.disabled = false;
        return;
    }
    createForm();
    hints("Введите число", "first");
}

function createForm() {
    btnGeneratingNumber.disabled = true;
    const form = document.createElement("form");
    form.className = "form";
    form.innerHTML = `
        <input name="number" type="number"/>
        <button type="submit" сlass="btn__check_random-number">Проверить</button>
    `;
    output.appendChild(form);

    const formCheckNumber = document.querySelector(".form");
    formCheckNumber.addEventListener("submit", (e) => {
        e.preventDefault();
        const number = Number(e.target.number.value);
        checkRandomNumber(number)
    });
}

function checkRandomNumber(number) {
    const storageNumber = Number(JSON.parse(localStorage.getItem("randomNumber")));
    if (number === storageNumber) {
        hints(`Вы угадали, это число ${number}`, "success");
        localStorage.removeItem("randomNumber");
        renderLayout();
        return;
    }
    if (number > storageNumber) {
        hints("Число меньше вашего", "error");
    }
    if (number < storageNumber) {
        hints("Число больше вашего", "error");
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hints(str, className) {
    hintsOutput.innerHTML = `<p class="${className}">${str}</p>`;
}