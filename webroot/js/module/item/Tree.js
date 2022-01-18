import { Item } from "./Item.js";

export class Tree extends Item {
  constructor() {
    super();
    this._rate = 0;
    this._cost = 1000;
    this._ratio = 0.10;
  }
}
