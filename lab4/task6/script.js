document.addEventListener("DOMContentLoaded", renderEvidenceList);

const evidenceList = document.querySelector(".evidence__list");

const evidenceArray = [
    {
        id: 1,
        descriptionEvidence: "Опиcание невероятно бесполезного факта №1"
    },
    {
        id: 2,
        descriptionEvidence: "Опиcание невероятно бесполезного факта №2"
    },
    {
        id: 3,
        descriptionEvidence: "Опиcание невероятно бесполезного факта №3"
    }
]

function renderEvidenceList() {
    evidenceArray.forEach((evidence) => {
        evidenceList.innerHTML +=
            `
            <div class="evidence__item">
                <div class="evidence__item_header">
                    <h2 class="evidence__title">Невероятно бесполезный факт №${evidence.id}</h2>
                    <button class="evidence__button">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div class="evidence__item_wrapper">
                    <p class="evidence__text">${evidence.descriptionEvidence}</p>
                </div>
            </div>
        `;
    });

    const evidenceHeaders = document.querySelectorAll(".evidence__item_header");
    evidenceHeaders.forEach(evidenceHeader => {
        evidenceHeader.addEventListener("click", () => {
            const evidenceContent = evidenceHeader.nextElementSibling;
            const evidenceItem = evidenceHeader.closest(".evidence__item");

            if (evidenceContent.style.maxHeight) {
                document.querySelectorAll(".evidence__item_wrapper").forEach(elEvidenceContent => elEvidenceContent.style.maxHeight = null);
                document.querySelectorAll(".evidence__item").forEach(elEvidenceItem => elEvidenceItem.classList.remove("active"));
            } else {
                document.querySelectorAll(".evidence__item_wrapper").forEach(elEvidenceContent => elEvidenceContent.style.maxHeight = null);
                document.querySelectorAll(".evidence__item").forEach(elEvidenceItem => elEvidenceItem.classList.remove("active"));
                
                evidenceContent.style.maxHeight = evidenceContent.scrollHeight + "px";
                evidenceItem.classList.add("active");
            }
        })
    });
}