window.onload = createCreateCard;

// Create card for the form
function createCreateCard() {
  const createCard = document.createElement("div");
  createCard.setAttribute(
    "class",
    "createAccCard card shadow-sm table-responsive"
  );
  createCard.appendChild(createAccDropdown());
  createCard.appendChild(createEmailTextbox());
  createCard.appendChild(createPwTextbox());
  createCard.appendChild(createButtons());
  document.getElementById("createForm").appendChild(createCard);
}

// Create dropdown list to choose account type
function createAccDropdown() {
  // Create label for dropdown
  const accTypeLabel = document.createElement("label");
  accTypeLabel.setAttribute("id", "accTypeLabel");
  accTypeLabel.innerHTML = "Choose Account Type";

  // Create dropdown
  const accType = document.createElement("select");
  setAttributes(accType, {
    class: "form-select form-select-lg mb-3",
    id: "selectDrop",
    "aria-label": ".form-select-lg example",
  });

  // Create options for dropdown list
  const accOptionList = ["Student", "Staff", "Admin"];
  for (const options of accOptionList) {
    const accOption = document.createElement("option");
    accOption.setAttribute("value", options);
    accOption.innerHTML = options;
    accType.appendChild(accOption);
  }
  accTypeLabel.append(accType);
  return accTypeLabel;
}

// Create textbox to edit email
function createEmailTextbox() {
  // Create label for textbox
  const emailTextLabel = document.createElement("label");
  emailTextLabel.setAttribute("id", "emailTextLabel");
  emailTextLabel.innerHTML = "Email";

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
  pwTextLabel.innerHTML = "Password";

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

  // Create confirm button
  const confirmButton = document.createElement("button");
  setAttributes(confirmButton, {
    class: "btn btn-primary",
    id: "confirmButton",
    type: "submit",
  });
  confirmButton.innerHTML = "Confirm";
  buttonDiv.appendChild(confirmButton);

  const cancelButton = document.createElement("button");
  setAttributes(cancelButton, {
    class: "btn btn-secondary",
    id: "cancelButton",
  });
  cancelButton.innerHTML = "Cancel";
  buttonDiv.appendChild(cancelButton);

  return buttonDiv;
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
