// const { default: axios } = require("axios");

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

  accountTable.appendChild(createAccountHead());
  accountTable.appendChild(createAccountBody());

  return accountTable;
}

function createAccountHead() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const accCol = document.createElement("th");
  accCol.innerHTML = "Account Type";
  tr.appendChild(accCol);

  const headers = ["Email", "Last Login", "Last Logout", "Manage Account"];
  for (const header of headers) {
    const accCol = document.createElement("th");
    accCol.innerHTML = header;
    tr.appendChild(accCol);
  }

  return thead;
}

function createAccountBody() {
  const tBody = document.createElement("tbody");
  const accs = ["Student1", "Staff 1", "Student 2", "Staff 2"];
  for (const acc of accs) {
    const tr = document.createElement("tr");
    const accCol = document.createElement("td");
    accCol.innerHTML = acc;
    tr.appendChild(accCol);

    for (i = 0; i < 4; i++) {
      const td = document.createElement("td");
      td.setAttribute("class", "selectable");
      if (i === 3) {
        td.setAttribute("id", "manageAccCol");

        const atag = document.createElement("a");
        atag.setAttribute("href", "/userAdminEdit");
        td.appendChild(atag);

        const atag2 = document.createElement("a");
        atag.setAttribute("href", "/userAdminCreate");
        td.appendChild(atag2);

        const editButton = document.createElement("button");
        editButton.setAttribute("type", "button");
        editButton.setAttribute("class", "btn btn-primary");
        editButton.setAttribute("id", "editButton");
        editButton.innerHTML = "Edit";
        atag.appendChild(editButton);

        const suspendButton = document.createElement("button");
        suspendButton.setAttribute("type", "button");
        suspendButton.setAttribute("class", "btn btn-danger");
        suspendButton.setAttribute("id", "suspendButton");
        suspendButton.innerHTML = "Suspend";
        atag2.appendChild(suspendButton);
      }

      tr.appendChild(td);
    }

    tBody.appendChild(tr);
  }

  return tBody;
}
