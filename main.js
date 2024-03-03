const wrapper = document.getElementById("container");

const createCard = (items) => {
  let card = document.createElement("div");
  card.classList.add("country");

  cardContent = ` <div class="card">
    <div class="cardImg">
        <img src= ${items.flags.svg} alt="">
    </div>
    <div class="cardText">
        <p>${items.name.common}</p>
        <small>Population: <span> ${items.population}</span></small>
        <small>Region: <span> ${items.region}</span></small>
        <small>Capital: <span> ${items.capital}</span></small>
        <a href="./details.html">learn more...</a>
    </div>
</div>`;
  card.innerHTML = cardContent;
  wrapper.appendChild(card);
};

const fetchData = async () => {
  try {    
    let api_data = "https://restcountries.com/v3.1/all";

    const response = await fetch(api_data);
    const data = await response.json();


    data.map((items) => {
      return createCard(items);
    });
  } catch (error) {
    let errMessage = document.createElement("p");
    errMessage.classList.add("errorMessage");

    errMessage.innerHTML = `error message is: ${error}`;
    wrapper.appendChild(errMessage);
  }
};

document.addEventListener("DOMContentLoaded", fetchData);
