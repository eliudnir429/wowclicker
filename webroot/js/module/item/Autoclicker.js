import { Item } from "./Item.js";

export class Autoclicker extends Item{
  constructor() {
    super();
    this._rate = 0.1;
    this._cost = 50;
    this._ratio = 0.02;
  }
}
