const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

let data;

function fetchData() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jsonData) => {
      data = jsonData;
      renderGridView(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function renderGridView(data) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  data.forEach((crypto) => {
    const cards = document.createElement("div");
    cards.classList.add("cards");

    const name = crypto.name;
    const image = crypto.image;
    const currentPrice = crypto.current_price;
    const marketCap = crypto.market_cap;
    const priceChange24h = crypto.price_change_percentage_24h;

    cards.innerHTML = `
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p>${priceChange24h}%</p>
      <p class="price">Price: $${currentPrice}</p>
      <p>Market Cap: $${marketCap}</p>
     
    `;

    container.appendChild(cards);
  });
}

function renderListView(data) {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- Rows will be inserted here -->
    </tbody>
  `;

  data.forEach((crypto) => {
    const row = document.createElement("tr");

    const name = crypto.name;
    const image = crypto.image;
    const currentPrice = crypto.current_price;
    const marketCap = crypto.market_cap;
    const priceChange24h = crypto.price_change_percentage_24h;

    row.innerHTML = `
      <td><img src="${image}" alt="${name}" width="40"></td>
      <td>${name}</td>
      <td class="price">$${currentPrice}</td>
      <td>$${marketCap}</td>
      <td>${priceChange24h}%</td>
    `;

    table.querySelector("tbody").appendChild(row);
  });

  container.appendChild(table);
}

const gridViewButton = document.getElementById("gridViewButton");
const listViewButton = document.getElementById("listViewButton");

gridViewButton.addEventListener("click", () => {
  gridViewButton.classList.add("active");
  listViewButton.classList.remove("active");
  renderGridView(data);
});

listViewButton.addEventListener("click", () => {
  listViewButton.classList.add("active");
  gridViewButton.classList.remove("active");
  renderListView(data);
});

fetchData();
