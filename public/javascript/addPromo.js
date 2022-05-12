window.onload = createCreateCard;

document.getElementById("createForm").addEventListener("submit", submitPromoCode);

// Create card for the form
function createCreateCard() {
  const createCard = document.createElement("div");
  createCard.setAttribute(
    "class",
    "createAccCard card shadow-sm table-responsive"
  );
  createCard.appendChild(createEmailTextbox());
  createCard.appendChild(createPwTextbox());
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
    type: "text",
  });

  pwTextLabel.append(pwTextbox);
  return pwTextLabel;
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

async function submitPromoCode(event) {

  try {
    const submit = await axios.post("/api/promocodes/", {
      name: emailTextLabel.innerText,
      discountRate: pwTextLabel.innerText
    });
    alert("Addition successful!");
  }catch (error) {
    alert(error.message);
  }
}
