import { Contract } from "ethers/contract";
import {
  AsyncSendable,
  JsonRpcSigner as Signer,
  TransactionResponse,
  Web3Provider,
  JsonRpcProvider,
} from "ethers/providers";
import { BigNumber } from "ethers/utils";

export interface ITransaction {
  method: string;
  args: Array<string | number | boolean | (string | number)[]>;
  opts?: {
    gasLimit?: number;
    gasPrice?: number;
    value?: number;
    nonce?: number;
  };
}

export type Address = string;

export type EthereumObject = AsyncSendable;

export class EthereumProvider extends Web3Provider {}
export class JSONProvider extends JsonRpcProvider {}

export class CompoundContract extends Contract {}

export type DomainDataType = {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: Address;
};

export type SignatureType = {
  paramsDefinition: Array<object>;
  paramsValues: object;
};

export const Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

export const DelegatedAddress = [
  { name: "account", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "expiry", type: "uint" },
];

export const CastVote = [
  { name: "proposalId", type: "uint256" },
  { name: "support", type: "bool" },
];

export { Signer, TransactionResponse, BigNumber };
