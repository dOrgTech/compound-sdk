import Compound from "../compound";
import { Controller } from "./core";
import { CompoundContract } from "../compound/types";
import abi from "../../contracts/comp.json";

export class Comp extends Controller {
  private contract: CompoundContract;
  private address: string = "0x1Fe16De955718CFAb7A44605458AB023838C2793"; // ropsten address
  private abi: string = JSON.stringify(abi);
  constructor(protocol: Compound) {
    super(protocol);
    this.contract = this._protocol.getContract(this.address, this.abi);
  }
}
