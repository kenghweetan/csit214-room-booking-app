window.onload = loadDefaultView;

function loadDefaultView() {
  const defaultDate = new Date();
  document.getElementById("sDate").valueAsDate = defaultDate;
  createWeekView(defaultDate);
}

/** Creates a weekly view of Rooms
 * @param StartingDate: Javascript Date object
 */
function createWeekView(date) {
  // console.log(date.getDate());
  // console.log(new Date());
  const week = document.getElementById("week");
  let newWeek = [];

  // week.innerHTML = null; (null/empty string)
  // while (week.firstChild) {
  //   week.removeChild(week.lastChild)
  // }

  for (let i = 0; i < 6; i++) {
    const getADate = date.getDate();
    const addDate = i === 0 ? 0 : 1;
    const setADate = date.setDate(getADate + addDate);

    newWeek.push(createTimeLineCard(setADate));
  }

  /*   console.log(newWeek);
  console.log(...newWeek); */
  week.replaceChildren(...newWeek);
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
  caption.setAttribute("id", "captionDate");

  caption.innerHTML = new Date(date).toLocaleDateString("en-SG");

  timeLineTable.append(caption, createTLHeader(date), createTLBody());

  return timeLineTable;
}

function createTLHeader() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const roomsCol = document.createElement("th");
  roomsCol.innerHTML = "Rooms";
  tr.appendChild(roomsCol);

  for (let i = 9; i <= 18; i++) {
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
      td.setAttribute("class", "selectable");
      // td.addEventListener("click", function(event){event.preventDefault(); console.log("testclick")})
      if (Math.random() < 0.5) {
        td.setAttribute("style", "background-color: blue;");
        td.setAttribute("class", "booked");
      } else {
        td.setAttribute("class", "selectable");
      }

      tr.appendChild(td);
    }

    tBody.appendChild(tr);
  }

  return tBody;
}
