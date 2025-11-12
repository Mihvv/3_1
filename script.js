document.getElementById("searchBtn").addEventListener("click", fetchCountry);

async function fetchCountry() {
  const capital = document.getElementById("capitalInput").value.trim();
  const message = document.getElementById("message");
  const table = document.getElementById("resultTable");
  const tableBody = document.getElementById("tableBody");

  message.textContent = "";
  table.classList.add("hidden");
  tableBody.innerHTML = "";

  if (!capital) {
    message.textContent = "Wpisz nazwę stolicy.";
    return;
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/capital/${capital}`,
    );
    if (!response.ok) throw new Error("Nie znaleziono kraju.");

    const data = await response.json();
    const country = data[0];

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${country.name?.common ?? "-"}</td>
      <td>${country.capital?.join(", ") ?? "-"}</td>
      <td>${country.population?.toLocaleString("pl-PL") ?? "-"}</td>
      <td>${country.region ?? "-"}</td>
      <td>${country.subregion ?? "-"}</td>`;
    tableBody.appendChild(row);
    table.classList.remove("hidden");
  } catch (error) {
    message.textContent = "Nie znaleziono kraju lub wystąpił błąd.";
  }
}
