window.onload = fillFields;

async function fillFields() {
  const bookingId = JSON.parse(document.getElementById("bookingId").innerHTML);
  const booking = await loadBookingDetails(bookingId);
  console.log(document.getElementById("netPrice"));
  document.getElementById("netPrice").innerHTML = booking.netPrice;
}

async function loadBookingDetails(bookingId) {
  const { RoomName, startDateTime, endDateTime, promoCode, netPrice } = (
    await axios.get(`/api/bookings?bookingId=${bookingId}`)
  ).data[0];

  const booking = {
    roomName: RoomName,
    date: new Date(startDateTime),
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
    netPrice: netPrice,
  };
  return booking;
}
