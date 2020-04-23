import {
  EthereumObject,
  Address,
  CompoundContract,
  ITransaction,
  SignatureType,
  TransactionResponse,
} from "./types";
import { GovernorAlpha } from "../controllers/governorAlpha";
import { Comp } from "../controllers/comp";
import Compound from "./main";

export interface IProtocol {
  governorAlpha(): Promise<GovernorAlpha>;
  comp(): Promise<Comp>;
  makeSendable(ethereumObject: EthereumObject): Compound;
  getContract(address: Address, abi: Array<object>): CompoundContract;
  sendTx(
    contract: CompoundContract,
    tx: ITransaction,
    signatureObject?: SignatureType | null
  ): Promise<TransactionResponse>;
  callTx(contract: CompoundContract, tx: ITransaction): Promise<any>;
}
