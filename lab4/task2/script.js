const form = document.querySelector("form");
const output = document.querySelector(".output");

document.addEventListener("DOMContentLoaded", () => outputFirstRender());
form.addEventListener("submit", (e) => outputFormInfoSubmit(e));

function outputFormInfoSubmit(e) {
    e.preventDefault();

    const target = e.target;

    const person = {
        name: target.name.value,
        email: target.email.value,
        message: target.message.value
    };

    outputFormInfo(person);
    e.target.reset();

}

function outputFormInfo({ name, email, message }) {
    const htmlMarkup =
        `
        <div class="output__wrapper">
            <h2>Ваши данные:</h2>
            <div class="output__item">
                <h2>Имя: </h2>    
                <p>${name}</p>
            </div> 
            <div class="output__item">
                <h2>Эл. почта: </h2>    
                <p>${email}</p>
            </div> 
            <div class="output__item">
                <h2>Телефон: </h2>    
                <p>${message}</p>
            </div>    
        <div>
    `;

    output.innerHTML = htmlMarkup;
}

function outputFirstRender() {
    output.innerHTML =
        `
        <div class="output__empty">
            <p class="output__text">Введите данные</p>
        </div>
    `;
}