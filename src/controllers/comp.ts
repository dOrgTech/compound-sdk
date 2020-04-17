import Compound from "../compound";
import { Controller } from "./core";
import { CompoundContract, Address, ITransaction } from "../compound/types";
import { abi } from "../../contracts/comp";
import { getNonce } from "../compound/utils";

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
    this._protocol.sendTx(this.contract, txObject, false);
  }

  public async delegateBySignature(address: Address) {
    const nonce: string = await getNonce(this.contract);
    const expiry: number = Date.now() + 3600000;
    const txObject: ITransaction = {
      method: "delegateBySignature",
      args: [address, nonce, expiry],
    };
    this._protocol.sendTx(this.contract, txObject, true);
  }
}
