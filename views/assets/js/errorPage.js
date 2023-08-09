const btn = $("a.error");
btn.focus();
btn.addEventListener("click", async () => {
  await postFocus("empty");
  window.location.href = "/";
});
