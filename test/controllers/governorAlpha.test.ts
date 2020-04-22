import { GovernorAlpha } from "../../src/controllers/governorAlpha";
import Compound from "../../src";

let protocol: Compound;
const ethereumObject = require("ganache-cli").provider();

beforeAll(() => {
  protocol = new Compound(ethereumObject);
});

describe("Governor alpha ", () => {
  it("Can be initialized ", async () => {
    const gov = await protocol.governorAlpha();
    expect(gov).toBeInstanceOf(GovernorAlpha);
  });
});
