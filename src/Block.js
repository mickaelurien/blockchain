import crypto from 'crypto'

export class Block {
    constructor(data, prevHash = "") {
        this.timestamp = Date.now(); // Get the current timestamp
        this.data = data; // Store whatever data is relevant 
        this.prevHash = prevHash // Store the previous block's hash
        this.hash = this.computeHash() // Compute this block's hash
        this.pow = 0;
    }

    computeHash() { // Compute this Block's hash
        let strBlock = this.prevHash + this.timestamp + JSON.stringify(this.data) + this.pow+'' // Stringify the block's data
        return crypto.createHash("sha256").update(strBlock).digest("hex") // Hash said string with SHA256 encrpytion
    }

    getFinalHash(difficulty) {
        this.hash = this.computeHash() // Recalculate its hash with this new prevHash value
        this.mine(difficulty);
        return this.hash
    }

    mine(difficulty) {
        const regex = new RegExp(`^(0){${difficulty}}.*`);
        while (!this.hash.match(regex)) {
            this.pow++;
            this.hash = this.computeHash();
        }
    }
}