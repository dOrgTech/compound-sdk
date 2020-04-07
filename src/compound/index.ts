import { EthereumProvider, CompoundContract, EthereumObject } from "./types";

import { Comp } from "../controllers/comp";
import { GovernorAlpha } from "../controllers/governorAlpha";

export default class Compound {
  private _provider: EthereumProvider;

  public governorAlpha = new GovernorAlpha(this);
  public comp = new Comp(this);

  constructor(ethereumObject: EthereumObject) {
    this._provider = new EthereumProvider(ethereumObject);
  }

  public getContract(address: string, abi: string) {
    return new CompoundContract(address, abi, this._provider.getSigner());
  }
  
  public callTx() {}
  public sendTx() {}
  // public cToken() {}
}
