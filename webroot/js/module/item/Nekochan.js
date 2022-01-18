import { Item } from "./Item.js";

export class Nekochan extends Item{
  constructor() {
    super();
    this._rate = 0;
    this._cost = 70000;
    this._ratio = 0.2;
  }
}
