const btn = $(".btn");
const phoneSlug = getPhone("success");
const phoneFocus = await getFocus();
const phoneActive = await checkActive(phoneSlug);
if (phoneActive.phone === undefined || phoneSlug !== phoneFocus) {
  await postFocus("empty");
  window.location.href = "/";
} else {
  btn.focus();
  btn.addEventListener("click", async () => {
    await postFocus("empty");
    window.location.href = "/";
  });
}
