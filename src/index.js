import refs from './js/refs';
import fetchCountry from './js/fetchCountries';
import countryCardTlt from './templates/country-card.hbs';
import listCountriesTpl from './templates/list-countries.hbs';

import { error } from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
var debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(onSearch, 500));

// function onSearch() {
//   onInputClear();
//   const searchQuery = refs.input.value.trim();

//   fetchCountry(searchQuery).then(renderCountryCardAnswer).catch(onFetchError);
// }

// function renderCountryCardAnswer(country) {
//   onInputClear();
//   if (country.length > 10) {
//     error({
//       text: 'Too many matches found. Please enter a more specific query!',
//     });
//   } else if (country.status === 404) {
//     console.log(country.status);
//     error({
//       text: 'No country has been found. Please enter a more specific query!',
//     });
//   } else if (country.length === 1) {
//     onRenderCountryCard(country);
//   } else if (country.length <= 10) {
//     onRenderListCountries(country);
//   } else if (country.length === 0) {
//     onInputClear();
//   }
// }
// function onRenderCountryCard(country) {
//   const markup = countryCardTlt(country);

//   refs.infoBox.innerHTML = markup;
// }
// function onRenderListCountries(countries) {
//   const listMarkup = countries
//     .map(country => listCountriesTpl(country))
//     .join('');

//   refs.countries.insertAdjacentHTML('beforeend', listMarkup);
// }
// function onInputClear() {
//   refs.infoBox.innerHTML = '';
//   refs.countries.innerHTML = '';
// }
// function onFetchError(Error) {
//   Error;
// }

function onSearch() {
  onInputClear();
  const searchQuery = refs.input.value.trim();

  fetchCountry(searchQuery)
    .then(country => {
      if (country.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (country.status === 404) {
        console.log(country.status);
        error({
          text: 'No country has been found. Please enter a more specific query!',
        });
      } else if (country.length === 1) {
        onRenderCountryCard(country);
      } else if (country.length <= 10) {
        onRenderListCountries(country);
      }
    })
    .catch(onFetchError);
}
function onRenderCountryCard(country) {
  const markup = countryCardTlt(country);

  refs.infoBox.innerHTML = markup;
}
function onRenderListCountries(country) {
  const listMarkup = listCountriesTpl(country);

  refs.countries.insertAdjacentHTML('beforeend', listMarkup);
}
function onInputClear() {
  refs.infoBox.innerHTML = '';
  refs.countries.innerHTML = '';
}
function onFetchError(Error) {
  Error;
}
