import Compound from "../compound";
import { Controller } from "./core";
import {
  CompoundContract,
  Address,
  ITransaction,
  SignatureType,
  DelegatedAddress,
  EthereumProvider,
} from "../compound/types";
import { abi } from "../../contracts/comp";
import { getContractNonce } from "../compound/utils";

export class Comp extends Controller {
  private contract: CompoundContract;
  private name: string = "Comp";
  private address: string = "0x1Fe16De955718CFAb7A44605458AB023838C2793"; // ropsten address
  constructor(protocol: Compound, provider: EthereumProvider) {
    super(protocol, provider);
    this.contract = this._protocol.getContract(this.address, abi);
  }

  public delegate(address: Address) {
    const txObject: ITransaction = {
      method: "delegate",
      args: [address],
    };
    this._protocol.sendTx(this.contract, txObject);
  }

  public async delegateBySignature(address: Address) {
    const nonce: number = await getContractNonce(this._provider, this.contract);
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
}
