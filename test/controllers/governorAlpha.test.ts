import { GovernorAlpha } from "../../src/controllers/governorAlpha";
import Compound from "../../src";
import { abi, byteCode } from "./contracts/governorAlpha";
import {
  BigNumber,
  EthereumProvider,
  CompoundContract,
  TransactionResponse,
  Address,
} from "../../src/compound/types";
import * as utils from "../../src/compound/utils";

let protocol: Compound;
let provider: EthereumProvider;
let providerAccount: Address;
const ethereumObject = require("ganache-cli").provider();

const mockTx: TransactionResponse = {
  blockHash: "0x",
  confirmations: 15,
  from: "0x61FfE691821291D02E9Ba5D33098ADcee71a3a17",
  nonce: 0,
  gasLimit: utils.toBigNumber(10),
  gasPrice: utils.toBigNumber(10),
  data: "",
  value: utils.toBigNumber(10),
  chainId: 3333,
  wait: (confirmations?: number | undefined) =>
    Promise.resolve({ byzantium: false }),
};

beforeAll(async () => {
  provider = new EthereumProvider(ethereumObject);
  providerAccount = await utils.getAccount(provider);
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

  it("Propose ", async () => {
    const comp = await protocol.governorAlpha();
    jest.spyOn(protocol, "sendTx").mockResolvedValue(mockTx);
    const addresses: Array<Address> = ["0x"];
    const values: Array<number> = [1];
    const signatures: Array<string> = ["0x"];
    const calldatas: Array<string> = ["0x"];
    const description: string = "A good proposal";
    const response = await comp.propose(
      addresses,
      values,
      signatures,
      calldatas,
      description
    );
    expect(response.blockHash).toMatch("0x");
  });

  it("Queue ", async () => {
    const comp = await protocol.governorAlpha();
    jest.spyOn(protocol, "sendTx").mockResolvedValue(mockTx);
    const response = await comp.queue(1);
    expect(response.blockHash).toMatch("0x");
  });

  it("Execute ", async () => {
    const comp = await protocol.governorAlpha();
    jest.spyOn(protocol, "sendTx").mockResolvedValue(mockTx);
    const response = await comp.execute(1);
    expect(response.blockHash).toMatch("0x");
  });

  it("Cancel ", async () => {
    const comp = await protocol.governorAlpha();
    jest.spyOn(protocol, "sendTx").mockResolvedValue(mockTx);
    const response = await comp.cancel(1);
    expect(response.blockHash).toMatch("0x");
  });

  it("Get actions ", async () => {
    const comp = await protocol.governorAlpha();
    const response = await comp.getActions(1);
    expect(response).toBeInstanceOf(Array);
  });

  it("Get receipt ", async () => {
    const comp = await protocol.governorAlpha();
    const response = await comp.getReceipt(1, providerAccount);
    expect(response).toBeInstanceOf(Array);
  });

  it("State ", async () => {
    const comp = await protocol.governorAlpha();
    jest.spyOn(protocol, "callTx").mockResolvedValue("active");
    const response = await comp.state(1);
    expect(response).toBe("active");
  });

  it("Cast vote ", async () => {
    const comp = await protocol.governorAlpha();
    jest.spyOn(protocol, "sendTx").mockResolvedValue(mockTx);
    const response = await comp.castVote(1, true);
    expect(response.blockHash).toMatch("0x");
  });

  it("Cast vote by signature ", async () => {
    const comp = await protocol.governorAlpha();
    jest.spyOn(protocol, "sendTx").mockResolvedValue(mockTx);
    const response = await comp.castVoteBySignature(1, true);
    expect(response.blockHash).toMatch("0x");
  });
});
