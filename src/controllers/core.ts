import { EthereumProvider } from "../compound/types";
import { IProtocol } from "../compound/IProtocol";

export abstract class Controller {
  protected _protocol: IProtocol;
  protected _provider: EthereumProvider;
  constructor(protocol: IProtocol, provider?: EthereumProvider) {
    this._protocol = protocol;
    this._provider = provider!;
  }
}
