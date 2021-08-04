import refs from './js/refs';
import fetchCountry from './js/fetchCountries';

import countryCardTlt from './templates/country-card.hbs';
import listCountriesTpl from './templates/list-countries.hbs';

const { error } = require('@pnotify/core');
var debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
  const searchQuery = refs.input.value;

  fetchCountry(searchQuery).then(renderCountryCard);
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
    const markup = countryCardTlt(country);
    refs.infoBox.innerHTML = markup;
  } else if (country.length <= 10) {
    onRenderListCountries(name);
  } else if (country.length === 0) {
    onInputClear();
  }
}
function onRenderListCountries(name) {
  const listMarkup = listCountriesTpl(name);

  refs.countries.insertAdjacentHTML('beforeend', listMarkup);
}
function onInputClear() {
  refs.input.value = '';
}
