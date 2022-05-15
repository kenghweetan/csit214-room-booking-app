window.onload = createEditCard;

document.getElementById("editForm").addEventListener("submit", handleSubmit);

// Create card for the form
function createEditCard() {
  const editCard = document.createElement("div");
  editCard.setAttribute("class", "editAccCard card shadow-sm table-responsive");
  editCard.appendChild(createEmailTextbox());
  editCard.appendChild(createPwTextbox());
  editCard.appendChild(createExpiryPicker());
  editCard.appendChild(createButtons());

  document.getElementById("editForm").appendChild(editCard);
  loadPromoCodeDetails();
}

// Create textbox to edit email
function createEmailTextbox() {
  // Create label for textbox
  const emailTextLabel = document.createElement("label");
  emailTextLabel.setAttribute("id", "emailTextLabel");
  emailTextLabel.innerHTML = "Promo Code";

  // Create textbox
  const emailTextbox = document.createElement("input");
  setAttributes(emailTextbox, {
    class: "form-control form-control-lg",
    id: "emailTextbox",
    type: "text",
    require: "",
  });
  emailTextLabel.append(emailTextbox);
  return emailTextLabel;
}

// Create textbox to edit password
function createPwTextbox() {
  // Create label for password
  const pwTextLabel = document.createElement("label");
  pwTextLabel.setAttribute("id", "pwTextLabel");
  pwTextLabel.innerHTML = "Percentage";

  // Create textbox
  const pwTextbox = document.createElement("input");
  setAttributes(pwTextbox, {
    class: "form-control form-control-lg",
    id: "pwTextbox",
    type: "number",
    min: 1,
    max: 100,
    required: "",
  });

  pwTextLabel.append(pwTextbox);
  return pwTextLabel;
}

function dateToLocalISOString(date) {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
}

function createExpiryPicker() {
  const dateLabel = document.createElement("label");
  dateLabel.setAttribute("id", "dateLabel");
  dateLabel.innerHTML = "Expiry";
  const expiryDatePicker = document.createElement("input");
  setAttributes(expiryDatePicker, {
    type: "date",
    id: "expiryDatePicker",
    class: "form-control form-control-lg",
    min: dateToLocalISOString(new Date()).split("T")[0],
  });

  dateLabel.appendChild(expiryDatePicker);
  return dateLabel;
}

// Create confirm and cancel buttons for the form
function createButtons() {
  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "buttons");

  // a tag for confirm button
  const atag = document.createElement("a");
  // atag.setAttribute();
  buttonDiv.appendChild(atag);

  // a tag for cancel button
  const atag2 = document.createElement("a");
  atag2.setAttribute("href", "/viewPromoCodes");
  buttonDiv.appendChild(atag2);

  // Create confirm button
  const confirmButton = document.createElement("button");
  setAttributes(confirmButton, {
    class: "btn btn-primary",
    id: "confirmButton",
    //type: "submit",
  });
  confirmButton.innerHTML = "Confirm";
  atag.appendChild(confirmButton);

  // Create cancel button
  const cancelButton = document.createElement("button");
  setAttributes(cancelButton, {
    class: "btn btn-secondary",
    id: "cancelButton",
  });
  cancelButton.innerHTML = "Cancel";
  atag2.appendChild(cancelButton);

  return buttonDiv;
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  const promoCodeName = JSON.parse(
    document.getElementById("promoCodeName").innerText
  );
  const emailTextbox = document.getElementById("emailTextbox");
  const pwTextbox = document.getElementById("pwTextbox");
  const expiryDatePicker = document.getElementById("expiryDatePicker");
  try {
    const result = await axios.put(`/api/promocodes/${promoCodeName}`, {
      name: emailTextbox.value,
      discountRate: pwTextbox.value,
      expiryDate: expiryDatePicker.value,
    });
    alert("Edit successful!");
    window.location = "/viewPromoCodes";
  } catch (error) {
    alert(error.response.data);
  }
  /* 
  console.log(
   ) */
}

async function loadPromoCodeDetails() {
  const promoCodeName = JSON.parse(
    document.getElementById("promoCodeName").innerText
  );
  console.log(promoCodeName);
  const promoCodeData = (
    await axios.get(`/api/promoCodes?name=${promoCodeName}`)
  ).data[0];

  document.getElementById("emailTextbox").value = promoCodeData.name;
  document.getElementById("pwTextbox").value = Number(
    promoCodeData.discountRate
  );
  document.getElementById("expiryDatePicker").valueAsDate = new Date(
    promoCodeData.expiryDate
  );
  console.log(promoCodeData.expiryDate);
}
