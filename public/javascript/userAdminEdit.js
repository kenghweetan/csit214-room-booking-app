window.onload = createEditCard;

document.getElementById("editAccForm").addEventListener("submit", handleSubmit);

// Create card for the form
function createEditCard() {
  const editCard = document.createElement("div");
  editCard.setAttribute("class", "editAccCard card shadow-sm table-responsive");
  editCard.appendChild(createAccDropdown());
  editCard.appendChild(createEmailTextbox());
  editCard.appendChild(createPwTextbox());
  editCard.appendChild(createPwCfmTextbox());
  editCard.appendChild(createButtons());
  document.getElementById("editForm").appendChild(editCard);
  loadAccDetails();
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
    disabled: "",
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

// Create textbox to confirm password
function createPwCfmTextbox() {
  // Create label for password
  const pwCfmTextLabel = document.createElement("label");
  pwCfmTextLabel.setAttribute("id", "pwCfmTextLabel");
  pwCfmTextLabel.innerHTML = "Confirm Password";

  // Create textbox
  const pwCfmTextbox = document.createElement("input");
  setAttributes(pwCfmTextbox, {
    class: "form-control form-control-lg",
    id: "pwCfmTextbox",
    type: "text",
  });

  pwCfmTextLabel.append(pwCfmTextbox);
  return pwCfmTextLabel;
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

// async function getEditData() {
//   const results = await axios.put();
// }
async function handleSubmit(event) {
  event.preventDefault();
  try {
    const result = await axios.put("/api/userAdmin/", {
      email: emailTextbox.innerText,
      password: pwTextbox.innerText,
    });
    alert("Edit successful!");
  } catch (error) {
    alert(error.message);
  }
}

async function loadAccDetails() {
  const accEmail = JSON.parse(document.getElementById("email").innerHTML);
  console.log(accEmail);
  const accUserType = JSON.parse(document.getElementById("userType").innerHTML);
  const promoCodeData = (
    await axios.get(`api/userAdmin?email=${accEmail}&userType=${accUserType}`)
  ).data[0];
  console.log(promoCodeData);
  document.getElementById("emailTextbox").value = promoCodeData.email;
  document.getElementById("pwTextbox").value = promoCodeData.password;
}
