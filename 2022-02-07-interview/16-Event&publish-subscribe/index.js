const btn = document.getElementById("btn");
console.dir(document);
btn.addEventListener("click", function (e) {
  console.log(e)
}, false);
btn.click();
console.dir(btn);