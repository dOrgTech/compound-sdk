import { IProtocol } from "../compound/IProtocol";
import { Controller } from "./core";
import {
  CompoundContract,
  ITransaction,
  Address,
  CastVote,
  SignatureType,
} from "../compound/types";

export class GovernorAlpha extends Controller {
  private contract: CompoundContract;
  constructor(protocol: IProtocol, address: string, abi: Array<any>) {
    super(protocol);
    this.contract = this._protocol.getContract(address, abi);
  }

  public quorumVotes() {
    const txObject: ITransaction = {
      method: "quorumVotes",
      args: [],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

  public proposalThreshold() {
    const txObject: ITransaction = {
      method: "proposalThreshold",
      args: [],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

  public proposalMaxOperations() {
    const txObject: ITransaction = {
      method: "proposalMaxOperations",
      args: [],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

  public votingDelay() {
    const txObject: ITransaction = {
      method: "votingDelay",
      args: [],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

  public votingPeriod() {
    const txObject: ITransaction = {
      method: "votingPeriod",
      args: [],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

  public propose(
    addresses: Array<Address>,
    values: Array<number>,
    signatures: Array<string>,
    calldatas: Array<string>,
    description: string
  ) {
    const txObject: ITransaction = {
      method: "propose",
      args: [addresses, values, signatures, calldatas, description],
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

  public execute(proposalId: number) {
    const txObject: ITransaction = {
      method: "execute",
      args: [proposalId],
    };
    return this._protocol.sendTx(this.contract, txObject);
  }

  public cancel(proposalId: number) {
    const txObject: ITransaction = {
      method: "cancel",
      args: [proposalId],
    };
    return this._protocol.sendTx(this.contract, txObject);
  }

  public getActions(proposalId: number) {
    const txObject: ITransaction = {
      method: "getActions",
      args: [proposalId],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

  public getReceipt(proposalId: number, voter: Address) {
    const txObject: ITransaction = {
      method: "getReceipt",
      args: [proposalId, voter],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

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
    return this._protocol.sendTx(this.contract, txObject, signatureObject);
  }
}
