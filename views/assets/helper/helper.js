const $ = (tag) => document.querySelector(tag);
const $$ = (tag) => document.querySelectorAll(tag);
function getPhone(path) {
  const pathname = window.location.pathname;
  let regex;
  if (path === "account") {
    regex = new RegExp(/\/account\/([0-9]*)/);
  }
  if (path === "success") {
    regex = new RegExp(/\/success\/([0-9]*)/);
  }
  return pathname.match(regex)[1];
}
async function postFocus(value) {
  const data = await fetch("/api/focus", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  }).then((res) => res.json());
  return data;
}
async function getFocus() {
  const data = await fetch("/api/focus").then((res) => res.json());
  return data?.phone;
}
async function checkActive(phone) {
  const data = await fetch(`/api/active?phone=${phone}`).then((res) =>
    res.json()
  );
  return data;
}
