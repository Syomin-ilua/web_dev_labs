const navLinks = document.querySelectorAll(".nav__link");

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

