import { Contract } from "ethers/contract";
import {
  AsyncSendable,
  JsonRpcSigner,
  TransactionResponse,
  Web3Provider,
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

export class CompoundContract extends Contract {}

const Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const DelegatedAddress = [
  { name: "account", type: "address" },
  { name: "nonce", type: "uint256" },
  { name: "expiry", type: "uint" },
];

const CastVote = [
  { name: "proposalId", type: "uint256" },
  { name: "support", type: "bool" },
];

export const MethodTypes = {
  delegateBySignature: {
    types: {
      EIP712Domain: Domain,
      Message: DelegatedAddress, // needs to be dynamic
    },
    domain: domainData, // needs to be dynamic
    primaryType: "Message",
    message: params, // needs to be dynamic
  },
};

export { JsonRpcSigner, TransactionResponse, BigNumber };
