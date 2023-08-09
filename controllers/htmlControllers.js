const fs = require("fs");
const path = require("path");
const data = require("../data/data.json");
const { replace, getPhone } = require("../helper");
const htmlController = (res, pathView, pathFile, pathname) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  let htmlContent = fs.readFileSync(
    path.join(__dirname, pathView, pathFile),
    "utf-8"
  );
  if (pathname === "/" || pathname === "/index.html")
    htmlContent = replace(htmlContent, "content", data.index);
  else if (pathname.startsWith("/account") && getPhone(pathname))
    htmlContent = replace(htmlContent, "content", data.account);
  else if (pathname.startsWith("/success") && getPhone(pathname))
    htmlContent = replace(htmlContent, "content", data.success);
  else htmlContent = replace(htmlContent, "content", data.error);

  htmlContent = replace(htmlContent, "phone", getPhone(pathname));
  htmlContent = replace(htmlContent, "error", pathname.replace("/", ""));
  res.end(htmlContent);
};

module.exports = htmlController;
