import Compound from "../compound";
import { Controller } from "./core";
import {
  CompoundContract,
  Address,
  ITransaction,
  SignatureType,
  DelegatedAddress,
} from "../compound/types";
import { abi } from "../../contracts/comp";
import { getContractNonce } from "../compound/utils";

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
    this._protocol.sendTx(this.contract, txObject);
  }

  public delegateBySignature(address: Address) {
    const nonce: string = "0"; //await getContractNonce(this.contract);
    const expiry: number = Date.now() + 3600000;
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
    this._protocol.sendTx(this.contract, txObject, signatureObject);
  }
}
