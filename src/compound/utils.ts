import { formatEther } from "ethers/utils";
import { ContractFactory } from "ethers/contract";

import {
  EthereumProvider,
  CompoundContract,
  ITransaction,
  JsonRpcSigner,
} from "./types";

export const getAccount = async (provider: EthereumProvider) => {
  const signer = provider.getSigner();
  return await signer.getAddress();
};

export const getSigner = (provider: EthereumProvider) => {
  return provider.getSigner();
};

export const estimateGas = async (
  contract: CompoundContract,
  tx: ITransaction
) => {
  const estimation = await contract.estimate[tx.method](...tx.args);
  return estimation.toNumber();
};

export const getNonce = async (provider: EthereumProvider, address: string) => {
  return await provider.getTransactionCount(address);
};

export const toEther = (wei: string) => {
  return formatEther(wei);
};

export const deployContract = async (
  abi: string,
  bytecode: string,
  signer: JsonRpcSigner,
  params: any
) => {
  let factory = new ContractFactory(abi, bytecode, signer);
  let contract = await factory.deploy(params);
  await contract.deployed();
  return contract;
};

export const isReadMethod = () => {};
