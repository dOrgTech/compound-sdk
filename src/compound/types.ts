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

export const domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

export const DelegatedAddress = [{ name: "account", type: "address" }];

export { JsonRpcSigner, TransactionResponse, BigNumber };
