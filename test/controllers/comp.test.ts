import { Comp } from "../../src/controllers/comp";
import Compound from "../../src";
import { EthereumProvider, CompoundContract } from "../../src/compound/types";
import { abi, byteCode } from "../../contracts/comp";
import * as utils from "../../src/compound/utils";

let protocol: Compound;
let provider: EthereumProvider;
const ethereumObject: EthereumProvider = require("ganache-cli").provider();

beforeAll(async () => {
  provider = new EthereumProvider(ethereumObject);
  const contract: CompoundContract = await utils.deployContract(
    abi,
    byteCode,
    utils.getSigner(provider),
    ["0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"]
  );
  jest
    .spyOn(utils, "decodeContents")
    .mockResolvedValue({ abi, contractAddress: contract.address });
  jest
    .spyOn(utils, "signMessage")
    .mockResolvedValue([
      28,
      "0x0ebb99bed746bf7945c9ef5991807dcdf004932984fd43984b2e3f0ba710e7c2",
      "0x4690636cf72643119bf8b12202bb51f5758b5168b64747cabac8473ed8e8957d",
    ]);
  protocol = new Compound(ethereumObject);
});

describe("Comp ", () => {
  it("Get comp instance ", async () => {
    const comp = await protocol.comp();
    expect(comp).toBeInstanceOf(Comp);
  });

  it("Delegate ", async () => {
    const comp = await protocol.comp();
    const response = await comp.delegate(
      "0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"
    );
    expect(response.hash).toMatch("0x");
  });

  it("Delegate by signature", async () => {
    const comp = await protocol.comp();
    const response = await comp.delegateBySignature(
      "0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"
    );
    expect(response.hash).toMatch("0x");
  });
});
