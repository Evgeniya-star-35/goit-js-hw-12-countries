import refs from './js/refs';
import fetchCountry from './js/fetchCountries';
console.log(fetchCountry);
import countryCardTlt from './templates/country-card.hbs';
// import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');
var debounce = require('lodash.debounce');
refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch() {
  const searchQuery = refs.input.value;
  fetchCountry(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  const markup = countryCardTlt(country);
  // console.log(markup);
  refs.infoBox.innerHTML = markup;
}
function onFetchError(error) {
  console.log(error);
}
// function onInputClear (arguments) {
//   refs.input.value = '';
// }
