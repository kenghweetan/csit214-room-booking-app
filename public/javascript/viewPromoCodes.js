window.onload = createAccountCard;

async function createAccountCard() {
  const accountCard = document.createElement("div");
  accountCard.setAttribute(
    "class",
    "accountTable card shadow-sm table-responsive"
  );
  accountCard.appendChild(await createAccountTable());
  document.getElementById("accountTable").appendChild(accountCard);
}

async function createAccountTable() {
  const accountTable = document.createElement("table");
  accountTable.setAttribute("class", "table");
  accountTable.setAttribute("id", "tableid");

  accountTable.appendChild(createPromoHead());
  console.log(await createPromoBody());
  accountTable.appendChild(await createPromoBody());

  return accountTable;
}

function createPromoHead() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const accCol = document.createElement("th");
  accCol.innerHTML = "Promo Code";
  tr.appendChild(accCol);

  const headers = ["Promo Percentage", "Expiry Date", "Manage Promo"];
  for (const header of headers) {
    const accCol = document.createElement("th");
    accCol.innerHTML = header;
    tr.appendChild(accCol);
  }

  return thead;
}

async function createPromoBody() {
  const promoCodes = (await axios.get("/api/promocodes/")).data;

  const promoOptions = promoCodes.map((promoCode) => {
    var promoTR = document.createElement("tr");
    /* const promoName = document.createElement("td");
    promoName.innerHTML = promoCode.name;
    const promoDiscount = document.createElement("td");
    promoDiscount.innerHTML = promoCode.discountRate;
    const promoExpiry = document.createElement("td");
    promoExpiry.innerHTML = promoCode.expiryDate; */

    // ["name", "discountRate", "expiryDate"]
    const promoTRContent = Object.keys(promoCode).map((key) => {
      const promoCodeColumn = document.createElement("td");
      promoCodeColumn.innerHTML = promoCode[key];
      return promoCodeColumn;
    });
    promoTR.append(...promoTRContent);
    return promoTR;
  });

  const promoCodeBody = document.createElement("tBody");
  console.log("with ...");
  console.log(...promoOptions);
  console.log("without");
  console.log(promoOptions);

  /*   for (let i = 0; i < promoOptions.length; i++) {
    promoCodeBody.appendChild(promoOptions[i]);
  } */
  promoCodeBody.append(...promoOptions);
  return promoCodeBody;
}
