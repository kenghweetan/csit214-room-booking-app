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
  document.getElementById("bookings").appendChild(accountCard);
}

async function createAccountTable() {
  const accountTable = document.createElement("table");
  accountTable.setAttribute("class", "table");
  accountTable.setAttribute("id", "tableid");

  accountTable.appendChild(createBookingHeader());
  console.log(await createBookingBody());
  accountTable.appendChild(await createBookingBody());

  return accountTable;
}

function createBookingHeader() {
  const thead = document.createElement("thead");

  const tr = document.createElement("tr");
  thead.appendChild(tr);

  const headers = [
    "Status",
    "Room Name",
    "Date",
    "Start Time",
    "End Time",
    "Price",
    "Manage",
  ];
  for (const header of headers) {
    const accCol = document.createElement("th");
    accCol.innerHTML = header;
    tr.appendChild(accCol);
  }

  return thead;
}

async function createBookingBody() {
  const bookings = (await axios.get("/api/bookings/myBookings")).data;
  console.log(bookings);
  const promoOptions = bookings.map((booking) => {
    var promoTR = document.createElement("tr");
    const {
      bookingId,
      status,
      startDateTime,
      endDateTime,
      grossPrice,
      netPrice,
      PromoCodeName,
      RoomName,
    } = booking;

    const typedBooking = {
      status: status === "confirmed" ? "Confirmed" : "Cancelled",
      roomName: RoomName,
      date: new Date(startDateTime).toLocaleDateString("en-SG"),
      startTime: new Date(startDateTime).toLocaleTimeString("en-SG"),
      endTime: new Date(endDateTime).toLocaleTimeString("en-SG"),
      price: `$${netPrice}`,
    };

    console.log(typedBooking);

    // ["name", "discountRate", "expiryDate"]
    const promoTRContent = Object.keys(typedBooking).map((key) => {
      const bookingColumn = document.createElement("td");
      bookingColumn.innerHTML = typedBooking[key];
      console.log(typeof booking[key]);
      return bookingColumn;
    });
    const linkTd = document.createElement("td");
    const editLink = document.createElement("a");
    /*     editLink.setAttribute("type", "button"); */
    /*  editLink.setAttribute("class", "btn btn-primary"); */
    editLink.setAttribute("href", `/bookingDetails/${bookingId}`);
    editLink.setAttribute("id", "seeDetails");
    editLink.innerHTML = "See details";
    linkTd.appendChild(editLink);
    promoTRContent.push(linkTd);

    /*   const cancelLink = document.createElement("button");
    cancelLink.setAttribute("type", "button");
    cancelLink.setAttribute("class", "btn btn-danger");
    cancelLink.setAttribute("id", "suspendButton");
    cancelLink.innerHTML = "Suspend";
    atag2.appendChild(cancelLink); */

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
