const htmlElement = document.documentElement;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const empty = main.querySelector('.empty');

const themeToggleButton = header.querySelector('.theme-button');
const deleteButton = main.querySelector('.delete-button');

const themeImage = document.querySelector('.empty__image');
const buttonImage = document.querySelector('.theme-button__image');

const task = document.querySelector('.tasks-list__item');

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

updateDate();

themeToggleButton.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');

  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    buttonImage.src = './svg/sun-icon.svg';
    themeImage.src = './svg/detective-image-dark.svg';
  } else {
    localStorage.setItem('theme', 'light');
    buttonImage.src = './svg/moon-icon.svg';
    themeImage.src = './svg/detective-image-light.svg';
  }
});

function hideEmptyState() {
  empty.classList.add('empty_hidden');
}

function showEmptyState() {
  empty.classList.remove('empty_hidden');
}

// function addTask() {
  
// }

function deleteTask() {
  task.remove();
}

deleteButton.addEventListener('click', deleteTask);