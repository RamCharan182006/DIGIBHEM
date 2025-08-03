const inputs = document.querySelectorAll("input");
const nextButton = document.querySelector(".nxt-button");
const resetButton = document.querySelector(".reset-button");

const standardRoomRent = 1500;
const deluxRoomRent = 2000;
const suiteRoomRent = 2450;
const executiveRoomRent = 3500;

const ac = 100;
const wifi = 50;
const locker = 120;
const meals = 550;

// Enter key navigation
inputs.forEach((input, index) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        nextButton.click();
      }
    }
  });
});

document.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", () => {
    input.style.border = "";
  });
});

resetButton.addEventListener("click", () => {
  document.querySelector(".form").reset();
});

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  var name = document.querySelector("[name='uname']").value.trim();
  var checkIn = document.querySelector("[name='indate']").value.trim();
  var daysStr = document.querySelector("[name='noOfdays']").value.trim();
  var personsStr = document.querySelector("[name='persons']").value.trim();
  var advanceStr = document
    .querySelector("[name='advanceAmount']")
    .value.trim();
  var roomType = document.querySelector("select[name='roomType']").value.trim();

  if (
    name === "" ||
    checkIn === "" ||
    daysStr === "" ||
    personsStr === "" ||
    advanceStr === "" ||
    roomType === ""
  ) {
    showError("No Field Should be Left Empty");
    return;
  }

  if (!/^[a-zA-Z ]+$/.test(name)) {
    showError("Customer name Should only contain alphabets and spaces");
    document.querySelector("[name='uname']").style.border = "2px solid red";

    return;
  }

  if (!/^\d+$/.test(daysStr) || parseInt(daysStr) <= 0) {
    showError("Invalid Total Days Entered!");
    document.querySelector("[name='noOfdays']").style.border = "2px solid red";
    return;
  }

  if (!/^\d+$/.test(personsStr) || parseInt(personsStr) <= 0) {
    showError("Invalid Total Persons Entered!");
    document.querySelector("[name='persons']").style.border = "2px solid red";
    return;
  }

  if (!/^\d+(\.\d{1,2})?$/.test(advanceStr) || parseFloat(advanceStr) <= 0) {
    showError("Advance must be greater than zero");
    document.querySelector("[name='advanceAmount']").style.border =
      "2px solid red";
    return;
  }

  // Parsed Numbers
  var days = parseInt(daysStr);
  var persons = parseInt(personsStr);
  var advance = parseFloat(advanceStr);

  document.querySelector(".form").style.display = "none";
  document.querySelector(".slider").style.display = "none";
  document.getElementById("loader").style.display = "block";

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.querySelector(".form").style.display = "none";
    document.querySelector(".bill").style.display = "flex";
    document.querySelector(".bill").classList.add("fade-in");

    AmountDisplay(name, checkIn, days, persons, advance, roomType);
  }, 1500); // 1.5 seconds loading time
});

function AmountDisplay(name, checkIn, days, persons, advance, roomType) {
  var isacChecked = document.querySelector("[value='ac']").checked;
  var isLockerChecked = document.querySelector("[value='locker']").checked;
  var isWifiChecked = document.querySelector("[value='wifi']").checked;
  var isBreakfastChecked = document.querySelector(
    "[value='breakfast']"
  ).checked;

  var amenityCost = 0;
  var amenityArray = [];

  if (isacChecked) {
    amenityCost += ac;
    amenityArray.push("AC");
  }
  if (isBreakfastChecked) {
    amenityCost += meals;
    amenityArray.push("Meals");
  }
  if (isLockerChecked) {
    amenityCost += locker;
    amenityArray.push("Locker");
  }
  if (isWifiChecked) {
    amenityCost += wifi;
    amenityArray.push("Wi-Fi");
  }

  var roomCost = 0;
  switch (roomType) {
    case "standard":
      roomCost = standardRoomRent;
      break;
    case "delux":
      roomCost = deluxRoomRent;
      break;
    case "suite":
      roomCost = suiteRoomRent;
      break;
    case "executive":
      roomCost = executiveRoomRent;
      break;
  }

  var roomRent = (persons - 1) * 1000 + roomCost;
  var totalCostPerDay = roomRent + amenityCost;
  var totalAmount = totalCostPerDay * days;
  var dueAmount = totalAmount - advance;

  // Display Results
  displayResult(
    name,
    checkIn,
    days,
    persons,
    advance,
    roomType,
    roomCost,
    amenityArray,
    totalAmount,
    dueAmount
  );
}

function displayResult(
  name,
  checkIn,
  days,
  persons,
  advance,
  roomType,
  roomCost,
  amenityArray,
  totalAmount,
  dueAmount
) {
  document.getElementById("customer").innerHTML = name;
  document.getElementById("checkin").innerHTML = checkIn;
  document.getElementById("daysDisplay").innerHTML = days;
  document.getElementById("personsDisplay").innerHTML = persons;
  document.getElementById("advance").innerHTML = "&#8377;" + advance.toFixed(2);
  document.getElementById("room").innerHTML = roomType;
  document.getElementById("room-cost").innerHTML = "&#8377;" + roomCost;
  document.getElementById("amenities").innerHTML = amenityArray.join(", ");
  document.getElementById("total-cost").innerHTML = "&#8377;" + totalAmount;
  document.getElementById("due-amount").innerHTML =
    "&#8377;" + dueAmount.toFixed(2);
}

function goBack() {
  document.querySelector(".slider").style.display = "flex";
  document.querySelector(".form").style.display = "flex";
  document.querySelector(".bill").style.display = "none";
  document.querySelector(".form").classList.add("fade-in");
}

window.addEventListener("load", () => {
  const sliderImages = document.querySelector(".slider-images");
  const images = document.querySelectorAll(".slider-images img");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  let currentIndex = 0;

  function updateSlider() {
    sliderImages.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
  });

  // Auto-slide every 4 seconds
  setInterval(() => {
    nextButton.click();
  }, 4000);
});

function showError(message) {
  const errorDiv = document.querySelector(".error-message");
  errorDiv.innerText = message;
  errorDiv.style.display = "block";
  errorDiv.setAttribute("tabindex", "-1"); // Make it focusable

  setTimeout(() => {
    errorDiv.focus();
    errorDiv.scrollIntoView(
      {
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      },
      50
    );
  });

  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 3000);
}

// Dark Mode Javascript
let dFlag = 0;
const darkBtn = document.querySelector(".dark-btn");
darkBtn.addEventListener("click", () => {
  if (dFlag === 0) {
    document.querySelector("body").classList.add("dark-body");
    darkBtn.textContent = "Light Mode ☀️";
    dFlag = 1;
  } else {
    document.querySelector("body").classList.remove("dark-body");
    darkBtn.textContent = "Dark Mode 🌙";
    dFlag = 0;
  }
});
