(function () {
  //即時関数で囲んでグローバル変数を消すため、この行はこのままで

  var nameC = "rainbow"; //★表示用共通タグのspanのclass名の指定。rainbowで都合が悪い時は変更可
  var spd = 100; //★速度原本50。数値が大きいほど遅い

  //指定ここまで----------------------------------------------------
  var c = document.getElementsByTagName("span"),
    rainbows = Array(),
    rainbowX = 0;
  for (var i = 0, n = c.length; i < n; ++i) {
    if (c.item(i).className === nameC) {
      rainbows.push(c.item(i));
    }
  } /*■原本"rainbow"をnameCへ変更*/
  for (var i in rainbows) {
    var e = rainbows[i],
      j,
      t,
      s;
    t = e.firstChild.nodeValue.split("");
    e.removeChild(e.firstChild);
    for (j in t) {
      s = document.createElement("span");
      s.appendChild(document.createTextNode(t[j]));
      e.appendChild(s);
    }
  }
  rainbow();
  setInterval(rainbow, spd);
  function rainbow() {
    for (var rb in rainbows) {
      for (var ch = rainbows[rb].childNodes, i = 0, n = ch.length; i < n; ++i) {
        var x = (((rainbowX + i) % 16) / 16) * 360,
          y = (x - Math.floor(x / 60) * 60) / 60,
          r,
          g,
          b;
        if (x < 60) {
          r = 255;
          g = 255 * y;
          b = 0;
        } else if (x < 120) {
          r = 255 - 255 * y;
          g = 255;
          b = 0;
        } else if (x < 180) {
          r = 0;
          g = 255;
          b = 255 * y;
        } else if (x < 240) {
          r = 0;
          g = 255 - 255 * y;
          b = 255;
        } else if (x < 300) {
          r = 255 * y;
          g = 0;
          b = 255;
        } else {
          r = 255;
          g = 0;
          b = 255 - 255 * y;
        }
        ch.item(i).style.color = "#" + (0x1000000 | b | (g << 8) | (r << 16)).toString(16).substr(1);
      }
    }
    ++rainbowX;
  }
})(); //即時関数終了

(function () {
  let v = 0;
  setInterval(function () {
    v += 0.4;
    if (v > Math.PI) v = 0;
    document.querySelector("#jmptxt").style.top = -24 * Math.sin(v) + "px";
  }, 100);
})();
