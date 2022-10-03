import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

const KEY_API = '30262490-03bcd09aff61aef6d7939f62f';
const URL = 'https://pixabay.com/api/';
let page = 1;
const per_page = 40;
let sumPerPage = 0;

// Если отправили запрос, но ещё не получили ответ,
// не нужно отправлять ещё один запрос:
let isLoading = false;

// Если контент закончился, вообще больше не нужно
// отправлять никаких запросов:
let shouldLoad = true;

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onFormSubmit);

async function fetchImages(name, page) {
  const options = {
    params: {
      key: KEY_API,
      q: `${name}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page,
      page,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.get(URL, options);
  const data = response.data;

  return data;
}

async function onFormSubmit(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';
  isLoading = false;
  shouldLoad = true;

  const inputValue = event.currentTarget.elements.safesearch.value.trim();

  try {
    const dataOfImages = await fetchImages(inputValue);
    const arrayImages = dataOfImages.hits;
    const totalQuantityImages = dataOfImages.totalHits;

    if (arrayImages.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (inputValue === '') {
      return;
    } else {
      Notiflix.Notify.success(
        `Hooray! We found ${totalQuantityImages} images.`,
        {
          timeout: 3000,
          position: 'left-top',
        }
      );

      renderPhotoCard(arrayImages);
      const lightbox = new SimpleLightbox('.gallery a', {
        /* options */
      }); // використання бібліотеки "SimpleLightbox" по створенню лайтбокса з великим зображенням

      sumPerPage = per_page;
      page = 1;

      window.addEventListener('scroll', throttle(checkPosition, 250));
      window.addEventListener('resize', throttle(checkPosition, 250));
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchNewPageImagesWithScroll() {
  const dataInput = inputEl.value;

  try {
    // Если мы уже отправили запрос, или новый контент закончился,
    // то новый запрос отправлять не надо:
    if (isLoading || !shouldLoad) {
      return;
    }

    // Предотвращаем новые запросы, пока не закончится этот:
    isLoading = true;

    page += 1;
    sumPerPage += per_page;

    const newPagedataOfImages = await fetchImages(dataInput, page);
    const newArrayImages = newPagedataOfImages.hits;
    const maxQuantityImages = newPagedataOfImages.totalHits;

    if (maxQuantityImages <= sumPerPage) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );

      renderMarkupAndSmoothScroll(newArrayImages);

      window.removeEventListener('scroll', throttle(checkPosition, 250));
      window.removeEventListener('resize', throttle(checkPosition, 250));

      // Если мы увидели, что контент закончился,
      // отмечаем, что больше запрашивать ничего не надо:
      shouldLoad = false;

      return;
    }

    renderMarkupAndSmoothScroll(newArrayImages);

    // Когда запрос выполнен и обработан,
    // снимаем флаг isLoading:
    isLoading = false;
  } catch (error) {
    console.log(error.message);
  }
}

function renderPhotoCard(arrayImages) {
  const markup = arrayImages
    .map(img => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = img;

      return `<div class="photo-card">
      <a class='link' href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width='200' height='140' />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
      </a>
  </div>`;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}

async function checkPosition() {
  // Нам потребуется знать высоту документа и высоту экрана:
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  // Они могут отличаться: если на странице много контента,
  // высота документа будет больше высоты экрана (отсюда и скролл).

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = window.scrollY;

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — четверть экрана до конца страницы:
  const threshold = height - screenHeight / 4;

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled + screenHeight;

  if (position >= threshold) {
    // Если мы пересекли полосу-порог, вызываем нужное действие.

    try {
      await fetchNewPageImagesWithScroll();
    } catch (error) {
      console.log(error.message);
    }
  }
}

function renderMarkupAndSmoothScroll(newArrayImages) {
  renderPhotoCard(newArrayImages);

  //використання бібліотеки "SimpleLightbox" для створення лайтбокса з великим зображенням та метода refresh() при завантаженні ще зображень за запитом після натискання кнопки "Load more"
  const gallery = new SimpleLightbox('.gallery a');
  // gallery.refresh();
}

//https://doka.guide/js/infinite-scroll/#beskonechnaya-prokrutka
