const homePage = $("#homePage");
const form = $(".form");
const input = $(".input");
const btn = $(".btn");

input.focus();

function debounce(fn, timmer = 300) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timmer);
  };
}

function getError(msg) {
  if (typeof msg === "string" && msg.length > 0) {
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = msg;
    removeError();
    homePage.append(span);
  }
}

function removeError() {
  if (homePage.querySelector("span.error") !== null) {
    homePage.querySelector("span.error").remove();
  }
}

// input event

input.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9+]/g, "");
});

function getValidate(inputValue) {
  try {
    let error = "";
    const newValue = inputValue.replace(/[^0-9+]/g, "");
    const hasPlusSign = newValue.includes("+");
    if (!newValue) {
      error = "Phone number is required";
    } else if (hasPlusSign) {
      if (newValue.indexOf("+") !== 0) {
        error = "The + sign must be placed at the beginning";
      } else if (newValue[1] !== "8" && newValue[1] !== "9") {
        error = "After the + sign should be the number 8 or 9";
      } else if (newValue.length !== 12) {
        error = "Phone number must be 12 characters";
      }
    } else {
      if (newValue[0] !== "0") {
        error = "There should be a zero at the beginning";
      } else if (newValue[1] === "0") {
        error = "Can't have zero in 2nd place";
      } else if (newValue.length < 9 || newValue.length > 11) {
        error = "Phone number must be 9-11 characters";
      }
    }

    return { message: error, isValid: error.length ? false : true };
  } catch (e) {
    return "";
  }
}

async function handleKeydown(e) {
  if (e.target.value) {
    const { message, isValid } = await getValidate(e.target.value);
    if (!isValid) return getError(message);
    removeError();
    btn.disabled = false;
  } else {
    return getError("Phone number is required!");
  }
}

input.addEventListener("keydown", (e) => {
  handleKeydown(e);
});

// form event

async function handleSubmit(e) {
  e.preventDefault();
  const phone = input.value;
  console.log("phone", phone);
  if (phone) {
    removeError();
    const data = await checkActive(phone);
    const focus = await postFocus({ phone });
    if (focus) {
      const msg = getValidate(data.phone);
      if (msg) {
        return getError(msg);
      } else {
        if (data.phone) {
          window.location.href = `/success/${data.phone}`;
        } else {
          window.location.href = `/account/${phone}`;
        }
      }
    }
  } else {
    return getError("Phone number is required!");
  }
}

form.addEventListener("submit", handleSubmit);
