import Compound from "../compound";
import { Controller } from "./core";
import {
  CompoundContract,
  ITransaction,
  Address,
  CastVote,
  SignatureType,
} from "../compound/types";
import { abi } from "../../contracts/governorAlpha";

export class GovernorAlpha extends Controller {
  private contract: CompoundContract;
  private address: string = "0xc5BFEd3Bb38a3C4078d4f130F57Ca4c560551d45"; // ropsten address
  constructor(protocol: Compound) {
    super(protocol);
    this.contract = this._protocol.getContract(this.address, abi);
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

  public queue(proposalId: number) {
    const txObject: ITransaction = {
      method: "queue",
      args: [proposalId],
    };
    return this._protocol.sendTx(this.contract, txObject);
  }

  public propose(
    address: Array<Address>,
    values: Array<number>,
    signatures: Array<string>,
    calldatas: Array<string>,
    description: string
  ) {
    const txObject: ITransaction = {
      method: "propose",
      args: [address, values, signatures, calldatas, description],
    };
    return this._protocol.sendTx(this.contract, txObject);
  }

  public castVoteBySignature(proposalId: number, support: boolean) {
    const txObject: ITransaction = {
      method: "castVoteBySig",
      args: [proposalId, support],
    };
    const params: object = {
      proposalId,
      support,
    };
    const signatureObject: SignatureType = {
      paramsDefinition: CastVote,
      paramsValues: params,
    };
    this._protocol.sendTx(this.contract, txObject, signatureObject);
  }

  // public borrow() {}
}
