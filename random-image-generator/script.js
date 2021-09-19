'use strict';
const theImages = [
  {
    src: 'https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ',
    width: '300',
    height: '300',
  },
  {
    src: 'https://i.picsum.photos/id/1001/5616/3744.jpg?hmac=38lkvX7tHXmlNbI0HzZbtkJ6_wpWyqvkX4Ty6vYElZE',
    width: '300',
    height: '300',
  },
  {
    src: 'https://i.picsum.photos/id/1010/5184/3456.jpg?hmac=7SE0MNAloXpJXDxio2nvoshUx9roGIJ_5pZej6qdxXs',
    width: '300',
    height: '300',
  },
  {
    src: 'https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY',
    width: '300',
    height: '300',
  },
  {
    src: 'https://i.picsum.photos/id/100/2500/1656.jpg?hmac=gWyN-7ZB32rkAjMhKXQgdHOIBRHyTSgzuOK6U0vXb1w',
    width: '300',
    height: '300',
  },
  {
    src: 'https://i.picsum.photos/id/102/4320/3240.jpg?hmac=ico2KysoswVG8E8r550V_afIWN963F6ygTVrqHeHeRc',
    width: '300',
    height: '300',
  },
];

const imagesEl = document.querySelectorAll('.img-container');
const btn = document.querySelector('.btn');

const randomNumbersArr = function (quantity, max) {
  const arr = [];
  while (arr.length < quantity) {
    let number = Math.trunc(Math.random() * max);
    if (arr.indexOf(number) === -1) arr.push(number);
  }
  return arr;
};

const renderImages = function () {
  const imgsArr = randomNumbersArr(3, theImages.length);

  imagesEl.forEach((imgEl, idx) => {
    const img = document.createElement('img');
    const numberRandom = imgsArr[idx];

    img.src = theImages[numberRandom].src;
    img.width = theImages[numberRandom].width;
    img.height = theImages[numberRandom].height;
    img.style.objectFit = 'cover';

    imgEl.innerHTML = '';
    imgEl.appendChild(img);
  });
};

btn.addEventListener('click', renderImages);
