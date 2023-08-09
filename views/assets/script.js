const pages = ["homePage", "accountPage", "successPage", "errorPage"];
let currentPage = "homePage";
window.addEventListener("DOMContentLoaded", () => {
  for (let page of pages) {
    if ($(`#${page}`) !== null) {
      currentPage = page;
      break;
    }
  }
});
window.onload = async () => {
  const location = window.location.pathname;
  if (
    (await getFocus()) &&
    (await checkActive(await getFocus()).phone) === undefined &&
    !location.startsWith("/account/")
  ) {
    if (!location.startsWith("/success/"))
      window.location.href = "/account/" + (await getFocus());
  }
  import(`./js/${currentPage}.js`);
};
