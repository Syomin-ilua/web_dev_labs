const todosWrapper = document.querySelector(".todos__wrapper");

const addList = document.querySelector(".add__todos_list");

const dateFormater = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Moscow',
});

document.addEventListener("DOMContentLoaded", () => {
    renderTodosLists();
});

addList.addEventListener("click", addListHandler);

function addListHandler() {
    const modal = document.createElement("div");
    const backdrop = document.createElement("div");
    modal.className = "modal";
    backdrop.className = "backdrop";

    modal.innerHTML =
        `
        <div class="modal__body">
            <form class="form__add_todos">
                <h2 class="add__list_title">Добавить список дел</h2>
                <label for="nameTodos">
                    <input required name="nameTodos" type="text" class="name__todos_input" id="nameTodos" placeholder="Введите название списка дел">
                </label>
                <button class="btn__add_todos" type="submit">Добавить список</button>
            </form>
        </div>
    `;
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    backdrop.addEventListener("click", hideModalHandler);
    document.querySelector(".form__add_todos").addEventListener("submit", addListTodos);
}

function addListTodos(event) {
    event.preventDefault();

    let todosLists = new Map(JSON.parse(getTodosLists()));

    const nameTodosList = event.target.nameTodos.value;

    if (!nameTodosList.length) {
        alert("Введите корректно название!");
        return;
    }

    if (todosLists.has(nameTodosList)) {
        alert("Список дел с таким названием уже существует!");
        return;
    }

    todosLists.set(`${nameTodosList}`, []);
    setTodosLists(todosLists);
    renderTodosLists();
    
    event.target.reset();
    hideModalHandler();
}

function hideModalHandler() {
    document.body.removeChild(document.querySelector(".backdrop"));
    document.body.removeChild(document.querySelector(".modal"));
}

// 

function renderTodosLists() {
    let todosLists = new Map(JSON.parse(getTodosLists()));
    if (!todosLists.size) {
        console.log(todosLists);
        renderEmptyLists()
        return;
    }
    todosWrapper.innerHTML = "";
    console.log(todosLists);
    for (let [key, list] of todosLists) {
        todosWrapper.innerHTML +=
            `
        <div data-todos="${key}" class="todo__list_wrapper">
            <div class="todoList__title_wrapper">
                    <h2 class="todoList__title">${key}</h2>
                <div class="todoList__actions">
                    <button class="btn__delete_list">
                        <img src="./trashcan.svg" alt="">
                    </button>
                    <button class="btn__add_todoList">
                        <img src="./add-todo.svg" alt="">
                    </button>
                </div>
            </div>
            <div class="todo__list">
                ${!list.length ? '<div class="empty__list"><img src="./empty-list.png" alt=""/><p>Список пуст</p></div>' :
                list.map((todo) => {
                    return `
                                <div draggable="true" data-todo="${todo.id}" class="todo__item ${(todo.status) ? "todo__done" : (!todo.status && Date.now() >= todo.dateTermTodo) ? "todo__expired" : (!todo.status && Date.now() < todo.dateTermTodo) ? "todo__waiting" : ""}">
                                    <div class="todo__general_info">
                                        <button class="btn__more_todo">
                                            <img src="./info.svg" alt=""/>
                                        </button>
                                        <p class="todo__item_name">${todo.nameTodo}</p>
                                    </div>
                                    <div class="todo__item_actions">
                                        <label class="toggle__status_label">
                                            <input class="todo__toggle_status" type="checkbox" ${todo.status ? "checked" : ""}/>
                                        </label>
                                        <button class="btn__todo_delete">
                                            <img src="./trashcan.svg" alt=""> 
                                        </button>
                                    </div>
                                </div>
                                `;
                }).join("")
            }
            </div>
        </div>
        `;
    }

    document.querySelectorAll(".todo__list_wrapper").forEach(todoListWrapper => todoListWrapper.addEventListener("dragenter", dragEnter));
    document.querySelectorAll(".todo__list_wrapper").forEach(todoListWrapper => todoListWrapper.addEventListener("dragleave", dragLeave));
    document.querySelectorAll(".todo__list_wrapper").forEach(todoListWrapper => todoListWrapper.addEventListener("dragover", dragOver));
    document.querySelectorAll(".todo__list_wrapper").forEach(todoListWrapper => todoListWrapper.addEventListener("drop", dragDrop));

    document.querySelectorAll(".todo__toggle_status").forEach(todoToggleInput => todoToggleInput.addEventListener("change", toggleTodoStatus));
    document.querySelectorAll(".btn__delete_list").forEach(btnDeleteList => btnDeleteList.addEventListener("click", deleteListHandler));
    document.querySelectorAll(".btn__add_todoList").forEach(btnAddTodoInList => btnAddTodoInList.addEventListener("click", addTodoInList));

    if (todosLists.size) {
        document.querySelectorAll(".todo__item").forEach(todoItem => todoItem.addEventListener("dragstart", dragStart));
        document.querySelectorAll(".todo__item").forEach(todoItem => todoItem.addEventListener("dragend", dragEnd));

        document.querySelectorAll(".btn__more_todo").forEach(todoItem => todoItem.addEventListener("click", moreTodoItemHandler));
        document.querySelectorAll(".btn__todo_delete").forEach(btnDeleteTodo => btnDeleteTodo.addEventListener("click", deleteTodoHandler));
    }

}

function dragEnter(event) {

}

function dragOver(event) {
    event.preventDefault();
}

function dragLeave(event) {
    
}

function dragDrop(event) {
    event.preventDefault();

    const target = event.target;

    const todoDragData = JSON.parse(event.dataTransfer.getData("todoDragData"));
    
    const nameList = target.closest(".todo__list_wrapper").getAttribute("data-todos");

    if(todoDragData.nameList === nameList) {
        return;
    }
    
    const todosLists = new Map(JSON.parse(getTodosLists()));
    
    let listA = todosLists.get(todoDragData.nameList);
    let listB = todosLists.get(nameList);
    
    const todo = listA.find(todo => Number(todo.id) === Number(todoDragData.idTodo))
    listB.unshift(todo);
    listA = listA.filter(todo => Number(todo.id) !== Number(todoDragData.idTodo));
    
    if(listA.length >= 2) {
        listA.sort((a, b) => a.dateTermTodo - b.dateTermTodo);
    } 

    if(listB.length >= 2) {
        listB.sort((a, b) => a.dateTermTodo - b.dateTermTodo);
    } 

    todosLists.set(nameList, listB);
    todosLists.set(todoDragData.nameList, listA);
    setTodosLists(todosLists);
    renderTodosLists();
}

function dragStart(event) {
    const target = event.target;
    
    const nameList = target.closest(".todo__list_wrapper").getAttribute("data-todos");
    const idTodo = target.closest(".todo__item").getAttribute("data-todo");

    const todoDragData = {
        idTodo,
        nameList
    } 
    
    event.dataTransfer.setData("todoDragData", JSON.stringify(todoDragData));
}

function dragEnd(event) {
    
}

function toggleTodoStatus(event) {
    const target = event.target;

    let todosLists = new Map(JSON.parse(getTodosLists()));

    const nameList = target.closest(".todo__list_wrapper").getAttribute("data-todos");
    const idTodo = target.closest(".todo__item").getAttribute("data-todo");

    let list = todosLists.get(nameList);
    let todo = list.find(todo => Number(todo.id) === Number(idTodo));
    todo.status = !todo.status;

    todosLists.set(nameList, list);
    setTodosLists(todosLists);
    renderTodosLists();
}

function moreTodoItemHandler(event) {
    const target = event.target;

    const todosLists = new Map(JSON.parse(getTodosLists()));

    const nameList = target.closest(".todo__list_wrapper").getAttribute("data-todos");
    const idTodo = target.closest(".todo__item").getAttribute("data-todo");

    const list = todosLists.get(nameList);
    const todo = list.find(todo => Number(todo.id) === Number(idTodo));

    const modal = document.createElement("div");
    const backdrop = document.createElement("div");
    modal.className = "modal";
    backdrop.className = "backdrop";

    modal.innerHTML =
        `
        <div class="modal__body">
            <div class="todo__more">
                <h2 class="todo__title">${todo.nameTodo}</h2>
                <div class="todo">
                    <div class="todo__status">
                        <p><span>Статус: </span>${!todo.status ? "ждет выполнения" : "выполнено"}</p>
                    </div>
                    <div class="description__todo">
                        <p>${todo.descriptionTodo}</p>
                    </div>
                    <div class="date_todo">
                        <p><span>Дата последнего редактирования:</span> ${dateFormater.format(todo.timeEditTodo)}</p>
                        <p><span>Срок:</span> ${dateFormater.format(todo.dateTermTodo)}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    document.querySelector(".backdrop").addEventListener("click", hideModalHandler);
}

function deleteTodoHandler(event) {
    const target = event.target;

    let todosLists = new Map(JSON.parse(getTodosLists()));

    const nameList = target.closest(".todo__list_wrapper").getAttribute("data-todos");
    const idTodo = target.closest(".todo__item").getAttribute("data-todo");

    let list = todosLists.get(nameList);
    list = list.filter(todo => Number(todo.id) !== Number(idTodo));
    if(list.length >= 2) {
        list.sort((a, b) => a.dateTermTodo - b.dateTermTodo);
    }
    todosLists.set(nameList, list);
    setTodosLists(todosLists);
    renderTodosLists();
}

function deleteListHandler(event) {
    const target = event.target;

    let todosLists = new Map(JSON.parse(getTodosLists()));
    const nameList = target.closest(".todo__list_wrapper").getAttribute("data-todos");

    todosLists.delete(nameList);
    setTodosLists(todosLists);
    renderTodosLists();
}

function addTodoInList(event) {
    const target = event.target;

    const nameList = target.closest(".todo__list_wrapper").getAttribute("data-todos");

    const modal = document.createElement("div");
    const backdrop = document.createElement("div");
    modal.className = "modal";
    backdrop.className = "backdrop";

    modal.innerHTML =
        `
        <div class="modal__body">
            <form class="form__add_todo">
                <h2 class="add__item_title">Добавить задачу в список</h2>
                <label class="" for="nameTodo">
                    <input type="text" class="name__todo_input" id="nameTodo" name="nameTodo" placeholder="Введите название задачи">
                </label>
                <label for="descriptionTodo">
                    <textarea type="text" class="description__todo_input" id="descriptionTodo" name="descriptionTodo" placeholder="Введите описание задачи"></textarea>
                </label>
                <label class="date__label" for="dateTodo">
                    <p class="date__title">Укажите срок: </p>
                    <input type="datetime-local" id="dateTodo" name="dateTerm" class="date__input">
                </label>
                <button class="button__add_todo" type="submit">Добавить задачу</button>
            </form>
        </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    document.querySelector(".form__add_todo").addEventListener("submit", (event) => addTodo(event, nameList));
    document.querySelector(".backdrop").addEventListener("click", hideModalHandler);
}

function addTodo(event, nameList) {
    event.preventDefault();

    const todosLists = new Map(JSON.parse(getTodosLists()));
    let list = todosLists.get(nameList);

    const nameTodo = event.target.nameTodo.value;
    const descriptionTodo = event.target.descriptionTodo.value;
    const dateTerm = new Date(event.target.dateTerm.value).getTime();

    const todo = {
        id: Date.now(),
        nameTodo,
        descriptionTodo,
        timeEditTodo: Date.now(),
        dateTermTodo: dateTerm,
        status: false
    }

    
    list.unshift(todo);
    if(list.length >= 2) {
        list.sort((a, b) => a.dateTermTodo - b.dateTermTodo);
    }
    todosLists.set(nameList, list);
    setTodosLists(todosLists);
    renderTodosLists();

    event.target.reset();
    hideModalHandler();
}

function renderEmptyLists() {
    todosWrapper.innerHTML =
        `
        <div class="todos__empty">
            <div class="todos__empty_img">
                <img src="./empty.svg" alt="">
            </div>
            <p class="todos__empty_text">Вы пока не добавили список дел!</p>
        <div>
    `;
}

function getTodosLists() {
    return localStorage.getItem("todosLists");
}

function setTodosLists(lists) {
    localStorage.setItem("todosLists", JSON.stringify(Array.from(lists.entries())));
}