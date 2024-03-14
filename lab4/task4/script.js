const linkStyle = document.head.querySelector("link[rel='stylesheet']");
const btnChangeTheme = document.querySelector(".btn__change_theme");

btnChangeTheme.addEventListener("click", changeTheme);

const theme = {
    "white": "./white-theme.css",
    "black": "./black-theme.css"
}

function changeTheme() {
    const dataTheme = linkStyle.getAttribute("data-theme");
    switch (dataTheme) {
        case "white":
            linkStyle.href = theme.black;
            linkStyle.setAttribute("data-theme", "black");
            break;
        case "black":
            linkStyle.href = theme.white;
            linkStyle.setAttribute("data-theme", "white");
            break;
    }
}