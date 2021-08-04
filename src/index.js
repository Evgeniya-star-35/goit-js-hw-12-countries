import refs from './js/refs';
import fetchCountry from './js/fetchCountries';
import countryCardTlt from './templates/country-card.hbs';
import { error } from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');
// console.log(countryCardTlt);
refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
  const searchQuery = refs.input.value;

  fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(error => console.log(error));
}

function renderCountryCard(country) {
  const markup = countryCardTlt(country);
  refs.infoBox.innerHTML = markup;
}
