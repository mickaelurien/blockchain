import {Block} from './Block.js'

export class BlockChain {
    constructor(difficulty = 0) {
         this.blockchain = [] // Initialize a new array of blocks, starting with a genesis block
        this.startGenesisBlock()
        this.difficulty = difficulty
    }

    static create(difficulty) {
        return new BlockChain(difficulty)
    }

    startGenesisBlock() {
        let genesis = new Block({});
        genesis.prevHash = '';
        genesis.hash = genesis.getFinalHash(this.difficulty)
        this.blockchain.push(genesis) // Add a genesis block
    }

    async getLatestBlock() {
        const lastElement = this.blockchain[this.blockchain.length - 1]
        return lastElement.hash // Get last block on the chain
    }

    async addNewBlock(newBlock) { // Add a new block
        newBlock.prevHash = await this.getLatestBlock() // Set its previous hash to the correct value
        newBlock.hash = newBlock.getFinalHash(this.difficulty)
        this.blockchain.push(newBlock) // Add the block to our chain
    }

    checkChainValidity() { // Check to see that all the hashes are correct and the chain is therefore valid
        for(let i = 1; i < this.blockchain.length; i++) { // Iterate through, starting after the genesis block
            const currBlock = this.blockchain[i]
            const prevBlock = this.blockchain[i -1]
            
            // Check if the hash is correctly the data hashed
            if(currBlock.hash !== currBlock.computeHash()) { 
                return false
            }
          
            // Does it have the correct prevHash value
            if(currBlock.prevHash !== prevBlock.hash) {                 
              return false
            }
            
        }
        return true // If all the blocks are valid, return true
    }

    print() {
        console.table(this.blockchain)
    }

}