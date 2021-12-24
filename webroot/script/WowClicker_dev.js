console.log("WowClicker.js: loaded");

export class WowClicker {
  constructor() {
    console.log("WowClicker initialized");
  }

  action() {
    const formElement = document.querySelector("#clicker-form");
    let total = 0;
    let items = {
      autoclicker: {
        own: 0,
        cost: 0,
        ratio: 0.02,
      },
      o: {
        own: 0,
        cost: 0,
        ratio: 0.05,
      },
      tree: {
        own: 0,
        cost: 0,
        ratio: 0.10,
        plant: 0,
        ascend: 0,
        maturity: 0,
        harvest: 3,
        view: "",
      },
      nekochan: {
        own: 0,
 	cost: 0,
        ratio: 0.01,
      }
    };
    let costs = {
      autoclicker: 50,
      o: 500,
      tree: 1000,
      nekochan: 70000,
    };
    let wps = 0;

    // load cookie;
    let c = parseInt(this.getCookie("count"));
    if (!isNaN(c)) total = c;
    let str = this.getCookie("items");
    if (str) {
      items = JSON.parse(str);
    } else {
      items = this.loadOwn(items);
    }
    // initialize
    for (let item in items) {
      items[item]["cost"] = costs[item];
      for (let i = 0; i < items[item]["own"]; i++) {
        this.refreshCost(items, item);
      }
    }
    wps = this.refreshWps(items);
    this.refreshView(total, wps, items);

    setInterval(() => {
      total += wps;
      this.refreshView(total, wps, items);
    }, 1000);

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if (event.submitter.id === "add-total") {
        total += 1 + items.o.own;
      } else if (
        event.submitter.id === "add-autoclicker" &&
        items.autoclicker.cost <= total
      ) {
        total -= items.autoclicker.cost;
        items.autoclicker.own += 1;
        this.refreshCost(items, "autoclicker");
      } else if (event.submitter.id === "add-o" && items.o.cost <= total) {
        total -= items.o.cost;
        items.o.own += 1;
        this.refreshCost(items, "o");
      } else if (
        event.submitter.id === "add-tree" &&
        items.tree.cost <= total
      ) {
        total -= items.tree.cost;
        items.tree = this.mature_tree(items.tree);
        this.refreshCost(items, "tree");
      } else if (
        event.submitter.id === "add-nekochan" &&
        items.nekochan.cost <= total
      ) {
        total -= items.nekochan.cost;
        items.nekochan.own += 1;
      }
      wps = this.refreshWps(items);
      this.refreshView(total, wps, items);
      this.saveWow(total, items);
    });
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

  refreshView(total, wps, items) {
    const totalElement = document.querySelector("#status-total");
    const wpsElement = document.querySelector("#status-wps");
    const ownAutoclickerElement = document.querySelector("#own-autoclicker");
    const costAutoclickerElement = document.querySelector("#cost-autoclicker");
    const ownOElement = document.querySelector("#own-o");
    const costOElement = document.querySelector("#cost-o");
    const addElement = document.querySelector("#add-total");
    const costTree = document.querySelector("#cost-tree");
    const ascendTree = document.querySelector("#ascend-tree");
    const matureTree = document.querySelector("#mature-tree");
    const plant = document.querySelector("#plant");

    const ex_o = this.extraO(items.o.own);
    this.updateHTML("wow!" + total.toLocaleString(), totalElement);
    this.updateHTML("wo" + ex_o + "w!", addElement);
    this.updateHTML("WpS: " + wps.toLocaleString(), wpsElement);
    this.updateHTML(
      "owned: " + items.autoclicker.own.toLocaleString(),
      ownAutoclickerElement
    );
    this.updateHTML(
      "cost: " + items.autoclicker.cost.toLocaleString() + " wow!",
      costAutoclickerElement
    );
    this.updateHTML("owned: " + items.o.own.toLocaleString(), ownOElement);
    this.updateHTML(
      "cost: " + items.o.cost.toLocaleString() + " wow!",
      costOElement
    );
    this.updateHTML("cost: " + items.tree.cost.toLocaleString(), costTree);
    this.updateHTML(
      "ascend: " + items.tree.ascend.toLocaleString(),
      ascendTree
    );
    const harvest = items.tree.harvest + items.tree.ascend;
    this.updateHTML(
      "mature: " +
        items.tree.maturity.toLocaleString() +
        "/" +
        harvest.toLocaleString(),
      matureTree
    );
    this.updateHTML(items.tree.view.toLocaleString(), plant);
  }

  updateHTML(msg, element) {
    element.innerHTML = msg;
  }

  refreshWps(items) {
    let base = 0;
    let bonus = 0;
    let wps = 0;
    base = items.autoclicker.own / 10;
    bonus = base * (items.tree.ascend / 10);
    return wps = base + bonus;
  }

  extraO(num) {
    let str = "";
    for (let i = 0; i < num; i++) {
      str += "o";
    }
    return str;
  }

  loadOwn(items) {
    let c;
    c = parseInt(this.getCookie("autoclicker"));
    if (!isNaN(c)) items.autoclicker.own = c;
    c = parseInt(this.getCookie("o"));
    if (!isNaN(c)) items.o.own = c;
    return items;
  }

  refreshCost(items, key) {
    items[key]["cost"] =
      items[key]["cost"] + items[key]["cost"] * items[key]["ratio"];
  }

  mature_tree(tree) {
    tree.own += 1;
    if (tree.plant === 0) {
      tree.plant += 1;
      tree.view += "w";
    } else if (tree.maturity < tree.harvest + tree.ascend) {
      tree.maturity += 1;
      tree.view += "o";
    } else if (1) {
      tree.plant = 0;
      tree.maturity = 0;
      tree.ascend += 1;
      tree.view = "";
    }
    return tree;
  }
}
