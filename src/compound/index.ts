import { Web3Provider, JSONProvider, NewContract } from "./types";

import { Comp } from "../comp";
import { GovernorAlpha } from "../governorAlpha";

export default class Compound {
  private _provider: Web3Provider;

  constructor(provider: string) {
    this._provider = new JSONProvider(provider);
  }

  private sendTx() {}

  private newContract(address: string, abi: string) {
    return new NewContract(address, abi);
  }

  private callMethod() {}

  // public governorAlpha() {}
  // public comp() {}
  // public cToken() {}
}
