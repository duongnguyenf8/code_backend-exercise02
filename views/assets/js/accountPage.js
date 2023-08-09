const phoneSlug = getPhone("account");
const phoneFocus = await getFocus();
if (phoneFocus !== phoneSlug) {
  await postFocus("empty");
  window.location.href = "/";
} else {
  const h1 = $("h1.account");
  const input0 = $("#input0");
  const input1 = $("#input1");
  const input2 = $("#input2");
  const input3 = $("#input3");
  const btnSubmit = $("#btnSubmit");
  const btnBack = $("#btnBack");
  const form = $("#form");
  const inputArr = [input0, input1, input2, input3];
  input0.focus();
  function getMsg(msg) {
    h1.className = "error";
    h1.innerText = `ERROR : ${msg.toUpperCase()}`;
  }
  const handleKeyDown = (e, ref) => {
    const keyMap = {
      8: "backspace",
      37: "left",
      39: "right",
    };
    const refIndex = inputArr.indexOf(ref);
    if (keyMap[e.keyCode] === "backspace" && ref.value === "") {
      const prevInput = inputArr[refIndex - 1];
      if (prevInput) {
        prevInput.focus();
      }
    } else if (keyMap[e.keyCode] === "right") {
      const nextInput = inputArr[refIndex + 1];
      if (nextInput) {
        nextInput.focus();
      }
    } else if (keyMap[e.keyCode] === "left") {
      const prevInput = inputArr[refIndex - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  function handleChangeOTP(e, ref) {
    let currentValue = e.target.value;
    if (!/^[0-9]*$/.test(currentValue)) {
      const newValue = e.target.value.replace(/[^0-9]/g, "");
      currentValue = newValue;
      e.target.value = newValue;
    }
    if (currentValue.length > 1) {
      e.target.value = currentValue[0];
      return;
    }
    const refIndex = inputArr.indexOf(ref);
    const nextInput = inputArr[refIndex + 1];
    if (currentValue.length === 1 && nextInput) {
      nextInput.focus();
    }
    const value = inputArr.reduce((acc, curr) => acc + curr.value, "");
    if (value.length === 4) {
      canSubmit(true);
    } else {
      canSubmit(false);
    }
  }
  function canSubmit(canSubmit) {
    if (canSubmit) {
      btnSubmit.disabled = false;
      return true;
    } else {
      btnSubmit.disabled = true;
      return false;
    }
  }
  inputArr.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      handleChangeOTP(e, inputElement);
    });
    inputElement.addEventListener("keydown", (e) =>
      handleKeyDown(e, inputElement)
    );
  });

  async function postDataActive(data) {
    const response = await fetch(`/api/active`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });
    return await response.json();
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    const value = inputArr.reduce((acc, curr) => acc + curr.value, "");
    const phoneActive = await postDataActive({
      phone: getPhone("account"),
      otp: value,
    });
    if (phoneActive?.phone) {
      const phone = phoneActive.phone;
      await postFocus({ phone });
      window.location.href = "/success/" + getPhone("account");
    } else {
      await postFocus("empty");
      getMsg("Wrong phone number");
      btnSubmit.disabled = true;
    }
  };

  btnBack.addEventListener("click", async () => {
    await postFocus("empty");
    window.location.href = "/";
  });
}
