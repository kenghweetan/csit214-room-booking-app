window.onload = createCreateCard;

document
  .getElementById("createForm")
  .addEventListener("submit", submitPromoCode);

// Create card for the form
function createCreateCard() {
  const createCard = document.createElement("div");
  createCard.setAttribute(
    "class",
    "createAccCard card shadow-sm table-responsive"
  );
  createCard.appendChild(createEmailTextbox());
  createCard.appendChild(createPwTextbox());
  createCard.appendChild(createExpiryPicker());
  createCard.appendChild(createButtons());
  document.getElementById("createForm").appendChild(createCard);
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
    required: "",
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
    required: "",
  });

  dateLabel.appendChild(expiryDatePicker);
  return dateLabel;
}

function dateToLocalISOString(date) {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
}

// Create confirm and cancel buttons for the form
function createButtons() {
  const buttonDiv = document.createElement("div");
  buttonDiv.setAttribute("class", "buttons");

  /*   // a tag for confirm button
  const atag = document.createElement("a");
  // atag.setAttribute();
  buttonDiv.appendChild(atag);

  // a tag for cancel button
  const atag2 = document.createElement("a");
  atag2.setAttribute("href", "/viewPromoCodes");
  buttonDiv.appendChild(atag2); */

  // Create confirm button
  const confirmButton = document.createElement("button");
  setAttributes(confirmButton, {
    class: "btn btn-primary",
    id: "confirmButton",
    type: "submit",
  });
  /*   confirmButton.addEventListener("click", () => {
    console.log("test");
  }); */
  confirmButton.innerHTML = "Confirm";
  buttonDiv.appendChild(confirmButton);

  // Create cancel button
  const cancelLink = document.createElement("a");
  setAttributes(cancelLink, {
    class: "btn btn-secondary",
    id: "cancelButton",
    href: "/viewPromoCodes",
  });

  cancelLink.innerHTML = "Cancel";
  buttonDiv.appendChild(cancelLink);

  return buttonDiv;
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

async function submitPromoCode(event) {
  event.preventDefault();
  console.log("working");
  const emailTextbox = document.getElementById("emailTextbox");
  const pwTextbox = document.getElementById("pwTextbox");
  const expiryDatePicker = document.getElementById("expiryDatePicker");
  try {
    const submit = await axios.post("/api/promocodes/", {
      name: emailTextbox.value,
      discountRate: pwTextbox.value,
      expiryDate: expiryDatePicker.valueAsDate,
    });
    alert("Addition successful!");
    window.location = "/viewPromoCodes";
  } catch (error) {
    alert(error.message);
  }
}
