[![Build Status](https://travis-ci.com/dOrgTech/compound-sdk.svg?branch=master)](https://travis-ci.com/dOrgTech/compound-sdk)

# Compound SDK

NodeJS Library to interact with Compound Governance ecosystem, specifically with the Governor Alpha and Comp contracts

The objective of this SDK is to facilitate the development of new software based on Compound protocol; since it makes the developer to just focus on the UI

## Architecture

The current SDK is made of three main components which are: Protocol wrapper and the Governor Alpha and Comp implementation.

<p float="center">
  <img src="./docs/main-comunication.png" width="60%"/>
</p>

The UI will talk directly with the wrapper of the procotol, which is based on the [Ether.js](https://github.com/ethers-io/ethers.js/) library, making it super light weight and mobile friendly.

The architecture of this wrapper is the following:

<p float="center">
  <img src="./docs/wrapper-architecture.png" width="60%"/>
</p>

Main class has the core functionalities of the SDK, which are, `getContract`, `callTx` and `sendTx`; also, it has the capacity to retrieve the information of the contracts dinamically, making a request to the [Compound repository](https://github.com/compound-finance/compound-protocol/tree/master/networks), this way we make sure that the latest ABI and address are retrieved and the library keeps updated without the need of changing the code.

Utils file allow the user to use every method of the ethers.js library in any way he wants

Types file is the only one that interacts directly with ethers.js - This faciliates the debuging/change of the library regarding the interaction with blockchain modules

Then, there's the controllers modules, these allows the developer to interact with the Governor Alpha and Comp contracts:

<p float="center">
  <img src="./docs/controller-architecture.png" width="60%"/>
</p>

The developer can interact with every method of the contract once the SDK has been initalized with the expected params

## Usage

First of all, make sure you have node version `>= 10.16.3` installed.
Then, do:

`npm i --save compound-sdk`

This way, you can do in your Javascript App:

```
import Compound from 'compound-sdk'
```

There's two ways to initialize your SDK

- By passing a node url, but you wont be able to send transactions (or write into the blockchain)

This way, we allow the developer to pass an url and read the blockchain, but if the user then wants to trigger a tx it needs to login into the browser; so for example, at first you just pass the URL:

```
const sdk = new Compound("http://mainnet.infura.io/v3/your_api)
// we create instance of Comp Contract
const comp = await sdk.comp()
const currentVotes = comp.getCurrentVotes('0xProposalAddress')
```

Trying to call a [Non-Constant](https://docs.ethers.io/ethers.js/html/api-contract.html#contract-methods) method will throw an error if you have not initialized the SDK with a provider; but you can make the SDK to write into the blockchain by calling the following method:

```
sdk.makeSendable(web3provider) // make sure you send the currentProvider or it might fail
```

- By passing the provider object (i.e: metamask)

After setting up a web3provider, you can trigger call and send methods - Please check [The official documentation of these contracts](https://compound.finance/docs/governance) to make sure which method you can interact with
