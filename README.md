[![Build Status](https://travis-ci.com/dOrgTech/compound-sdk.svg?branch=master)](https://travis-ci.com/dOrgTech/compound-sdk)

# Compound SDK

NodeJS Library for interacting with the Compound Governance ecosystem, specifically with the Governor Alpha and Comp contracts.

## Usage

First of all, make sure you have node version `>= 10.16.3` installed.
Then, do:

`npm i --save compound-sdk`

Now you can utilize the SDK in your Javascript App:

```
import Compound from 'compound-sdk'
```

There are two ways to initialize your SDK:

1. By passing a node URL (but you wont be able to send transactions / write to the blockchain)

2. By passing the web3provider object (i.e: Metamask)

This way, developers can pass a URL to read the blockchain and only ask the the user to log-in with a web3 wallet when they need to trigger a tx. For example, at first you just pass the URL:

```
const sdk = new Compound("http://mainnet.infura.io/v3/your_api)
// we create instance of Comp Contract
const comp = await sdk.comp()
const currentVotes = comp.getCurrentVotes('0xProposalAddress')
```

Trying to call a [Non-Constant](https://docs.ethers.io/ethers.js/html/api-contract.html#contract-methods) method will throw an error if you have not initialized the SDK with a provider. You can make the SDK write to the blockchain by calling the following method:

```
sdk.makeSendable(web3provider) // make sure you send the currentProvider or it might fail
```

After setting up a web3provider, you can trigger call and send methods - please check [the official documentation of the Compound Governance contracts](https://compound.finance/docs/governance) to understand the methods.

This way, if you want to interact with the `GovernorAlpha` contract for example, you can do:

```
const proposalId = 1;
const governor = await sdk.governorAlpha();
await governor.castVote(proposalId, true);
```

Or, for `Comp` contract:

```
const delegatee = "0x";
const comp = await sdk.comp();
await comp.delegate(delegatee)
```

You can check the architecture details [here](./docs/architecture.md)
