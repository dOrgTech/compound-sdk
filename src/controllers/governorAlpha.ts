import Compound from "../Compound";
import { Controller } from "./core";
import { CompoundContract } from "../Compound/types";

export class GovernorAlpha extends Controller {
  private contract: CompoundContract;
  private address: string = "0x";
  private abi: string = "";
  constructor(protocol: Compound) {
    super(protocol);
    this.contract = this._protocol.getContract(this.address, this.abi);
  }

  public delegate() {
    // const txObject: any = {}
    // this._protocol.sendTx(this.contract, txObject)
  }

  public borrow() {}

  // all methods from governor alpha.sol
}
