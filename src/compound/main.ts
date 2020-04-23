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
import { getNetworkName, decodeContents, getNetworkId } from "./utils";
import { getSigner, estimateGas, signMessage } from "./utils";
import { Comp } from "../controllers/comp";
import { GovernorAlpha } from "../controllers/governorAlpha";
import { IProtocol } from "./IProtocol";

export default class Compound implements IProtocol {
  private _provider: EthereumProvider;

  private async _setContractData(contractName: string) {
    const network = await getNetworkId(this._provider);
    const name = getNetworkName(network);
    const abiUrl = `https://api.github.com/repos/compound-finance/compound-protocol/contents/networks/${name}-abi.json`;
    const contracts = `https://api.github.com/repos/compound-finance/compound-protocol/contents/networks/${name}.json`;
    const { contractAddress, abi } = await decodeContents(
      contractName,
      abiUrl,
      contracts
    );
    return { contractAddress, abi };
  }

  constructor(ethereumObject: EthereumObject | string) {
    if (typeof ethereumObject === "string") {
      this._provider = new JSONProvider(ethereumObject) as EthereumProvider;
    } else {
      this._provider = new EthereumProvider(ethereumObject as EthereumObject);
    }
  }

  public async governorAlpha(): Promise<GovernorAlpha> {
    const { contractAddress, abi } = await this._setContractData(
      "GovernorAlpha"
    );
    return new GovernorAlpha(this, contractAddress, abi);
  }

  public async comp(): Promise<Comp> {
    const { contractAddress, abi } = await this._setContractData("Comp");
    return new Comp(this, contractAddress, abi);
  }

  public makeSendable(ethereumObject: EthereumObject): Compound {
    if (this._provider._web3Provider) {
      throw new Error("Provider already instantiated");
    }
    this._provider = new EthereumProvider(ethereumObject);
    return this;
  }

  public getContract(address: string, abi: Array<object>): CompoundContract {
    const account: Signer = getSigner(this._provider);
    return new CompoundContract(address, JSON.stringify(abi), account);
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
      throw new Error(error.message);
    }
  }
}
