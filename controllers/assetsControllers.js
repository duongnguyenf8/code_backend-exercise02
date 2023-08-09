const fs = require("fs");
const path = require("path");

const assetsController = (res, pathname, pathView) => {
  let assetsContent = "";
  if (pathname.includes(".css"))
    res.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
  else if (pathname.includes(".js"))
    res.writeHead(200, {
      "Content-Type": "text/javascript; charset=utf-8",
    });
  else if (pathname.includes(".ico"))
    res.writeHead(200, { "Content-Type": "image/x-icon" });
  else res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

  assetsContent = fs.readFileSync(path.join(__dirname, pathView + pathname));
  res.end(assetsContent);
};

module.exports = assetsController;
