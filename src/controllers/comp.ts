import { Controller } from "./core";
import {
  CompoundContract,
  Address,
  ITransaction,
  SignatureType,
  DelegatedAddress,
  EthereumProvider,
} from "../compound/types";
import { getContractNonce } from "../compound/utils";
import { IProtocol } from "../compound/IProtocol";

export class Comp extends Controller {
  private contract: CompoundContract;
  constructor(
    protocol: IProtocol,
    provider: EthereumProvider,
    address: string,
    abi: Array<any>
  ) {
    super(protocol, provider);
    this.contract = this._protocol.getContract(address, JSON.stringify(abi));
  }

  public delegate(address: Address) {
    const txObject: ITransaction = {
      method: "delegate",
      args: [address],
    };
    return this._protocol.sendTx(this.contract, txObject);
  }

  public async delegateBySignature(address: Address) {
    const nonce: number = await getContractNonce(this._provider, this.contract);
    console.log(nonce);
    const expiry: number = Date.now() + 3600000; // expires in one (1) hour
    const txObject: ITransaction = {
      method: "delegateBySig",
      args: [address, nonce, expiry],
    };
    const params: object = {
      address,
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
