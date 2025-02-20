// Объявление переменных
const htmlElement = document.documentElement;
const header = document.querySelector('.header');
const main = document.querySelector('.main');

const empty = main.querySelector('.empty');
const taskList = main.querySelector('.tasks-list');

const themeToggleButton = header.querySelector('.theme-button');
const addButton = main.querySelector('.add-button');
const cancelButton = document.querySelector('.modal__button_cancel');
const applyButton = document.querySelector('.modal__button_apply');


const themeImage = document.querySelector('.empty__image');
const buttonImage = document.querySelector('.theme-button__image');

const modal = document.querySelector('.modal');
const modalForm = document.forms.form;
const note = modalForm.elements.note;

const taskTemplate = document.querySelector('#task-template');

// Функции
function updateDate() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = months[currentDate.getMonth()];

  const dateElement = document.querySelector('.header__date');
  dateElement.textContent = `Today is ${day} ${month}`;
}

function toggleEmptyState() {
  if(taskList.children.length > 0) {
    empty.classList.add('empty_hidden');
  } else {
    empty.classList.remove('empty_hidden');
  }
}

function openModal() {
  modal.classList.add('modal_is-opened');
}

function closeModal() {
  modal.classList.remove('modal_is-opened');
}

function addTask(noteValue) {
  const taskItem = taskTemplate.content.cloneNode(true).querySelector('.tasks-list__item');
  taskItem.querySelector('.task__text').textContent = noteValue;
  taskList.append(taskItem);

  toggleEmptyState();
  closeModal();
  form.reset();
}

// Инициализация
updateDate();
document.addEventListener('DOMContentLoaded', toggleEmptyState);

document.addEventListener('DOMContentLoaded', () => {
  const updateTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
      htmlElement.classList.add('dark');
      buttonImage.src = './svg/sun-icon.svg';
      themeImage.src = './svg/detective-image-dark.svg';
    } else {
      htmlElement.classList.remove('dark');
      buttonImage.src = './svg/moon-icon.svg';
      themeImage.src = './svg/detective-image-light.svg';
    }
  };

  updateTheme(); // Устанавливаем тему при загрузке

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
});

// Обработчики
taskList.addEventListener('click', function(event) {
  const deleteButton = event.target.closest('.delete-button');
  if (deleteButton) {
    const taskItem = deleteButton.closest('.tasks-list__item');
    if (taskItem) {
      taskItem.remove();
      toggleEmptyState();
    }
  }
});

themeToggleButton.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');

  if (htmlElement.classList.contains('dark')) {
    buttonImage.src = './svg/sun-icon.svg';
    themeImage.src = './svg/detective-image-dark.svg';
  } else {
    buttonImage.src = './svg/moon-icon.svg';
    themeImage.src = './svg/detective-image-light.svg';
  }
});

addButton.addEventListener('click', openModal);
cancelButton.addEventListener('click', () => {
  closeModal();
  form.reset();
});

modalForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addTask(note.value);
});