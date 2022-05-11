document.getElementById("bookingForm").addEventListener("submit", handleSubmit);

$(document).ready(() => {
  document
    .getElementById("date")
    .setAttribute("min", dateToLocalISOString(new Date()).split("T")[0]);
  populateTimeDropdown();
  populateRoomDropdown();
});

var roomSelect = document.getElementsByTagName("select")[0];

roomSelect.addEventListener("change", calculateTotalCost);

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
    // To calculate the time difference of two dates
    const timeDifferenceInMillis = endTime.getTime() - startTime.getTime();
    const millisToHoursRatio = 1000 * 60 * 60;
    // To calculate the no. of days between two dates
    const timeDifferenceInHours = timeDifferenceInMillis / millisToHoursRatio;
    const totalCost = Number(hourlyRate) * timeDifferenceInHours;
    $("#cost").html(totalCost.toFixed(2));
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

function populateTimeDropdown() {
  $("#startTime").timepicker({
    datePicker: false,
    timeFormat: "HH:mm:ss",
    minTime: "09:00:00", // 11:45:00 AM,
    maxTime: "17:30:00",
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
    timeFormat: "HH:mm:ss",
    minTime: "09:30:00", // 11:45:00 AM,
    maxTime: "18:00:00",
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

  const bookingGrossPrice = Number($("#cost").html());
  console.log($("#venue").children("option:selected").val());

  try {
    const result = await axios.post("api/bookings", {
      roomName: $("#venue").children("option:selected").val(),
      status: "confirmed",
      startDateTime,
      endDateTime,
      grossPrice: bookingGrossPrice,
      netPrice: bookingGrossPrice,
    });
    alert("booking successful!");
  } catch (error) {
    alert(error.message);
  }
  /* 
  console.log(
   ) */
}
