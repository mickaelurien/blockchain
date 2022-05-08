
export class Block {
    constructor(data, prevHash = "") {
        this.timestamp = Date.now(); // Get the current timestamp
        this.data = data; // Store whatever data is relevant 
        this.prevHash = prevHash // Store the previous block's hash
        this.hash = this.computeHash() // Compute this block's hash
        this.pow = 0;
    }

    hashString(str) {
        return str.split('').reduce((prevHash, currVal) =>
          (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0)+'';
      }


    computeHash() { // Compute this Block's hash
        let strBlock = this.prevHash + this.timestamp + JSON.stringify(this.data) + this.pow+'' // Stringify the block's data
        return this.hashString(strBlock)
    }

    getFinalHash(difficulty) {
        this.hash = this.computeHash() // Recalculate its hash with this new prevHash value
        this.mine(difficulty);
        return this.hash
    }

    getRandomInt() {
        return Math.floor(Math.random() * 9);
      }

    mine(difficulty) {
        let number = '';
        for(let i=0; i<difficulty; i++) {
            number = number + this.getRandomInt();
        }
        console.log('mining looking for ' + number);
        while (!this.hash.includes(number)) {
            this.pow++;
            this.hash = this.computeHash();
        }
    }
}