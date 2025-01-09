function updateImagesBasedOnTheme() {
  const themeImage = document.querySelector('.empty__image');
  const buttonImage = document.querySelector('.theme-button__image');

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    buttonImage.src = './svg/sun-icon.svg';
    themeImage.src = './svg/detective-image-dark.svg';
  } else {
    buttonImage.src = './svg/moon-icon.svg';
    themeImage.src = './svg/detective-image-light.svg';
  }
}

updateImagesBasedOnTheme();

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

function addTask() {
  
}