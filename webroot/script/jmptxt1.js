(function () {
  let v = 0;
  setInterval(function () {
    v += 0.4;
    if (v > Math.PI) v = 0;
    document.querySelector("#jmptxt").style.top = -24 * Math.sin(v) + "px";
  }, 100);
})();
