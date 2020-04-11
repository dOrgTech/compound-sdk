import { formatEther } from "ethers/utils";
import { EthereumProvider, CompoundContract, ITransaction } from "./types";

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

export const isReadMethod = () => {};
