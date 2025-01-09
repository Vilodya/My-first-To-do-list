const htmlElement = document.documentElement;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const empty = main.querySelector('.empty');

const themeToggleButton = header.querySelector('.theme-button');
const deleteButton = main.querySelector('.delete-button');

const themeImage = document.querySelector('.empty__image');
const buttonImage = document.querySelector('.theme-button__image');

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

function listHasTasks() {
  empty.classList.add('no-songs_hidden');
}

function listNoTasks() {
  empty.classList.remove('no-songs_hidden');
}

// function addTask() {
  
// }

// deleteButton.addEventListener('click', function () {
//   const task 
// });