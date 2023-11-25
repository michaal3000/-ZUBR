document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.coincap.io/v2/assets";
  const apiKey = "d7f2848a-82cf-482d-a383-3f96e7814314";

  fetch(apiUrl, {
    method: "GET",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${apiKey}`, // Adjust based on how the API expects the key
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
      // Access the inner 'data' array
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
  tableBody.innerHTML = ""; // Clear existing table data

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

//<td>${parseFloat(coin.marketCapUsd).toFixed(2)}</td>
//<td>${parseFloat(coin.volumeUsd24Hr).toFixed(2)}</td>
//<td>${parseFloat(coin.supply).toFixed(2)}</td>
