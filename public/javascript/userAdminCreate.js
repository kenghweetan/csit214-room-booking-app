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
  accTypeLabel.innerHTML = "Account Type";

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

  // a tag for confirm button
  const atag = document.createElement("a");
  // atag.setAttribute();
  buttonDiv.appendChild(atag);

  // a tag for cancel button
  const atag2 = document.createElement("a");
  atag2.setAttribute("href", "/userAdminHome");
  buttonDiv.appendChild(atag2);

  // Create confirm button
  const confirmButton = document.createElement("button");
  setAttributes(confirmButton, {
    class: "btn btn-primary",
    id: "confirmButton",
    type: "submit",
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
