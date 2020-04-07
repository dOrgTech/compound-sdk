import { Contract } from "ethers";
import { AsyncSendable, Web3Provider } from "ethers/providers";

export type Address = string;
export type Date = number;
export type Hash = string;
export type EthereumObject = AsyncSendable;
export type IPFSProvider = string;

export class EthereumProvider extends Web3Provider {}
export class CompoundContract extends Contract {}
