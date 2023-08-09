const axios = require("axios");
const uuid = require("uuid");
const config = require("../helper/configs/config.json");
const endpoint = require("../helper/configs/endpoint.json");

const { validateInput, getBody } = require("../helper");

const { SERVER_API } = config;
const {
  focus: focusEndpoint,
  active: activeEndpoint,
  otp: otpEndpoint,
} = endpoint;

const phoneControllers = (req, res, query) => {
  if (req.method === "GET") {
    const phone = query?.phone;
    try {
      if (phone) {
        if (validateInput(phone)) {
          const response = {
            message: validateInput(phone),
            isValid: false,
            phone,
          };
          res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
          res.end(JSON.stringify(response));
        } else {
          const response = {
            isValid: true,
            phone,
          };
          res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
          res.end(JSON.stringify(response));
        }
      } else {
        res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Invalid phone");
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Invalid method");
  }
};

const focusControllers = async (req, res) => {
  if (req.method === "POST") {
    const { value } = await getBody(req);
    if (!validateInput(value.phone)) {
      const { data } = await axios.post(`${SERVER_API}${focusEndpoint}`, {
        phone: value.phone,
      });
      res.end(JSON.stringify(data));
    } else {
      if (value.phone === "empty") {
        const { data } = await axios.post(`${SERVER_API}${focusEndpoint}`, {
          phone: "",
        });
        return res.end(JSON.stringify(data));
      } else {
        const response = {
          message: "Invalid phone number",
          isValid: false,
        };
        res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
        res.end(JSON.stringify(response));
      }
    }
  } else if (req.method === "GET") {
    const { data } = await axios.get(`${SERVER_API}${focusEndpoint}`);
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Invalid method");
  }
};

const activeControllers = async (req, res) => {
  if (req.method === "POST") {
    const { phone, otp } = await getBody(req);
    if (!phone || !otp) {
      const response = {
        message: "Invalid phone number or otp",
        isValid: false,
      };
      res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
      res.end(JSON.stringify(response));
    }
    if (!validateInput(phone)) {
      const { data } = await axios.get(`${SERVER_API}${activeEndpoint}`);
      if (data.find((item) => item.phone === phone)) {
        const response = {
          message: "Phone is already active",
          isValid: false,
        };
        res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
        res.end(JSON.stringify(response));
      } else {
        const { data } = await axios.post(`${SERVER_API}${activeEndpoint}`, {
          id: uuid.v4(),
          phone,
          otp,
        });
        res.end(JSON.stringify(data));
      }
    } else {
      const response = {
        message: "Invalid phone number",
        isValid: false,
      };
      res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
      res.end(JSON.stringify(response));
    }
  } else if (req.method === "GET") {
    const url = require("url");
    const parsedUrl = url.parse(req.url, true);
    const { query } = parsedUrl;
    if (!query) {
      const { data } = await axios.get(`${SERVER_API}${activeEndpoint}`);
      res.end(JSON.stringify(data));
    } else {
      const { data } = await axios.get(`${SERVER_API}${activeEndpoint}`);
      const dataActive = data.find((item) => item.phone === query.phone);
      if (dataActive) {
        res.end(JSON.stringify(dataActive));
      } else {
        res.end("{}");
      }
    }
  } else {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Invalid method");
  }
};

const otpControllers = async (req, res) => {
  if (req.method === "POST") {
    const { phone, otp } = await getBody(req);
    if (!phone || !otp) {
      const response = {
        message: "Invalid phone number or otp",
        isValid: false,
      };
      res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
      res.end(JSON.stringify(response));
    }
    if (!validateInput(phone)) {
      const { data } = await axios.get(`${SERVER_API}${otpEndpoint}`);
      if (data.includes(otp)) {
        const { data: dataActive } = await axios.get(
          `${SERVER_API}${activeEndpoint}`
        );
        if (dataActive.find((item) => item.phone === phone)) {
          const response = {
            message: "Phone is already active",
            isValid: false,
          };
          res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
          res.end(JSON.stringify(response));
        } else {
          const { data: dataActive } = await axios.post(
            `${SERVER_API}${activeEndpoint}`,
            {
              id: uuid.v4(),
              phone,
              otp,
            }
          );
          res.end(JSON.stringify(dataActive));
        }
      } else {
        const response = {
          message: "Invalid otp",
          isValid: false,
        };
        res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
        res.end(JSON.stringify(response));
      }
    } else {
      const response = {
        message: "Invalid phone number",
        isValid: false,
      };
      res.writeHead(400, { "Content-Type": "text/json; charset=utf-8" });
      res.end(JSON.stringify(response));
    }
  } else if (req.method === "GET") {
    const { data } = await axios.get(`${SERVER_API}${otpEndpoint}`);
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Invalid method");
  }
};

const apiControllers = (req, res, query, pathname) => {
  pathname = pathname.replace("/api/", "");
  switch (pathname) {
    case "validate":
      phoneControllers(req, res, query);
      break;
    case "focus":
      focusControllers(req, res);
      break;
    case "active":
      activeControllers(req, res);
      break;
    case "otp":
      otpControllers(req, res);
      break;
    default:
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Invalid path");
      break;
  }
};
module.exports = apiControllers;
