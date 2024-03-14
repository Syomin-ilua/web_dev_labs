const notesWrapper = document.querySelector(".notes__wrapper");
const formNotes = document.querySelector(".form__notes");

const dateSettings = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Moscow',
});

formNotes.addEventListener("submit", formSubmitHandler);

document.addEventListener("DOMContentLoaded", renderNotes);

function formSubmitHandler(event) {
    event.preventDefault();
    const note = event.target.note.value;
    const noteDescription = event.target.noteDescription.value;
    addNote(note, noteDescription);
    event.target.reset();
}

function addNote(note, noteDescription) {
    let notes = getNotes();

    const noteData = {
        id: Date.now(),
        name: note,
        description: noteDescription,
        changeDateNote: Date.now()
    }

    notes.unshift(noteData);
    setNotes(notes);
    renderNotes();
}

function renderNotes() {
    const notes = getNotes();
    notesWrapper.innerHTML = "";
    if (!notes.length) {
        notesWrapper.innerHTML =
            `
            <div class="empty__notes_wrapper">
                <div class="empty__note_emoji">❌</div>
                <p class="empty__notes_text">Заметок нету!</p>
            <div>
        `;
        return;
    }
    const notesList = document.createElement("div");
    notesList.className = "notes__list";
    notes.forEach((note) => {
        notesList.innerHTML +=
            `
            <div data-note="${note.id}" class="note__item">
                <div class="note__info">
                    <p class="note__name">${note.name}</p>
                    <p class="note__date">${dateSettings.format(note.changeDateNote)}</p>
                    <p class="note__description">${note.description}</p>
                </div>
                <div class="note__actions">
                    <button class="edit__note_btn">✏️</button>
                    <button class="delete__note_btn">🗑️</button>
                </div>
            </div>
        `;
    });
    notesWrapper.appendChild(notesList);
    document.querySelectorAll(".edit__note_btn").forEach(editBtn => editBtn.addEventListener("click", editNote));
    document.querySelectorAll(".delete__note_btn").forEach(deleteBtn => deleteBtn.addEventListener("click", deleteNote));
}

function editNote(event) {
    const target = event.target;
    const idNote = Number(target.closest(".note__item").getAttribute("data-note"));

    let notes = getNotes();
    const note = notes.find(note => note.id === idNote);
    renderModalEditNote(note);
}

function deleteNote(event) {
    const target = event.target;
    const idNote = Number(target.closest(".note__item").getAttribute("data-note"));

    let notes = getNotes();
    notes = notes.filter((note) => note.id !== idNote);

    setNotes(notes);
    renderNotes();
}

function renderModalEditNote({ id, name, description }) {
    const editNoteModal = document.createElement("div");
    const backdrop = document.createElement("div");
    editNoteModal.className = "edit__note_modal";
    backdrop.className = "backdrop";
    editNoteModal.innerHTML =
        `
        <h1 class="edit__note_title">✏️ Редактирование заметки</h1>
        <form class="edit__note_form">
            <label class="edit__note_label">
                <input value="${id}" name="idNote" type="hidden">
                <input class="edit__note_input" name="name" placeholder="Введите название заметки" value="${name}" type="text">
            </label>
            <label class="edit__note_label">
                <textarea class="edit__note_textarea" name="noteDescription" placeholder="Введите описание заметки" type="text">${description}</textarea>
            </label>
            <div class="note__edit_actions">
                <button type="button" class="button__edit_cancel">Отмена</button>
                <button type="submit" class="button__edit_note">Редактировать</button>
            </div>
        </form>
    `;
    document.body.appendChild(backdrop);
    document.body.appendChild(editNoteModal);

    document.querySelector(".button__edit_cancel").addEventListener("click", hideModalEditNote);
    document.querySelector(".edit__note_form").addEventListener("submit", (e) => editNoteHandler(e));
    backdrop.addEventListener("click", hideModalEditNote);
}

function editNoteHandler(event) {
    event.preventDefault();

    const idNote = Number(event.target.idNote.value);
    const noteName = event.target.name.value
    const description = event.target.noteDescription.value;

    const notes = getNotes();
    let note = notes.find(note => note.id === idNote);
    note.name = noteName;
    note.description = description;
    note.changeDateNote = Date.now();
    setNotes(notes);
    renderNotes()
    hideModalEditNote();
}

function hideModalEditNote() {
    const editNoteModal = document.querySelector(".edit__note_modal");
    const backdrop = document.querySelector(".backdrop");
    document.body.removeChild(editNoteModal);
    document.body.removeChild(backdrop);
}

function getNotes() {
    return JSON.parse(localStorage.getItem("notes"));
}

function setNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}
