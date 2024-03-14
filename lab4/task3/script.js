document.addEventListener("DOMContentLoaded", renderLayout);

const pictureArray = [
    {
        id: 1,
        imageName: "1.jpeg",
    },
    {
        id: 2,
        imageName: "2.jpg",
    },
    {
        id: 3,
        imageName: "3.jpg",
    }
];

function renderLayout() {
    const picturesList = document.createElement("div");
    picturesList.className = "pictures__list";
    pictureArray.forEach((picture) => {
        picturesList.innerHTML +=
        `
            <div data-image="${picture.id}" class="picture__item">
                <img class="image" src="./images/${picture.imageName}" alt="${picture.id}">
            </div>
        `;
    });
    document.body.appendChild(picturesList);

    const picturesItems = picturesList.querySelectorAll(".picture__item");
    picturesItems.forEach(pictureItem => pictureItem.addEventListener("click", pictureHandler));
}

function pictureHandler(event) {
    const target = event.target;

    const elementWrapper = target.closest(".picture__item");
    const idPicture = parseInt(elementWrapper.getAttribute("data-image"));

    const pictureItem = pictureArray.find(item => item.id === idPicture);
    renderModal(pictureItem);
}

function renderModal(pictureItem) {
    const backdrop = document.createElement("div");
    const modal = document.createElement("div");
    backdrop.className = "backdrop";
    modal.className = "modal";

    modal.innerHTML =
    `
        <div class="modal__wrapper">
            <img class="pictures__production" src="./images/${pictureItem.imageName}" alt="${pictureItem.id}">
        </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    setTimeout(() => {
        backdrop.classList.add("active");
        modal.classList.add("active");
    }, 100);

    backdrop.addEventListener("click", removeModal);
}

function removeModal(event) {
    const modal = document.querySelector(".modal");
    const backdrop = event.target;

    document.body.removeChild(modal);
    document.body.removeChild(backdrop);
}



