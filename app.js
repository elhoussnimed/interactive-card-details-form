const holderNameInput = document.getElementById("name");
const cardNumberInput = document.getElementById("cardNumber");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");
const showCardNumber = document.querySelector(".card .front-card p");
const showName = document.querySelector(".card .front-card div .holder-name");
const showExperationMonth = document.querySelector(
  ".card .front-card div div .card-month"
);
const showExperationYear = document.querySelector(
  ".card .front-card div div .card-year"
);
const showCvc = document.querySelector(".card .back-card p");
const btn = document.querySelector(".btn button");
const completeState = document.querySelector(".container .complete-state");
const form = document.querySelector(".container .form");

// Check The Length Of All Input
function checkLength() {
  let value = this.value;
  const maxLength = this.getAttribute("maxlength");
  if (value.length > maxLength) {
    this.value = value.slice(0, maxLength);
  }
}
cvcInput.addEventListener("input", checkLength);
cardNumberInput.addEventListener("input", checkLength);
monthInput.addEventListener("input", checkLength);
yearInput.addEventListener("input", checkLength);

// Card Number Show Style (**** **** **** ****)
cardNumberInput.addEventListener("input", () => {
  const array = cardNumberInput.value.split("");
  array.splice(4, 0, " ");
  array.splice(9, 0, " ");
  array.splice(14, 0, " ");
  newArray = array.join("");
  showCardNumber.innerHTML = newArray;
});
// Add Holder Name In Card
holderNameInput.oninput = () => {
  showName.innerHTML = holderNameInput.value;
};

// Add Experation Date In Card
monthInput.oninput = () => {
  showExperationMonth.innerHTML = `${monthInput.value.padStart(2, 0)}/`;
};
yearInput.oninput = () => {
  showExperationYear.innerHTML = yearInput.value;
};

// Add CVC Code
cvcInput.oninput = () => {
  showCvc.innerHTML = cvcInput.value;
};

// Check Error In Input
const cardNumberInputReg = /\d{16}/;
const cardNumberError = document.querySelector(
  ".container .form .content .card-number .msg-error"
);
const expDateError = document.querySelector(
  ".container .form .content .card-exp-cvc .exp-date p"
);
const cvcError = document.querySelector(
  ".container .form .content .card-exp-cvc .cvc p"
);

btn.addEventListener("click", () => {
  // Check Card Number
  if (cardNumberInputReg.test(cardNumberInput.value) === false) {
    cardNumberError.classList.add("display");
    cardNumberInput.style.border = "2px solid red";
  } else {
    cardNumberError.classList.remove("display");
    cardNumberInput.style.border = "1px solid #ccc";
  }

  // Check Card Month
  if (monthInput.value.length == 0) {
    expDateError.classList.add("display");
    monthInput.style.border = "2px solid red";
  } else {
    expDateError.classList.remove("display");
    monthInput.style.border = "1px solid #ccc";
  }

  // Check Card Year
  if (yearInput.value.length == 0) {
    expDateError.classList.add("display");
    yearInput.style.border = "2px solid red";
  } else {
    expDateError.classList.remove("display");
    yearInput.style.border = "1px solid #ccc";
  }

  // Check Card Cvc
  if (cvcInput.value.length == 0) {
    cvcError.classList.add("display");
    cvcInput.style.border = "2px solid red";
  } else {
    cvcError.classList.remove("display");
    cvcInput.style.border = "1px solid #ccc";
  }
  // Complete State Show
  showCompleteState();
  // Complete State Hide
  hideCompleteState();
});

// front card number if the value is 0
cardNumberInput.oninput = () => {
  if (cardNumberInput.value.length == 0) {
    showCardNumber.innerHTML = "0000 0000 0000 0000";
  }
};

function showCompleteState() {
  if (
    !cardNumberError.classList.contains("display") &&
    !expDateError.classList.contains("display") &&
    !cvcError.classList.contains("display")
  ) {
    completeState.style.display = "flex";
    form.style.display = "none";
  }
}

function hideCompleteState() {
  const stateBtn = document.querySelector(".container .complete-state button");
  stateBtn.addEventListener("click", () => {
    completeState.style.display = "none";
    form.style.display = "flex";
    showCardNumber.innerHTML = "0000 0000 0000 0000";
    showExperationMonth.innerHTML = "00";
    showExperationYear.innerHTML = "00";
    showCvc.innerHTML = "000";
    cardNumberInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    cvcInput.value = "";
  });
}
