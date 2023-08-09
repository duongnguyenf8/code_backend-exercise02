const http = require("http");
const url = require("url");

const { html, assets, api } = require("../model");

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let { pathname, query } = parsedUrl;
    if (pathname.includes("/assets/")) {
      assets(req, res, pathname, "../views");
    } else if (pathname.startsWith("/api")) {
      api(req, res, query, pathname);
    } else {
      html(req, res, "../views", "index.html", pathname);
    }
  })
  .listen(3002, () =>
    console.log("Server is running on http://localhost:3002")
  );
