window.onload = createAccountCard;

async function createAccountCard() {
  const accountCard = document.createElement("div");
  accountCard.setAttribute(
    "class",
    "accountTable card shadow-sm table-responsive"
  );
  const accountCardBody = document.createElement("div");
  accountCardBody.setAttribute("class", "card-body");
  accountCardBody.appendChild(await createAccountTable());
  accountCard.appendChild(accountCardBody);
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

  const headers = ["Promo Code", "Discount", "Expiry Date", "Manage"];
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
    const formattedPromoRow = {
      ...promoCode,
      discountRate: `${promoCode.discountRate}%`,
      expiryDate: new Date(promoCode.expiryDate).toLocaleDateString("en-sg"),
    };

    // ["name", "discountRate", "expiryDate"]
    const promoTRContent = Object.keys(formattedPromoRow).map((key) => {
      const promoCodeColumn = document.createElement("td");
      promoCodeColumn.innerHTML = formattedPromoRow[key];
      return promoCodeColumn;
    });

    const buttonTd = document.createElement("td");
    const buttonWrapper = document.createElement("div");
    buttonWrapper.setAttribute("class", "d-flex");
    buttonWrapper.setAttribute("style", "gap: 5px;");
    const editLink = document.createElement("a");
    editLink.setAttribute("id", "editLink");
    editLink.setAttribute("href", `/editPromoCode/${promoCode.name}`);
    editLink.setAttribute("class", "btn btn-primary");
    editLink.innerHTML = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.setAttribute("class", "btn btn-danger");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", async () => {
      if (confirm("Delete Promo Code?")) {
        try {
          await axios.delete(`/api/promoCodes/${promoCode.name}`);
          location.reload();
        } catch (error) {
          alert(error.response.data);
        }
      }
    });

    buttonWrapper.append(editLink, deleteButton);
    buttonTd.appendChild(buttonWrapper);
    promoTRContent.push(buttonTd);
    promoTR.append(...promoTRContent);
    return promoTR;
  });

  const promoCodeBody = document.createElement("tBody");

  /*   for (let i = 0; i < promoOptions.length; i++) {
    promoCodeBody.appendChild(promoOptions[i]);
  } */
  promoCodeBody.append(...promoOptions);
  return promoCodeBody;
}
