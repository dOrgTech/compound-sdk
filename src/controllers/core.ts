import Compound from "../compound";
import { EthereumProvider } from "../compound/types";
import {
  getNetworkName,
  decodeContents,
  getNetworkId,
} from "../compound/utils";

export abstract class Controller {
  protected _protocol: Compound;
  protected _provider: EthereumProvider;
  constructor(protocol: Compound, provider?: EthereumProvider) {
    this._protocol = protocol;
    this._provider = provider!;
  }

  // private async getAddressAndABI() {
  //   const network = await getNetworkId(this._provider)
  //   const name = getNetworkName(network);
  //   const abiUrl = `https://api.github.com/repos/compound-finance/compound-protocol/contents/networks/${name}-abi.json`;
  //   const contracts = `https://api.github.com/repos/compound-finance/compound-protocol/contents/networks/${name}.json`;
  //   const { contractAddress, abi } = await decodeContents(abiUrl, contracts)
  //   return { contractAddress, abi };
  // }

  // protected setContractData() {
  //   const { address, data } = this.getAddressAndABI()
  // }
}
