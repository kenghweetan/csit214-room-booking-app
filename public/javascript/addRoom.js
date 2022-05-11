//document.getElementById("addRoom").addEventListener("submit", handleSubmit);

$(document).ready(() => {
    /*   document
          .getElementById("date")
          .setAttribute("min", dateToLocalISOString(new Date()).split("T")[0]);
      populateTimeDropdown(); */
    populateRoomDropdown();
});

async function populateRoomDropdown() {
    const rooms = (await axios.get("/api/rooms")).data;

    const roomOptions = await Promise.all(
        rooms.map(async(room) => {
            const amenities = (await axios.get(`api/amenity?roomName=${room.name}`))
                .data;
            const roomOption = $("<option></option>")
                .attr({
                    name: room.name,
                })
                .data("value", {...room, amenities })
                .html(room.name);
            return roomOption;
        })
    );
    console.log(roomOptions)
    $("#roomVenue2").append(...roomOptions);
}

{
    /* <div class="col-lg-4 col-md-6">
    <select class="form-select" type="select" id="venue" required>
        <option value="" selected hidden>Select a Room</option>
    </select>
    </div>
    </div> */
}