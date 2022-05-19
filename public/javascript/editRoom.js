document.getElementById("delet").style.display = "none";
document.getElementById("edit").addEventListener("click", changeText);
document.getElementById("edit").addEventListener("click", editroom);
document.getElementById("delet").addEventListener("click", deleteRoom);

window.addEventListener("load", () => {
  $(document).ready(() => {
    loadRoomDetails();
    var currentTime = new Date();
    currentTime.setSeconds(0, 0);
    /*     document
      .getElementById("launchDate")
      .setAttribute(
        "min",
        dateToLocalISOString(currentTime).replace(":00.000Z", "")
      ); */
  });
});

function dateToLocalISOString(date) {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
}

async function loadRoomDetails() {
  const Rname = JSON.parse(document.getElementById("name").innerHTML);

  const { name, capacity, location, launchDateTime, hourlyRate } = (
    await axios.get(`/api/rooms?name=${Rname}`)
  ).data[0];
  const launchDateTimeAsObject = new Date(launchDateTime);
  launchDateTimeAsObject.setSeconds(0, 0);
  const room = {
    name: name,
    capacity: capacity,
    location: location,
    hourlyRate: hourlyRate,
    launchDateTime: dateToLocalISOString(launchDateTimeAsObject).replace(
      ":00.000Z",
      ""
    ),
  };
  document.getElementById("Rname").value = room.name;
  document.getElementById("Rlocation").value = room.location;
  document.getElementById("Rprice").value = room.hourlyRate;
  document.getElementById("Rcapacity").value = room.capacity;
  document.getElementById("launchDate").value = room.launchDateTime;
}

function editroom() {
  document.getElementById("Rname").removeAttribute("disabled");
  document.getElementById("Rlocation").removeAttribute("disabled");
  document.getElementById("Rprice").removeAttribute("disabled");
  document.getElementById("launchDate").removeAttribute("disabled");
  document.getElementById("Rcapacity").removeAttribute("disabled");
  document.getElementById("TV").removeAttribute("disabled");
  document.getElementById("Computer").removeAttribute("disabled");
  document.getElementById("delet").style.display = "block";
}

function changeText() {
  let editButton = document.getElementById("edit");
  const proceedButton = document.createElement("button");
  //if (element.value == "Edit") element.value = "Proceed";
  //element.id = "proceed";
  proceedButton.value = "Proceed";
  proceedButton.id = "proceed";
  proceedButton.innerHTML = "Confirm";
  proceedButton.setAttribute("class", "btn btn-primary btn-lg");
  proceedButton.addEventListener("click", handleEdit);
  editButton.replaceWith(proceedButton);

  let element2 = document.getElementById("Bd");
  if (element2.innerHTML == "Room Details") element2.innerHTML = "Edit Room";
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
/* 
document.getElementById("back").addEventListener("click", back);
document.getElementById("back").addEventListener("click", backchangeText); */

function cancel() {
  document.getElementById("Rname").setAttribute("disabled", true);
  document.getElementById("Rlocation").setAttribute("disabled", true);
  document.getElementById("Rprice").setAttribute("disabled", true);
  document.getElementById("launchDate").setAttribute("disabled", true);
  document.getElementById("Rcapacity").setAttribute("disabled", true);
  document.getElementById("delet").style.display = "none";
  const proceedButton = document.getElementById("proceed");
  const editButton = document.createElement("button");
  editButton.value = "Edit";
  editButton.id = "edit";
  editButton.innerHTML = "Edit";
  editButton.setAttribute("type", "button");
  editButton.setAttribute("class", "btn btn-primary btn-lg");
  editButton.addEventListener("click", changeText);
  editButton.addEventListener("click", editroom);
  proceedButton.replaceWith(editButton);
  const backLink = document.createElement("a");
  backLink.setAttribute("class", "btn btn-secondary btn-lg");
  backLink.setAttribute("id", "back");
  backLink.setAttribute("href", "/viewRoom");
  backLink.innerHTML = "Back";
  document.getElementById("cancel").replaceWith(backLink);
}

function backchangeText() {
  let element2 = document.getElementById("eB");
  if (element2.innerHTML == "Edit Room") element2.innerHTML = "Room Details";
  element2.id = "Bd";
}

function dateToLocalISOString(date) {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
}

async function deleteRoom(event) {
  event.preventDefault();
  const name = JSON.parse(document.getElementById("name").innerHTML);
  const bookingDate = document.getElementById("launchDate").value;
  const bookDate = new Date(bookingDate);

  try {
    const result = await axios.delete(`/api/rooms/${name}`, {
      name: $("#Rname").val(),
      capacity: $("#Rcapacity").val(),
      location: $("#Rlocation").val(),
      launchDateTime: bookDate,
      hourlyRate: $("#Rprice").val(),
    });
    alert("Room Deleted Successfully");
    window.location.href = "/viewRoom";
  } catch (error) {
    alert("Error in Deleting Room");
  }
}

async function handleEdit(event) {
  event.preventDefault();
  const name = JSON.parse(document.getElementById("name").innerHTML);
  const bookingDate = document.getElementById("launchDate").value;
  const bookDate = new Date(bookingDate);

  if (confirm("Confirm updated room?")) {
    try {
      console.log(name);
      console.log($("#Rname").val());
      const result = await axios.put(`/api/rooms/${name}`, {
        name: $("#Rname").val(),
        capacity: $("#Rcapacity").val(),
        location: $("#Rlocation").val(),
        launchDateTime: bookDate,
        hourlyRate: $("#Rprice").val(),
      });
      alert("Update Successful");
      window.location = "/viewRoom";
    } catch (error) {
      console.log(error);
      alert("Error Updating");
    }
  }
}
