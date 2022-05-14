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

  accountTable.appendChild(createAccountHead());
  accountTable.appendChild(await createAccountBody());

  return accountTable;
}

function createAccountHead() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const accCol = document.createElement("th");
  accCol.innerHTML = "Account Type";
  tr.appendChild(accCol);

  const headers = [
    "Email",
    "Last Login",
    "Last Logout",
    "Suspended",
    "Manage Account",
  ];
  for (const header of headers) {
    const accCol = document.createElement("th");
    accCol.innerHTML = header;
    tr.appendChild(accCol);
  }

  return thead;
}

async function createAccountBody() {
  const tBody = document.createElement("tbody");

  // Create table and insert data
  const accs = (await axios.get("/api/userAdmin")).data;
  accs.forEach(async (account) => {
    const tr = document.createElement("tr");
    const accCol = document.createElement("td");
    const accCol2 = document.createElement("td");
    const accCol3 = document.createElement("td");
    const accCol4 = document.createElement("td");
    const accCol5 = document.createElement("td");
    accCol.innerHTML = account.type;
    accCol2.innerHTML = account.email;
    accCol3.innerHTML = account.lastLoggedIn;
    accCol4.innerHTML = account.lastLoggedOut;
    accCol5.innerHTML = account.suspended;
    console.log(account);
    tr.appendChild(accCol);
    tr.appendChild(accCol2);
    tr.appendChild(accCol3);
    tr.appendChild(accCol4);
    tr.appendChild(accCol5);

    // Create buttons
    const td = document.createElement("td");
    td.setAttribute("class", "selectable");
    td.setAttribute("id", "manageAccCol");

    const atag = document.createElement("a");
    atag.setAttribute("href", "/userAdminEdit");
    td.appendChild(atag);

    const editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("class", "btn btn-primary");
    editButton.setAttribute("id", "editButton");
    editButton.innerHTML = "Edit";
    atag.appendChild(editButton);

    const atag2 = document.createElement("a");
    atag2.setAttribute("href", "/userAdminCreate");
    td.appendChild(atag2);

    const suspendButton = document.createElement("button");
    suspendButton.setAttribute("type", "button");
    suspendButton.setAttribute("class", "btn btn-danger");
    suspendButton.setAttribute("id", "suspendButton");
    suspendButton.innerHTML = "Suspend";
    atag2.appendChild(suspendButton);

    tr.appendChild(td);

    tBody.appendChild(tr);
  });

  return tBody;
}
