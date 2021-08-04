import refs from './js/refs';
import fetchCountry from './js/fetchCountries';
import countryCardTlt from './templates/country-card.hbs';

refs.input.addEventListener('input', onSearch);
function onSearch(e) {
  const searchQuery = refs.input.value;

  fetchCountry(searchQuery)
    .then(renderCountryCard)
    .catch(error => console.log(error));
}

function renderCountryCard(country) {
  const markup = countryCardTlt(country);
  refs.infoBox.innerHTML = markup;
}
