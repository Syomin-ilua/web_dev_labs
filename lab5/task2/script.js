const resultQuizWrapper = document.querySelector(".quiz__results");
const btnStartQuiz = document.querySelector(".start__quiz_btn");
const questionWrapper = document.querySelector(".question__wrapper");

const dateFormat = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Moscow',
});

let stepe = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", () => {
    renderQuizResults();
});

btnStartQuiz.addEventListener("click", renderQuestion);

async function renderQuestion() {
    const questions = await getQuestions();

    questionWrapper.innerHTML = `
        <form data-question="${questions[stepe].id}" class="question__form">
            <h2 class="question__title">${questions[stepe].question}</h2>
            <div class="answer__options">
                ${questions[stepe].answer_options.map((value, index) => {
                    return `
                        <label class="option__label" for="option-${index}">
                            <input class="answer__option_input" id="option-${index}" name="option" type="radio" value="${value}">
                            <p class="answer__option_text">${value}</p>
                        </label>
                    `}).join("")
        }
            </div>
            <div class="question__actions">
                <button type='submit' class='btn__question_next'>${questions[stepe] !== questions[questions.length - 1] ? 'Дальше' : 'Подвести итоги'}</button>
            </div>
        </form>
    `;

    document.querySelector(".question__form").addEventListener("submit", nextQuestion);
}

async function nextQuestion(event) {
    event.preventDefault();

    const target = event.target;
    const questionId = Number(target.getAttribute("data-question"));

    const questions = await getQuestions();

    const answerFlag = questions[questionId].correct_answer === target.option.value;

    if (answerFlag) {
        score++;
        console.log(score);
    }

    if (questions[stepe] === questions[questions.length - 1]) {
        renderResultQuiz();
        return;
    }

    stepe++;
    renderQuestion();
}

async function renderResultQuiz() {
    const questionWrapper = document.querySelector(".question__wrapper");

    let results = getQuizResults();

    const questions = await getQuestions();
    const resultProcent = (score / questions.length) * 100;

    const result = {
        id: Date.now(),
        result: resultProcent
    }

    results.push(result);
    setQuizResults(results)
    renderQuizResults();

    questionWrapper.innerHTML =
        `
            <div class="result__wrapper">
                <h1 class="result__title">Результат: </h1>
                <div class="result__text_wrapper">
                    <p class="result__text">Вы прошли тест на ${resultProcent}%</p>
                    <button class="btn__start_quiz">Начать заново</button>
                </div>
            </div>
        `;

    document.querySelector(".btn__start_quiz").addEventListener("click", () => {
        stepe = 0;
        score = 0;
        renderQuestion();
    });

}

function renderQuizResults() {
    const quizResults = getQuizResults();
    resultQuizWrapper.innerHTML = "";

    if (!quizResults.length) {
        resultQuizWrapper.innerHTML =
            `
                <div class="quiz__empty_results">
                    К сожалению вы ещё не разу не проходили этот тест!
                </div>
            `;
        return;
    }

    quizResults.forEach(quizResult => {
        resultQuizWrapper.innerHTML +=
            `
                <div class="quiz__result">
                    <p class="quiz__date">
                        <span>Дата прохождения квиза: </span>
                        ${dateFormat.format(quizResult.id)}
                    </p>
                    <p class="quiz__result_procent"><span>Результат: </span> ${quizResult.result}%</p>
                </div>
            `;
    });
}

async function getQuestions() {
    try {
        const response = await fetch("./questions.json");
        if (!response.ok) {
            throw new Error("Произошла ошибка");
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

function getQuizResults() {
    return JSON.parse(localStorage.getItem("resultsQuiz"));
}

function setQuizResults(questionsResults) {
    localStorage.setItem("resultsQuiz", JSON.stringify(questionsResults));
}

function hideBtnStart() {
    document.body.removeChild(document.querySelector(".start__quiz_btn"));
}