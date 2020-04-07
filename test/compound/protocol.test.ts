import Compound from "../../src/compound";
import { CompoundContract } from "../../src/compound/types";

describe("Compound ", () => {
  it("Create protocol instance ", () => {
    const sendAsync = (
      request: any,
      callback: (error: any, response: any) => void
    ): void => {};
    const send = (
      request: any,
      callback: (error: any, response: any) => void
    ): void => {};

    const protocol = new Compound({ send, sendAsync });
    expect(protocol).toBeInstanceOf(Compound);
  });

  it("Should throw error because no provider was given ", async () => {
    expect(() => new Compound({})).toThrowError("invalid web3Provider");
  });

  it("New contract instance ", () => {
    const sendAsync = (
      request: any,
      callback: (error: any, response: any) => void
    ): void => {};
    const protocol = new Compound({ sendAsync });
    const contractInstance = protocol.getContract(
      "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      "[]"
    );
    expect(contractInstance).toBeInstanceOf(CompoundContract);
    expect(contractInstance.address).toEqual(
      "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
    );
  });
});
