document.getElementById("delet").style.display = "none";

document.getElementById("delet").addEventListener("click", deleteBooking);
document
  .getElementById("Rdate")
  .setAttribute("min", dateToLocalISOString(new Date()).split("T")[0]);
$("#Rname").on("change", function () {
  console.log($(this).val());
  const selectedRoomInfo = $(this).children("option:selected").data().value;
  $("#Rlocation").empty().val(selectedRoomInfo.location);
  $("#Rcapacity").empty().val(selectedRoomInfo.capacity);
});

window.addEventListener("load", () => {
  $(document).ready(async () => {
    populateTimeDropdown();
    await populateRoomDropdown();
    await populatePromoCodeDropdown();
    await loadBookingDetails();
    const bookingId = JSON.parse(
      document.getElementById("bookingId").innerHTML
    );
    const { endDateTime } = (
      await axios.get(`/api/bookings?bookingId=${bookingId}`)
    ).data[0];

    if (new Date() > new Date(endDateTime)) {
      document.getElementById("edit").value = "Booking Date has passed";
      document.getElementById("edit").setAttribute("disabled", "");
    } else {
      document.getElementById("edit").addEventListener("click", editbooking);
      document.getElementById("edit").addEventListener("click", changeText);
    }
  });
});

let selects = Array.from(document.getElementsByTagName("select"));
selects.forEach((select) => {
  select.addEventListener("change", calculateTotalCost);
});

function calculateTotalCost() {
  const formFieldsAreFilled =
    $("#RsT").timepicker().getTime() &&
    $("#ReT").timepicker().getTime() &&
    $("#Rname").children("option:selected")?.data().value?.hourlyRate;
  if (formFieldsAreFilled) {
    const startTime = $("#RsT").timepicker().getTime();
    const endTime = $("#ReT").timepicker().getTime();
    const hourlyRate = $("#Rname").children("option:selected")?.data()
      .value?.hourlyRate;
    const discount = $("#Rprom").children("option:selected")?.data()
      .value?.discountRate;
    // To calculate the time difference of two dates
    const timeDifferenceInMillis = endTime.getTime() - startTime.getTime();
    const millisToHoursRatio = 1000 * 60 * 60;
    // To calculate the no. of days between two dates
    const timeDifferenceInHours = timeDifferenceInMillis / millisToHoursRatio;
    const grossPrice = Number(hourlyRate) * timeDifferenceInHours;
    const netPrice = Number(grossPrice) * (discount ? 1 - discount : 1);
    $("#grossPrice").val(grossPrice.toFixed(2));
    $("#netPrice").val(netPrice.toFixed(2));
  }
}

async function loadBookingDetails() {
  const bookingId = JSON.parse(document.getElementById("bookingId").innerHTML);

  const {
    RoomName,
    startDateTime,
    endDateTime,
    PromoCodeName,
    grossPrice,
    netPrice,
    status,
  } = (await axios.get(`/api/bookings?bookingId=${bookingId}`)).data[0];

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
    promoCodeName: PromoCodeName ? PromoCodeName : "",
    grossPrice,
    netPrice,
    status,
  };
  console.log($("#Rname option"));
  $("#Rname option")
    .filter(function () {
      return this.value === booking.roomName;
    })
    .attr("selected", true)
    .change();
  document.getElementById("Rdate").value = booking.date;
  document.getElementById("status").value =
    booking.status === "confirmed" ? "Confirmed" : "Cancelled";
  $("#RsT").timepicker().setTime(booking.startTime);
  $("#ReT").timepicker().setTime(booking.endTime);
  console.log($("#Rprom option"));
  console.log(booking.promoCodeName);
  $("#Rprom option")
    .filter(function () {
      return this.value === booking.promoCodeName;
    })
    .attr("selected", true)
    .change();
  console.log($("#Rprom").children("option:selected"));
  document.getElementById("grossPrice").value = booking.grossPrice;
  document.getElementById("netPrice").value = booking.netPrice;
}

function editbooking() {
  document.getElementById("Rname").removeAttribute("disabled");
  document.getElementById("Rdate").removeAttribute("disabled");
  document.getElementById("RsT").removeAttribute("disabled");
  document.getElementById("ReT").removeAttribute("disabled");
  document.getElementById("Rprom").removeAttribute("disabled");
  if (document.getElementById("status").value === "Confirmed") {
    document.getElementById("delet").style.display = "block";
  }
}

function changeText() {
  let editButton = document.getElementById("edit");
  const proceedButton = document.createElement("button");
  proceedButton.value = "Proceed";
  proceedButton.id = "proceed";
  proceedButton.innerHTML = "Confirm";
  proceedButton.setAttribute("class", "btn btn-primary btn-lg");
  proceedButton.addEventListener("click", handleSubmit);
  editButton.replaceWith(proceedButton);

  let element2 = document.getElementById("Bd");
  element2.innerHTML = "Edit Booking";
  element2.id = "eB";

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "btn btn-danger");
  cancelButton.setAttribute("id", "cancel");
  cancelButton.setAttribute("type", "button");
  cancelButton.innerHTML = "Cancel";
  cancelButton.addEventListener("click", cancel);
  cancelButton.addEventListener("click", backchangeText);
  document.getElementById("back").replaceWith(cancelButton);
}

function cancel() {
  document.getElementById("Rname").setAttribute("disabled", true);
  document.getElementById("Rdate").setAttribute("disabled", true);
  document.getElementById("RsT").setAttribute("disabled", true);
  document.getElementById("ReT").setAttribute("disabled", true);
  document.getElementById("Rprom").setAttribute("disabled", true);
  document.getElementById("delet").style.display = "none";
  const proceedButton = document.getElementById("proceed");
  const editButton = document.createElement("button");
  editButton.addEventListener("click", editbooking);
  editButton.addEventListener("click", changeText);
  editButton.value = "Edit";
  editButton.id = "edit";
  editButton.innerHTML = "Edit";
  editButton.setAttribute("class", "btn btn-primary btn-lg");
  proceedButton.replaceWith(editButton);
  const backLink = document.createElement("a");
  backLink.setAttribute("class", "btn btn-secondary btn-lg");
  backLink.setAttribute("id", "back");
  backLink.setAttribute("href", "/viewBookings");
  backLink.innerHTML = "Back";
  document.getElementById("cancel").replaceWith(backLink);
}

function backchangeText() {
  let element2 = document.getElementById("eB");
  if (element2.innerHTML === "Edit Booking")
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
        calculateTotalCost();
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
    change: calculateTotalCost,
  });
}

async function populateRoomDropdown() {
  const rooms = (await axios.get("/api/rooms")).data;
  const roomOptions = await Promise.all(
    rooms.map(async (room) => {
      const roomOption = $("<option></option>")
        .attr({
          name: room.name,
        })
        .data("value", { ...room })
        .html(room.name);
      return roomOption;
    })
  );
  $("#Rname").append(...roomOptions);
}

async function populatePromoCodeDropdown() {
  const promoCodes = (await axios.get("/api/promocodes/findAllValid")).data;

  const promoOptions = await Promise.all(
    promoCodes.map(async (promoCode) => {
      const promoOption = $("<option></option>")
        .attr({
          name: promoCode.name,
          value: promoCode.name,
        })
        .data("value", {
          ...promoCode,
          discountRate: Number(promoCode.discountRate / 100),
        })
        .html(promoCode.name);
      return promoOption;
    })
  );
  const defaultOption = $("<option></option>")
    .attr({
      hidden: "",
    })
    .html(
      Array.isArray(promoOptions) && promoOptions.length
        ? "Select a Promo Code"
        : "No Promo Codes Available"
    );
  /*  if  (Array.isArray(promoOptions) && array.length) { { */
  // array empty or does not exist
  $("#Rprom").append(defaultOption, ...promoOptions);
  if (!(Array.isArray(promoOptions) && promoOptions.length))
    $("#Rprom").attr({
      disabled: "",
    });
}

async function handleSubmit(event) {
  event.preventDefault();
  const bookingId = JSON.parse(document.getElementById("bookingId").innerHTML);
  const startTime = $("#RsT").timepicker().getTime();
  const endTime = $("#ReT").timepicker().getTime();
  const promoCodeName = $("#Rprom").children("option:selected").val();
  console.log($("#Rprom").children("option:selected").val());
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

  const bookingGrossPrice = Number($("#grossPrice").val());
  const bookingNetPrice = Number($("#netPrice").val());
  console.log($("#Rname").children("option:selected").val());

  try {
    confirm("Confirm updated booking?");
    const result = await axios.put(`/api/bookings/${bookingId}`, {
      RoomName: $("#Rname").children("option:selected").val(),
      status: "confirmed",
      startDateTime,
      endDateTime,
      grossPrice: bookingGrossPrice,
      PromoCodeName:
        promoCodeName === "Select a Promo Code" ? null : promoCodeName,
      netPrice: bookingNetPrice,
    });

    alert("Edit successful!");
    window.location = `/paymentReceipt/${bookingId}`;
  } catch (error) {
    alert(error.response.data);
    console.log(error.response.data);
  }
}

async function deleteBooking() {
  try {
    const bookingId = JSON.parse(
      document.getElementById("bookingId").innerHTML
    );

    const result = await axios.delete(`/api/bookings/${bookingId}`);

    alert("Cancellation successful!");
    window.location = "/viewBookings";
  } catch (error) {
    alert(error.response.data);
    console.log(error.response.data);
  }
}
