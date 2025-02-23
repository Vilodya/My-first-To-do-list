// Объявление переменных
const htmlElement = document.documentElement;
const header = document.querySelector('.header');
const main = document.querySelector('.main');

const empty = main.querySelector('.empty');
const taskList = main.querySelector('.tasks-list');

const themeToggleButton = header.querySelector('.theme-button');
const addButton = main.querySelector('.add-button');
const cancelButton = document.querySelector('.modal__button-cancel');
const applyButton = document.querySelector('.modal__button-apply');


const themeImage = document.querySelector('.empty__image');
const buttonImage = document.querySelector('.theme-button__image');

const modal = document.querySelector('.modal');
const modalForm = document.forms.form;
const noteInput = modalForm.elements.note;
const noteError = modalForm.querySelector(`.${noteInput.id}-error`);

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
  toggleButtonState();
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

const showInputError = (element, errorMessage) => {
  element.classList.add('error');
  noteError.textContent = errorMessage;
  noteError.classList.add('input-error_active');
};

const hideInputError = (element) => {
  element.classList.remove('error');
  noteError.classList.remove('input-error_active');
  noteError.textContent = '';
};

const toggleButtonState = () => {
  if (!noteInput.validity.valid) {
    applyButton.classList.add('modal__button-apply_disabled');
  } else {
    applyButton.classList.remove('modal__button-apply_disabled');
  }
};

const isValid = () => {
  if (!noteInput.validity.valid) {
    showInputError(noteInput, noteInput.validationMessage);
    applyButton.classList.add('modal__button-apply_disabled');
  } else {
    hideInputError(noteInput);
    applyButton.classList.remove('modal__button-apply_disabled');
  }
};

// Инициализация
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

  updateDate();
  toggleEmptyState();
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
  addTask(noteInput.value);
});

noteInput.addEventListener('input', isValid);