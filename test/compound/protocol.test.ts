import Compound from "../../src/compound";
import {
  CompoundContract,
  EthereumProvider,
  ITransaction,
  BigNumber,
} from "../../src/compound/types";
import { deployContract, getSigner } from "../../src/compound/utils";
import { abi, byteCode } from "../../contracts/comp";

const ethereumObject = require("ganache-cli").provider();
let contract: CompoundContract;
beforeAll(async () => {
  const provider = new EthereumProvider(ethereumObject);
  contract = await deployContract(abi, byteCode, getSigner(provider), [
    "0x61FfE691821291D02E9Ba5D33098ADcee71a3a17",
  ]);
});

describe("Compound with web3provider", () => {
  it("Create protocol instance ", () => {
    const protocol = new Compound(ethereumObject);
    expect(protocol).toBeInstanceOf(Compound);
  });

  it("Should throw error because no provider was given ", async () => {
    expect(() => new Compound({})).toThrowError("invalid web3Provider");
  });

  it("Should throw error because provider was already given", async () => {
    const protocol = new Compound(ethereumObject);
    expect(() => protocol.makeSendable(ethereumObject)).toThrowError(
      "Provider already instantiated"
    );
  });

  it("New contract instance ", () => {
    const protocol = new Compound(ethereumObject);
    const contractInstance = protocol.getContract(
      "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
      "[]"
    );
    expect(contractInstance).toBeInstanceOf(CompoundContract);
    expect(contractInstance.address).toEqual(
      "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
    );
  });

  it("Call contract method ", async () => {
    const protocol = new Compound(ethereumObject);
    const contractInstance = protocol.getContract(contract.address, abi);
    const txObject: ITransaction = {
      method: "getCurrentVotes",
      args: ["0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"],
    };
    const result = await protocol.callTx(contractInstance, txObject);
    expect(result).toBeInstanceOf(BigNumber);
  });

  it("Send contract method ", async () => {
    const protocol = new Compound(ethereumObject);
    const contractInstance = protocol.getContract(contract.address, abi);
    const txObject: ITransaction = {
      method: "delegate",
      args: ["0x61FfE691821291D02E9Ba5D33098ADcee71a3a17"],
    };
    const result = await protocol.sendTx(contractInstance, txObject);
    expect(result.hash).toMatch("0x");
  });
});

describe("Compound with JSON provider", () => {
  it("Protocol instance when passing url", () => {
    const protocol = new Compound("http://localhost:8545");
    expect(protocol).toBeInstanceOf(Compound);
  });

  it("Update provider to send transactions", () => {
    const protocol = new Compound("http://localhost:8545");
    const updateProtocol = protocol.makeSendable(ethereumObject);
    expect(updateProtocol).toBeTruthy();
  });
});
