import { EthereumProvider, CompoundContract, EthereumObject, JsonRpcSigner } from "./types";
import { getSigner } from "./utils";

import { Comp } from "../controllers/comp";
import { GovernorAlpha } from "../controllers/governorAlpha";

export default class Compound {
  private _provider: EthereumProvider;

  // public governorAlpha = new GovernorAlpha(this);
  // public comp = new Comp(this);

  constructor(ethereumObject: EthereumObject) {
    this._provider = new EthereumProvider(ethereumObject);
  }

  public getContract(address: string, abi: string) {
    const account: JsonRpcSigner = getSigner(this._provider);
    return new CompoundContract(address, abi, account);
  }

  public callTx() {}
  public sendTx() {}
  // public cToken() {}
}
