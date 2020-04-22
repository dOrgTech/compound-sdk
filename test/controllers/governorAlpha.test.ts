import { GovernorAlpha } from "../../src/controllers/governorAlpha";
import Compound from "../../src";
import { abi, byteCode } from "../../contracts/governorAlpha";
import {
  BigNumber,
  EthereumProvider,
  CompoundContract,
} from "../../src/compound/types";
import * as utils from "../../src/compound/utils";

let protocol: Compound;
let provider: EthereumProvider;
const ethereumObject = require("ganache-cli").provider();

beforeAll(async () => {
  provider = new EthereumProvider(ethereumObject);
  const providerAccount = await utils.getAccount(provider);
  const contract: CompoundContract = await utils.deployContract(
    abi,
    byteCode,
    utils.getSigner(provider),
    [
      "0x61FfE691821291D02E9Ba5D33098ADcee71a3a17",
      "0x61FfE691821291D02E9Ba5D33098ADcee71a3a17",
      providerAccount,
    ]
  );
  jest
    .spyOn(utils, "decodeContents")
    .mockResolvedValue({ abi, contractAddress: contract.address });
  protocol = new Compound(ethereumObject);
});

describe("Governor alpha ", () => {
  it("Can be initialized ", async () => {
    const gov = await protocol.governorAlpha();
    expect(gov).toBeInstanceOf(GovernorAlpha);
  });

  it("Quorum votes ", async () => {
    const comp = await protocol.governorAlpha();
    const response = await comp.quorumVotes();
    expect(response).toBeInstanceOf(BigNumber);
  });

  it("Proposal threshold ", async () => {
    const comp = await protocol.governorAlpha();
    const response = await comp.proposalThreshold();
    expect(response).toBeInstanceOf(BigNumber);
  });

  it("Proposal max operations ", async () => {
    const comp = await protocol.governorAlpha();
    const response = await comp.proposalMaxOperations();
    expect(response).toBeInstanceOf(BigNumber);
  });

  it("Voting delay ", async () => {
    const comp = await protocol.governorAlpha();
    const response = await comp.votingDelay();
    expect(response).toBeInstanceOf(BigNumber);
  });

  it("Voting period ", async () => {
    const comp = await protocol.governorAlpha();
    const response = await comp.votingPeriod();
    expect(response).toBeInstanceOf(BigNumber);
  });
});
