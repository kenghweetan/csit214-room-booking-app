document.getElementById("delet").style.display = "none";

document.getElementById("edit").addEventListener("click", editbooking);
document.getElementById("edit").addEventListener("click", changeText);
$("#Rname").on("change", function () {
  console.log($(this).val());
  const selectedRoomInfo = $(this).children("option:selected").data().value;
  $("#Ramenities")
    .empty()
    .append(
      selectedRoomInfo.amenities?.map((amenity) =>
        $("<li></li>").html(amenity.type)
      )
    );
  console.log($(`#Rname`).val());
  $("#Rlocation").empty().val(selectedRoomInfo.location);
  $("#Rcapacity").empty().val(selectedRoomInfo.capacity);
});

window.addEventListener("load", () => {
  $(document).ready(async () => {
    populateTimeDropdown();
    await populateRoomDropdown();
    await loadBookingDetails();
  });
});

async function loadBookingDetails() {
  const bookingId = JSON.parse(document.getElementById("bookingId").innerHTML);

  const { RoomName, startDateTime, endDateTime, promoCode } = (
    await axios.get(`/api/bookings?bookingId=${bookingId}`)
  ).data[0];

  const booking = {
    roomName: RoomName,
    date: dateToLocalISOString(new Date(startDateTime)).slice(0, 10),
    startTime: new Date(startDateTime)
      .toLocaleTimeString("en-sg", {
        hour12: false,
      })
      .slice(0, 5),
    endTime: new Date(endDateTime)
      .toLocaleTimeString("en-sg", {
        hour12: false,
      })
      .slice(0, 5),
    promoCode: promoCode ? promoCode : "",
  };
  console.log($("#Rname option"));
  $("#Rname option")
    .filter(function () {
      return this.value === booking.roomName;
    })
    .attr("selected", true)
    .change();
  document.getElementById("Rdate").value = booking.date;
  $("#RsT").timepicker().setTime(booking.startTime);
  $("#ReT").timepicker().setTime(booking.endTime);
  document.getElementById("Rprom").value = booking.promoCode
    ? bookingDetails.promoCode
    : "";
}
function editbooking() {
  document.getElementById("Rname").removeAttribute("disabled");
  document.getElementById("Rdate").removeAttribute("disabled");
  document.getElementById("RsT").removeAttribute("disabled");
  document.getElementById("ReT").removeAttribute("disabled");
  document.getElementById("Rprom").removeAttribute("disabled");
  document.getElementById("delet").style.display = "block";
}

function changeText() {
  let element = document.getElementById("edit");
  if (element.value == "Edit") element.value = "Procced";
  element.id = "procced";
  element.addEventListener("click", handleSubmit);
  let element2 = document.getElementById("Bd");
  if (element2.innerHTML == "Booking Details")
    element2.innerHTML = "Edit Booking";
  element2.id = "eB";
}

document.getElementById("back").addEventListener("click", back);
document.getElementById("back").addEventListener("click", backchangeText);

function back() {
  /*   const allFormInputs = [
    ...Array.from(
      document.getElementsByTagName("input"),
      ...Array.from(document.getElementsByTagName("select"))
    ),
  ];

  allFormInputs.forEach((formInput) => {
    formInput.setAttribute("disabled", true);
  }); */

  document.getElementById("Rname").setAttribute("disabled", true);
  document.getElementById("Rdate").setAttribute("disabled", true);
  document.getElementById("RsT").setAttribute("disabled", true);
  document.getElementById("ReT").setAttribute("disabled", true);
  document.getElementById("Rprom").setAttribute("disabled", true);
  document.getElementById("delet").style.display = "none";
}

function backchangeText() {
  let element = document.getElementById("procced");
  if (element.value == "Procced") element.value = "Edit";
  element.id = "edit";

  let element2 = document.getElementById("eB");
  if (element2.innerHTML == "Edit Booking")
    element2.innerHTML = "Booking Details";
  element2.id = "Bd";
}

function dateToLocalISOString(date) {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
}

function populateTimeDropdown() {
  $("#RsT").timepicker({
    datePicker: false,
    timeFormat: "HH:mm",
    minTime: "09:00",
    maxTime: "17:30",
    dynamic: false,
    interval: 30, // 30 minutes
    scrollbar: true,
    change: function (time) {
      const thirtyMinsInMillis = 30 * 60 * 1000;
      const minimumEndTime = new Date(time.getTime() + thirtyMinsInMillis);
      $("#ReT").timepicker("option", "minTime", minimumEndTime);
      const currentEndTime = $("#ReT").timepicker().getTime();
      console.log(!currentEndTime || currentEndTime < minimumEndTime);
      if (!currentEndTime || currentEndTime < minimumEndTime)
        $("#ReT").timepicker("setTime", minimumEndTime);
      else {
        // calculateTotalCost();
      }
    },
  });

  $("#ReT").timepicker({
    datePicker: false,
    timeFormat: "HH:mm",
    minTime: "09:30",
    maxTime: "18:00",
    dynamic: false,
    scrollbar: true,
    interval: 30,
    // change: calculateTotalCost,
  });
}

async function populateRoomDropdown() {
  const rooms = (await axios.get("/api/rooms")).data;
  console.log(await axios.get("/api/rooms"));
  console.log(await axios.get("/api/rooms").data);
  console.log(rooms);
  const roomOptions = await Promise.all(
    rooms.map(async (room) => {
      const amenities = (await axios.get(`/api/amenity?roomName=${room.name}`))
        .data;
      const roomOption = $("<option></option>")
        .attr({
          name: room.name,
        })
        .data("value", { ...room, amenities })
        .html(room.name);
      return roomOption;
    })
  );
  $("#Rname").append(...roomOptions);
}

async function handleSubmit(event) {
  event.preventDefault();
  const bookingId = JSON.parse(document.getElementById("bookingId").innerHTML);
  const startTime = $("#RsT").timepicker().getTime();
  const endTime = $("#ReT").timepicker().getTime();
  const bookingDate = document.getElementById("Rdate").valueAsDate;
  const startDateTime = new Date(bookingDate);
  const endDateTime = new Date(bookingDate);

  startDateTime.setHours(startTime.getHours());
  startDateTime.setMinutes(startTime.getMinutes());
  startDateTime.setSeconds(startTime.getSeconds());
  startDateTime.setMilliseconds(startTime.getMilliseconds());

  endDateTime.setHours(endTime.getHours());
  endDateTime.setMinutes(endTime.getMinutes());
  endDateTime.setSeconds(endTime.getSeconds());
  endDateTime.setMilliseconds(endTime.getMilliseconds());

  const bookingGrossPrice = Number($("#Rprice").val());
  console.log($("#Rname").children("option:selected").val());

  try {
    const result = await axios.put(`/api/bookings/${bookingId}`, {
      roomName: $("#Rname").children("option:selected").val(),
      status: "confirmed",
      startDateTime,
      endDateTime,
      grossPrice: bookingGrossPrice,
      netPrice: bookingGrossPrice,
    });

    alert("booking successful!");
    window.location = "/viewBookings";
  } catch (error) {
    alert(error.response.data);
    console.log(error.response.data);
  }
}
