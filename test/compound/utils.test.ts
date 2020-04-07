import { getAccount, getSigner, estimateGas } from "../../src/compound/utils";
import {
  EthereumProvider,
  JsonRpcSigner,
  Address,
  CompoundContract,
  ITransaction,
} from "../../src/Compound/types";
import Compound from "../../src/compound";

let provider: EthereumProvider;
beforeAll(() => {
  const sendAsync = (
    request: any,
    callback: (error: any, response: any) => void
  ): void => {};
  provider = new EthereumProvider({path: 'localhost:8545', sendAsync }, 5777);
});

describe("Utils ", () => {
  // it("Get account ", async () => {
  //   const account: Address = await getAccount(provider);
  //   expect(account).toBeInstanceOf(String);
  // });

  it("Get signer ", () => {
    const signer: JsonRpcSigner = getSigner(provider);
    expect(signer).toBeInstanceOf(JsonRpcSigner);
  });

  // it("Get gas estimation ", async () => {
  //   const address = "";
  //   const abi = JSON.stringify([
  //     {
  //       constant: false,
  //       inputs: [],
  //       name: "delegate",
  //       outputs: [],
  //       payable: false,
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //   ]);
  //   const protocol = new Compound(provider);
  //   const contract: CompoundContract = protocol.getContract(address, abi);
  //   const tx: ITransaction = {
  //     contract,
  //     method: "delegate",
  //     args: [],
  //   };
  //   const gas = await estimateGas(contract, tx);
  //   expect(gas).toBeInstanceOf(Number);
  // });
});
