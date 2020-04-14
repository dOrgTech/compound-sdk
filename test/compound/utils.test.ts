import {
  getAccount,
  getSigner,
  estimateGas,
  toEther,
  deployContract,
} from "../../src/compound/utils";
import {
  EthereumProvider,
  JsonRpcSigner,
  Address,
  CompoundContract,
  ITransaction,
} from "../../src/compound/types";
import { abi, byteCode } from "../../contracts/comp";

let provider: EthereumProvider;
const ethereumObject = require("ganache-cli").provider();
beforeAll(() => {
  provider = new EthereumProvider(ethereumObject);
});

describe("Utils ", () => {
  it("Get account ", async () => {
    const account: Address = await getAccount(provider);
    expect(account).toMatch("0x");
  });

  it("Get signer ", () => {
    const signer: JsonRpcSigner = getSigner(provider);
    expect(signer).toBeInstanceOf(JsonRpcSigner);
  });

  it("From wei to ether ", () => {
    const ether: string = toEther("1000000000000000000");
    expect(ether).toBe("1.0");
  });

  it("Get gas estimation ", async () => {
    const contract: CompoundContract = await deployContract(
      abi,
      byteCode,
      getSigner(provider),
      ["0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"]
    );
    const tx: ITransaction = {
      method: "delegate",
      args: ["0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"],
    };
    const gas: Number = await estimateGas(contract, tx);
    expect(gas).toBeGreaterThan(10000);
  });
});
