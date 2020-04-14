import Compound from "../compound";
import { Controller } from "./core";
import { CompoundContract, Address, ITransaction } from "../compound/types";
import { abi } from "../../contracts/comp";

export class Comp extends Controller {
  private contract: CompoundContract;
  private address: string = "0x1Fe16De955718CFAb7A44605458AB023838C2793"; // ropsten address
  constructor(protocol: Compound) {
    super(protocol);
    this.contract = this._protocol.getContract(this.address, abi);
  }

  public delegate(address: Address) {
    const txObject: ITransaction = {
      method: "delegate",
      args: [address],
    };
    this._protocol.sendTx(this.contract, txObject, true);
  }
}
