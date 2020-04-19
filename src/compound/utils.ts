import { formatEther } from "ethers/utils";
import { ContractFactory } from "ethers/contract";
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
  contract: CompoundContract
): Promise<string> => {
  return await contract.getTransactionCount(contract.address);
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
    const network = await provider.getNetwork();
    const domainData = {
      name: "Compound Protocol",
      version: "1",
      chainId: network.chainId,
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
