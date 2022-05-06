# Blockchain in Node
This project is a simple blockchain implementation in Node.js.
## How to use it

To use this project, enter with your terminal in the folder and simply run

```bash
  node index.js
```

## What is a Block

A Block is an object that contains : 
- A timestamp corresponding to the date the block was created
- Data of the block
- The hash of the previous block
- His own hash
- A Pow (proof of work) value, that globally tell us the effort needed to create this block [see more](https://www.investopedia.com/terms/p/proof-work.asp) 

The hash of a block is the hashed result of his timestamp, previousHash, data and Pow.

## What is a BlockChain

Well, globally a blockchain is an array of block with some methods.

The most important is the checkChainValidity, which will tell us if the BlockChain is the original, and no Blocks has been modified.

## Librairies

 - [crypto](https://www.npmjs.com/package/crypto-js)
 - [inquirer](https://www.npmjs.com/package/inquirer)
