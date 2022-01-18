import { Player } from "./Player.js";
import { Autoclicker } from "./item/Autoclicker.js";
import { O } from "./item/O.js";
import { Tree } from "./item/Tree.js";
import { Nekochan } from "./item/Nekochan.js";

console.log("WowClicker.js: loaded");

export class WowClicker {
  constructor() {
    console.log("[WowClicker]Initialized");
    this.player = new Player(this.loadWowData("wowclicker"));
    this.items = {
      autoclicker: new Autoclicker(),
      o: new O(),
      tree: new Tree(),
      nekochan: new Nekochan(),
    };
    this.refreshView();
  }

  action() {
    // Processing every second
    setInterval(() => {
      this.player.addWowByWps();
      this.refreshView();
    }, 1000);

    // Click event
    const addWow = document.querySelector("#addWow");
    addWow.addEventListener("submit", (event) => {
      console.log("[WowClicker.action]Wow!");
      event.preventDefault();
      this.player.inclementWow();

      // Refresh
      this.refreshView();
      this.saveWowData(this.player);
    });

    // Add item event
    const addItemForm = document.querySelector("#addItem");
    addItemForm.addEventListener("submit", (event) => {
      const itemname = event.submitter.id;
      console.log("[WowClicker.action]Do click event action");
      event.preventDefault();
      this.player.addItem(itemname, this.items[itemname].getNextCost(this.player.items[itemname]));

      // Refresh
      this.updateWps();
      this.refreshView();
    });

    // Legacy data
    const legacyLoad = document.querySelector("#legacyLoad");
    legacyLoad.addEventListener("submit", (event) => {
      console.log("[WowClicker.action]Restore legacy data");
      event.preventDefault();
      const ls = this.loadLegacyData();
      if (ls) this.restoreLegacyData(ls);

      // Refresh
      this.updateWps();
      this.refreshView();
    });
  }

  updateWps() {
    let wps = 0;
    Object.keys(this.player.items).forEach((itemname) => {
      wps += this.items[itemname].getWps(this.player.items[itemname]);
    });
    this.player.wps = wps;
  }

  refreshView() {
    // Refresh wow status
    const total = document.querySelector("#status-total");
    const wps = document.querySelector("#status-wps");
    this.updateHTML("wow!" + this.player.getVal("total").toLocaleString(), total);
    this.updateHTML("WpS: " + this.player.getVal("wps").toLocaleString(), wps);

    // Refresh items
    Object.keys(this.items).forEach((itemname) => {
      const obj = {
        own: document.querySelector("#" + itemname + "-own"),
        cost: document.querySelector("#" + itemname + "-cost"),
      };
      this.updateHTML("owned: " + this.player.getOwn(itemname).toLocaleString(), obj.own);
      this.updateHTML("cost: " + this.items[itemname].getNextCost(this.player.items[itemname]).toLocaleString() + " wow!", obj.cost);
    });
  }

  updateHTML(msg, element) {
    element.innerHTML = msg;
  }

  saveWowData(data) {
    console.log("[WowClicker.saveWowData]Saving play data");
    const sel = JSON.stringify(data);
    document.cookie = "wowclicker=" + sel + "; max-age=31536000";
    console.log("[WowClicker.saveWowData]OK Done");
  }

  loadWowData(key) {
    const str = this.getCookie(key);
    if (str) {
      console.log("[WowClicker.saveWowData]Loading play data");
      return JSON.parse(str);
    } else {
      console.log("[WowClicker.saveWowData]No data found");
      return null;
    }
  }

  loadLegacyData() {
    const sc = this.getCookie("count");
    const si = this.getCookie("items");
    if (sc || si) {
      console.log("[WowClicker.saveWowData]Legacy data found");
      const obj = {
        count: JSON.parse(sc),
        items: JSON.parse(si),
      };
      return obj;
    } else {
      console.log("[WowClicker.saveWowData]No data found");
      return null;
    }
  }

  restoreLegacyData(data) {
    this.player.setTotal(parseInt(data.count));
    Object.keys(this.player.items).forEach((itemname) => {
      this.player.setItem(itemname,data.items[itemname].own);
    })
  }

  test() {
    const items = {
      autoclicker: { own: 1, cost: 51, ratio: 0.02 },
      o: { own: 0, cost: 500, ratio: 0.05 },
      tree: { own: 0, cost: 1000, ratio: 0.1, plant: 0, ascend: 0, maturity: 0, harvest: 3, view: "", status: "草生える" },
      nekochan: { own: 0 },
    };
    document.cookie = "count=1000; max-age=31536000";
    document.cookie = "items=" + JSON.stringify(items) + "; max-age=31536000";
  }

  /******************************/

  legacy() {
    // load cookie;
    let c = parseInt(this.getCookie("count"));
    if (!isNaN(c)) total = c;
    let str = this.getCookie("items");
    if (str) {
      items = JSON.parse(str);
    } else {
      items = this.loadOwn(items);
    }
  }

  getCookie(name) {
    let result = null;
    let cookieName = name + "=";
    let allcookies = document.cookie;
    let position = allcookies.indexOf(cookieName);
    if (position != -1) {
      let startIndex = position + cookieName.length;
      let endIndex = allcookies.indexOf(";", startIndex);
      if (endIndex == -1) {
        endIndex = allcookies.length;
      }
      result = decodeURIComponent(allcookies.substring(startIndex, endIndex));
    }
    return result;
  }
  saveWow(total, items) {
    document.cookie = "count=" + total + "; max-age=31536000";
    document.cookie = "items=" + JSON.stringify(items) + "; max-age=31536000";
  }

  extraO(num) {
    let str = "";
    for (let i = 0; i < num; i++) {
      str += "o";
    }
    return str;
  }

  refreshCost(items, key) {
    items[key]["cost"] = items[key]["cost"] + items[key]["cost"] * items[key]["ratio"];
  }

  mature_tree(tree) {
    tree.own += 1;
    if (tree.plant === 0) {
      tree.plant += 1;
      tree.view += "w";
      tree.status = "草生える";
    } else if (tree.maturity < tree.harvest + tree.ascend) {
      tree.maturity += 1;
      tree.view += "o";
      if (tree.maturity === tree.harvest + tree.ascend) tree.status = "刈る";
    } else if (1) {
      tree.plant = 0;
      tree.maturity = 0;
      tree.ascend += 1;
      tree.view = "";
      tree.status = "草生やす";
    }
    return tree;
  }

  setTreeStatus(tree) {
    if (tree.plant === 0) {
      return "草生える";
    } else if (tree.maturity < tree.harvest + tree.ascend) {
      if (tree.maturity === tree.harvest + tree.ascend) return "刈る";
    } else {
      return "草生やす";
    }
  }
}
