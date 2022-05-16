document.getElementById("bookingForm").addEventListener("submit", handleSubmit);

$(document).ready(() => {
  document
    .getElementById("date")
    .setAttribute("min", dateToLocalISOString(new Date()).split("T")[0]);
  populateTimeDropdown();
  populateRoomDropdown();
  populatePromoCodeDropdown();
});

let selects = Array.from(document.getElementsByTagName("select"));

selects.forEach((select) => {
  select.addEventListener("change", calculateTotalCost);
});

function calculateTotalCost() {
  const formFieldsAreFilled =
    $("#startTime").timepicker().getTime() &&
    $("#endTime").timepicker().getTime() &&
    $("#venue").children("option:selected")?.data().value?.hourlyRate;

  if (formFieldsAreFilled) {
    const startTime = $("#startTime").timepicker().getTime();
    const endTime = $("#endTime").timepicker().getTime();
    const hourlyRate = $("#venue").children("option:selected")?.data()
      .value?.hourlyRate;
    console.log($("#promoCodes").children("option:selected").data());
    const discount = $("#promoCodes").children("option:selected")?.data()
      .value?.discountRate;
    // To calculate the time difference of two dates
    const timeDifferenceInMillis = endTime.getTime() - startTime.getTime();
    const millisToHoursRatio = 1000 * 60 * 60;
    // To calculate the no. of days between two dates
    const timeDifferenceInHours = timeDifferenceInMillis / millisToHoursRatio;
    const grossPrice = Number(hourlyRate) * timeDifferenceInHours;
    const netPrice = Number(grossPrice) * (discount ? 1 - discount : 1);
    $("#grossPrice").html(grossPrice.toFixed(2));
    $("#netPrice").html(netPrice.toFixed(2));
  }
}

$("#venue").on("change", function () {
  const selectedRoomInfo = $(this).children("option:selected").data().value;
  $("#amenities")
    .empty()
    .append(
      selectedRoomInfo.amenities?.map((amenity) =>
        $("<li></li>").html(amenity.type)
      )
    );
  $("#location").empty().html(selectedRoomInfo.location);
  $("#capacity").empty().html(selectedRoomInfo.capacity);
});

async function populateRoomDropdown() {
  const rooms = (await axios.get("/api/rooms")).data;
  console.log(await axios.get("/api/rooms"));
  console.log(await axios.get("/api/rooms").data);
  console.log(rooms);
  const roomOptions = await Promise.all(
    rooms.map(async (room) => {
      const amenities = (await axios.get(`api/amenity?roomName=${room.name}`))
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
  $("#venue").append(...roomOptions);
}

async function populatePromoCodeDropdown() {
  const promoCodes = (await axios.get("/api/promocodes/findAllValid")).data;

  const promoOptions = await Promise.all(
    promoCodes.map(async (promoCode) => {
      const promoOption = $("<option></option>")
        .attr({
          name: promoCode.name,
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
  $("#promoCodes").append(defaultOption, ...promoOptions);
  if (!(Array.isArray(promoOptions) && promoOptions.length))
    $("#promoCodes").attr({
      disabled: "",
    });
}

function populateTimeDropdown() {
  $("#startTime").timepicker({
    datePicker: false,
    timeFormat: "HH:mm",
    minTime: "09:00", // 11:45:00 AM,
    maxTime: "17:30",
    dynamic: false,
    interval: 30, // 30 minutes
    scrollbar: true,
    change: function (time) {
      const thirtyMinsInMillis = 30 * 60 * 1000;
      const minimumEndTime = new Date(time.getTime() + thirtyMinsInMillis);
      $("#endTime").timepicker("option", "minTime", minimumEndTime);
      const currentEndTime = $("#endTime").timepicker().getTime();
      console.log(!currentEndTime || currentEndTime < minimumEndTime);
      if (!currentEndTime || currentEndTime < minimumEndTime)
        $("#endTime").timepicker("setTime", minimumEndTime);
      else {
        calculateTotalCost();
      }
    },
  });

  $("#endTime").timepicker({
    datePicker: false,
    timeFormat: "HH:mm",
    minTime: "09:30", // 11:45:00 AM,
    maxTime: "18:00",
    dynamic: false,
    scrollbar: true,
    interval: 30,
    change: calculateTotalCost,
  });
}

function dateToLocalISOString(date) {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
}

async function handleSubmit(event) {
  event.preventDefault();
  console.log("test");
  const startTime = $("#startTime").timepicker().getTime();
  const endTime = $("#endTime").timepicker().getTime();
  const bookingDate = document.getElementById("date").valueAsDate;
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

  const PromoCodeName = $("#promoCodes").children("option:selected").val();
  const bookingGrossPrice = Number($("#grossPrice").html());
  const bookingNetPrice = Number($("#netPrice").html());
  try {
    const result = await axios.post("/api/bookings", {
      RoomName: $("#venue").children("option:selected").val(),
      status: "confirmed",
      startDateTime,
      endDateTime,
      grossPrice: bookingGrossPrice,
      PromoCodeName: PromoCodeName,
      netPrice: bookingNetPrice,
    });
    alert("booking successful!");
    window.location = `/paymentReceipt/${result.data.bookingId}`;
  } catch (error) {
    console.log(error);
    alert(error.response.data || "Error adding Booking");
  }
}
