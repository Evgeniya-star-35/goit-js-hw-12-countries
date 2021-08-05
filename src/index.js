import refs from './js/refs';
import fetchCountry from './js/fetchCountries';
import countryCardTlt from './templates/country-card.hbs';
import listCountriesTpl from './templates/list-countries.hbs';

// const { error } = require('@pnotify/core');
import { defaultModules, error } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop/dist/PNotifyDesktop';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/desktop/dist/PNotifyDesktop';
import '@pnotify/core/dist/BrightTheme.css';
var debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
  const searchQuery = refs.input.value;

  fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(error => console.log('error'));
}

function renderCountryCard(country) {
  if (country.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  } else if (country.status === 404) {
    error({
      text: 'No country has been found. Please enter a more specific query!',
    });
  } else if (country.length === 1) {
    onRenderCountryCard(country);
    // const markup = countryCardTlt(country);
    // console.log(markup);
    // refs.infoBox.innerHTML = markup;
  } else if (country.length <= 10) {
    onRenderListCountries(country);
  } else if (country.length === 0) {
    onInputClear();
  }
}
function onRenderCountryCard(country) {
  const markup = countryCardTlt(country);
  console.log(markup);
  refs.infoBox.innerHTML = markup;
}
function onRenderListCountries(country) {
  const listMarkup = listCountriesTpl(country.name);
  refs.countries.insertAdjacentHTML('beforeend', listMarkup);
}
function onInputClear() {
  refs.input.value = '';
}
