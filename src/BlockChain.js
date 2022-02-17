import {Block} from './Block.js'

export class BlockChain {
    constructor(difficulty) {
        this.blockchain = [this.startGenesisBlock()] // Initialize a new array of blocks, starting with a genesis block
        this.difficulty = difficulty
    }

    static create(difficulty) {
        return new BlockChain(difficulty)
    }

    startGenesisBlock() {
        return new Block({}) // Create an empty block to start
    }

    getLatestBlock() {
        return this.blockchain[this.blockchain.length - 1] // Get last block on the chain
    }

    addNewBlock(newBlock) { // Add a new block
        newBlock.prevHash = this.getLatestBlock().hash // Set its previous hash to the correct value
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


// Create two test blocks with some sample data
let a = new Block({from: "Joe", to: "Jane"})
let b = new Block({from: "Jane", to: "Joe"})

 
let chain = new BlockChain(2) // Init our chain
chain.addNewBlock(a) // Add block a
chain.addNewBlock(b) // Add block b
chain.print()
console.log("Validity: " + chain.checkChainValidity()) // Check our chain for validity
