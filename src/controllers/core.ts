import Compound from "../Compound";

export abstract class Controller {
  protected _protocol: Compound;
  constructor(protocol: Compound) {
    this._protocol = protocol;
  }
}