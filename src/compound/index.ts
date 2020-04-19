import {
  EthereumProvider,
  CompoundContract,
  EthereumObject,
  Signer,
  ITransaction,
  TransactionResponse,
  SignatureType,
  JSONProvider,
} from "./types";
import { getSigner, estimateGas, signMessage } from "./utils";
import { Comp } from "../controllers/comp";
import { GovernorAlpha } from "../controllers/governorAlpha";

export default class Compound {
  private _provider: EthereumProvider;

  public governorAlpha(): GovernorAlpha {
    return new GovernorAlpha(this);
  }

  public comp(): Comp {
    return new Comp(this);
  }

  constructor(ethereumObject: EthereumObject | string) {
    if (typeof ethereumObject === "string") {
      this._provider = new JSONProvider(ethereumObject) as EthereumProvider;
    } else {
      this._provider = new EthereumProvider(ethereumObject as EthereumObject);
    }
  }

  public updateProvider(ethereumObject: EthereumObject): Compound {
    if (this._provider._web3Provider) {
      throw new Error("Provider already instantiated");
    }
    this._provider = new EthereumProvider(ethereumObject);
    return this;
  }

  public getContract(address: string, abi: string): CompoundContract {
    const account: Signer = getSigner(this._provider);
    return new CompoundContract(address, abi, account);
  }

  public async sendTx(
    contract: CompoundContract,
    tx: ITransaction,
    signatureObject: SignatureType | null = null
  ): Promise<TransactionResponse> {
    let gasLimit: number = 0;
    try {
      if (signatureObject) {
        const { paramsDefinition, paramsValues } = signatureObject;
        const signatureInformation: Array<string | number> = await signMessage(
          this._provider,
          contract,
          paramsDefinition,
          paramsValues
        );
        tx.args.push(...signatureInformation);
      }

      gasLimit = tx.opts?.gasLimit
        ? tx.opts.gasLimit
        : await estimateGas(contract, tx);

      const options = {
        ...tx.opts,
        gasLimit: gasLimit ? gasLimit : 1000000,
      };

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
