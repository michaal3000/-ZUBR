document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.coincap.io/v2/assets";
  const apiKey = "d7f2848a-82cf-482d-a383-3f96e7814314";

  fetch(apiUrl, {
    method: "GET",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      populateTable(data.data);
    })
    .catch((error) => {
      console.error("Error fetching data from Coincap.io:", error);
    });
});

function populateTable(coins) {
  const tableBody = document
    .getElementById("crypto-table")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";

  coins.slice(0, 10).forEach((coin) => {
    const changePercent = parseFloat(coin.changePercent24Hr).toFixed(2);
    const changeClass =
      changePercent >= 0 ? "positive-change" : "negative-change";

    const row = tableBody.insertRow();
    row.innerHTML = `
            <td>${coin.rank}</td>
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>${parseFloat(coin.priceUsd).toFixed(2)}</td>
            <td class="${changeClass}">${changePercent}%</td>
        `;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.coincap.io/v2/assets";
  const apiKey = "your_api_key";

  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      const searchTerm = document
        .getElementById("searchInput")
        .value.trim()
        .toLowerCase();
      if (!searchTerm) {
        alert("Please enter a name or symbol to search.");
        return;
      }

      fetch(apiUrl, {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const coin = data.data.find(
            (coin) =>
              coin.name.toLowerCase() === searchTerm ||
              coin.symbol.toLowerCase() === searchTerm
          );
          displayResult(coin);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
});

function displayResult(coin) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  const p = document.createElement("p");
  p.id = "searchResult";

  if (coin) {
    p.textContent = `Price of ${coin.name} (${coin.symbol}): $${parseFloat(
      coin.priceUsd
    ).toFixed(2)}`;
  } else {
    p.textContent = "Coin not found. Please try another name or symbol.";
  }

  resultDiv.appendChild(p);
}
