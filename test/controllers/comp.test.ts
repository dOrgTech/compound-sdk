import { provider } from "ganache-cli";
import { spy, when, instance, deepEqual } from "ts-mockito";
import { Comp } from "../../src/controllers/comp";
import Compound from "../../src";
import { EthereumProvider, CompoundContract } from "../../src/compound/types";
import { abi, byteCode } from "../../contracts/comp";
import { getSigner, deployContract } from "../../src/compound/utils";

let protocol: Compound;
const ethereumObject: EthereumProvider = provider();

describe("Comp ", () => {
  beforeAll(async () => {
    // await deployContract(
    //   abi,
    //   byteCode,
    //   getSigner(provider),
    //   ["0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"]
    // );
    // const spiedFoo: EthereumProvider = spy(ethereumObject);
    // when(spiedFoo.send("eth_signTypedData_v3", deepEqual([]) )).thenResolve(
    //   "0x9955af11969a2d2a7f860cb00e6a00cfa7c581f5df2dbe8ea16700b33f4b4b9b69f945012f7ea7d3febf11eb1b78e1adc2d1c14c2cf48b25000938cc1860c83e01"
    // );
    protocol = new Compound(ethereumObject);
  });
  it("Get comp instance ", () => {
    const comp = protocol.comp();
    expect(comp).toBeInstanceOf(Comp);
  });

  // it("Delegate by signature", async () => {
  //   const comp = protocol.comp();
  //   const response = await comp.delegateBySignature(
  //     "0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"
  //   );
  //   expect(response.hash).toMatch("0x");
  // });
});
