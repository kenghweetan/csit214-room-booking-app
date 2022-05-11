window.onload = createAccountCard;

function createAccountCard() {
  const accountCard = document.createElement("div");
  accountCard.setAttribute(
    "class",
    "accountTable card shadow-sm table-responsive"
  );
  accountCard.appendChild(createAccountTable());
  document.getElementById("accountTable").appendChild(accountCard);
}

function createAccountTable() {
  const accountTable = document.createElement("table");
  accountTable.setAttribute("class", "table");
  accountTable.setAttribute("id", "tableid");

  accountTable.appendChild(createPromoHead());
  accountTable.appendChild(createPromoBody());

  return accountTable;
}

function createPromoHead() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const accCol = document.createElement("th");
  accCol.innerHTML = "Promo Code";
  tr.appendChild(accCol);

  const headers = ["Promo Percentage", "Manage Promo"];
  for (const header of headers) {
    const accCol = document.createElement("th");
    accCol.innerHTML = header;
    tr.appendChild(accCol);
  }

  return thead;
}

async function createPromoBody() {
  const promocodes = (await axios.get("/api/promocodes/")).data;

  const promoOptions =  await Promise.all(
    promocodes.map(async (promocode) => {
      const percentage = (await axios.get(`api/promocodes?promo=${promocode.name}`))
        .data;
      var promoTR = document.createElement("tr");
      const promoTD = $("<td></td>")
        .attr({
          name: promocode.name,
        })
        .html(promocode.name);
        promoTR.appendChild(promoTD);
      return promoTD;
    })
  );
}
