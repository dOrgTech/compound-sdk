import { formatEther, BigNumber } from "ethers/utils";
import { ContractFactory } from "ethers/contract";
import {
  EthereumProvider,
  CompoundContract,
  ITransaction,
  JsonRpcSigner,
  // Domain,
  // DelegatedAddress,
} from "./types";

export const getAccount = async (
  provider: EthereumProvider
): Promise<string> => {
  const signer = provider.getSigner();
  return await signer.getAddress();
};

export const getSigner = (provider: EthereumProvider): JsonRpcSigner => {
  return provider.getSigner();
};

export const estimateGas = async (
  contract: CompoundContract,
  tx: ITransaction
): Promise<number> => {
  const estimation = await contract.estimate[tx.method](...tx.args);
  return estimation.toNumber();
};

export const getNonce = async (contract: CompoundContract): Promise<string> => {
  return await contract.getTransactionCount(contract.address);
};

export const toEther = (wei: string): string => {
  return formatEther(wei);
};

export const deployContract = async (
  abi: string,
  bytecode: string,
  signer: JsonRpcSigner,
  params: Array<any>
): Promise<CompoundContract> => {
  let factory = new ContractFactory(abi, bytecode, signer);
  let contract = await factory.deploy(...params);
  await contract.deployed();
  return contract;
};

export const signMessage = async (
  provider: EthereumProvider,
  contract: CompoundContract,
  params: Object
): Promise<(string | number)[]> => {
  const from = await getAccount(provider);
  try {
    const network = await provider.getNetwork();
    const domainData = {
      name: "Compound Protocol",
      version: "1",
      chainId: network.chainId,
      verifyingContract: contract.address,
    };
    const data = JSON.stringify(params);
    const signature = await provider.send("eth_signTypedData_v3", [from, data]);
    const v = parseInt(signature.substring(128, 130), 16);
    const r = "0x" + signature.substring(0, 64);
    const s = "0x" + signature.substring(64, 128);
    return [v, r, s];
  } catch (e) {
    throw new Error(e);
  }
};
