const btnChangeBodyColor = document.getElementById("btn__change_body-color");
const body = document.querySelector("body");

btnChangeBodyColor.addEventListener("click", changeBackgroundColor);

function changeBackgroundColor() {
    let color = "#";
    for(let i = 0; i < 3; i++) {
        const sub = Math.floor(Math.random() * 256).toString(16);
        color += sub;
    }
    document.body.style.backgroundColor = `${color}`;
}