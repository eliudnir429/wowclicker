export class Item {
  constructor() {
    this._rate = 0;
    this._cost = 0;
    this._ratio = 0.0;
  }

  increment() {
    this._own++;
    this._cost = this._cost * this._ratio;
    return this._cost;
  }

  getStatus(item) {
    return this.item;
  }

  getNextCost(own) {
    let cost = this._cost;
    let rate = this._ratio;
    for (let index = 0; index < own; index++) {
      cost += cost * rate;
    }
    return Math.floor(cost * 10) / 10;
  }

  getWps(own) {
    return this._rate * own;
  }
}
