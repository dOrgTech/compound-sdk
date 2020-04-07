import Compound from "../../src/Compound";
import { CompoundContract } from "../../src/Compound/types";

describe("Compound ", () => {
  it("Create protocol instance ", () => {
    const sendAsync = (
      request: any,
      callback: (error: any, response: any) => void
    ): void => {};
    const protocol = new Compound({ sendAsync });
    expect(protocol).toBeInstanceOf(Compound);
  });

  it("Should throw error because no provider was given ", () => {
    let failed = false;
    try {
      new Compound({});
    } catch (e) {
      failed = true;
    }
    expect(failed).toBeTruthy();
  });

  it("New contract instance ", () => {
    const sendAsync = (
      request: any,
      callback: (error: any, response: any) => void
    ): void => {};
    const protocol = new Compound({ sendAsync });
    const contractInstance = protocol.getContract("", "[]");
    expect(contractInstance).toBeInstanceOf(CompoundContract);
  });
});
