import { formatEther } from "ethers/utils";
import { ContractFactory } from "ethers/contract";
import fetch from "node-fetch";
import { Base64 } from "js-base64";
import {
  EthereumProvider,
  CompoundContract,
  ITransaction,
  Signer,
  Domain,
  DomainDataType,
} from "./types";

export const getAccount = async (
  provider: EthereumProvider
): Promise<string> => {
  const signer = provider.getSigner();
  return await signer.getAddress();
};

export const getSigner = (provider: EthereumProvider): Signer => {
  return provider.getSigner();
};

export const estimateGas = async (
  contract: CompoundContract,
  tx: ITransaction
): Promise<number> => {
  const estimation = await contract.estimate[tx.method](...tx.args);
  return estimation.toNumber();
};

export const getContractNonce = async (
  provider: EthereumProvider,
  contract: CompoundContract
): Promise<number> => {
  return await provider.getTransactionCount(contract.address);
};

export const toEther = (wei: string): string => {
  return formatEther(wei);
};

export const deployContract = async (
  abi: string,
  bytecode: string,
  signer: Signer,
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
  method: Array<object>,
  params: object
): Promise<(string | number)[]> => {
  const from = await getAccount(provider);
  try {
    const chainId = await getNetworkId(provider);
    const domainData = {
      name: "Compound Protocol",
      version: "1",
      chainId,
      verifyingContract: contract.address,
    };
    const signatureParams = getSignatureParams(domainData, params, method);
    const data = JSON.stringify(signatureParams);
    const signature = (
      await provider.send("eth_signTypedData_v3", [from, data])
    ).substring(2);
    const r = "0x" + signature.substring(0, 64);
    const s = "0x" + signature.substring(64, 128);
    const v = parseInt(signature.substring(128, 130), 16);
    return [v, r, s];
  } catch (e) {
    throw new Error(e);
  }
};

export const getNetworkId = async (provider: EthereumProvider) => {
  const network = await provider.getNetwork();
  return network.chainId;
};

const getSignatureParams = (
  domain: DomainDataType,
  message: object,
  messageType: Array<object>
) => {
  const delegateBySignature = {
    types: {
      EIP712Domain: Domain,
      Message: messageType,
    },
    domain,
    primaryType: "Message",
    message,
  };
  return delegateBySignature;
};

export const getNetworkName = (id: number): string => {
  switch (id) {
    case 1:
      return "mainnet";
    case 3:
      return "ropsten";
    case 4:
      return "rinkeby";
    case 5:
      return "goerli";
    case 42:
      return "kovan";
    default:
      return "mainnet";
  }
};

export const decodeContents = async (
  contractName: string,
  abiUrl: string,
  contractUrl: string
) => {
  const abi = await getContent(contractName, abiUrl);
  const contractAddress = await getContent(contractName, contractUrl, true);
  return { abi, contractAddress };
};

const getContent = async (
  contractName: string,
  url: string,
  isContract: boolean = false
) => {
  const response = await fetch(url);
  const result = await response.json();
  const information = JSON.parse(Base64.decode(result.content));
  return isContract
    ? information["Contracts"][contractName]
    : information[contractName];
};
