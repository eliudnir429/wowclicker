export class Player {
  constructor(savedata = null) {
    this.total = 9999;
    this.items = {
      autoclicker: 0,
      o: 0,
      tree: 0,
      nekochan: 0,
    };
    this.wps = 0;
    if (savedata !== null) {
      this.total = savedata.total;
      this.wps = savedata.wps;
      Object.keys(savedata.items).forEach((itemname) => {
        this.items[itemname] = savedata.items[itemname];
      });
    }
  }

  setVal(item, val) {
    return (this[item] = val);
  }

  getVal(item) {
    return this[item];
  }

  addWowByWps() {
    return (this.total += this.wps);
  }

  getOwn(itemname) {
    return this.items[itemname];
  }

  addItem(itemname, cost) {
    if (this.total >= cost) {
      this.items[itemname]++;
      this.total -= cost;
    }
  }

  inclementWow() {
    this.total++;
  }

  setTotal(num) {
    this.total = num;
  }

  setItem(itemname, num) {
    this.items[itemname] = num;
  }
}
