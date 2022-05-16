window.onload = createCreateCard;
document
  .getElementById("createAccForm")
  .addEventListener("submit", handleSubmit);

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
  createCard.appendChild(createPwCfmTextbox());
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
  const accOptionList = ["Student", "Staff"];
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

  // Create edit email textbox
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

  // Create edit password textbox
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
  // Create label for confirn password
  const pwCfmTextLabel = document.createElement("label");
  pwCfmTextLabel.setAttribute("id", "pwCfmTextLabel");
  pwCfmTextLabel.innerHTML = "Confirm Password";

  // Create confirm password textbox
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

  // Create confirm button
  const confirmButton = document.createElement("button");
  setAttributes(confirmButton, {
    class: "btn btn-primary",
    id: "confirmButton",
    type: "submit",
  });
  confirmButton.innerHTML = "Confirm";
  atag.appendChild(confirmButton);

  // a tag for cancel button
  const atag2 = document.createElement("a");
  atag2.setAttribute("href", "/userAdminHome");
  buttonDiv.appendChild(atag2);

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
  const accTypeResult = document.getElementById("selectDrop").value;
  console.log(accTypeResult);
  const pwData = $("#pwTextbox").val();
  const pwCfmData = $("#pwCfmTextbox").val();
  if (accTypeResult === "Student") {
    if (pwData === pwCfmData) {
      const result = await axios
        .post("api/students/", {
          email: $("#emailTextbox").val(),
          password: $("#pwTextbox").val(),
        })
        .then(function (response) {
          console.log(response);
        });
      alert("Account Created!");
      window.location = "/userAdminHome";
    } else {
      alert("Passwords do not match!");
    }
  } else {
    if (pwData === pwCfmData) {
      const result = await axios
        .post("api/staff/", {
          email: $("#emailTextbox").val(),
          password: $("#pwTextbox").val(),
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          alert(error.data.response);
        });
      alert("Account Created!");
      window.location = "/userAdminHome";
    } else {
      alert("Passwords do not match!");
    }
  }
}
