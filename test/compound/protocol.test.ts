import Compound from "../../src/compound";
import {
  CompoundContract,
  EthereumProvider,
  ITransaction,
} from "../../src/compound/types";
import { deployContract, getSigner } from "../../src/compound/utils";
import { abi, bytecode } from "../mockContract";

const ethereumObject = require("ganache-cli").provider();
let contract: CompoundContract;
beforeAll(async () => {
  const provider = new EthereumProvider(ethereumObject);
  contract = await deployContract(
    abi,
    bytecode,
    getSigner(provider),
    "Hello world"
  );
});

describe("Compound ", () => {
  it("Create protocol instance ", () => {
    const protocol = new Compound(ethereumObject);
    expect(protocol).toBeInstanceOf(Compound);
  });

  it("Should throw error because no provider was given ", async () => {
    expect(() => new Compound({})).toThrowError("invalid web3Provider");
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
      method: "getValue",
      args: [],
    };
    const result = await protocol.callTx(contractInstance, txObject);
    expect(result).toBe("Hello world");
  });

  it("Send contract method ", async () => {
    const protocol = new Compound(ethereumObject);
    const contractInstance = protocol.getContract(contract.address, abi);
    const txObject: ITransaction = {
      method: "setValue",
      args: ["New value"],
    };
    const result = await protocol.sendTx(contractInstance, txObject);
    expect(result.hash).toMatch("0x");
  });
});
