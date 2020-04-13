import {
  EthereumProvider,
  CompoundContract,
  EthereumObject,
  JsonRpcSigner,
  ITransaction,
  TransactionResponse,
} from "./types";
import { getSigner, estimateGas } from "./utils";

import { Comp } from "../controllers/comp";
import { GovernorAlpha } from "../controllers/governorAlpha";

export default class Compound {
  private _provider: EthereumProvider;

  constructor(ethereumObject: EthereumObject) {
    this._provider = new EthereumProvider(ethereumObject);
  }

  // public cToken() {}

  public governorAlpha() {
    return new GovernorAlpha(this);
  }

  public comp() {
    return new Comp(this);
  }

  public getContract(address: string, abi: string) {
    const account: JsonRpcSigner = getSigner(this._provider);
    return new CompoundContract(address, abi, account);
  }

  public async sendTx(
    contract: CompoundContract,
    tx: ITransaction
  ): Promise<TransactionResponse> {
    let gasLimit: number = 0;
    if (tx.opts?.gasLimit) {
      gasLimit = tx.opts.gasLimit;
    } else {
      try {
        gasLimit = await estimateGas(contract, tx);
      } catch (error) {
        throw new Error(error.message);
      }
    }

    const options = {
      ...tx.opts,
      gasLimit: gasLimit ? gasLimit : 1000000,
    };

    try {
      const response = await contract[tx.method](...tx.args, options);
      await response.wait();
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async callTx(
    contract: CompoundContract,
    tx: ITransaction
  ): Promise<any> {
    try {
      return await contract[tx.method](...tx.args);
    } catch (error) {
      throw new Error(error);
    }
  }
}
