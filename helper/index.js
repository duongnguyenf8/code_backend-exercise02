const replace = (htmlContent, value, content) => {
  const regex = new RegExp(`{${value}}`, "gi");
  return htmlContent.replaceAll(regex, content);
};

const getBody = (req) => {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const body = JSON.parse(data);
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const getPhone = (path) => {
  const phone = path.split("/").slice(1)[1];
  if (Number.isInteger(Number(phone))) {
    return phone;
  }
  return false;
};

const validateInput = (inputValue) => {
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
    return error;
  } catch (e) {
    return "";
  }
};

module.exports = {
  getBody,
  replace,
  getPhone,
  validateInput,
};
