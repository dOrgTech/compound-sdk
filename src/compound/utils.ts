import { formatEther } from "ethers/utils";
import { ContractFactory } from "ethers/contract";
import {
  EthereumProvider,
  CompoundContract,
  ITransaction,
  JsonRpcSigner,
  domain,
  DelegatedAddress,
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
  params: Array<any>
) => {
  let factory = new ContractFactory(abi, bytecode, signer);
  let contract = await factory.deploy(...params);
  await contract.deployed();
  return contract;
};

export const signMessage = async (
  provider: EthereumProvider,
  contract: CompoundContract,
  params: Object
) => {
  const from = await getAccount(provider);
  try {
    const domainData = {
      name: "compound",
      version: "1",
      chainId: 3, // make this dynamic
      verifyingContract: contract.address,
    };
    const data = JSON.stringify({
      types: {
        EIP712Domain: domain,
        Message: DelegatedAddress,
      },
      domain: domainData,
      primaryType: "Message",
      message: params,
    });
    const signature = await provider.send("eth_signTypedData_v3", [from, data]);
    const r = "0x" + signature.substring(0, 64);
    const s = "0x" + signature.substring(64, 128);
    const v = parseInt(signature.substring(128, 130), 16);
    const nonce = await getNonce(provider, contract.address);
    const expiry: number = Date.now() + 3600000;
    return [r, s, v, nonce, expiry];
  } catch (e) {
    return [];
  }
};
