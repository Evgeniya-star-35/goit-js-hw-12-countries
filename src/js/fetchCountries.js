function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
  const SEARCH_PARAMS = 'fields=name;capital;population;flag;languages';
  return fetch(`${BASE_URL}${name}?${SEARCH_PARAMS}`).then(res => res.json());
}

export default fetchCountries;
