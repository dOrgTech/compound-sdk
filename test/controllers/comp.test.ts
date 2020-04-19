import { Comp } from "../../src/controllers/comp";
import Compound from "../../src";
import { EthereumProvider } from "../../src/compound/types";

let protocol: Compound;
const ethereumObject: EthereumProvider = require("ganache-cli").provider();

beforeAll(() => {
  protocol = new Compound(ethereumObject);
});

describe("Comp ", () => {
  it("Get comp instance ", () => {
    const comp = protocol.comp();
    expect(comp).toBeInstanceOf(Comp);
  });

  // it('Delegate by signature', async () => {
  //   const comp = protocol.comp()
  //   const mock = jest.spyOn(ethereumObject, 'send');  // spy on send
  //   mock.mockImplementation((method: string, params: any) => Promise.resolve('0x9955af11969a2d2a7f860cb00e6a00cfa7c581f5df2dbe8ea16700b33f4b4b9b69f945012f7ea7d3febf11eb1b78e1adc2d1c14c2cf48b25000938cc1860c83e01'));  //
  //   const response = await comp.delegateBySignature('0x61FfE691821291D02E9Ba5D33098ADcee71a3a17')
  //   expect(response.hash).toMatch('0x')
  // })
});
