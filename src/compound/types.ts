import { ContractFactory } from "ethers";
import { AsyncSendable, JsonRpcProvider } from "ethers/providers";

export type Address = string;
export type Date = number;
export type Hash = string;
export type Web3Provider = string | AsyncSendable;
export type IPFSProvider = string;

export class JSONProvider extends JsonRpcProvider {}
export class NewContract extends ContractFactory {}
