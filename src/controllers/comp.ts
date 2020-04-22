import { Controller } from "./core";
import {
  CompoundContract,
  Address,
  ITransaction,
  SignatureType,
  DelegatedAddress,
} from "../compound/types";
import { IProtocol } from "../compound/IProtocol";

export class Comp extends Controller {
  private contract: CompoundContract;
  constructor(protocol: IProtocol, address: string, abi: Array<any>) {
    super(protocol);
    this.contract = this._protocol.getContract(address, abi);
  }

  public delegate(address: Address) {
    const txObject: ITransaction = {
      method: "delegate",
      args: [address],
    };
    return this._protocol.sendTx(this.contract, txObject);
  }

  public async delegateBySignature(delegatee: Address) {
    const contractNonce = await this.contract.nonces(this.contract.address);
    const nonce = Number(contractNonce);
    const expiry: number = Date.now() + 3600000; // expires in one (1) hour
    const txObject: ITransaction = {
      method: "delegateBySig",
      args: [delegatee, nonce, expiry],
    };
    const params: object = {
      delegatee,
      nonce,
      expiry,
    };
    const signatureObject: SignatureType = {
      paramsDefinition: DelegatedAddress,
      paramsValues: params,
    };
    return this._protocol.sendTx(this.contract, txObject, signatureObject);
  }

  public getCurrentVotes(address: Address) {
    const txObject: ITransaction = {
      method: "getCurrentVotes",
      args: [address],
    };
    return this._protocol.callTx(this.contract, txObject);
  }

  public getPriorVotes(account: Address, blockNumber: number) {
    const txObject: ITransaction = {
      method: "getPriorVotes",
      args: [account, blockNumber],
    };
    return this._protocol.callTx(this.contract, txObject);
  }
}
