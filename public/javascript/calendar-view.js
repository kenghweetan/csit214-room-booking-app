window.onload = createWeekView;

function createWeekView() {
  let date = new Date();
  console.log(date);
  const week = document.getElementById("week");
  for (let i = 0; i < 6; i++) {
    console.log("hello");
    week.appendChild(createTimeLineCard(date.setDate(date.getDate() + 1)));
  }
}

function createTimeLineCard(date) {
  const timeLineCard = document.createElement("div");
  timeLineCard.setAttribute(
    "class",
    "calendar card shadow-sm table-responsive"
  );
  timeLineCard.appendChild(createTimeLineTable(date));
  return timeLineCard;
}

function createTimeLineTable(date) {
  const timeLineTable = document.createElement("table");
  timeLineTable.setAttribute("class", "table");
  timeLineTable.setAttribute("id", "tableid");
  const caption = document.createElement("caption");

  caption.innerHTML = new Date(date).toString();

  timeLineTable.appendChild(caption);
  timeLineTable.appendChild(createTLHead(date));
  timeLineTable.appendChild(createTLBody());

  return timeLineTable;
}

function createTLHead() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);
  const roomsCol = document.createElement("th");
  roomsCol.innerHTML = "rooms";
  tr.appendChild(roomsCol);
  for (i = 9; i <= 18; i++) {
    const th = document.createElement("th");
    th.innerHTML = i + ":00";
    tr.appendChild(th);
  }

  return thead;
}

function createTLBody() {
  const tBody = document.createElement("tbody");
  const rooms = ["room1", "room2", "room3", "room4"];
  for (const room of rooms) {
    const tr = document.createElement("tr");
    const roomNameCol = document.createElement("td");
    roomNameCol.innerHTML = room;
    tr.appendChild(roomNameCol);

    for (i = 9; i <= 18; i++) {
      const td = document.createElement("td");
      if (Math.random() < 0.5) {
        td.setAttribute("style", "background-color: blue;");
      }

      tr.appendChild(td);
    }

    tBody.appendChild(tr);
  }

  return tBody;
}
