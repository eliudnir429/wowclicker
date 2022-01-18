import { Item } from "./Item.js";

export class O extends Item {
  constructor() {
    super();
    this._rate = 1;
    this._cost = 500;
    this._ratio = 0.05;
  }
}
