import { IProtocol } from "../compound/IProtocol";

export abstract class Controller {
  protected _protocol: IProtocol;
  constructor(protocol: IProtocol) {
    this._protocol = protocol;
  }
}
