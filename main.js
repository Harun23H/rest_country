const wrapper = document.getElementById("container");
const searchinput = document.getElementById("search");
let data = []

const createCard = (item) => {
  let card = document.createElement("div");
  card.classList.add("country");

  cardContent = `<a href="./details.html?countryName=${item.name.common}">
  <div class="cardImg">
      <img src= ${item.flags.svg} alt="">
  </div>
  <div class="cardText">
      <p>${item.name.common}</p>     
      <small>Population: <span> ${item.population}</span></small>
      <small>Region: <span> ${item.region}</span></small>
      <small>Capital: <span> ${item.capital}</span></small>
  </div>
</a>`;

  card.innerHTML = cardContent;
  wrapper.appendChild(card);
};

// function to get query param
const getQueryParam = (name) => {
  const urlParams = new URLSearchParams(window.location.search); //this window.locate.search will search for everything that is after the question mark in the query parameter
  return urlParams.get(name);
};
const countryName = getQueryParam("countryName");

// function to make api called and check for single country details
const fetchCountryData = async () => {
  try {
    const api_url = "https://restcountries.com/v3.1/all";
    const response = await fetch(api_url);
    const countries = await response.json();
    const currentCountry = countries.find(
      (country) => country.name.common === countryName
    );
    createCountryCard(currentCountry);
  } catch (error) {
    console.log(error);
  }
};

// function to create single country card detail
const createCountryCard = (country) => {
  const cardWrapper = document.getElementById("cardWrapper");

  cardWrapper.innerHTML = `<div class="details">
<div class="flag">
    <img src="${country.flags.svg}" alt="flag">
</div>
<div class="flag_details">
    <div class="first_col">
        <div class="col_1">
            <p>Belgium</p>
            <small>Native Name: <span>${country.name.nativeName}</span></small>
            <small>Population: <span>${country.population}</span></small>
            <small>Region: <span> ${country.region}</span></small>
            <small>Sub Region: <span> ${country.subregion}</span></small>
            <small>Capital: <span> ${country.capital}</span></small>
        </div>
        <div class="col_2">
            <small>Top Level Domain: <span> ${country.tld}</span></small>
            <small>Currencies: <span> ${country.currencies.name}</span></small>
            <small>Language: <span> ${country.languages.ell}</span></small>
        </div>
    </div>
    <div class="second_col">
            <p>Border Countries:</p>
        <div class="counties">
            <button><a href="#"></a>${country.borders}</button>
            <button><a href="#">Germany</a></button>
            <button><a href="#">Netherlands</a></button>
        </div>
    </div>
</div>
</div>`;
};
document.addEventListener("DOMContentLoaded",fetchCountryData)
// window.onload = fetchCountryData;

// function to fetch country data from api and display it on own page

const fetchData = async () => {
  try {
    let api_data = "https://restcountries.com/v3.1/all";

    const response = await fetch(api_data);
    data = await response.json();

    data.forEach((item) => {
      return createCard(item);
    });
  } catch (error) {
    let errMessage = document.createElement("p");
    errMessage.classList.add("errorMessage");

    errMessage.innerHTML = `error message is: ${error}`;
    wrapper.appendChild(errMessage);
  }
};
document.addEventListener("DOMContentLoaded", fetchData);


// function to get search input from user and filter search key word

searchinput.addEventListener("input", (event) => {
  let search_word = event.target.value;
  wrapper.innerHTML = "";

  data.filter((country) =>
    country.name.common.toLowerCase().includes(search_word.toLowerCase())
  )
  .forEach((item) => {
    createCard(item);
  });
  // condition check if no search word, display all the country cards
if(search_word === "") {
  data.forEach((item) => {
    createCard(item)
  })
}
});


