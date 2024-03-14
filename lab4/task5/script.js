const navLinks = document.querySelectorAll(".nav__link");

const contactForm = document.querySelector(".contact__form");

const changeThemeBtn = document.querySelector(".btn__change_theme");

const catalogList = document.querySelector(".catalog__list");
const basketBtn = document.querySelector(".basket__btn");
const backdrop = document.querySelector(".backdrop");
const basketModal = document.querySelector(".basket__modal");
const basketBody = document.querySelector(".basket__modal_body");
const exitBasket = document.querySelector(".exit__basket");

const btnChangeBodyColor = document.querySelector(".btn__change_body-color");
const body = document.querySelector("body");

basketBtn.addEventListener("click", () => {
    backdrop.classList.add("active");
    basketModal.classList.add("active");
    scrollController.disabledScroll()
});

backdrop.addEventListener("click", () => {
    backdrop.classList.remove("active");
    basketModal.classList.remove("active");
    scrollController.enabledScroll()
});

exitBasket.addEventListener("click", () => {
    backdrop.classList.remove("active");
    basketModal.classList.remove("active");
    scrollController.enabledScroll()
});

const products = [
    {
        id: 1,
        name: "Мягкая игрушка Minecraft: Пчела",
        image: "pchela.jpeg",
        description: "Пчела из Minecraft",
        price: 990,
    },
    {
        id: 2,
        name: "Мягкая игрушка Чебурашка",
        image: "cheburashka.webp",
        description: "Мягкая игрушка «Чебурашка» - замечательная мягконабивная игрушка для Вашего ребенка.",
        price: 1790,
    },
    {
        id: 3,
        name: "Мягкая игрушка Laffi Корги Сплюша лежачая",
        image: "korgi.webp",
        description: "Мягкая игрушка СмолТойс «Корги Сплюша» - замечательная мягконабивная игрушка для Вашего ребенка.",
        price: 1399,
    },
    {
        id: 4,
        name: "Мягкая игрушка TRUDI Медведь Барнаба 105см",
        image: "barnaba.webp",
        description: "Медведь Барнаба станет хорошим другом для вашего малыша, ведь с такой большой игрушкой каждому ребенку будет весело и интересно.",
        price: 59346,
    }
]

const themeObject = {
    "white": "./white-theme.css",
    "black": "./black-theme.css"
}

btnChangeBodyColor.addEventListener("click", changeBackgroundColor);

document.addEventListener("DOMContentLoaded", () => {
    renderProducts()
    basketLoad();
    renderTheme();
});

navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = link.getAttribute("href");

        document.querySelector('' + href).scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        })
    });
});

contactForm.addEventListener("submit", submitContactForm);

changeThemeBtn.addEventListener("click", changeTheme);

function changeTheme() {
    const theme = localStorage.getItem("theme");
    if (theme === "white") {
        localStorage.setItem("theme", "black");
    }
    if (theme === "black") {
        localStorage.setItem("theme", "white");
    }
    renderTheme();
}

function renderTheme() {
    const theme = localStorage.getItem("theme");
    const linkStyle = document.head.querySelector("link[rel='stylesheet']");
    if (theme === "white") {
        linkStyle.href = themeObject.white;
        changeThemeBtn.innerHTML =
            `
            <?xml version="1.0" encoding="utf-8"?>
            <svg width="30px" height="30px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#FFAC33" d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"></path><circle fill="#FFAC33" cx="18" cy="18" r="10"></circle></svg>
        `;
        return;
    }
    if (theme === "black") {
        linkStyle.href = themeObject.black;
        changeThemeBtn.innerHTML =
            `
            <?xml version="1.0" encoding="utf-8"?>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1C274C"/>
            </svg>
        `;
        return;
    }
    localStorage.setItem("theme", "white");
    return renderTheme();
}

function showPicture(imgSRC) {
    const productImgModal = document.createElement("div");
    const backdropProductImg = document.createElement("div");
    productImgModal.className = "product__img_modal";
    backdropProductImg.className = "backdrop__product_img";
    productImgModal.innerHTML =
        `
        <div class="product__img_modal-body">
            <img class="modal__img_product" src="${imgSRC}" alt=""/>
        </div>
    `;
    document.body.appendChild(backdropProductImg);
    document.body.appendChild(productImgModal);
    scrollController.disabledScroll();
    backdropProductImg.addEventListener("click", hidePicture);
}

function hidePicture() {
    const productImgModal = document.querySelector(".product__img_modal");
    const backdropProductImg = document.querySelector(".backdrop__product_img");
    document.body.removeChild(productImgModal);
    document.body.removeChild(backdropProductImg);
    scrollController.enabledScroll();
}

function renderProductButton(idProduct) {
    const basket = getBasket();
    const existProduct = basket.find(product => product.id === idProduct);

    if (existProduct) {
        return `<button class="delete__product-basket">Убрать из корзины</button>`;
    }
    return `<button class="add__item">В корзину</button>`;
}

function renderProducts() {
    catalogList.innerHTML = "";
    products.forEach((product) => {
        catalogList.innerHTML +=
            `
                <div data-product="${product.id}" id="product" class="catalog__item">
                    <div class="item__img_wrapper">
                        <img class="item__img" src="./images/products/${product.image}" alt="">
                    </div>
                    <div class="item__info_wrapper">
                        <div class="item__name_wrapper">
                            <h3 class="item__name">${product.name}</h3>
                        </div>
                    <div class="item__description_wrapper">
                        <span>О товаре: </span>
                        <p class="item__description">
                            ${product.description}
                        </p>
                    </div>
                    <div class="item__price">
                        <span>Цена: </span>
                        <p>${product.price} руб.</p>
                    </div>
                    </div>
                    <div class="add__item_wrapper">
                        ${renderProductButton(product.id)}
                    </div>
                </div>
        `;
    });

    const addItems = document.querySelectorAll(".add__item") || "";
    const deleteItems = document.querySelectorAll(".delete__product-basket") || "";
    if (addItems) {
        addItems.forEach((addItem) => addItem.addEventListener("click", addProductHandler));
    }
    if (deleteItems) {
        deleteItems.forEach((deleteItem) => deleteItem.addEventListener("click", deleteProductHandler));
    }

    const itemsImg = document.querySelectorAll(".item__img");
    itemsImg.forEach(img => img.addEventListener("click", (event) => showPicture(event.target.src)));
}

function basketLoad() {
    const totalBodyLayout = document.querySelector(".total__body") || "";
    const basket = getBasket();
    if (!basket.length) {
        renderEmptyBasket();
        if (totalBodyLayout) {
            basketBody.removeChild(totalBodyLayout);
        }
        return;
    }
    renderBasket(basket);
    renderTotalPrice();
}

function getBasket() {
    return JSON.parse(document.cookie.replace(/(?:(?:^|.*;\s*)basket\s*=\s*([^;]*).*$)|^.*$/, "$1"));
}

function renderEmptyBasket() {
    const basketList = document.querySelector(".basket__list") || "";
    if (basketList) {
        basketBody.removeChild(basketList);
    }
    const div = document.createElement("div");
    div.className = "basket__empty";
    div.innerHTML =
        `
        <img class="empty__icon" src="./images/empty-basket.svg" alt=""/> 
        <p class="empty__text">Корзина пустая</p>
    `;
    basketBody.appendChild(div);
}

function renderBasket(basketStorage) {
    console.log(basketStorage);
    const basketList = document.querySelector(".basket__list") || "";
    if (!basketList && basketStorage) {
        const basketEmpty = document.querySelector(".basket__empty") || "";
        if (basketEmpty) {
            basketBody.removeChild(basketEmpty);
        }
        const div = document.createElement("div");
        div.className = "basket__list";
        basketStorage.forEach((product) => {
            div.innerHTML += `
                <div id="product" data-product="${product.id}" class="basket__item">
                    <div class="basket__product_wrapper">
                        <div class="basket__product-image">
                            <img src="./images/products/${product.image}" alt="">
                        </div>
                        <div class="basket__product_info">
                            <h2 class="basket__product-name">${product.name}</h2>
                        <div class="basket__product_quantity"> 
                            <div class="product__price">
                                <span>Цена: </span>
                                <p>${product.totalPrice} руб.</p>
                            </div>
                        </div>
                        <div class="basket__product_actions">
                            <div class="product__actions_quantity">
                                <button class="product__remove">-</button>
                                <div class="product__quantity">${product.quantity}</div>
                                    <button class="product__add">+</button>
                                </div>
                                <div class="delete__product_wrapper">
                                    <button class="delete__product">Убрать из корзины</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        basketBody.appendChild(div);
        initzializationBasketsHandlers();
        return;
    }
    basketList.innerHTML = "";
    basketStorage.forEach((product) => {
        basketList.innerHTML += `
            <div id="product" data-product="${product.id}" class="basket__item">
            <div class="basket__product_wrapper">
                <div class="basket__product-image">
                    <img src="./images/products/${product.image}" alt="">
                </div>
                <div class="basket__product_info">
                    <h2 class="basket__product-name">${product.name}</h2>
                <div class="basket__product_quantity"> 
                    <div class="product__price">
                        <span>Цена: </span>
                        <p>${product.totalPrice} руб.</p>
                    </div>
                </div>
                <div class="basket__product_actions">
                    <div class="product__actions_quantity">
                        <button class="product__remove">-</button>
                        <div class="product__quantity">${product.quantity}</div>
                            <button class="product__add">+</button>
                        </div>
                        <div class="delete__product_wrapper">
                            <button class="delete__product">Убрать из корзины</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
    });
    initzializationBasketsHandlers();
}

function addProductHandler(event) {
    const target = event.target;
    const productId = Number(target.closest("#product").getAttribute("data-product"));
    const product = products.find(product => product.id === productId);

    const basket = getBasket();

    const existProduct = basket.find(product => product.id === productId);
    if (!existProduct) {
        basket.push({
            id: product.id,
            name: product.name,
            quantity: 1,
            image: product.image,
            price: product.price,
            totalPrice: product.price,
        });
        document.cookie = `basket=` + JSON.stringify(basket);
        basketLoad();
        renderProducts();
        return;
    }
    existProduct.quantity += 1;
    existProduct.totalPrice = existProduct.quantity * existProduct.price;
    document.cookie = `basket=` + JSON.stringify(basket);
    basketLoad();
    renderProducts();
}

function removeProductHandler(event) {
    const target = event.target;
    const productId = Number(target.closest("#product").getAttribute("data-product"));
    const product = products.find(product => product.id === productId);

    let basket = getBasket();
    const existProduct = basket.find(product => product.id === productId);
    if (existProduct.quantity === 1) {
        basket = basket.filter(product => product.id !== productId);
        document.cookie = `basket=` + JSON.stringify(basket);
        basketLoad();
        return;
    }

    existProduct.quantity -= 1;
    existProduct.totalPrice = existProduct.price * existProduct.quantity;
    document.cookie = `basket=` + JSON.stringify(basket);
    basketLoad();
}

function deleteProductHandler(event) {
    const target = event.target;
    const productId = Number(target.closest("#product").getAttribute("data-product"));

    let basket = getBasket();
    basket = basket.filter(product => product.id !== productId);
    document.cookie = `basket=` + JSON.stringify(basket);
    basketLoad();
    renderProducts();
}

function renderTotalPrice() {
    const totalBodyLayout = document.querySelector(".total__body") || "";
    if (totalBodyLayout) {
        basketBody.removeChild(totalBodyLayout);
        renderLayoutTotalPrice();
        return;
    }
    renderLayoutTotalPrice();
}

function renderLayoutTotalPrice() {
    const totalBody = document.createElement("div");
    const basket = getBasket();
    const basketTotalPrice = basket.reduce((acc, item) => {
        return item.totalPrice + acc
    }, 0);
    totalBody.className = "total__body";
    totalBody.innerHTML =
        `   
        <div class="total__wrapper">
            <p class="total__price"><span>Итоговая цена: </span> ${basketTotalPrice} руб.</p>
        </div>
        <button class="add__order">Оформить заказ</button>
    `;
    basketBody.appendChild(totalBody);
}

function initzializationBasketsHandlers() {
    const addProductBasketButtons = document.querySelectorAll('.product__add');
    const removeProductBasketButtons = document.querySelectorAll('.product__remove');
    const deleteProductBasketButtons = document.querySelectorAll(".delete__product");

    addProductBasketButtons.forEach(addProductBasketButton => addProductBasketButton.addEventListener("click", addProductHandler));
    removeProductBasketButtons.forEach(removeProductBasketButton => removeProductBasketButton.addEventListener("click", removeProductHandler));
    deleteProductBasketButtons.forEach(deleteProductBasketButton => deleteProductBasketButton.addEventListener("click", deleteProductHandler));
}

const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
        scrollController.scrollPosition = window.scrollY;
        document.body.style.cssText = `
            overlflow: hidden;
            position: fixed;
            top: -${scrollController.scrollPosition}px;
            left: 0;
            height: 100vh;
            width: 100vw;
            padding-right: ${window.innerWidth - document.body.offsetWidth}px;
        `;
        document.documentElement.style.scrollBehavior = 'unset';
    },
    enabledScroll() {
        document.body.style.cssText = '';
        window.scroll({ top: scrollController.scrollPosition })
        document.documentElement.style.scrollBehavior = '';
    }
}

function submitContactForm(event) {
    event.preventDefault();

    const target = event.target;

    const name = target.userName.value;
    const email = target.email.value;
    const message = target.message.value;

    showMessage(name, email, message);
    event.target.reset();
}

function showMessage(userName, email, message) {
    const messageBackdrop = document.createElement("div");
    messageBackdrop.className = "message__backdrop";
    const messageModal = document.createElement("div");
    messageModal.className = "message__modal";
    messageModal.innerHTML =
        `
    <div class="message__modal_wrapper">
        <h2 class="message__title">Ваши данные:</h2>
        <div class="message__body">
            <div class="message__data">
                <p>Имя: <span>${userName}</span></p>
            </div>
            <div class="message__data">
                <p>Эл. почта: <span>${email}</span></p>
            </div>
            <div class="message__data">
                <p>Сообщение: <span>${message}</span></p>
            </div>
        </div>
        <button class="btn__modal_close">Закрыть</button>
    </div>
    `;

    document.body.appendChild(messageBackdrop);
    document.body.appendChild(messageModal);
    scrollController.disabledScroll();

    const btnModalClose = document.querySelector(".btn__modal_close");
    btnModalClose.addEventListener("click", hideMessage);
    messageBackdrop.addEventListener("click", hideMessage);
}

function hideMessage() {
    const messageModal = document.querySelector(".message__modal");
    const messageBackdrop = document.querySelector(".message__backdrop");
    document.body.removeChild(messageModal);
    document.body.removeChild(messageBackdrop);
    scrollController.enabledScroll();
}

function changeBackgroundColor() {
    let color = "#";
    for(let i = 0; i < 3; i++) {
        const sub = Math.floor(Math.random() * 256).toString(16);
        color += sub;
    }
    document.body.style.backgroundColor = `${color}`;
}

