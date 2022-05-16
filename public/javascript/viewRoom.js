window.onload = createAccountCard;

async function createAccountCard() {
  const accountCard = document.createElement("div");
  accountCard.setAttribute(
    "class",
    "accountTable card shadow-sm table-responsive"
  );
  const accountCardBody = document.createElement("div");
  accountCardBody.setAttribute("class", "card-body");
  accountCard.appendChild(accountCardBody);
  accountCardBody.appendChild(await createAccountTable());
  document.getElementById("rooms").appendChild(accountCard);
}

async function createAccountTable() {
  const accountTable = document.createElement("table");
  accountTable.setAttribute("class", "table");
  accountTable.setAttribute("id", "tableid");

  accountTable.appendChild(createRoomHeader());
  accountTable.appendChild(await createRoomBody());

  return accountTable;
}

function createRoomHeader() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const headers = [
    "Room Name",
    "Location",
    "Launch Date",
    "Launch Time",
    "Manage",
  ];
  for (const header of headers) {
    const accCol = document.createElement("th");
    accCol.innerHTML = header;
    tr.appendChild(accCol);
  }

  return thead;
}

async function createRoomBody() {
  const rooms = (await axios.get("/api/rooms/")).data;
  const promoOptions = rooms.map((rooms) => {
    var promoTR = document.createElement("tr");
    const { name, location, launchDateTime } = rooms;
    const populateRoom = {
      name: name,
      location: location,
      date: new Date(launchDateTime).toLocaleDateString("en-SG"),
      launchDateTime: new Date(launchDateTime).toLocaleTimeString("en-SG"),
    };

    const promoTRContent = Object.keys(populateRoom).map((key) => {
      const roomsPopulateColumns = document.createElement("td");
      roomsPopulateColumns.innerHTML = populateRoom[key];
      return roomsPopulateColumns;
    });
    const linkTd = document.createElement("td");
    const editLink = document.createElement("a");

    /*    editLink.setAttribute("href", `/bookingDetails/${bookingId}`);
           editLink.setAttribute("id", "seeDetails");
           editLink.innerHTML = "See details";
           linkTd.appendChild(editLink);
           promoTRContent.push(linkTd); */

    promoTR.append(...promoTRContent);
    return promoTR;
  });

  const promoCodeBody = document.createElement("tBody");

  promoCodeBody.append(...promoOptions);
  return promoCodeBody;
}
