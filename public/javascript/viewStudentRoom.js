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
  console.log(await createRoomBody());
  accountTable.appendChild(await createRoomBody());

  return accountTable;
}

function createRoomHeader() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const headers = ["Room Name", "Location", "Capacity"];
  for (const header of headers) {
    const accCol = document.createElement("th");
    accCol.innerHTML = header;
    tr.appendChild(accCol);
  }

  return thead;
}

async function createRoomBody() {
  const rooms = (await axios.get("/api/rooms/")).data;
  console.log(rooms);
  const roomOptions = rooms.map((rooms) => {
    var roomTR = document.createElement("tr");
    const { name, location, capacity } = rooms;
    const populateRoom = {
      name: name,
      location: location,
      capacity: capacity,
    };

    console.log(populateRoom);

    const roomTRContent = Object.keys(populateRoom).map((key) => {
      const roomsPopulateColumns = document.createElement("td");
      roomsPopulateColumns.innerHTML = populateRoom[key];
      console.log(typeof rooms[key]);
      return roomsPopulateColumns;
    });

    const linkTd = document.createElement("td");
    const editLink = document.createElement("a");

    editLink.setAttribute("href", "/addBooking");
    editLink.setAttribute("id", "addBooking");
    editLink.innerHTML = "Add Booking";
    linkTd.appendChild(editLink);
    roomTRContent.push(linkTd);

    roomTR.append(...roomTRContent);
    return roomTR;
  });

  const roomBody = document.createElement("tBody");

  roomBody.append(...roomOptions);
  return roomBody;
}
