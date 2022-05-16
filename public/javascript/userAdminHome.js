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
    const typeCol = document.createElement("td");
    const emailCol = document.createElement("td");
    emailCol.setAttribute("id", "emailCol");
    const lastLoginCol = document.createElement("td");
    const lastLogoutCol = document.createElement("td");
    const suspendCol = document.createElement("td");
    suspendCol.setAttribute("id", "suspendCol");
    typeCol.innerHTML = account.type;
    emailCol.innerHTML = account.email;
    lastLoginCol.innerHTML = account.lastLoggedIn
      ? new Date(account.lastLoggedIn).toLocaleString("en-sg")
      : "";
    lastLogoutCol.innerHTML = account.lastLoggedOut
      ? new Date(account.lastLoggedOut).toLocaleString("en-sg")
      : "";
    suspendCol.innerHTML = account.suspended ? "Yes" : "No";
    tr.appendChild(typeCol);
    tr.appendChild(emailCol);
    tr.appendChild(lastLoginCol);
    tr.appendChild(lastLogoutCol);
    tr.appendChild(suspendCol);
    // Create buttons
    const td = document.createElement("td");
    td.setAttribute("class", "selectable");
    td.setAttribute("id", "manageAccCol");

    // a tag for edit button
    const atag = document.createElement("a");
    atag.setAttribute(
      "href",
      `/userAdminEdit/${account.type}/${account.email}`
    );
    td.appendChild(atag);

    const editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("class", "btn btn-primary");
    editButton.setAttribute("id", "editButton");
    editButton.innerHTML = "Edit";
    atag.appendChild(editButton);

    // a tag for suspend button
    const atag2 = document.createElement("a");
    td.appendChild(atag2);

    const suspendButton = document.createElement("button");
    suspendButton.setAttribute("type", "button");

    suspendButton.setAttribute("id", "suspendButton");
    if (suspendCol.innerHTML === "No") {
      suspendButton.setAttribute("class", "btn btn-danger");
      suspendButton.innerHTML = "Suspend";
    } else if (suspendCol.innerHTML === "Yes") {
      suspendButton.setAttribute("class", "btn btn-success");
      suspendButton.innerHTML = "Unsuspend";
    }

    suspendButton.addEventListener("click", async function (event) {
      event.preventDefault();
      const suspendedColData = suspendCol.innerHTML;
      const emailColData = emailCol.innerHTML;
      console.log(emailColData);
      console.log(suspendedColData);

      if (typeCol.innerHTML === "Student") {
        if (suspendedColData === "No") {
          const result = await axios.put(`/api/students/${emailColData}`, {
            suspended: "true",
          });
          location.reload();
        } else if (suspendedColData === "Yes") {
          const result = await axios.put(`/api/students/${emailColData}`, {
            suspended: "false",
          });
          location.reload();
        }
      } else if (typeCol.innerHTML === "Staff") {
        if (suspendedColData === "No") {
          const result = await axios.put(`/api/staff/${emailColData}`, {
            suspended: "true",
          });
          location.reload();
        } else if (suspendedColData === "Yes") {
          const result = await axios.put(`/api/staff/${emailColData}`, {
            suspended: "false",
          });
          location.reload();
        }
      }
    });

    atag2.appendChild(suspendButton);

    tr.appendChild(td);

    tBody.appendChild(tr);
  });

  return tBody;
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
