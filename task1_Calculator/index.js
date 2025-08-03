const input = document.querySelector(".calc-screen");

const buttons = document.querySelectorAll(".input-btn");
const clrButton = document.querySelector(".clr-btn");
const delButton = document.querySelector(".back-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    input.value += event.currentTarget.textContent;
    btn.classList.add("input-clicked");
    setTimeout(() => {
      btn.classList.remove("input-clicked");
    }, 100);
    // console.log(typeof(input.value));
  });
});

//clear btn

clrButton.addEventListener("click", (event) => {
  input.value = "";
  clrButton.classList.add("del-clicked");
  setTimeout(() => {
    clrButton.classList.remove("del-clicked");
  }, 100);
});

//back btn

delButton.addEventListener("click", (event) => {
  input.value = input.value.slice(0, -1);
  delButton.classList.add("del-clicked");
  setTimeout(() => {
    delButton.classList.remove("del-clicked");
  }, 100);
});

//equals btn

document.querySelector(".equals-btn").addEventListener("click", () => {
  evaluation();
});

//key down events

document.addEventListener("keydown", (event) => {
  let reqBtn;
  const availButtons = [
    "+",
    "-",
    "*",
    "/",
    "(",
    ")",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
  ];
  if (availButtons.includes(event.key)) {
    input.value += event.key;
    buttons.forEach((btn) => {
      if (btn.textContent.trim() === event.key) {
        reqBtn = btn;
        btn.classList.add("btn-keydown");
      }
    });
    if (reqBtn) {
      setTimeout(() => {
        reqBtn.classList.remove("btn-keydown");
      }, 100);
    }
  }

  if (event.key === "=" || event.key === "Enter") {
    evaluation();
  }

  if (event.key === "Backspace") {
    input.value = input.value.slice(0, -1);
    delButton.classList.add("del-clicked");
    setTimeout(() => {
      delButton.classList.remove("del-clicked");
    }, 100);
  }

  if (event.key === "c" || event.key === "C") {
    input.value = "";
    clrButton.classList.add("del-clicked");
    setTimeout(() => {
      clrButton.classList.remove("del-clicked");
    }, 100);
  }
});

function evaluation() {
  try {
    let result = math.evaluate(input.value);
    input.value =
      typeof result === "undefined" || result === null || result === ""
        ? "Invalid Expression"
        : result;
  } catch (error) {
    if (error.message.includes("Too Many Arguments")) {
      input.value = "Too Many Arguments";
      return;
    }
    input.value = "Invalid Expression";
  }
  if (
    input.value === "Invalid Expression" ||
    input.value === "Infinity" ||
    input.value === "NaN" ||
    input.value === "-Infinity"
  ) {
    setTimeout(() => {
      input.value = "";
    }, 1400);
  }
}

// dark mode functioning
let flag = 0; //dark-mode
const darkButton = document.querySelector(".dark-mode");
darkButton.addEventListener("click",()=> {
  if(flag===0) {
  document.querySelector("body").classList.add("dark-body");
  darkButton.textContent = "Dark Mode🌙";
  flag=1;
  }
  else {
  document.querySelector("body").classList.remove("dark-body");
  darkButton.textContent = "Light Mode☀️";
  flag=0;
  }
});