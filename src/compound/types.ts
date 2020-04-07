import { Contract } from "ethers/contract";
import {
  AsyncSendable,
  Web3Provider,
  JsonRpcSigner,
  TransactionResponse,
} from "ethers/providers";

export interface ITransaction {
  contract: CompoundContract;
  method: string;
  args: any[];
  opts?: {
    gasLimit?: number;
    gasPrice?: number;
    value?: number;
    nonce?: number;
  };
}

export type Address = string;
export type Date = number;
export type Hash = string;
export type EthereumObject = AsyncSendable;

export class EthereumProvider extends Web3Provider {}
export class CompoundContract extends Contract {}

export { JsonRpcSigner, TransactionResponse };
