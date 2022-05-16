document.getElementById("delet").style.display = "none";
//document.getElementById("edit").addEventListener("click", handleEdit);
document.getElementById("edit").addEventListener("click", changeText);
document.getElementById("edit").addEventListener("click", editroom);
//document.getElementById("back").addEventListener("click", homeRedir);
document.getElementById("delet").addEventListener("click", delCom);
document.getElementById("delet").addEventListener("click", delTv);
document.getElementById("delet").addEventListener("click", deleteRoom);

//const { default: axios } = require("axios");

window.addEventListener("load", () => {
    $(document).ready(() => {
        loadRoomDetails();
        loadRoomDetails2();
        var currentTime = new Date();
        currentTime.setSeconds(0, 0);
        document
            .getElementById("launchDate")
            .setAttribute(
                "min",
                dateToLocalISOString(currentTime).replace(":00.000Z", "")
            );
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

    const room = {
        name: name,
        capacity: capacity,
        location: location,
        hourlyRate: hourlyRate,
        launchDateTime: dateToLocalISOString(new Date(launchDateTime)).replace(
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

async function loadRoomDetails2() {
    const Rname = JSON.parse(document.getElementById("name").innerHTML);

    const checkAmenity = (await axios.get(`/api/amenity?RoomName=${Rname}`)).data;

    console.log(await axios.get(`/api/amenity?RoomName=${Rname}`));

    checkAmenity.forEach((amenity) => {
        document.getElementById(amenity.type).checked = true;
    });
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
    proceedButton.innerHTML = "Confirm"
    proceedButton.setAttribute("class", "btn btn-primary btn-lg");
    proceedButton.addEventListener("click", handleEdit);
    proceedButton.addEventListener("click", editCom);
    proceedButton.addEventListener("click", editTv);
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
    document.getElementById("TV").setAttribute("disabled", true);
    document.getElementById("Computer").setAttribute("disabled", true);
    document.getElementById("delet").style.display = "none";
    const proceedButton = document.getElementById("proceed");
    const editButton = document.createElement("button");
    editButton.value = "Edit";
    editButton.id = "edit";
    editButton.innerHTML = "Edit";
    editButton.setAttribute("class", "btn btn-primary btn-lg");
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

/* function homeRedir() {
    let element = document.getElementById("edit");
    if (element.value == "Edit") element.value = "Back";
    element.id = "edit";
    window.location.href = "/viewRoom"; */


function dateToLocalISOString(date) {
    return new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
}

async function delCom(event) {
    event.preventDefault();
    const name = JSON.parse(document.getElementById("name").innerHTML);
    const radio1 = document.getElementById("Computer").value;

    try {
        const result = await axios
            .delete(`/api/amenity/${name}`, {
                type: radio1,
            })
    } catch (error) {

    }
}

async function delTv(event) {
    event.preventDefault();
    const name = JSON.parse(document.getElementById("name").innerHTML);
    const radio1 = document.getElementById("TV").value;

    try {
        const result = await axios
            .delete(`/api/amenity/${name}`, {
                type: radio1,
            })
    } catch (error) {
        console.log(error.response.data);
    }
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
        })
        alert("Room Deleted Successfully")
        window.location.href = "/viewRoom";
    } catch (error) {
        alert("Error in Deleting Room")
    }
}

async function handleEdit(event) {
    event.preventDefault();
    const name = JSON.parse(document.getElementById("name").innerHTML);
    const bookingDate = document.getElementById("launchDate").value;
    const bookDate = new Date(bookingDate);

    try {
        confirm("Confirm updated room?");
        const result = await axios
            .put(`/api/rooms/${name}`, {
                name: $("#Rname").val(),
                capacity: $("#Rcapacity").val(),
                location: $("#Rlocation").val(),
                launchDateTime: bookDate,
                hourlyRate: $("#Rprice").val(),
            })

        alert("Update Successful")
        window.location = "/viewRoom";

    } catch (error) {
        alert("Error Updating");
    }
}

async function editCom(event) {
    event.preventDefault();
    const name = JSON.parse(document.getElementById("name").innerHTML);
    const radio1 = document.getElementById("Computer").value;

    try {
        const result = await axios
            .put(`/api/amenity/${name}`, {
                type: radio1,
            })
            .then(function(response) {
                console.log(response);
            });
    } catch (error) {
        alert(error.response.data);
        console.log(error.response.data);
    }
}

async function editTv(event) {
    event.preventDefault();
    const name = JSON.parse(document.getElementById("name").innerHTML);
    const radio1 = document.getElementById("TV").value;

    try {
        const result = await axios
            .put(`/api/amenity/${name}`, {
                type: radio1,
            })
            .then(function(response) {
                console.log(response);
            });
    } catch (error) {
        alert(error.response.data);
        console.log(error.response.data);
    }
}