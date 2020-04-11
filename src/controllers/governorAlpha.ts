import Compound from "../compound";
import { Controller } from "./core";
import { CompoundContract, ITransaction } from "../compound/types";
import abi from "../../contracts/governorAlpha.json";

export class GovernorAlpha extends Controller {
  private contract: CompoundContract;
  private address: string = "0xc5BFEd3Bb38a3C4078d4f130F57Ca4c560551d45"; // ropsten address
  private abi: string = JSON.stringify(abi);
  constructor(protocol: Compound) {
    super(protocol);
    this.contract = this._protocol.getContract(this.address, this.abi);
  }

  // all methods from governor alpha.sol

  public state(proposalId: number) {
    const txObject: ITransaction = {
      method: "state",
      args: [proposalId],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

  public castVote(proposalId: number, support: boolean) {
    const txObject: ITransaction = {
      method: "castVote",
      args: [proposalId, support],
    };
    return this._protocol.sendTx(this.contract, txObject);
  }

  // public delegate() {
  //   const txObject: any = {};
  //   this._protocol.sendTx(this.contract, txObject);
  // }

  // public borrow() {}
}
